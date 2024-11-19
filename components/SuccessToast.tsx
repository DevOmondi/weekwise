"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { CheckCircle } from "lucide-react";

interface SuccessToastProps {
  message?: string;
  toastIsOpen: boolean;
  setToastIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  duration?: number;
  onClose?: () => void;
}

export default function SuccessToast({
  message = "You will be emailed in a few :)",
  duration = 5000,
  toastIsOpen,
  setToastIsOpen,
  onClose,
}: SuccessToastProps) {
  // const [open, setOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      // setOpen(false)
      setToastIsOpen(false);
    //   onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, toastIsOpen, setToastIsOpen]);

  return (
    <ToastProvider>
      <AnimatePresence>
        {toastIsOpen && (
          <Toast className="fixed bottom-4 right-4 w-auto max-w-md bg-green-50 border-green-200 text-green-800">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="flex items-center space-x-4 p-4"
            >
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500" />
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-sm font-medium"
              >
                {message}
              </motion.p>
            </motion.div>
          </Toast>
        )}
      </AnimatePresence>
      <ToastViewport />
    </ToastProvider>
  );
}
