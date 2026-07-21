import TrackOrderPage from "@/components/main/TrackOrder";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <TrackOrderPage />
    </Suspense>
  );
}
