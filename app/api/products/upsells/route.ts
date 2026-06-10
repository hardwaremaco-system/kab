// app/api/products/upsells/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic"; // Ensures fresh data, no caching

export async function GET() {
  try {
    // Fetch items under UGX 10,000 to use as "cart fillers"
    const productsRef = adminDb.collection("products");
    
    // We only use one inequality operator (price) to avoid needing a custom Firestore composite index
    const snapshot = await productsRef
      .where("price", ">", 0)
      .where("price", "<=", 10000)
      .limit(15) 
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ success: true, items: [] });
    }

    // Map the data, filter for items actually in stock
    const availableItems = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((item: any) => (item.stock || 0) > 0);

    // Shuffle the array to keep the cart suggestions fresh, and pick the top 4
    const shuffledUpsells = availableItems
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    // Clean up the payload before sending it to the client
    const safePayload = shuffledUpsells.map((item: any) => ({
      id: item.id,
      title: item.name || item.title || "Unknown Item",
      price: Number(item.price) || 0,
      image: item.images?.[0] || item.image || "", 
      sellerId: item.sellerId || "SYSTEM",
      sellerPhone: item.sellerPhone || ""
    }));

    return NextResponse.json({ success: true, items: safePayload }, { status: 200 });

  } catch (error: any) {
    console.error("Upsell fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch upsells" }, { status: 500 });
  }
}
