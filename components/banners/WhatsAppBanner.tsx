import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#075E54] dark:bg-[#054c44] border border-[#128C7E]/30 shadow-md">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 gap-6">
        
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
            <MessageCircle size={32} className="text-white" fill="currentColor" />
          </div>
          <div className="text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Shop via WhatsApp
            </h3>
            <p className="text-green-100 text-sm sm:text-base max-w-sm">
              Prefer chatting? Send us your order or ask for recommendations instantly. Automated and fast.
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto flex-shrink-0 mt-2 md:mt-0">
          <Link 
            href="https://wa.me/256700000000" // Replace with your actual business number
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-3.5 rounded-xl font-bold transition-transform active:scale-95 shadow-md"
          >
            <MessageCircle size={20} />
            Chat with us
          </Link>
        </div>

      </div>
    </div>
  );
}
