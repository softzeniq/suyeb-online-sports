"use client";
import React from "react";
import { BestSellers } from "@/components/main/home/BestSellers";
import { FeaturedCategories } from "@/components/main/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/main/home/FeaturedProducts";
import { HeroSlider } from "@/components/main/home/HeroSlider";
import { CustomerReviews } from "@/components/main/home/CustomerReviews";
import { TrustBadges } from "@/components/main/home/TrustBadges";
import { PromoBanners } from "@/components/main/home/PromoBanners";
import { PromoOffers } from "@/components/main/home/PromoOffers";

import { ProductCard } from "@/components/main/products/ProductCard";
import { HomepageSection } from "@/hooks/useHomePageTemplates";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useNewArrivals } from "@/hooks/useShopData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SECTION_COMPONENTS: Record<
  string,
  React.ComponentType<{ section: HomepageSection }>
> = {
  hero_slider: () => <HeroSlider />,
  featured_categories: () => <FeaturedCategories />,
  featured_products: () => <FeaturedProducts />,
  best_sellers: () => <BestSellers />,
  customer_reviews: () => <CustomerReviews />,
};

function NewArrivalsSection({ section }: { section: HomepageSection }) {
  const { data: newArrivals = [] } = useNewArrivals();
  const { ref, isVisible } = useScrollReveal();

  if (newArrivals.length === 0) return null;

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-shop">
        <div
          className={`flex items-center justify-between mb-8 reveal-left ${isVisible ? "reveal-visible" : ""}`}
        >
          <div>
            <h2 className="text-xl md:text-2xl">
              {section.title || "New Arrivals"}
            </h2>
          </div>
          <Link
            href="/products?filter=new"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="product-grid product-grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3">
          {newArrivals.map((product, index) => (
            <div
              key={product.id}
              className={`reveal-base stagger-${index + 1} ${isVisible ? "reveal-visible" : ""}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DefaultHomepage({ sections }: { sections: HomepageSection[] }) {
  // Only allow specified sections and prevent duplicates
  const seen = new Set<string>();
  const allowedSections = sections.filter((section) => {
    const allowedTypes = [
      "hero_slider",
      "featured_categories",
      "featured_products",
      "new_arrivals",
      "best_sellers",
      "customer_reviews",
    ];
    if (!allowedTypes.includes(section.section_type)) return false;
    if (seen.has(section.section_type)) return false;
    seen.add(section.section_type);
    return true;
  });

  return (
    <>
      {allowedSections.map((section) => {
        let content: React.ReactNode = null;
        if (section.section_type === "new_arrivals") {
          content = <NewArrivalsSection key={section.id} section={section} />;
        } else {
          const Component = SECTION_COMPONENTS[section.section_type];
          if (Component) {
            content = <Component key={section.id} section={section} />;
          }
        }

        return (
          <React.Fragment key={section.id}>
            {section.section_type === "customer_reviews" && (
              <PromoOffers />
            )}
            {content}
            {section.section_type === "hero_slider" && <TrustBadges />}
            {section.section_type === "featured_products" && (
              <PromoBanners settings={section.settings_json} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
