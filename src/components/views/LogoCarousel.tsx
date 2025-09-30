"use client";

import { logos } from "@/data/logos";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const speed = 0.7; // pixels per frame

const LogoCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollPos = useRef(0);
  const animationFrameId = useRef<number>(0);
  const [trackWidth, setTrackWidth] = useState(0);

  // Measure track width (one loop of logos)
  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        const fullWidth = trackRef.current.scrollWidth;
        const singleWidth = fullWidth / 3; // because logos repeated 3x
        setTrackWidth(singleWidth);
        // Reset transform on update
        trackRef.current.style.transform = `translateX(0px)`;
        scrollPos.current = 0;
        console.log("Track width updated:", singleWidth);
      }
    };

    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);
    return () => window.removeEventListener("resize", updateTrackWidth);
  }, []);

  // Animate scrolling
  useEffect(() => {
    if (trackWidth === 0) return;

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

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [trackWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden box-border my-10 z-10"
      aria-label="Logo carousel"
      style={{ height: "120px" }}
    >
      <div
        ref={trackRef}
        className="flex items-center"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            style={{ position: "relative", width: "100px", height: "100px", marginRight: "20px" }}
          >
            <Image
              src={logo}
              alt={`Logo ${index}`}
              fill
              style={{ objectFit: "contain", filter: "grayscale(100%)" }}
              priority={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
