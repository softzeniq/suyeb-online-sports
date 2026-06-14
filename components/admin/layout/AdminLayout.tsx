"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { AdminHeader } from "./Header";
import { AdminSidebar } from "./Sidebar";

interface Props {
  children: ReactNode;
}

export function AdminLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage =
    pathname === "/admin/login" || pathname === "/admin/register";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <AdminSidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-50">
          <div className="h-16 border-b bg-background flex items-center px-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="p-0 w-[280px]">
                <AdminSidebar mobile closeSidebar={() => setOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="ml-3 font-bold text-lg">Admin Panel</div>
          </div>
        </div>

        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
