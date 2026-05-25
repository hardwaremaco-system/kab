import Link from "next/link";

export default function PromoHero() {
  return (
    <div className="w-full bg-[#5D3FD3] rounded-xl overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-10 text-white min-h-[250px]">
      <div className="flex-1 mb-6 md:mb-0 z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Shop the world. Ship for free.</h2>
        <p className="text-lg text-purple-100 mb-6">
          Discover international finds with free shipping included.
        </p>
        <Link href="/global-deals" className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition inline-block">
          Shop now
        </Link>
      </div>
      <div className="flex-1 flex justify-end gap-2 relative w-full h-full">
        {/* You can drop absolute positioned product images here to mimic the collage on the right side of the eBay banner */}
      </div>
    </div>
  );
}
