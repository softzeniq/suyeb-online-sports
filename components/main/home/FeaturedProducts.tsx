"use client";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useFeaturedProducts } from "@/hooks/useShopData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "../products/ProductCard";

export function FeaturedProducts() {
  const { data: products = [], isLoading } = useFeaturedProducts();
  const { t } = useSiteSettings();
  const { ref, isVisible } = useScrollReveal();

  if (isLoading) {
    return (
      <section className="section-padding bg-secondary/50">
        <div className="container-shop">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl md:text-2xl">
                {t("home.featuredProducts")}
              </h2>
            </div>
          </div>
          <div className="product-grid">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-product rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="section-padding bg-secondary/50" ref={ref}>
      <div className="container-shop">
        <div
          className={`flex items-center justify-between mb-8 reveal-left ${isVisible ? "reveal-visible" : ""}`}
        >
          <div>
            <h2 className="text-xl md:text-2xl">
              {t("home.featuredProducts")}
            </h2>
          </div>
          <Link
            href="/shop?filter=featured"
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-accent hover:underline"
          >
            {t("common.viewAll") || "View All"} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="product-grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-3">
          {products.slice(0, 10).map((product, index) => (
            <div
              key={product.id}
              className={`reveal-base stagger-${index + 1} ${isVisible ? "reveal-visible" : ""}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="flex sm:hidden justify-center mt-6">
          <Link
            href="/shop?filter=featured"
            className="w-full text-center py-2.5 px-5 border border-accent text-accent font-semibold rounded-xl text-sm transition-all duration-300 hover:bg-accent hover:text-white"
          >
            {t("common.viewAll") || "View All"}
          </Link>
        </div>
      </div>
    </section>
  );
}
