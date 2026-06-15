import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation & Guide | Oweitu Shop",
  description: "Learn how to buy, sell, and grow your business on Ankole and Kigezi's premier online marketplace. Complete guide and promotion steps.",
  keywords: ["oweitu shop guide", "how to sell in Ankole", "buy online Uganda", "Kigezi e-commerce setup", "boost ads Oweitu", "cash on delivery"],
  openGraph: {
    title: "Documentation & Guide | Oweitu Shop",
    description: "The complete guide to buying, selling, and growing your business on Oweitu Shop.",
    url: "https://oweitushop.com/guide",
    siteName: "Oweitu Shop",
    images: [
      {
        url: "/guide-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oweitu Shop Documentation",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-800 dark:text-slate-200 font-sans selection:bg-[#FF6A00] selection:text-white pb-20">

      {/* HEADER */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111] pt-12 pb-8 px-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FF6A00] font-bold text-sm mb-2 uppercase tracking-wider">Oweitu Shop</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Platform Documentation
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
            The complete user guide to buying, selling, and growing your business locally.
          </p>
        </div>
      </header>

      {/* MAIN DOCS CONTENT */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SECTION: BUYING & SELLING */}
        <section id="basics" className="grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              1. How to Sell
            </h2>
            <ol className="list-decimal list-outside ml-5 space-y-3 text-slate-600 dark:text-slate-400">
              <li>Visit <Link href="/sell" className="text-[#FF6A00] hover:underline">oweitushop.com/sell</Link></li>
              <li>Fill in product details & upload photos</li>
              <li>Tap <strong>Post Product Now</strong></li>
              <li>Login with Google and select your email</li>
            </ol>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm border border-blue-100 dark:border-blue-900">
              <strong>Why we ask for your email:</strong> We send you instant notifications the moment someone orders your product.
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              2. How to Buy
            </h2>
            <ol className="list-decimal list-outside ml-5 space-y-3 text-slate-600 dark:text-slate-400">
              <li>Visit <Link href="/" className="text-[#FF6A00] hover:underline">Oweitu Shop</Link></li>
              <li>Browse or search for what you need</li>
              <li>Tap <strong>Buy Fast</strong> (no login required)</li>
              <li>Enter your name and phone number</li>
              <li>Click <strong>Send</strong></li>
            </ol>
            <div className="mt-4 space-y-2 text-sm font-medium text-green-700 dark:text-green-500">
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                You will receive confirmation via WhatsApp.
              </p>
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0-2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <strong>Cash on Delivery (COD)</strong> is available — you pay when you receive your item.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: FOR HER (LADIES SECTION) */}
        <section id="for-her">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            3. For Her (Ladies Section)
          </h2>
          <div className="bg-pink-50 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/50 rounded-lg p-5">
            <p className="text-sm font-bold text-pink-800 dark:text-pink-300 mb-4">
              Ladies, We got you covered too 💖
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Earrings', 'Hair claws', 'Lip gloss', 'Scrunchies', 'High heels', 'Necklaces', 'Perfumes', 'Beauty essentials'].map(item => (
                <span key={item} className="bg-white dark:bg-[#111] text-pink-700 dark:text-pink-400 px-3 py-1 rounded-md text-xs font-semibold border border-pink-200 dark:border-pink-800">
                  {item}
                </span>
              ))}
            </div>
            <Link href="/ladies" className="text-pink-600 dark:text-pink-400 hover:underline font-bold text-sm flex items-center gap-1">
              Visit oweitushop.com/ladies &rarr;
            </Link>
          </div>
        </section>

        {/* SECTION: PROMOTIONS & PAYMENTS */}
        <section id="promotions">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            4. Promotion & Visibility
          </h2>

          <div className="space-y-4">
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-50 dark:bg-[#111] px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white">🚀 Boost Your Product</h3>
                <span className="font-mono text-sm font-bold text-[#FF6A00]">UGX 1,000</span>
              </div>
              <div className="p-5 text-slate-600 dark:text-slate-400 text-sm">
                <ul className="list-disc ml-4 space-y-1">
                  <li>Appears on homepage</li>
                  <li>Duration: 24 hours</li>
                </ul>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-50 dark:bg-[#111] px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white">⭐ Feature Product</h3>
                <span className="font-mono text-sm font-bold text-[#FF6A00]">UGX 3,000</span>
              </div>
              <div className="p-5 text-slate-600 dark:text-slate-400 text-sm">
                <ul className="list-disc ml-4 space-y-1">
                  <li>Premium visibility</li>
                  <li>Duration: 72 hours (3 Days)</li>
                </ul>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-50 dark:bg-[#111] px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white">⚡ Urgent Listing</h3>
                <span className="font-mono text-sm font-bold text-green-600">FREE</span>
              </div>
              <div className="p-5 text-slate-600 dark:text-slate-400 text-sm">
                <ul className="list-disc ml-4 space-y-1">
                  <li>Limited to 50 items daily</li>
                  <li>First come, first served</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Block */}
          <div className="mt-6 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-slate-800 rounded-lg p-5 font-mono text-sm">
            <h4 className="text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs font-bold">💳 Payment Instructions</h4>
            <div className="space-y-3 mb-6 bg-white dark:bg-[#0a0a0a] p-4 rounded border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400">Airtel Money Merchant:</span>
                <span className="text-[#FF6A00] font-bold">7050183</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-600 dark:text-slate-400">MTN MoMo Merchant:</span>
                <span className="text-[#FF6A00] font-bold">14843537</span>
              </div>
            </div>
            <ol className="list-decimal ml-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Send payment to the numbers above.</li>
              <li>Take a screenshot of the transaction.</li>
              <li>Send screenshot to WhatsApp: <strong>+256 779 094664</strong>.</li>
              <li>Confirm in your dashboard by tapping "I have paid".</li>
            </ol>
          </div>
        </section>

        {/* SECTION: PLATFORM FEATURES */}
        <section id="features" className="space-y-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            5. Features & Interactions
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">❤️ Save Products</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tap the ❤️ icon on any product, or open a product and tap <strong>➕ &rarr; Save for later</strong>. <em>(Login required)</em></p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">💰 Make an Offer</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Open a product, tap <strong>➕ &rarr; Make Offer</strong>, enter your price and send.</p>
            </div>

            <div className="sm:col-span-2">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">🏆 Official Store</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">We connect buyers directly to verified sellers. Enjoy COD, trusted local businesses, genuine listings, and affordable prices with no hidden charges.</p>
            </div>
          </div>
        </section>

        {/* SECTION: BEST PRACTICES */}
        <section id="tips" className="grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              6. How to Sell Fast
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">To get more orders:</p>
            <ul className="list-disc ml-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Use clear, bright images</li>
              <li>Price competitively</li>
              <li>Reply quickly to customers</li>
              <li>Use Boost (UGX 1,000)</li>
              <li>Post trending items (phones, fashion, perfumes)</li>
            </ul>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 rounded text-sm border border-amber-100 dark:border-amber-900/50">
              💡 <strong>Tip:</strong> First 5 products are very important — make them strong.
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              7. How to Find Best Deals
            </h2>
            <ul className="list-disc ml-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Check "Hot Deals" section</li>
              <li>Look for 🔥 Trending or Discount tags</li>
              <li>Use "Make Offer" to negotiate prices</li>
              <li>Visit daily for new listings</li>
            </ul>
          </div>
        </section>

        {/* SECTION: WHY OWEITU SHOP & CONTACT */}
        <section id="about" className="space-y-8">
          <div className="bg-slate-50 dark:bg-[#111] p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              ⚡ Why Oweitu Shop?
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">✔ No shop needed — sell from anywhere</li>
              <li className="flex items-center gap-2">✔ Reach real buyers in Ankole & Kigezi</li>
              <li className="flex items-center gap-2">✔ Fast ordering system</li>
              <li className="flex items-center gap-2">✔ Cash on Delivery (COD)</li>
              <li className="flex items-center gap-2">✔ Affordable promotion tools</li>
              <li className="flex items-center gap-2">✔ Built for local sellers & buyers</li>
              <li className="flex items-center gap-2">✔ Simple, mobile-friendly platform</li>
            </ul>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              🚚 Delivery & Support
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-300 mb-2">Delivery Information</h3>
                <p>Same-day delivery available.</p>
                <p>Applies for orders between 6:00 AM – 3:00 PM.</p>
                <p>Delivery arranged after order confirmation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-300 mb-2">Contact Us</h3>
                <p>📍 Ankole & Kigezi, Uganda</p>
                <p>📞 WhatsApp: <a href="https://wa.me/256779094664" className="text-[#FF6A00] hover:underline">+256 779 094664</a></p>
                <p>📧 support@oweitushop.com</p>
                <p>🕒 24/7 Support available</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 italic">For quick help, onboarding, or issues — contact us directly on WhatsApp.</p>
          </div>

          {/* SUMMARY BLOCK */}
          <div className="bg-[#FF6A00] text-white p-6 rounded-lg text-center shadow-md">
            <h2 className="text-xl font-bold mb-2">🟢 Summary</h2>
            <p className="font-medium text-orange-50">Oweitu Shop is your Marketplace, Selling platform, Buying hub, and Business growth tool.</p>
            <p className="mt-2 text-sm text-orange-100 font-semibold uppercase tracking-wider">We make local buying and selling simple, fast, and trusted.</p>
          </div>
        </section>

      </main>
    </div>
  );
}
