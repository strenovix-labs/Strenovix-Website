"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import "./hero-parallax.css";

export function HeroParallax({ products }) {
  const firstRow  = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow  = products.slice(10, 15);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX        = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]),   springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]),  springConfig);
  const rotateX           = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]),   springConfig);
  const opacity           = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),  springConfig);
  const rotateZ           = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]),   springConfig);
  const translateY        = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div ref={ref} className="hp-root">
      <HPHeader />
      <div className="hp-perspective-wrap">
        <motion.div className="hp-body" style={{ rotateX, rotateZ, translateY, opacity }}>
          <motion.div className="hp-row">
            {firstRow.map(p  => <ProductCard key={p.title} product={p} translate={translateX} />)}
          </motion.div>
          <motion.div className="hp-row">
            {secondRow.map(p => <ProductCard key={p.title} product={p} translate={translateXReverse} />)}
          </motion.div>
          <motion.div className="hp-row">
            {thirdRow.map(p  => <ProductCard key={p.title} product={p} translate={translateX} />)}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function HPHeader() {
  return (
    <div className="hp-header">
      <p className="hp-eyebrow">App Development Portfolio</p>
      <h1 className="hp-title">
        Apps we've built that<br />
        <span className="hp-glow">define categories.</span>
      </h1>
      <p className="hp-sub">
        World-class mobile applications engineered for performance, delight, and real-world impact.
      </p>
    </div>
  );
}

function ProductCard({ product, translate }) {
  return (
    <motion.div className="hp-card" style={{ x: translate }} whileHover={{ y: -20 }}>
      <div className="hp-card-link-row">
        <a href={product.link} target="_blank" rel="noopener noreferrer" className="hp-card-title">
          {product.title}
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
      <a href={product.link} target="_blank" rel="noopener noreferrer" className="hp-img-wrap">
        <img src={product.thumbnail} alt={product.title} className="hp-img" loading="lazy" />
      </a>
    </motion.div>
  );
}
