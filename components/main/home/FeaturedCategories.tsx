"use client";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCategories } from "@/hooks/useShopData";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedCategories() {
  const { data: categories = [], isLoading } = useCategories();
  const { t } = useSiteSettings();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  // Split categories for 2 independent scrolling rows on mobile
  const midIndex = Math.ceil(categories.length / 2);
  const mobileRow1 = categories.slice(0, midIndex);
  const mobileRow2 = categories.slice(midIndex);

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container-shop">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-3xl tracking-tight">
              {t("home.shopByCategory") || "Categories"}
            </h2>
          </div>
          {/* Desktop Loading Skeleton */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 bg-border gap-[1px] border border-border rounded-xl overflow-hidden shadow-sm animate-pulse">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="bg-background p-4 flex flex-col items-center justify-center gap-3 aspect-[5/6]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-md" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            ))}
          </div>
          {/* Mobile Loading Skeleton */}
          <div className="flex md:hidden flex-col gap-3">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-24 bg-muted/20 border border-border rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square"
                >
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="h-3 w-12 bg-muted rounded" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-24 bg-muted/20 border border-border rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square"
                >
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="h-3 w-12 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" ref={sectionRef}>
      <div className="container-shop">
        <div
          className={`flex items-center justify-between mb-8 reveal-left ${isVisible ? "reveal-visible" : ""}`}
        >
          <div>
            <h2 className="text-xl md:text-2xl tracking-tight">
              {t("home.shopByCategory") || "Categories"}
            </h2>
          </div>
          <Link
            href="/categories"
            className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop View: 16-Grid Table-like Border Layout */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 bg-border gap-[1px] border border-border rounded-xl overflow-hidden shadow-sm">
          {categories.slice(0, 16).map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`group bg-background p-4 flex flex-col items-center justify-center gap-4 aspect-[5/6] transition-all duration-300 hover:bg-muted/30 reveal-scale stagger-${index + 1} ${isVisible ? "reveal-visible" : ""
                }`}
            >
              {/* Category Image Box */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 select-none">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain rounded-md"
                  sizes="(max-width: 768px) 80px, 120px"
                />
              </div>

              {/* Category Name */}
              <span className="text-xs md:text-sm font-semibold tracking-tight text-center text-foreground/95 group-hover:text-accent transition-colors line-clamp-2 px-1 max-w-[95%]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile View: 2-Row Independent Horizontal Scroll Slide */}
        <div className="flex md:hidden flex-col gap-3">
          {/* Row 1 */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth w-full select-none">
            {mobileRow1.map((category, index) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex-shrink-0 w-24 bg-background border border-border/80 rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square snap-start shadow-sm active:scale-95 transition-all duration-300 hover:border-accent/30 reveal-scale stagger-${index + 1} ${isVisible ? "reveal-visible" : ""
                  }`}
              >
                {/* Image Box */}
                <div className="relative w-10 h-10 flex items-center justify-center select-none">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain rounded-md"
                    sizes="40px"
                  />
                </div>

                {/* Name */}
                <span className="text-[10px] font-bold tracking-tight text-center text-foreground/90 line-clamp-2 px-0.5 leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth w-full select-none">
            {mobileRow2.map((category, index) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex-shrink-0 w-24 bg-background border border-border/80 rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square snap-start shadow-sm active:scale-95 transition-all duration-300 hover:border-accent/30 reveal-scale stagger-${index + 1} ${isVisible ? "reveal-visible" : ""
                  }`}
              >
                {/* Image Box */}
                <div className="relative w-10 h-10 flex items-center justify-center select-none">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain rounded-md"
                    sizes="40px"
                  />
                </div>

                {/* Name */}
                <span className="text-[10px] font-bold tracking-tight text-center text-foreground/90 line-clamp-2 px-0.5 leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
