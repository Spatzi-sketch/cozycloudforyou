"use client";

import { motion } from "framer-motion";

type CuteCharactersProps = {
  className?: string;
};

export function CuteCharacters({ className }: CuteCharactersProps) {
  const characters = [
    { char: "🐻", top: "10%", left: "5%", size: "48px", delay: 0 },
    { char: "🐹", top: "60%", left: "85%", size: "40px", delay: 1 },
    { char: "☁️", top: "80%", left: "10%", size: "36px", delay: 2 },
    { char: "💫", top: "30%", left: "90%", size: "32px", delay: 0.5 },
  ];

  return (
    <div className={className}>
      {characters.map((c, i) => (
        <motion.div
          key={i}
          className="select-none pointer-events-none"
          style={{
            top: c.top,
            left: c.left,
            fontSize: c.size,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: c.delay,
          }}
        >
          {c.char}
        </motion.div>
      ))}
    </div>
  );
}
