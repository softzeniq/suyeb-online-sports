"use client";
import { BestSellers } from "@/components/main/home/BestSellers";
import { FeaturedCategories } from "@/components/main/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/main/home/FeaturedProducts";
import { HeroSlider } from "@/components/main/home/HeroSlider";

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
            <h2 className="text-2xl md:text-3xl font-bold">
              {section.title || "New Arrivals"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {section.subtitle || "Fresh styles just landed"}
            </p>
          </div>
          <Link
            href="/products?filter=new"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="product-grid">
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
  return (
    <>
      {sections.map((section) => {
        if (section.section_type === "new_arrivals") {
          return <NewArrivalsSection key={section.id} section={section} />;
        }
        const Component = SECTION_COMPONENTS[section.section_type];
        if (Component) return <Component key={section.id} section={section} />;
        return null;
      })}
    </>
  );
}
