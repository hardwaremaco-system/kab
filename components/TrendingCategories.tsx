import Link from "next/link";
import Image from "next/image";
import { optimizeImage } from "@/lib/utils";

export default function TrendingCategories({ products }: { products: any[] }) {
  // Only take the first 6 products to perfectly fill the 3x2 or 6x1 grid
  const displayProducts = products?.slice(0, 6) || [];

  if (displayProducts.length === 0) return null;

  return (
    <section className="w-full max-w-[1400px] mx-auto bg-transparent mb-12 px-4 sm:px-6">

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white mb-4 sm:mb-6 tracking-tight">
        Trending on Kabale Online
      </h2>

      {/* Responsive Grid: 3 columns to match the reference image perfectly */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-6 w-full">
        {displayProducts.map((product, index) => {
          const optimizedImage = product.images?.[0] ? optimizeImage(product.images[0]) : null;
          const titleStr = product.title || product.name || 'Product';

          return (
            <Link 
              key={product.id || index} 
              href={`/product/${product.publicId || product.id}`} 
              className="group flex flex-col items-start outline-none"
            >
              {/* Light gray rounded square for the image */}
              <div className="w-full aspect-square rounded-2xl bg-[#F6F6F6] dark:bg-slate-800 flex items-center justify-center mb-2 sm:mb-3 transition-transform duration-300 group-hover:bg-gray-200 dark:group-hover:bg-slate-700 relative overflow-hidden">
                {optimizedImage ? (
                  <Image 
                    src={optimizedImage} 
                    alt={titleStr}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-contain p-3 sm:p-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No Image</span>
                )}
              </div>

              {/* Product Text below the image container */}
              <span className="text-xs sm:text-sm md:text-base text-[#1A1A1A] dark:text-slate-200 font-medium leading-tight group-hover:underline decoration-2 underline-offset-2 line-clamp-2">
                {titleStr}
              </span>
            </Link>
          )
        })}
      </div>

    </section>
  );
}
