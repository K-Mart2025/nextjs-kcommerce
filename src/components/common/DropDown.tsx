"use client"

import { useRef, useState } from "react";

export const DropdownMenu = ({
  items,
  label,
}: {
  items: Array<{ label: string; href: string }>;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); // 100ms de retraso para evitar cierre abrupto
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="px-4 py-2 font-semibold rounded-md hover:bg-gray-200">
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
