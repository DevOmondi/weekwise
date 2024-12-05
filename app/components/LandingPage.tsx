"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BrainCog, Handshake, Target } from "lucide-react";
import SuccessToast from "@/components/SuccessToast";
import AnimatedLoaderOverlay from "@/components/animated-loader";

// Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Invalid email address."),
  goal: z.string().min(10, "Goal must be at least 10 characters long."),
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID;

const randomNumber = Math.floor(Math.random() * (200 - 100 + 1)) + 100;

// Modal Component
const Modal = ({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-red-100 p-6 rounded-lg max-w-md w-full">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <Button variant="outline" onClick={onClose} className="w-full">
        Close
      </Button>
    </div>
  </div>
);

// Handle subscription activation
const activateSubscription = async (
  subscriptionId: string,
  formData: { email: string; name: string; goal: string }
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/payment/activate-subscription`,
      {
        subscriptionId,
        formData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error activating subscription:", error);
    throw error;
  }
};

const LandingPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    goal: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    goal: "",
  });

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
  }>({
    title: "",
    message: "",
  });

  // Simulate subscription
  // const testSubscription = async (formData) => {
  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/api/payment/simulate-subscription`,
  //       { formData }
  //     );

  //     if (response.data.success) {
  //       router.push(
  //         `/success?dateTime=${response.data.subscription.nextMessageDate}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error in test subscription:", error);
  //   }
  // };

  // Simulate subscription status update
  // const testStatusUpdate = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/api/payment/simulate-subscription-update`,
  //       {
  //         subscriptionId: "TEST_SUB_123",
  //         newStatus: "CANCELLED",
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error updating subscription:", error);
  //   }
  // };

  const handleValidation = () => {
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { email: string; name: string; goal: string } = {
        email: "",
        name: "",
        goal: "",
      };
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof typeof fieldErrors;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({ email: "", name: "", goal: "" });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (handleValidation()) {
      console.log("Form data is valid:", formData);
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/test/test-email`,
          {
            prompt: formData.goal,
            userName: formData.name,
            userEmail: formData.email,
          }
        );
        if (response.data.success === true) {
          setIsLoading(false);
          setFormData({
            email: "",
            name: "",
            goal: "",
          });
          setToastIsOpen(true);
        } else if (response.data.success === false) {
          setModalContent({
            title: "Error",
            message: response.data.message || "Please use another email :(",
          });
          setIsErrorModalOpen(true);
        }
        console.log("Goal processed::", response.data.success);
        if (response.status === 400) {
          return alert(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        setModalContent({
          title: "Error",
          message:
            "Sorry, an error occured while processing your request. Please try again or use a different email :(",
        });
        setIsErrorModalOpen(true);
        console.log("Error generating message::", error);
        // throw error;
      }
    }
  };

  const handleStartJourney = () => {
    if (handleValidation()) {
      console.log("All required fields are filled::", formData);
      setIsModalOpen(true);
    } else {
      console.log("Please fill in all the fields to start your journey");
    }
    // if (handleValidation()) {
    //   // For testing, bypass PayPal
    //   if (process.env.NEXT_PUBLIC_TEST_MODE === "true") {
    //     testSubscription(formData);
    //   } else {
    //     setIsModalOpen(true);
    //   }
    // }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "default-client-id",
        vault: true,
        intent: "subscription",
      }}
    >
      <AnimatedLoaderOverlay isLoading={isLoading} />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-12">
        <SuccessToast
          message="Check your email shortly 😊"
          toastIsOpen={toastIsOpen}
          setToastIsOpen={setToastIsOpen}
        />
        {/* Active users pill */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm border text-sm z-50">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {randomNumber} people working on their goals right now
          </span>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold pt-[2rem]">
              Your Personal AI Coach
            </h1>
            <p className="text-xl text-gray-600">
              Guidance to achieve your goals, delivered every week for an entire
              year.
            </p>
          </div>

          {/* Core benefits */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <BrainCog className="text-blue-600 w-6 h-6" />
              <div>
                <div className="font-medium">AI-Powered</div>
                <div className="text-sm text-gray-600">
                  Personalized weekly messages
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Handshake className="text-green-600 w-6 h-6" />
              <div>
                <div className="font-medium">52 Weeks</div>
                <div className="text-sm text-gray-600">Consistent support</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Target className="text-purple-600 w-6 h-6" />
              <div>
                <div className="font-medium">Any Goal</div>
                <div className="text-sm text-gray-600">Fitness to business</div>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <Card className="shadow-lg">
            <CardContent className="p-6 space-y-6">
              {/* Example Message Preview */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <div className="text-gray-500 mb-2">Example Message:</div>
                Dear Sarah, I noticed something powerful in your journey to run
                your first marathon - you &apos;re already thinking like a
                runner. This week, let&apos;s focus on one small but mighty
                habit. Try this: Before each run, take 30 seconds to visualize
                yourself finishing strong. {randomNumber} other weekwise.me
                members are working on running goals, and many find this mental
                prep transformative. You&apos;re building something special
                here. Your coach
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12"
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12"
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="What would you like to achieve in the next year? Be specific!
Examples:
 • Run my first marathon
 • Write a novel
 • Launch my business
 • Learn to meditate daily"
                    className="h-32 resize-none"
                    value={formData.goal}
                    onChange={(e) =>
                      setFormData({ ...formData, goal: e.target.value })
                    }
                  />
                  {errors.goal && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.goal}
                    </div>
                  )}
                </div>
                <Button
                  className="w-full h-12 text-lg font-medium"
                  type="submit"
                >
                  Test it out
                </Button>
                {/* Pricing */}
                <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                  <div>
                    <div className="font-medium">365 Days of Coaching</div>
                    <div className="text-sm text-gray-600">
                      First Message one day after you subscribe 😊
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$9</div>
                    <div className="text-sm text-gray-600">one-time</div>
                  </div>
                </div>
                <Button
                  className="w-full h-12 text-lg font-medium"
                  type="button"
                  onClick={handleStartJourney}
                >
                  Start Your Journey
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* PayPal Payment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50  p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full my-8 mx-auto relative">
              <div className="max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">
                  Complete Your Payment with PayPal
                </h2>
                <PayPalButtons
                  style={{
                    shape: "rect",
                    color: "gold",
                    layout: "vertical",
                    label: "subscribe",
                  }}
                  createSubscription={(data, actions) => {
                    return actions.subscription.create({
                      plan_id: PLAN_ID as string,
                    });
                  }}
                  onApprove={async (data) => {
                    try {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const result = await activateSubscription(
                        data.subscriptionID as string,
                        formData
                      );
                      if (result.data.success === true) {
                        router.push(
                          `/success?dateTime=${result.data.subscription.nextMessageDate}`
                        );
                      }
                    } catch (error) {
                      console.error("Error activating subscription:", error);
                      // alert(
                      //   "Failed to activate subscription. Please try again."
                      // );
                    } 
                  }}
                  onError={(err) => {
                    console.error("PayPal Button error:", err);
                    alert("Something went wrong. Please try again.");
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Error Modal */}
        {isErrorModalOpen && (
          <Modal
            title={modalContent.title}
            message={modalContent.message}
            onClose={() => setIsErrorModalOpen(false)}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default LandingPage;
