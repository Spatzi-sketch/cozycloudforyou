"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FloatingHeartsProps = {
  className?: string;
};

export function FloatingHearts({ className }: FloatingHeartsProps) {
  const hearts = [0, 1, 2, 3].map((i) => (
    <motion.div
      key={i}
      className="text-pink/50 select-none pointer-events-none"
      style={{
        left: `${20 + i * 25}%`,
        top: `${40 + i * 15}%`,
        fontSize: `${24 + i * 8}px`,
      }}
      animate={{
        y: [0, -30],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 1.5,
      }}
    >
      💖
    </motion.div>
  ));

  return <div className={cn(className, "pointer-events-none")}>{hearts}</div>;
}
