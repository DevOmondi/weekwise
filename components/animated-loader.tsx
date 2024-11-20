// "use client"

// import { motion } from "framer-motion"

// export function AnimatedLoaderComponent() {
//   return (
//     <div className="flex items-center justify-center w-full h-screen bg-background">
//       <motion.div
//         className="flex space-x-2"
//         animate={{
//           scale: [1, 1.2, 1],
//           rotate: [0, 180, 360]
//         }}
//         transition={{
//           duration: 2,
//           ease: "easeInOut",
//           times: [0, 0.5, 1],
//           repeat: Infinity,
//         }}
//       >
//         {[...Array(3)].map((_, index) => (
//           <motion.div
//             key={index}
//             className="w-4 h-4 bg-primary rounded-full"
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [1, 0.5, 1]
//             }}
//             transition={{
//               duration: 1.5,
//               ease: "easeInOut",
//               repeat: Infinity,
//               delay: index * 0.2
//             }}
//           />
//         ))}
//       </motion.div>
//     </div>
//   )
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedLoaderOverlayProps {
  isLoading: boolean;
}

export default function AnimatedLoaderOverlay({
  isLoading,
}: AnimatedLoaderOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            className="flex space-x-2"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="w-4 h-4 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
