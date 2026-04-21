import { motion } from "framer-motion";

export function Pullquote({ children, attribution }: { children: string; attribution?: string }) {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-light italic leading-snug text-foreground text-balance md:text-5xl"
        >
          <span className="text-primary">"</span>
          {children}
          <span className="text-primary">"</span>
        </motion.blockquote>
        {attribution && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            — {attribution}
          </motion.p>
        )}
      </div>
    </section>
  );
}
