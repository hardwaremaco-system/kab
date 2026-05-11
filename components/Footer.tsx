"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok
} from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith("/admin")) return null;

  const isActive = (path: string) => pathname === path;

  // Adapted active logic for the new dark theme
  const getLinkStyle = (path: string) => 
    `transition-colors block ${
      isActive(path) ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
    }`;

  return (
    <footer className="bg-[#182335] text-white rounded-t-[2.5rem] mt-auto pb-16 pt-12 md:pt-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* ================================================= */}
        {/* TOP SECTION: LOGO, TITLE, & NEWSLETTER            */}
        {/* ================================================= */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          
          {/* Custom KABALE Rectangle Logo */}
          <div className="border-2 border-white px-4 py-1 mb-6 flex items-center justify-center rounded-sm">
            <span className="font-bold tracking-[0.2em] text-lg uppercase">Kabale</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            Kabale Online Marketplace
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-8">
            Precision Shopping & Same Day Delivery
          </p>

          {/* Newsletter Form */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Join Our Newsletter"
              className="flex-1 w-full bg-white text-slate-900 px-5 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C3D5A]"
            />
            <button className="w-full sm:w-auto bg-[#26354D] hover:bg-[#2C3D5A] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
              Join Our Newsletter
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM SECTION: 4 COLUMNS GRID                    */}
        {/* ================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Contact</h3>
            <div className="space-y-1 text-sm text-gray-300 mb-6">
              <p>Kabale, Uganda</p>
              <p>075 999 7376</p>
              <p>shopkabale@gmail.com</p>
            </div>
            
            {/* Social Icons (White square style from image) */}
            <div className="flex gap-2">
              <a href="https://www.fb.com/l/6lp1kJRRR" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-[#182335] rounded flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="https://instagram.com/kabale.online" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-[#182335] rounded flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://tiktok.com/@kabale.online" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-[#182335] rounded flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="TikTok">
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profile" className={getLinkStyle('/profile')}>My Profile</Link></li>
              <li><Link href="/invite" className={getLinkStyle('/invite')}>Refer & Earn</Link></li>
              <li><Link href="/sell" className={getLinkStyle('/sell')}>Sell on Kabale</Link></li>
              <li><Link href="/requests" className={getLinkStyle('/requests')}>Buyer Requests</Link></li>
              <li>
                <Link href="/ai" className={`${getLinkStyle('/ai')} flex items-center gap-1.5`}>
                  AI Shopping Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/mega-bundles" className={getLinkStyle('/category/mega-bundles')}>Mega Bundles</Link></li>
              <li><Link href="/category/campus-life" className={getLinkStyle('/category/campus-life')}>Campus Life</Link></li>
              <li><Link href="/category/tech-appliances" className={getLinkStyle('/category/tech-appliances')}>Tech & Gadgets</Link></li>
              <li><Link href="/category/food-groceries" className={getLinkStyle('/category/food-groceries')}>Farm Fresh</Link></li>
              <li><Link href="/category/beauty-fashion" className={getLinkStyle('/category/beauty-fashion')}>Beauty & Fashion</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guide" className={getLinkStyle('/guide')}>Need Help? / Docs</Link></li>
              <li><Link href="#" className={getLinkStyle('#')}>Shipping & Returns</Link></li>
              <li><Link href="#" className={getLinkStyle('#')}>Track Order</Link></li>
              <li><Link href="#" className={getLinkStyle('#')}>Terms of Service</Link></li>
              <li><Link href="#" className={getLinkStyle('#')}>Privacy Policy</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
