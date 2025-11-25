import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions: Record<string, number> = {};

export default function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Restore last scroll position if exists, otherwise scroll top
    const lastScroll = scrollPositions[pathname];
    window.scrollTo(0, lastScroll ?? 0);

    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [pathname]);

  return null;
}
