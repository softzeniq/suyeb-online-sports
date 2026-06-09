"use client";
import { useSiteSettings } from "@/contexts/SiteSettingContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCategories } from "@/hooks/useShopData";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedCategories() {
  const { data: categories = [], isLoading } = useCategories();
  const { t } = useSiteSettings();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container-shop">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {t("home.shopByCategory")}
              </h2>
              <p className="text-muted-foreground mt-1">
                Find what you're looking for
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-muted animate-pulse"
              />
            ))}
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
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("home.shopByCategory")}
            </h2>
            <p className="text-muted-foreground mt-1">
              Find what you're looking for
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`category-card group reveal-scale stagger-${index + 1} ${isVisible ? "reveal-visible" : ""}`}
            >
              <Image
                src={category.image}
                alt={category.name}
                height={400}
                width={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="category-card-content">
                <h3 className="text-lg md:text-xl font-semibold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/categories"
          className="mt-6 flex sm:hidden items-center justify-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          {t("common.viewAll")} {t("nav.categories")}{" "}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
