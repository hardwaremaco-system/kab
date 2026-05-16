import { MessageSquare, Layers, ShieldCheck } from "lucide-react";

export default function ExperienceBanner() {
  const features = [
    {
      // Using fill="currentColor" makes the outline icons look solid like the screenshot
      icon: <MessageSquare className="text-[#0a0a0a]" size={28} fill="currentColor" />,
      title: "Quick and Friendly Support",
      desc: "Our support team responds quickly and is friendly, ensuring your experience is efficient and pleasant. We prioritize your needs and assist you every step."
    },
    {
      icon: <Layers className="text-[#0a0a0a]" size={28} fill="currentColor" />,
      title: "New Collection Everyday",
      desc: "Explore our new collection launched daily! Each piece is carefully selected to add a fresh twist to your lifestyle. Stay tuned for updates and find something special."
    },
    {
      icon: <ShieldCheck className="text-[#0a0a0a]" size={28} fill="currentColor" />,
      title: "Satisfaction Guaranteed",
      desc: "We guarantee your satisfaction with our products and support team. Your experience is our priority, and we're here to assist you."
    }
  ];

  return (
    // Hardcoded dark background to match the screenshot's vibe regardless of light/dark mode
    <div className="w-full bg-[#111111] rounded-2xl p-8 sm:p-12 md:p-16 border border-slate-800 shadow-xl">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-4 sm:mb-6 leading-tight">
          We Deliver Customer<br className="hidden sm:block" /> Experiences
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          We are committed to delivering exceptional customer experiences that
          exceed expectations and make every interaction memorable.
        </p>
      </div>

      {/* 3-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            
            {/* White Circular Icon Background */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg transform transition-transform hover:scale-105 duration-300">
              {feature.icon}
            </div>
            
            {/* Feature Title */}
            <h4 className="font-bold text-white text-sm sm:text-base uppercase tracking-widest mb-4">
              {feature.title}
            </h4>
            
            {/* Feature Description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-[280px]">
              {feature.desc}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}
