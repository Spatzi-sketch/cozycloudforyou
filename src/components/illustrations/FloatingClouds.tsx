"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FloatingCloudsProps = {
  className?: string;
};

export function FloatingClouds({ className }: FloatingCloudsProps) {
  const clouds = [0, 1, 2, 3, 4].map((i) => (
    <motion.div
      key={i}
      className="text-pink/40 select-none pointer-events-none"
      style={{
        left: `${10 + i * 22}%`,
        top: `${10 + i * 18}%`,
        fontSize: `${30 + i * 10}px`,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 15, 0],
      }}
      transition={{
        duration: 6 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ☁️
    </motion.div>
  ));

  return <div className={cn(className, "pointer-events-none")}>{clouds}</div>;
}
