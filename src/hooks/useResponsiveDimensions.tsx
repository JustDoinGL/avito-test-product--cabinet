import { useState, useEffect } from 'react';

interface Dimensions {
  width: string | number;
  height: string | number;
}

const useResponsiveDimensions = (
  initialWidth: string | number,
  initialHeight: string | number,
  breakpoint: number = 600
): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: initialWidth, height: initialHeight });

  useEffect(() => {
    const updateDimensions = () => {
      const newWidth = window.innerWidth < breakpoint ? '100%' : '75%';
      const newHeight = window.innerWidth < breakpoint ? 200 : 300;
      setDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, [breakpoint]);

  return dimensions;
};

export default useResponsiveDimensions;