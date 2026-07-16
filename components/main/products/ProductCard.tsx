"use client";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Category, Product } from "@/hooks/useShopData";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product & { category?: Category | null };
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, formatCurrency } = useSiteSettings();

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.sale_price! / product.price) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-md border border-border/60 flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:border-border">
      <Link href={`/product/${product.slug}`} className="block h-full">
        {/* Image wrapper with padding */}
        <div className="">
          <div className="relative aspect-square overflow-hidden bg-secondary/50">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              height={320}
              width={320}
              loading="lazy"
            />

            {/* Badges */}
            {product.is_new && (
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="bg-accent text-accent-foreground px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded">
                  {t("product.new") || "New"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 flex flex-col justify-between">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2.5 group-hover:text-accent transition-colors leading-snug min-h-[2.5rem] overflow-hidden text-ellipsis text-foreground/90">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-auto flex-wrap">
            {hasDiscount ? (
              <>
                <span className="font-bold text-accent text-base">
                  {formatCurrency(product.sale_price!)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="bg-destructive/10 text-destructive px-1.5 py-0.5 rounded text-[10px] font-bold">
                  -{discountPercent}%
                </span>
              </>
            ) : (
              <span className="font-bold text-base text-foreground">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
