import { useState, useEffect } from 'react';

export default function useWindowSize(cb) {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    // Check if we're in a browser environment (client-side)
    if (typeof window !== 'undefined') {
      // Function to handle window resize
      const handleResize = () => {
        cb();
        setWindowSize([window.innerWidth, window.innerHeight]);
      };

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Initial window size
      setWindowSize([window.innerWidth, window.innerHeight]);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return windowSize;
}
