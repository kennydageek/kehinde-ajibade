import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const LOADER_SESSION_KEY = "kehinde-portfolio-loader-seen";

function shouldShowLoader() {
  if (window.location.pathname.replace(/\/+$/, "") !== "") return false;

  try {
    return window.sessionStorage.getItem(LOADER_SESSION_KEY) !== "true";
  } catch {
    return true;
  }
}

export function PageLoader() {
  const [visible, setVisible] = useState(shouldShowLoader);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;

    try {
      window.sessionStorage.setItem(LOADER_SESSION_KEY, "true");
    } catch {
      // The loader still works when session storage is unavailable.
    }

    const timer = window.setTimeout(() => setVisible(false), prefersReducedMotion ? 300 : 1450);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          aria-hidden="true"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="page-loader-mark" aria-label="KA">
            <motion.span
              initial={{ opacity: 0, y: "80%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              K
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: "80%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              A
            </motion.span>
          </div>
          <motion.div
            className="page-loader-status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.45, delay: 0.28 }}
          >
            <span className="page-loader-blocks" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span>Loading portfolio</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
