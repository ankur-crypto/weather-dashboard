"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function HoverCard({
  children,
}: Props) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {children}
    </motion.div>
  );
}