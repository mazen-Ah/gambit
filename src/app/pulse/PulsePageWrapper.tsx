"use client";

import { useEffect } from "react";

export default function PulsePageWrapper() {
  useEffect(() => {
    // Add pulse-page class to body when component mounts
    document.body.classList.add("pulse-page");

    // Cleanup: remove class when component unmounts
    return () => {
      document.body.classList.remove("pulse-page");
    };
  }, []);

  return null;
}

