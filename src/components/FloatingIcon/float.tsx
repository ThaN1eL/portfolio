"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type FloatingIconProps = {
  Icon: React.ComponentType<{ className?: string }>;
  delay?: number;
  top: number | string;
  left: number | string;
  rotation: number;
};

export const FloatingIcon = ({ Icon, delay = 0, top, left, rotation }: FloatingIconProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();

  const speedFactor = Math.random() * 0.5 + 0.3;
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -100 * speedFactor]);

  const combinedY = parallaxY;

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0], rotate: rotation }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 5 + Math.random() * 2,
        delay,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        top,
        left,
        y: combinedY, 
      }}
    >
            <motion.div
        className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" }}
      />
      <Icon className="w-10 h-10 text-emerald-500 dark:text-purple-300 opacity-20" />
    </motion.div>
  );
};
