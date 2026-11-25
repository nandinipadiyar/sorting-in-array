import { motion } from 'framer-motion';

export function CodePointer({ isActive = false, label = '' }) {
  return (
    <motion.div
      initial={false}
      animate={{
        y: isActive ? [0, -4, 0] : [0, -2, 0],
        scale: isActive ? [1, 1.08, 1] : 1,
      }}
      transition={{
        repeat: Infinity,
        duration: isActive ? 1.2 : 2.4,
        ease: 'easeInOut',
      }}
      className="flex flex-col items-center pointer-events-none select-none"
    >
      <div
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-sm border flex items-center gap-1 ${
          isActive
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-700'
            : 'bg-white text-navy/70 border-sand-dark'
        }`}
      >
        <span>{label || '▲'}</span>
      </div>
    </motion.div>
  );
}
