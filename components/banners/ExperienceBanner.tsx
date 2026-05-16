import { MessageSquare, Layers, ShieldCheck } from "lucide-react";

export default function ExperienceBanner() {
  const features = [
    { icon: <MessageSquare size={24} fill="currentColor" />, title: "QUICK SUPPORT", desc: "Fast, friendly help whenever you need it." },
    { icon: <Layers size={24} fill="currentColor" />, title: "DAILY DROPS", desc: "Fresh electronics added to our catalog every day." },
    { icon: <ShieldCheck size={24} fill="currentColor" />, title: "GUARANTEED", desc: "100% satisfaction on all your orders." }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#111] rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
      <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-8">
        We Deliver Customer Experiences
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center mb-4 shadow-md border border-slate-100 dark:border-none hover:scale-105 transition-transform">
              {f.icon}
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-widest mb-2">{f.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[220px] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
