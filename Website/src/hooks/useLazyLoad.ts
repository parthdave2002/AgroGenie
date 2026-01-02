import { useEffect, useRef, useState } from "react";

const useLazyLoad = (options: IntersectionObserverInit = { threshold: 0.2 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
};

export default useLazyLoad;
