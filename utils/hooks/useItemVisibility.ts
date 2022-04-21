import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

const useItemVisibility = (
  containerRef: MutableRefObject<any>,
  elementRef: MutableRefObject<any>
) => {
  const visibilityStatus = useRef<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();

    const isVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (visibilityStatus.current !== isVisible) {
      visibilityStatus.current = isVisible;
      setIsVisible(isVisible);
    }
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef.current) return;

    const rootElement = containerRef.current;
    rootElement.addEventListener("scroll", handleScroll);

    return () => rootElement.removeEventListener("scroll", handleScroll);
  }, [containerRef, elementRef, handleScroll]);

  return { isVisible };
};

export default useItemVisibility;
