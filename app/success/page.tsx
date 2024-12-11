"use client";

import React, { Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Sparkles } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const dateTime = searchParams.get("dateTime");

  // Parse and format dateTime if available
  const dateObj = dateTime ? new Date(dateTime) : null;
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString(undefined, {
        weekday: "long",
      })
    : null;
  const formattedTime = dateObj
    ? dateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
      window.fbq("track", "Purchase", {
        value: 49.0,
        currency: "USD",
      });
      window.fbq("track", "CompleteRegistration", {
        status: "success",
        registration_id: dateTime,
      });
    }
  }, [dateTime]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Animation */}
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          {/* Welcome Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Welcome to Your Journey!</h1>
            <p className="text-gray-600">
              We&apos;re excited to help you achieve your goals.
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-4 text-left space-y-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              What&apos;s Next
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1"></div>
                <span>
                  Your first coaching message will arrive tomorrow at{" "}
                  {formattedTime}.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1"></div>
                <span>We&apos;ve sent a welcome email to your inbox</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1"></div>
                <span>
                  You&apos;ll receive weekly guidance every {formattedDate} for
                  the next 52 weeks
                </span>
              </li>
            </ul>
          </div>

          {/* Community Note */}
          <div className="text-sm text-gray-600">
            <Sparkles className="inline h-4 w-4 mr-1" />
            You&apos;ve joined 247 others working on their goals
          </div>

          {/* Support Info */}
          <div className="text-sm text-gray-500">
            Questions? Email you@weekwise.me
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingContent />}>
      <Navbar />
      <SuccessContent />
    </Suspense>
  );
}
