"use client";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { TopBar } from "./TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <TopBar />}
      {!isAdmin && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
}
