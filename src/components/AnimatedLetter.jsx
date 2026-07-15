import { useTransform, motion } from 'framer-motion';

export default function AnimatedLetter({ char, index, total, scrollYProgress }) {
  const charProgress = index / total;

  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.15, 1]
  );

  if (char === ' ') return <span>&nbsp;</span>;

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  );
}
