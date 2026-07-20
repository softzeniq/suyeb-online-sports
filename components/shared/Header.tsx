"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useStoreSettings } from "@/hooks/useStoreSettings";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useShopData";
import { ChevronDown, Menu, Search, ShoppingBasket, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const { totalItems } = useCart();
  const { t } = useSiteSettings();
  const { data: storeSettings } = useStoreSettings();
  const { data: categories = [] } = useCategories();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; slug: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const storeName = storeSettings?.store_name || "STORE";
  const storeLogo = storeSettings?.store_logo || "";

  const activeCategories = categories
    .filter((cat: any) => cat.is_active !== false)
    .slice(0, 8)
    .map((cat: any) => ({
      name: cat.name,
      href: `/categories/${cat.slug}`,
    }));

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    ...activeCategories,
    { name: "Track Order", href: "/track-order" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParts = [];
    if (searchVal.trim()) {
      queryParts.push(`search=${encodeURIComponent(searchVal.trim())}`);
    }
    if (selectedCategory) {
      queryParts.push(`category=${encodeURIComponent(selectedCategory.slug)}`);
    }
    if (queryParts.length > 0) {
      router.push(`/shop?${queryParts.join("&")}`);
      setSearchVal("");
      setSelectedCategory(null);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-background border-b border-border/10 ${isScrolled ? "shadow-md" : ""
        }`}
    >
      {/* Row 1: Logo, Wide Search Bar, Right Side Actions */}
      <div
        className={`w-full transition-all duration-300 ${isScrolled ? "py-2" : "py-3"
          }`}
      >
        <div className="container-shop">
          <div className="flex items-center justify-between gap-4 md:gap-8">

            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Mobile menu trigger */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-muted/70 rounded-full transition-colors"
                  >
                    <Menu className="h-5.5 w-5.5" />
                    <span className="sr-only">{t("nav.openMenu")}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background/95 backdrop-blur-md p-6">
                  <div className="flex flex-col h-full justify-between py-6">
                    <div>
                      <div className="mb-8">
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent tracking-tight">
                          {storeName}
                        </span>
                      </div>
                      <nav className="flex flex-col gap-5">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`text-lg font-bold tracking-wide transition-all duration-200 py-1 hover:pl-2 hover:text-accent border-l-2 border-transparent hover:border-accent ${pathname === item.href ? "text-accent pl-2 border-accent" : "text-foreground"
                              }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </nav>
                    </div>

                    <div className="border-t border-border/60 pt-6">
                      <Link
                        href={user ? "/admin" : "/admin/login"}
                        className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <User className="h-5 w-5" />
                        {user ? t("nav.adminPanel") : "Login"}
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link href="/" className="flex items-center group">
                {storeLogo ? (
                  <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={storeLogo}
                      alt={storeName}
                      height={44}
                      width={150}
                      className="h-8 md:h-9 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-xl md:text-2xl font-black tracking-tight text-foreground transition-all duration-300">
                    {storeName}
                  </span>
                )}
              </Link>
            </div>

            {/* Centered Wide Search Bar (Desktop) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center flex-1 max-w-xl border border-border/80 rounded-md bg-background overflow-hidden relative"
            >
              {/* Category Dropdown Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors shrink-0 outline-none border-none select-none"
                  >
                    <span className="truncate max-w-[100px]">
                      {selectedCategory ? selectedCategory.name : "All Categories"}
                    </span>
                    <ChevronDown className="h-3 w-3 shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 max-h-60 overflow-y-auto bg-popover border border-border rounded-lg shadow-md z-50 p-1">
                  <DropdownMenuItem
                    onClick={() => setSelectedCategory(null)}
                    className="rounded-md cursor-pointer transition-colors px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((cat: any) => (
                    <DropdownMenuItem
                      key={cat.id}
                      onClick={() => setSelectedCategory({ name: cat.name, slug: cat.slug })}
                      className="rounded-md cursor-pointer transition-colors px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                    >
                      {cat.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Vertical Separator */}
              <span className="h-6 w-[1px] bg-border/80 shrink-0" />

              <input
                type="search"
                placeholder={t("nav.searchProducts")}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full py-2 pl-3 pr-10 text-sm bg-transparent outline-none border-none placeholder-muted-foreground"
              />
              {searchVal && (
                <button
                  type="button"
                  onClick={() => setSearchVal("")}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-accent text-accent-foreground p-2.5 px-5 hover:bg-accent/90 transition-colors flex items-center justify-center shrink-0 border-l border-border/10"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Right Actions & Account Status Info */}
            <div className="flex items-center gap-4 md:gap-6 justify-end shrink-0 select-none">

              {/* Shopping Basket Icon (Raw) */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center h-9 w-9 text-foreground hover:text-accent transition-colors shrink-0"
              >
                <ShoppingBasket className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground shadow-md animate-bounce">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">{t("common.cart")}</span>
              </Link>

              {/* Account sub-info card (matching reference image exactly) */}
              <Link
                href={user ? "/admin" : "/admin/login"}
                className="flex items-center gap-2 hover:text-accent transition-colors group shrink-0"
              >
                <User className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
                <div className="flex flex-col text-left">
                  <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                    Account
                  </span>
                  <span className="text-[10px] font-medium text-accent leading-tight">
                    {user ? t("nav.adminPanel") : "Register or Login"}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Search Input sub-row (always visible on mobile viewports) */}
          <div className="md:hidden mt-3 border-t border-border/30 pt-3">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder={t("nav.searchProducts")}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full py-2 pl-10 pr-10 rounded-full bg-muted/40 border border-border/40 focus:border-accent text-sm outline-none focus:bg-background transition-all duration-200"
              />
              {searchVal && (
                <button
                  type="button"
                  onClick={() => setSearchVal("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Row 2: Navigation Categories Row (Desktop Only) - Smooth collapse/expand on scroll */}
      <div
        className={`hidden md:block border-t border-border/35 bg-background select-none transition-all duration-300 ease-in-out ${isScrolled
          ? "max-h-0 opacity-0 overflow-hidden border-t-0 py-0"
          : "max-h-12 opacity-100 py-1.5"
          }`}
      >
        <div className="container-shop flex items-center justify-start gap-1 flex-wrap">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`py-1.5 px-4 text-[15px] font-semibod transition-all duration-300 rounded-[4px] flex items-center gap-1 shrink-0 ${isActive
                  ? "bg-accent text-accent-foreground font-bold shadow-sm"
                  : "text-foreground hover:text-accent"
                  }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="h-3 w-3 shrink-0" />}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

