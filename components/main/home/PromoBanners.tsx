"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PromoBannersProps {
  settings?: any;
}

export function PromoBanners({ settings }: PromoBannersProps) {
  const { ref, isVisible } = useScrollReveal();

  const b1_badge = settings?.banner1_badge || "Limited Time Offer";
  const b1_title = settings?.banner1_title || "Premium Sports & Fitness Gear";
  const b1_desc = settings?.banner1_desc || "Elevate your workouts with our top-tier collection of high-performance gear.";
  const b1_discount = settings?.banner1_discount || "Up to 35% OFF";
  const b1_link = settings?.banner1_link || "/products";

  const b2_badge = settings?.banner2_badge || "New Arrivals";
  const b2_title = settings?.banner2_title || "Next-Gen Athletic Sneakers";
  const b2_desc = settings?.banner2_desc || "Engineered for maximum velocity, cushion, and endless comfort.";
  const b2_discount = settings?.banner2_discount || "Run Fast";
  const b2_link = settings?.banner2_link || "/products";

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-shop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div
            className={`relative overflow-hidden rounded-[0.5rem] bg-gradient-to-br from-emerald-950 via-teal-950 to-stone-955 border border-white/5 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 min-h-[160px] md:min-h-[180px] shadow-lg group hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 reveal-left ${isVisible ? "reveal-visible" : ""
              }`}
          >
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Glowing Accent Backdrops */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/20 rounded-full blur-[70px] group-hover:scale-125 group-hover:bg-accent/30 transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[70px] group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />

            <div className="space-y-2 max-w-[85%] sm:max-w-[65%] z-10">
              <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-[9px] font-bold text-accent tracking-wider uppercase select-none">
                {b1_badge}
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
                {b1_title}
              </h3>
              <p className="text-xs text-slate-300 leading-normal line-clamp-1 max-w-[95%]">
                {b1_desc}
              </p>
            </div>

            <div className="z-10 mt-4 sm:mt-0 flex flex-col sm:items-end justify-center gap-3 shrink-0">
              <span className="text-xl md:text-2xl font-black tracking-tight text-white leading-none">
                {b1_discount}
              </span>
              <Link
                href={b1_link}
                className="group/btn inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 border border-white/10 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-lg hover:shadow-accent/20 px-4 py-2.5 rounded-xl transition-all duration-300 select-none backdrop-blur-md"
              >
                Shop Now{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Banner 2 */}
          <div
            className={`relative overflow-hidden rounded-[0.5rem] bg-gradient-to-br from-stone-950 via-purple-955 to-zinc-950 border border-white/5 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 min-h-[160px] md:min-h-[180px] shadow-lg group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/30 reveal-right ${isVisible ? "reveal-visible" : ""
              }`}
          >
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Glowing Accent Backdrops */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/20 rounded-full blur-[70px] group-hover:scale-125 group-hover:bg-purple-500/30 transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[70px] group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />

            <div className="space-y-2 max-w-[85%] sm:max-w-[65%] z-10">
              <span className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[9px] font-bold text-purple-400 tracking-wider uppercase select-none">
                {b2_badge}
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
                {b2_title}
              </h3>
              <p className="text-xs text-slate-300 leading-normal line-clamp-1 max-w-[95%]">
                {b2_desc}
              </p>
            </div>

            <div className="z-10 mt-4 sm:mt-0 flex flex-col sm:items-end justify-center gap-3 shrink-0">
              <span className="text-xl md:text-2xl font-black tracking-tight text-white leading-none">
                {b2_discount}
              </span>
              <Link
                href={b2_link}
                className="group/btn inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 border border-white/10 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 px-4 py-2.5 rounded-xl transition-all duration-300 select-none backdrop-blur-md"
              >
                Explore Now{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
