// app/api/orders/lead/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      productId, productName, sellerId, sellerPhone, price, // Single product fields
      cartItems, // Multi-product array
      referralCodeUsed: bodyRef 
    } = body;

    let finalCartItems = [];
    let totalAmount = 0;

    // ==========================================
    // 🛒 SCENARIO A: MULTI-PRODUCT CART CHECKOUT
    // ==========================================
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      finalCartItems = cartItems.map((item: any) => ({
        productId: item.productId || item.id,
        name: item.name || item.title || "Unknown Item",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        sellerId: item.sellerId || "SYSTEM",
        sellerPhone: item.sellerPhone || ""
      }));
      
      totalAmount = finalCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    } 
    // ==========================================
    // 📦 SCENARIO B: SINGLE PRODUCT CHECKOUT
    // ==========================================
    else if (productId) {
      let finalPrice = Number(price) || 0;

      // The "Lazy Revert" Security System
      try {
        const productRef = adminDb.collection("products").doc(productId);
        const productSnap = await productRef.get();

        if (productSnap.exists) {
          const productData = productSnap.data();
          if (productData?.isSale && productData?.saleEndDate) {
            const saleEndDate = new Date(productData.saleEndDate).getTime();
            if (saleEndDate <= Date.now()) {
              const originalPrice = Number(productData.originalPrice) || Number(productData.price);
              finalPrice = originalPrice; 

              await productRef.update({
                price: originalPrice,
                originalPrice: FieldValue.delete(), 
                isSale: false,
                campaignType: FieldValue.delete(),
                saleEndDate: FieldValue.delete()
              });
            }
          }
        }
      } catch (dbError) {
        console.error("Error checking product for lazy revert:", dbError);
      }

      finalCartItems = [{
        productId,
        name: productName || "Unknown Item",
        price: finalPrice, 
        quantity: 1,
        sellerId: sellerId || "SYSTEM",
        sellerPhone: sellerPhone || ""
      }];
      totalAmount = finalPrice;
    } else {
      return NextResponse.json({ error: "No products provided" }, { status: 400 });
    }

    // 🚀 SMART REFERRAL CAPTURE
    const cookieStore = cookies();
    const refCookie = cookieStore.get("kabale_ref");
    const referralCodeUsed = bodyRef || (refCookie ? refCookie.value : null);

    // Generate Lead Reference
    const leadId = `LEAD-${Math.floor(10000 + Math.random() * 90000)}`;
    const leadRef = adminDb.collection("orders").doc(leadId);

    await leadRef.set({
      orderId: leadId,
      source: "whatsapp",
      paymentMode: "COD",
      status: "lead", 
      paymentStatus: "pending",
      referralCodeUsed: referralCodeUsed, 
      cartItems: finalCartItems,
      buyerPhone: "", 
      buyerName: "",
      totalAmount: totalAmount, 
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    return NextResponse.json({ success: true, leadId, totalAmount });

  } catch (error: any) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Failed to generate lead" }, { status: 500 });
  }
}
