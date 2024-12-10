"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-VDLSXM85G5", {
        page_path: pathname,
      });
    }
    if (typeof window.fbq !== "undefined") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
