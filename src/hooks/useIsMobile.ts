'use client';
import { useEffect, useState } from 'react'


export const useIsMobile = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width < 768;
};
