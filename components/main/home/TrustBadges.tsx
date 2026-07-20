"use client";
import { Truck, ShieldCheck, Lock, Headphones } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function TrustBadges() {
  const { ref, isVisible } = useScrollReveal();

  const badges = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On orders over 1000৳",
    },
    {
      icon: ShieldCheck,
      title: "7 Days Returns",
      desc: "Hassle-free easy returns",
    },
    {
      icon: Lock,
      title: "100% Safe Payment",
      desc: "Secured checkout system",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Care",
      desc: "Dedicated support team",
    },
  ];

  return (
    <section className="py-8 bg-muted/40" ref={ref}>
      <div className="container-shop">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl bg-background border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent/20 hover:-translate-y-0.5 reveal-scale stagger-${index + 1} ${isVisible ? "reveal-visible" : ""
                  }`}
              >
                <div className="p-3 bg-accent/10 rounded-xl text-accent shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground/90">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
