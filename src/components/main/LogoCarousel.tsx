"use client"

import { logos } from "@/data/logos";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const speed = 0.7; // px por frame

const LogoCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollPos = useRef(0);
  const animationFrameId = useRef<number>(0);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        // track.scrollWidth cubre todas las copias
        // Dividir por la cantidad de copias
        setTrackWidth(trackRef.current.scrollWidth / 3);
      }
    };

    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);

    return () => window.removeEventListener("resize", updateTrackWidth);
  }, []);

  useEffect(() => {
    if (trackWidth === 0) return; // esperar que cálculo trackWidth esté listo

    const animate = () => {
      scrollPos.current += speed;
      if (scrollPos.current >= trackWidth) {
        scrollPos.current = 0;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [trackWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden box-border my-10 z-10"
      aria-label="Carrusel de logos"
    >
      <div
        ref={trackRef}
        className="flex align-middle justify-center items-center content-center w-max"
      >
        {[...logos, ...logos, ...logos].map(
          (logo, index) => (
            <div
              key={index}
              style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image
                fill
                src={logo}
                alt={`Logo ${index}`}
                className="w-[100px] object-contain object-center h-min mr-5 shrink-0 border-none"
                style={{
                  filter: "grayscale(100%)",
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LogoCarousel;
