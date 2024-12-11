"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait for a short delay to ensure scripts are loaded
    const timeout = setTimeout(() => {
      // Google Analytics pageview
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", "G-VDLSXM85G5", {
          page_path: pathname,
        });
      }

      // Facebook Pixel pageview
      if (typeof window !== "undefined" && window.fbq) {
        // Force a new PageView event
        window.fbq("track", "PageView", {
          path: pathname,
        });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]); 

  return null;
}