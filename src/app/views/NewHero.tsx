"use client"
import LogoCarousel from "@/components/common/LogoCarousel";
import { hero_images } from "@/data/images";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

const ThreeDMarquee = dynamic(() => import("../../components/3d-marquee.tsx").then(mod => mod.ThreeDMarquee), { ssr: false, loading: () => <div>Loading marquee...</div> });

export const NewHero = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null
  }

  return (
    <div className="w-full bg-blue-50 relative mb-20" >
      <div className="bg-blue-50 relative md:h-[90vh] w-full mx-auto sm:max-w-7xl">
        <div className="relative w-full p-4 h-[70vh] sm:h-fit md:scale-75 lg:scale-100 sm:max-w-7xl sm:rounded-3xl sm:bg-gray-950/10 sm:p-4 sm:ring-1 ring-neutral-700/30">
          <div
            className="
    flex justify-center flex-col sm:w-1/2 pl-16 pr-8 z-20 absolute h-96 w-full sm:max-w-3xl 
    top-1/2 transform -translate-y-1/2 
    left-1/2 -translate-x-1/2
    sm:left-8 sm:-translate-x-0
    fade-in-65 p-16 rounded-3xl
  "
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 70%, rgba(255,255,255,0.7) 90%, rgba(255,255,255,0.5) 100%)",
            }}
          >
            <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-900">
              Explora el auténtico sabor de Corea
            </h1>
            <p className="mb-6 text-gray-700">
              Desde kimchi picante hasta dulces coreanos, encuéntralo todo aquí
            </p>
            <a href="#products" className="hover:scale-105 px-6 py-3 bg-blue-600 max-w-64 text-white rounded-lg hover:bg-blue-700 transition">
              Compra ahora
            </a>
          </div>
          <div className="sm:h-auto">
            <div className="marquee-blur blur-sm sm:rounded-3xl ">
              <ThreeDMarquee
                className="z-0 sm:rounded-3xl"
                images={hero_images}
              />
            </div>
          </div>
        </div>
        <div className="relative w-full h-40 sm:h-56 lg:h-72 mb-4">
          <LogoCarousel />
        </div>
      </div>
    </div>
  );
};
