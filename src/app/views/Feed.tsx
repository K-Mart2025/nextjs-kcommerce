"use client"

import { useEffect, useRef, useState } from "react";

import { useCategories } from "@/hooks/useCategories";
import { useCenterActiveButton } from "@/hooks/useCenterActiveButton";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { handleScrollToSection } from "@/lib/handleScrollToSection";
import PrettyText from "../../components/common/PrettyText";
import { FeedContent } from "./FeedContent";

const Feed = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement>>({});
  const navbarRef = useRef<HTMLDivElement>(null); // Ref for the navbar container
  const [isClient, setIsClient] = useState(false)

  const { error, data, isError, isPending } = useCategories();
  // Scroll navbar to active button
  useCenterActiveButton({ activeSection, buttonRefs, navbarRef });
  useIntersectionObserver({ data, sectionRefs, setActiveSection })

  useEffect(()=>{
    setIsClient(true)
  }, [])

  if (!isClient) { return null }
  
  if (isError) {
    return (
      <PrettyText>Error: {error?.message || "Error desconocido"}</PrettyText>
    );
  }

  if (isPending) {
    return (
      <section className="py-12 max-w-7xl">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"> Cargando </div>
      </section>
    );
  }

  if (!data || data[0] == undefined) {
    return <PrettyText>Hubo un problema al cargar los productos</PrettyText>;
  }

  return (
    <>
      {/* Navbar */}
      <div id="products" className="sticky top-[70px] z-50 w-full bg-white shadow-lg rounded-lg flex justify-center">
        <div
          ref={navbarRef}
          className="flex w-full p-4 overflow-x-auto bg-white max-w-7xl whitespace-nowrap gap-x-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {data.map((item) => (
            <button
              ref={(el) => {if (el) {buttonRefs.current[item] = el}}}
              key={item}
              className={`text-lg font-semibold px-4 py-2 rounded-lg transition duration-200 ${activeSection === item
                  ? "bg-gray-200"
                  : "text-gray-800 hover:bg-gray-100"
                }`}
              onClick={() => handleScrollToSection(sectionRefs, item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <FeedContent data={data} refs={sectionRefs} />

    </>
  );
};
export default Feed;
