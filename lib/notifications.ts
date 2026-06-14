// lib/notifications.ts
// Removed the import for "./whatsapp" to fix the missing module build error.

// Helper function to ensure phone numbers are formatted correctly for Meta
const formatMetaPhone = (phone: string) => {
  let cleanPhone = (phone || "").replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) cleanPhone = "256" + cleanPhone.substring(1);
  return cleanPhone;
};

export const NotificationService = {

  // ==========================================
  // 1. MULTI-SELLER: NOTIFY SELLER 
  // ==========================================
  async notifySeller(
    sellerPhone: string, 
    sellerName: string, 
    orderId: string, 
    itemsString: string, 
    subtotal: number, 
    buyerName: string,
    buyerLocation: string,
    buyerContact: string
  ) {
    const cleanPhone = formatMetaPhone(sellerPhone);
    if (!cleanPhone) return console.error("❌ notifySeller failed: No seller phone provided.");

    // WhatsApp logic removed to prevent build errors
    console.log(`[WhatsApp Disabled] Would have routed seller sub-order to ${cleanPhone}.`);
  },

  // ==========================================
  // 2. CONSOLIDATED: NOTIFY BUYER
  // ==========================================
  async notifyBuyer(
    buyerPhone: string, 
    orderId: string, 
    itemsString: string, 
    totalAmount: number
  ) {
    const cleanPhone = formatMetaPhone(buyerPhone);
    if (!cleanPhone) return console.error("❌ notifyBuyer failed: No buyer phone provided.");

    // WhatsApp logic removed to prevent build errors
    console.log(`[WhatsApp Disabled] Would have sent consolidated receipt to buyer ${cleanPhone}.`);
  },

  // ==========================================
  // 3. NEW BUYER INQUIRY (Pre-Cart WhatsApp Click)
  // ==========================================
  async buyerInquiry(sellerPhone: string, productName: string) {
    const cleanPhone = formatMetaPhone(sellerPhone);
    if (!cleanPhone) return;

    console.log(`[WhatsApp Disabled] Would have sent buyer inquiry to ${cleanPhone}.`);
  },

  // ==========================================
  // 4. CONVERSATION TIMEOUTS & UPDATES
  // ==========================================
  async awaitingResponse(targetPhone: string, productName: string) {
    const cleanPhone = formatMetaPhone(targetPhone);
    if (!cleanPhone) return;

    console.log(`[WhatsApp Disabled] Would have sent awaiting response to ${cleanPhone}.`);
  },

  async updateNotice(targetPhone: string, productName: string) {
    const cleanPhone = formatMetaPhone(targetPhone);
    if (!cleanPhone) return;

    console.log(`[WhatsApp Disabled] Would have sent update notice to ${cleanPhone}.`);
  },

  // ==========================================
  // 5. PARTNER PAYOUT NOTIFICATION (Wallet Credit)
  // ==========================================
  async notifyPartnerCredit(partnerPhone: string, amountCredited: number, newBalance: number) {
    const cleanPhone = formatMetaPhone(partnerPhone);
    if (!cleanPhone) return console.error("❌ notifyPartnerCredit failed: No partner phone provided.");

    console.log(`[WhatsApp Disabled] Would have sent wallet credit alert to partner ${cleanPhone}.`);
  }
};
