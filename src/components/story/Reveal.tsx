import { motion, type Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: string;
}) {
  // Gunakan komponen motion bawaan yang stabil (motion.div, motion.section, dll)
  // JANGAN memanggil motion(as) di dalam render cycle karena akan membuat referensi komponen baru
  // yang memaksa React melakukan unmount & remount terus-menerus (penyebab getar/animasi ulang).
  const MotionTag = (motion as any)[as || "div"] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
