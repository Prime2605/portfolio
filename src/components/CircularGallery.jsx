import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const CircularGallery = ({ items, itemWidth = 250, itemHeight = 350 }) => {
  const containerRef = useRef(null);
  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) based on document height
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      scrollY.set(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Use a fixed array of positions since we can't reliably use transform mapping without useTransform in this structure easily,
  // Actually framer-motion provides motion components but we can also just use standard React state if we want.
  // Wait, let's use motion from framer-motion.
  // We need to import motion.
  return (
    <div className="gallery-wrapper" ref={containerRef}>
      <div className="gallery-scene">
        <CircularGalleryInner items={items} scrollProgress={smoothScrollY} itemWidth={itemWidth} itemHeight={itemHeight} mounted={mounted} />
      </div>
    </div>
  );
};

// We separate the inner component so we can subscribe to the spring
import { motion, useTransform } from 'framer-motion';

const CircularGalleryInner = ({ items, scrollProgress, itemWidth, itemHeight, mounted }) => {
  const radius = Math.max(800, items.length * 100);
  const angleStep = 360 / items.length;

  return (
    <>
      {items.map((item, index) => {
        const itemAngle = index * angleStep;

        // The rotation changes based on scroll progress (0 to 1 -> 0 to 360 degrees)
        const rotationY = useTransform(
          scrollProgress,
          [0, 1],
          [itemAngle, itemAngle + 360]
        );

        // Calculate opacity based on position (fading items in the back)
        const opacity = useTransform(rotationY, (val) => {
          const normalizedAngle = ((val % 360) + 360) % 360;
          return normalizedAngle > 90 && normalizedAngle < 270 ? 0.2 : 1;
        });
        
        const scale = useTransform(rotationY, (val) => {
          const normalizedAngle = ((val % 360) + 360) % 360;
          return normalizedAngle > 90 && normalizedAngle < 270 ? 0.8 : 1;
        });

        // Add a slight entrance animation
        const initialY = mounted ? 0 : 50;
        const initialOpacity = mounted ? 1 : 0;

        return (
          <motion.div
            key={index}
            className="gallery-item-container"
            style={{
              rotateY: rotationY,
              opacity: mounted ? opacity : initialOpacity,
              scale: scale,
              y: initialY,
              transition: 'y 0.8s ease-out, opacity 0.8s ease-out',
              transitionDelay: `${index * 0.1}s`
            }}
          >
            <div
              style={{
                width: itemWidth,
                height: itemHeight,
                transform: `translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                position: 'relative'
              }}
            >
              <div className="glass-card gallery-card">
                <div 
                  className="gallery-image"
                  style={{ 
                    backgroundImage: `url(${item.photo.url})`,
                    backgroundPosition: item.photo.pos || 'center'
                  }}
                />
                <div className="gallery-gradient" />
                <div className="gallery-info">
                  <h3 className="gallery-title">{item.common}</h3>
                  <p className="gallery-subtitle">{item.binomial}</p>
                  <p className="gallery-credit">By {item.photo.by}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default CircularGallery;
