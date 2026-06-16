const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL = "support@oweitushop.com";
const SENDER_NAME = "Oweitu Shop";
const YEAR = new Date().getFullYear();

// --- BASE EMAIL SENDER ---
async function sendEmail({ to, subject, htmlContent }: { to: { email: string; name: string }[], subject: string, htmlContent: string }) {
  if (!BREVO_API_KEY) {
    console.error("Missing BREVO_API_KEY environment variable.");
    return;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to,
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
    }
  } catch (error) {
    console.error("Failed to send email via Brevo:", error);
  }
}

// --- SHARED EMAIL WRAPPER ---
const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #334155;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #FF6A00; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 900;">Oweitu Shop</h1>
    </div>
    <div style="padding: 32px 24px;">${content}</div>
    <div style="background-color: #f1f5f9; padding: 24px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-weight: 600;">Oweitu Shop Operations</p>
      <p style="margin: 12px 0 0 0;">&copy; ${YEAR} Oweitu Shop. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// --- 1. ADMIN ORDER ALERT ---
export async function sendAdminAlert(orderNumber: string, itemName: string, total: number, buyerPhone: string, sellerPhone: string) {
  const masterEmail = "shopkabale@gmail.com"; 
  const content = `
    <h2 style="color: #dc2626; margin-top: 0;">🚨 New Order Received!</h2>
    <p>A new transaction has been initiated on Oweitu Shop.</p>
    <div style="background-color: #fef2f2; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p><strong>Order ID:</strong> ${orderNumber}</p>
      <p><strong>Item:</strong> ${itemName}</p>
      <p><strong>Total:</strong> UGX ${total.toLocaleString()}</p>
      <p><strong>Buyer Phone:</strong> ${buyerPhone}</p>
      <p><strong>Seller Phone:</strong> ${sellerPhone}</p>
    </div>
  `;
  await sendEmail({ to: [{ email: masterEmail, name: "Admin" }], subject: `🚨 NEW ORDER: ${orderNumber}`, htmlContent: emailWrapper(content) });
}

// --- 2. BUYER RECEIPT ---
export async function sendBuyerReceipt(buyerEmail: string, buyerName: string, orderNumber: string, itemName: string, total: number) {
  const content = `
    <h2 style="color: #16a34a; margin-top: 0;">🎉 Order Confirmed!</h2>
    <p>Hi ${buyerName}, thank you for shopping with Oweitu Shop!</p>
    <div style="background-color: #f0fdf4; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p><strong>Order ID:</strong> ${orderNumber}</p>
      <p><strong>Item:</strong> ${itemName}</p>
      <p><strong>Total to Pay:</strong> UGX ${total.toLocaleString()}</p>
    </div>
    <p>Our team will contact you shortly to coordinate delivery.</p>
  `;
  await sendEmail({ to: [{ email: buyerEmail, name: buyerName }], subject: `Order Receipt - ${orderNumber}`, htmlContent: emailWrapper(content) });
}

// --- 3. SELLER NOTIFICATION ---
export async function sendSellerNotification(sellerEmail: string, sellerName: string, orderNumber: string, itemName: string, total: number) {
  const content = `
    <h2 style="color: #FF6A00; margin-top: 0;">🚀 You Made a Sale!</h2>
    <p>Hi ${sellerName}, congratulations on your sale!</p>
    <div style="background-color: #fff7ed; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p><strong>Item Sold:</strong> ${itemName}</p>
      <p><strong>Payout Amount:</strong> UGX ${total.toLocaleString()}</p>
    </div>
    <p>Please check your Oweitu Shop seller dashboard to manage fulfillment.</p>
  `;
  await sendEmail({ to: [{ email: sellerEmail, name: sellerName }], subject: `You sold an item on Oweitu Shop!`, htmlContent: emailWrapper(content) });
}

// --- 4. ADMIN PAYOUT ALERT ---
export async function sendAdminPayoutAlert(requestId: string, sellerId: string, amount: number, newStatus: string) {
  const masterEmail = "shopkabale@gmail.com"; 
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">💰 Payout Update: ${newStatus.toUpperCase()}</h2>
    <p>Request ID: ${requestId}</p>
    <p>Amount: UGX ${amount.toLocaleString()}</p>
  `;
  await sendEmail({ to: [{ email: masterEmail, name: "Admin" }], subject: `💳 Payout Update: ${newStatus}`, htmlContent: emailWrapper(content) });
}
