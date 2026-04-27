import { motion } from "framer-motion";

export function OceanDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* --- Jellyfish --- */}
      <motion.div
        className="absolute left-[15%] top-[20%] w-24 h-24 text-primary/30"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <JellyfishSVG />
      </motion.div>

      <motion.div
        className="absolute right-[20%] top-[60%] w-32 h-32 text-primary/20"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.02, 1],
          rotate: [2, -2, 2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <JellyfishSVG />
      </motion.div>

      {/* --- Fish School --- */}
      <motion.div
        className="absolute left-[-10%] top-[30%] w-16 h-16 text-white/20"
        animate={{
          x: ["0vw", "110vw"],
          y: [0, -20, 10, -10, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <FishSVG />
      </motion.div>

      <motion.div
        className="absolute left-[-10%] top-[35%] w-10 h-10 text-white/15"
        animate={{
          x: ["0vw", "110vw"],
          y: [0, 15, -15, 5, 0]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
          delay: 1.5
        }}
      >
        <FishSVG />
      </motion.div>
      
      <motion.div
        className="absolute right-[-10%] top-[15%] w-12 h-12 text-white/15"
        style={{ transform: "scaleX(-1)" }}
        animate={{
          x: ["0vw", "-110vw"],
          y: [0, 20, -10, 20, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
      >
        <div style={{ transform: "scaleX(-1)" }}>
          <FishSVG />
        </div>
      </motion.div>

      {/* --- Static Elements --- */}
      <div className="absolute bottom-10 right-10 w-24 h-24 text-primary opacity-30" style={{ transform: "rotate(15deg)" }}>
        <StarfishSVG />
      </div>

      <div className="absolute top-[10%] right-[10%] w-48 h-48 text-white opacity-[0.03]" style={{ transform: "rotate(-10deg)" }}>
        <MantaRaySVG />
      </div>

      <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 text-primary opacity-20">
        <CoralSVG />
      </div>

      <div className="absolute bottom-[-5%] left-[20%] w-40 h-40 text-primary opacity-[0.15]">
        <CoralSVG />
      </div>

      {/* --- Additional Static Elements --- */}
      {/* Bubbles */}
      <div className="absolute top-[30%] left-[10%] w-4 h-4 rounded-full border border-white opacity-20" />
      <div className="absolute top-[25%] left-[12%] w-2 h-2 rounded-full border border-white opacity-30" />
      <div className="absolute top-[40%] right-[25%] w-6 h-6 rounded-full border border-white opacity-15" />
      <div className="absolute top-[35%] right-[23%] w-3 h-3 rounded-full border border-white opacity-25" />
      <div className="absolute bottom-[20%] left-[40%] w-5 h-5 rounded-full border border-white opacity-20" />
      
      {/* Sea Turtle */}
      <div className="absolute top-[45%] left-[70%] w-32 h-32 text-primary opacity-10" style={{ transform: "rotate(-20deg)" }}>
        <TurtleSVG />
      </div>

      {/* --- Seaweeds (Bottom) --- */}
      <div className="absolute bottom-[-5%] left-0 w-full flex justify-between items-end opacity-20">
        <motion.div 
          className="w-1/3 h-64 origin-bottom text-primary"
          animate={{ skewX: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <SeaweedSVG />
        </motion.div>
        
        <motion.div 
          className="w-1/4 h-48 origin-bottom text-primary"
          animate={{ skewX: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <SeaweedSVG />
        </motion.div>
        
        <motion.div 
          className="w-1/3 h-56 origin-bottom text-primary"
          animate={{ skewX: [-1, 3, -1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <SeaweedSVG />
        </motion.div>
      </div>
    </div>
  );
}

// Simple vector SVGs for the elements
function JellyfishSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C25 15, 15 35, 15 50 C15 55, 85 55, 85 50 C85 35, 75 15, 50 15 Z" opacity="0.6"/>
      <path d="M20 50 Q25 70, 25 90 Q30 70, 35 50 M40 50 Q45 75, 50 95 Q55 75, 60 50 M65 50 Q70 70, 75 90 Q80 70, 80 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* Details */}
      <circle cx="50" cy="35" r="12" fill="white" opacity="0.3"/>
      <path d="M40 35 Q50 25 60 35 Q50 45 40 35" fill="white" opacity="0.5"/>
    </svg>
  );
}

function FishSVG() {
  return (
    <svg viewBox="0 0 100 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 25 C60 5, 20 5, 10 25 C20 45, 60 45, 80 25 Z" opacity="0.8"/>
      <path d="M10 25 L0 15 L5 25 L0 35 Z" opacity="0.8"/>
      <path d="M50 12 Q40 5 30 12" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="65" cy="22" r="3" fill="white"/>
    </svg>
  );
}

function SeaweedSVG() {
  return (
    <svg viewBox="0 0 100 200" fill="currentColor" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 200 Q20 150 40 100 T50 0 Q60 50 40 100 T50 200" opacity="0.7"/>
      <path d="M70 200 Q90 160 60 120 T70 30 Q50 70 60 120 T70 200" opacity="0.5"/>
      <path d="M30 200 Q10 170 35 130 T20 50 Q40 90 35 130 T30 200" opacity="0.6"/>
    </svg>
  );
}

function StarfishSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 75 L25 90 L35 60 L10 40 L40 40 Z" opacity="0.8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="50" cy="50" r="5" fill="white" opacity="0.4"/>
      <circle cx="50" cy="30" r="2" fill="white" opacity="0.3"/>
      <circle cx="40" cy="65" r="2" fill="white" opacity="0.3"/>
      <circle cx="60" cy="65" r="2" fill="white" opacity="0.3"/>
    </svg>
  );
}

function CoralSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 100 Q40 70 20 60 Q30 50 40 60 Q45 40 30 20 Q45 25 50 45 Q55 20 70 10 Q60 35 55 50 Q75 40 90 60 Q70 70 60 65 Q55 85 50 100 Z" opacity="0.9"/>
    </svg>
  );
}

function MantaRaySVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 Q70 40 95 50 Q70 60 50 90 Q30 60 5 50 Q30 40 50 20 Z" opacity="0.9"/>
      <path d="M50 90 Q45 100 40 100 Q45 95 50 90" />
      <path d="M50 90 Q55 100 60 100 Q55 95 50 90" />
      <path d="M5 50 Q0 45 5 40 Q10 45 5 50" />
      <path d="M95 50 Q100 45 95 40 Q90 45 95 50" />
    </svg>
  );
}

function TurtleSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Shell */}
      <ellipse cx="50" cy="50" rx="25" ry="30" opacity="0.8" />
      {/* Head */}
      <circle cx="50" cy="15" r="8" opacity="0.9" />
      {/* Front Flippers */}
      <path d="M 30 25 Q 10 10 5 30 Q 20 40 30 35 Z" opacity="0.7" />
      <path d="M 70 25 Q 90 10 95 30 Q 80 40 70 35 Z" opacity="0.7" />
      {/* Back Flippers */}
      <path d="M 35 75 Q 20 90 25 95 Q 35 90 40 80 Z" opacity="0.7" />
      <path d="M 65 75 Q 80 90 75 95 Q 65 90 60 80 Z" opacity="0.7" />
      {/* Tail */}
      <polygon points="45,78 55,78 50,88" opacity="0.8" />
    </svg>
  );
}
