import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "What is Mbarara Online?",
      a: "Mbarara Online is a digital marketplace connecting buyers and sellers across Mbarara City. It allows students, residents, and local vendors to buy, sell, and discover both used and brand-new products within the local community."
    },
    {
      q: "Can I sell both used and new items?",
      a: "Yes. Whether you are clearing out second-hand electronics, household items, or running a shop with brand-new inventory, Mbarara Online supports listings for both used and new products."
    },
    {
      q: "Is delivery free?",
      a: "Delivery arrangements are agreed upon directly between the buyer and seller. We recommend meeting at central spots in Mbarara City, university campuses (e.g., MUST), or well-lit public areas for convenience and safety."
    },
    {
      q: "How do I pay?",
      a: "We strongly recommend Cash on Delivery (COD). Always meet in person, inspect the product carefully to verify its condition (especially for used items), and only pay once satisfied. Avoid sending Mobile Money in advance."
    },
    {
      q: "How do I post an item for sale?",
      a: "Create an account, click 'Sell Now', upload clear photos of your item, write a detailed description indicating if it is new or used, set your price, and publish."
    },
    {
      q: "Can I advertise services, hostels, or rental rooms?",
      a: "Yes. Landlords, property managers, and service providers can list available rentals and services with pricing and contact details to connect directly with students and local residents."
    },
    {
      q: "Is Mbarara Online involved in payments or transactions?",
      a: "No. Mbarara Online directly connects local buyers and sellers. We do not handle payments, deliveries, or escrow. All agreements and transactions happen directly between the two parties."
    },
    {
      q: "How do I stay safe while buying or selling?",
      a: "Always meet in busy public locations in Mbarara, avoid paying in advance, thoroughly inspect used or refurbished items before paying, and report any suspicious listings immediately."
    },
    {
      q: "Are there fees for posting?",
      a: "Basic listings are completely free. Optional promotional features (like Homepage Highlights and Featured Ads) are available for sellers seeking faster visibility."
    },
    {
      q: "Who can use Mbarara Online?",
      a: "Anyone living, studying, or doing business in Mbarara City and neighboring areas — university students, shop owners, independent sellers, and residents — can trade on the platform."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-black mb-4 text-slate-900">
        Frequently Asked Questions
      </h1>

      <p className="text-slate-600 mb-10 text-lg">
        Everything you need to know about buying and selling safely on Mbarara Online.
      </p>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-lg mb-2 text-slate-900">
              {f.q}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {f.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-50 border border-slate-200 p-8 rounded-2xl">
        <h3 className="font-bold text-slate-900 mb-2">
          Still Have Questions?
        </h3>
        <p className="text-slate-600 mb-4">
          If your question isn’t listed here, feel free to reach out directly.
          We're here to help keep Mbarara's local commerce safe and smooth.
        </p>
        <Link 
          href="/contact" 
          className="inline-block px-6 py-3 bg-[#FF6A00] text-white rounded-xl font-bold hover:bg-[#e65c00] shadow-sm transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
