
import { useRef, useState, useEffect } from 'react';

const useParentWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Ensure the ref is attached to a DOM element
    if (!ref.current) return;

    const parentElement = ref.current.parentElement;
    if (!parentElement) return;

    // Function to update the width
    const updateWidth = () => {
      // Use clientWidth or offsetWidth to get the dimension
      setWidth(parentElement.clientWidth);
    };

    // Initial width measurement
    updateWidth();

    // Set up ResizeObserver to watch for dimension changes on the parent
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(parentElement);

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array means this runs once on mount

  return [ref, width];
};

export default useParentWidth;
