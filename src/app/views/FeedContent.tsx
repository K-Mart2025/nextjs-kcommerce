import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Sections from "./Sections";

export const FeedContent = ({ data, refs }: { data: string[]; refs: MutableRefObject<{ [key: string]: HTMLDivElement | null }> }) => {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  const observers = useRef<{ [key: string]: IntersectionObserver }>({});

  useEffect(() => {
    data.forEach((item) => {
      const el = refs.current[item];
      if (!el) return;

      if (observers.current[item]) observers.current[item].disconnect();

      observers.current[item] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [item]: true }));
            observers.current[item].disconnect();
          }
        },
        { root: null, rootMargin: "200px" } // preload a bit before viewport
      );

      observers.current[item].observe(el);
    });

    return () => {
      Object.values(observers.current).forEach((observer) => observer.disconnect());
    };
  }, [data, refs]);

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={item + index}>
          {/* The div observed for visibility */}
          <div id={item} ref={(el) => { if (refs) { refs.current[item] = el } }}></div>
          {/* Conditionally render Sections only if visible */}
          {visibleSections[item] ? <Sections category={item} /> : null}
        </React.Fragment>
      ))}
    </>
  );
};
