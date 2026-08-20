export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-black mb-6 text-slate-900">
        About Mbarara Online 
      </h1>

      <div className="prose prose-slate lg:prose-lg">
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Mbarara Online is the premier digital marketplace for Mbarara City. We connect 
          <strong> University students</strong>, local <strong>retailers</strong>, 
          independent <strong>sellers</strong>, and everyday residents in one 
          trusted online space to trade both used and brand-new products.
        </p>

        <h2 className="font-bold text-2xl mb-4 text-slate-900">
          Our Mission
        </h2>
        <p className="mb-6">
          Our mission is simple: make buying and selling used and new items in Mbarara City 
          easier, safer, and faster. Whether you're searching for affordable hostel furniture, 
          upgrading your smartphone, selling a second-hand laptop, or stocking up from verified 
          retail shops, Mbarara Online helps you transact directly with Cash on Delivery without 
          unnecessary middleman fees.
        </p>

        <h2 className="font-bold text-2xl mb-4 text-slate-900">
          Why We Built Mbarara Online
        </h2>
        <p className="mb-6">
          Mbarara City is a fast-growing commercial and academic hub teeming with students, 
          entrepreneurs, and vibrant businesses. Yet, discovering quality second-hand bargains 
          or finding reliable local sellers has often relied on scattered social media groups. 
          We created Mbarara Online to centralize local commerce into one reliable platform where 
          every deal is transparent and verified in person.
        </p>

        <div className="bg-amber-50 border border-amber-100 p-8 rounded-2xl mb-8">
          <h3 className="font-bold text-amber-900 mb-2 italic">
            "Built for Mbarara City. Powered by Community."
          </h3>
          <p className="text-amber-800 text-sm m-0">
            From a graduating student selling hostel appliances in Kakoba to a business 
            owner on High Street reaching customers across Mbarara — Mbarara Online exists 
            to keep trade local, secure, and accessible.
          </p>
        </div>

        <h2 className="font-bold text-2xl mb-4 text-slate-900">
          What You Can Do on Mbarara Online
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Buy and sell used and new electronics, phones, fashion, and furniture</li>
          <li>List and discover student hostel rentals and housing options</li>
          <li>Promote local retail inventory and commercial services</li>
          <li>Chat directly with buyers and arrange safe Cash-on-Delivery meetups</li>
          <li>Access exclusive flash deals and verified discounts across Mbarara City</li>
        </ul>

        <h2 className="font-bold text-2xl mb-4 text-slate-900">
          Our Values
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>
            <strong>Safety & Trust:</strong> We emphasize inspect-before-payment, 
            Cash-on-Delivery meetups to eliminate advance payment scams.
          </li>
          <li>
            <strong>Hyper-Local Focus:</strong> We prioritize commerce within Mbarara City 
            and surrounding university communities (MUST, BSU, etc.).
          </li>
          <li>
            <strong>Student & Seller Empowerment:</strong> We give student side-hustlers 
            and local merchants a free, high-visibility platform to sell inventory rapidly.
          </li>
          <li>
            <strong>Simplicity:</strong> A smooth, mobile-friendly interface designed for 
            instant buying and selling on any device.
          </li>
        </ul>

        <h2 className="font-bold text-2xl mb-4 text-slate-900">
          Our Vision
        </h2>
        <p>
          We envision a fully connected Mbarara where local commerce thrives seamlessly. 
          Mbarara Online is built to provide students, residents, and local merchants with 
          the ultimate tool for smart, secure local trade.
        </p>
      </div>
    </div>
  );
}
