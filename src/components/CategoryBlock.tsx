import Link from 'next/link';

interface CategoryItem {
  name: string;
  image: string;
  href: string;
}

export default function CategoryBlock({ items }: { items: CategoryItem[] }) {
  return (
    <div className="flex overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
      {items.map((item, i) => (
        <Link 
          href={item.href} 
          key={i} 
          className="min-w-[120px] md:min-w-0 snap-start bg-gray-50 dark:bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col items-center p-4 hover:shadow-md transition duration-200"
        >
          <div className="relative w-20 h-20 mb-3 bg-transparent">
            {/* Replace img with next/image if you prefer */}
            <img src={item.image} alt={item.name} className="object-contain w-full h-full drop-shadow-sm" />
          </div>
          <span className="text-sm font-medium text-center text-gray-800 dark:text-gray-200">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
