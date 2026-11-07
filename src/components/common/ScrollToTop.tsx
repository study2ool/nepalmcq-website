import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useAppSelector } from "../../store";

/**
 * ScrollToTop component:
 * 1. Resets window scroll position to (0, 0) immediately on route navigation without lag.
 * 2. Provides a smooth-scrolling floating "Back to Top" button when scrolled down.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const session = useAppSelector((state) => state.quiz.session);
  const isExamActive = Boolean(session && !session.isSubmitted);

  // Instant scroll-to-top on route change to prevent smooth-scroll lag across page navigations
  useEffect(() => {
    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";

    window.scrollTo(0, 0);

    const rafId = requestAnimationFrame(() => {
      htmlEl.style.scrollBehavior = prevScrollBehavior;
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  // Track scroll position to show/hide floating smooth-scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // Don't render floating scroll button during active exam session
  if (isExamActive || pathname.startsWith("/exam/")) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleSmoothScrollToTop}
      aria-label="Scroll smoothly to top of page"
      title="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-lg hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
        showScrollTop
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-4 pointer-events-none scale-90"
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default ScrollToTop;
