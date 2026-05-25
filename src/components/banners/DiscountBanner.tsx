import Link from "next/link";

export default function DiscountBanner() {
  return (
    <div className="w-full bg-[#003366] rounded-xl overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-8 text-white">
      <div className="flex-1 mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Unlock 20% across your picks</h2>
        <p className="text-blue-200 mb-4">
          Save on tech, accessories and more for a limited time.
        </p>
        <Link href="/coupons" className="bg-white text-[#003366] px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition inline-block">
          Get the coupon
        </Link>
      </div>
    </div>
  );
}
