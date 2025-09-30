import { ReactNode } from "react";

export const ProductContainer = ({ children }: { children: ReactNode }) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appearAnim");
        // Dejar de observar para que se anime una vez
        observer.unobserve(entry.target);
      }
    });
  });

  // Selecciona los elementos que quieres animar
  document.querySelectorAll(".cardAnimation").forEach((el) => {
    observer.observe(el);
  });

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">{children}</div>
  );
};
