"use client";
import { useStoreSettings } from "@/hooks/useStoreSettings";
import { Mail, MapPin, Phone } from "lucide-react";

export function TopBar() {
  const { data: storeSettings } = useStoreSettings();

  const text = storeSettings?.topbar_text || "";
  const enabled = storeSettings?.topbar_enabled !== "false";

  // Retrieve contact details or set defaults
  const phone = storeSettings?.store_phone || "+880 1234-567890";
  const email = storeSettings?.store_email || "info@store.com";
  const address = storeSettings?.store_address || "Dhaka";
  const city = storeSettings?.store_city || "Bangladesh";

  if (!enabled) return null;

  return (
    <div className="w-full bg-primary text-primary-foreground border-b border-primary-foreground/10 text-xs py-2 px-4 transition-all duration-300">
      <div className="container-shop flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Contact Info (Desktop) */}
        <div className="hidden sm:flex items-center gap-4 text-primary-foreground/90 font-medium">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>{phone}</span>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span>{email}</span>
            </a>
          )}
        </div>

        {/* Center: Promo text */}
        {text && <p className="font-semibold text-center truncate flex-1 tracking-wide">{text}</p>}

        {/* Right: Location Info (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 text-primary-foreground/90 font-medium">
          {(address || city) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate max-w-[200px]">{address}{address && city ? ", " : ""}{city}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
