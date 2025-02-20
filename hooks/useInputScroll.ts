import React, { useEffect } from "react";

const useInputScroll = (input: HTMLInputElement | null) => {
  useEffect(() => {
    window.addEventListener("touchmove", handleScroll);
    return () => {
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const handleScroll = (e: { target: any }) => {
    if (!input) return;
    if (document.activeElement == input || input.contains(e.target)) {
      (document.activeElement as HTMLElement).blur();
    }
  };
};

export default useInputScroll;
