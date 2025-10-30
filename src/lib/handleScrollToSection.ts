type SectionRefs = React.RefObject<Record<string, HTMLElement | null>>;

export const handleScrollToSection = (sectionRefs: SectionRefs, id: string) => {
  const section = sectionRefs.current[id];
  const offset = 150;
  if (section) {
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: sectionTop - offset,
      behavior: "smooth",
    });
  }
};
