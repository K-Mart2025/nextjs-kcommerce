"use client"

import { useEffect } from "react";

type UseSectionObserverProps = {
  data: string[]|undefined;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  setActiveSection: (id: string) => void;
  threshold?: number;
  rootMargin?: string;
};

export function useIntersectionObserver({
  data=[""],
  sectionRefs,
  setActiveSection,
  threshold = 0.5,
  rootMargin = "-50px 0px -50px 0px",
}: UseSectionObserverProps) {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold, rootMargin }
    );

    data.forEach((item) => {
      const section = sectionRefs.current[item];
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [data, sectionRefs, setActiveSection, threshold, rootMargin]);
}
