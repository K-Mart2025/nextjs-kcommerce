"use client"

import { useEffect } from "react";

type UseCenterActiveButtonProps = {
  activeSection: string | null;
  buttonRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  navbarRef: React.RefObject<HTMLElement|null>;
};

export function useCenterActiveButton({
  activeSection,
  buttonRefs,
  navbarRef,
}: UseCenterActiveButtonProps) {
  useEffect(() => {
    if (
      activeSection &&
      buttonRefs.current[activeSection] &&
      navbarRef.current
    ) {
      const navbar = navbarRef.current;
      const button = buttonRefs.current[activeSection];

      const navbarWidth = navbar.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      navbar.scrollTo({
        left: buttonLeft - navbarWidth / 2 + buttonWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeSection, buttonRefs, navbarRef]);
}
