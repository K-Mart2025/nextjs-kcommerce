"use client"

import { useState } from "react";

export const useToggle = (initialValue: boolean) => {
  const [isEnabled, setToggle] = useState(initialValue);

  return [isEnabled, setToggle] as const; // 'as const' para mantener la tupla correctamente tipada
};
