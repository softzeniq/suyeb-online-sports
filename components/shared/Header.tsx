"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useStoreSettings } from "@/hooks/useStoreSettings";
import { useAuth } from "@/hooks/useAuth";
import { Globe, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const { totalItems } = useCart();
  const { t, activeLanguage, setUserLanguagePreference } = useSiteSettings();
  const { data: storeSettings } = useStoreSettings();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  const [searchVal, setSearchVal] = useState("");
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

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.shop"), href: "/shop" },
    { name: t("nav.categories"), href: "/categories" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "bn", label: "বাংলা" },
    { code: "ar", label: "العربية" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "py-2.5 backdrop-blur-xl bg-background/80 shadow-lg border-b border-border/40" 
          : "py-4 md:py-5 bg-background border-b border-border/10"
      }`}
    >
      <div className="container-shop">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Side: Mobile Menu + Logo */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-muted/70 rounded-full transition-colors"
                >
                  <Menu className="h-6 w-6" />
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
                          key={item.href}
                          href={item.href}
                          className={`text-lg font-bold tracking-wide uppercase transition-all duration-200 py-1 hover:pl-2 hover:text-accent border-l-2 border-transparent hover:border-accent ${
                            pathname === item.href ? "text-accent pl-2 border-accent" : "text-foreground"
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
                    height={48}
                    width={48}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </div>
              ) : (
                <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent group-hover:to-accent/80 transition-all duration-300">
                  {storeName}
                </span>
              )}
            </Link>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sora shrink-0">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-semibold tracking-wider uppercase transition-colors hover:text-accent group ${
                  pathname === item.href ? "text-accent" : "text-foreground/90"
                }`}
              >
                <span>{item.name}</span>
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-accent transition-all duration-300 rounded-full ${
                    pathname === item.href ? "w-6" : "w-0 group-hover:w-4"
                  }`} 
                />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions & Permanent Search Input */}
          <div className="flex items-center gap-1.5 md:gap-2.5 flex-1 md:flex-none justify-end">
            
            {/* Desktop Permanent Search Bar */}
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative hidden md:flex items-center w-48 lg:w-72"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder={t("nav.searchProducts")}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full py-1.5 pl-10 pr-9 rounded-full bg-muted/40 hover:bg-muted/60 border border-border/40 focus:border-accent focus:bg-background text-sm outline-none transition-all duration-200"
              />
              {searchVal && (
                <button
                  type="button"
                  onClick={() => setSearchVal("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </form>

            <span className="hidden md:inline-block w-[1px] h-6 bg-border/40 mx-1 shrink-0" />

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full flex items-center justify-center bg-muted/40 hover:bg-accent/10 hover:text-accent border border-border/40 hover:border-accent/20 transition-all duration-300 active:scale-90 h-9 w-9 md:h-10 md:w-10 shadow-sm shrink-0"
                >
                  <Globe className="h-4 w-4 md:h-4.5 md:w-4.5" />
                  <span className="sr-only">{t("common.language")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover/95 backdrop-blur-md border border-border/60 rounded-xl shadow-xl z-50 p-1">
                {languageOptions.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setUserLanguagePreference(lang.code)}
                    className={`rounded-lg cursor-pointer transition-colors px-3 py-2 text-sm ${
                      activeLanguage === lang.code ? "bg-accent/15 text-accent font-medium" : "hover:bg-muted"
                    }`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Icon / Login Link */}
            {user ? (
              <Link href="/admin" className="shrink-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full flex items-center justify-center bg-muted/40 hover:bg-accent/10 hover:text-accent border border-border/40 hover:border-accent/20 transition-all duration-300 active:scale-90 h-9 w-9 md:h-10 md:w-10 shadow-sm shrink-0"
                >
                  <User className="h-4 w-4 md:h-4.5 md:w-4.5" />
                  <span className="sr-only">{t("common.admin")}</span>
                </Button>
              </Link>
            ) : (
              <Link href="/admin/login" className="shrink-0">
                <Button 
                  variant="ghost" 
                  className="rounded-full flex items-center gap-1.5 px-3 md:px-4 py-1.5 bg-muted/40 hover:bg-accent/10 hover:text-accent border border-border/40 hover:border-accent/20 transition-all duration-300 active:scale-90 h-9 md:h-10 text-xs font-bold uppercase tracking-wider shadow-sm shrink-0"
                >
                  <User className="h-4 w-4 md:h-4.5 md:w-4.5" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            {/* Shopping Cart Icon */}
            <Link href="/cart" className="relative group/cart shrink-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full flex items-center justify-center bg-muted/40 hover:bg-accent/10 hover:text-accent border border-border/40 hover:border-accent/20 transition-all duration-300 active:scale-90 h-9 w-9 md:h-10 md:w-10 shadow-sm relative group/cart shrink-0"
              >
                <ShoppingBag className="h-4 w-4 md:h-4.5 md:w-4.5 transition-transform group-hover/cart:-translate-y-0.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground shadow-md animate-bounce">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">{t("common.cart")}</span>
              </Button>
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
    </header>
  );
}

