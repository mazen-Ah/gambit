"use client";

import { useEffect } from "react";

export default function AtelierPageWrapper() {
  useEffect(() => {
    // Add atelier-page class to body when component mounts
    document.body.classList.add("atelier-page");

    // Cleanup: remove class when component unmounts
    return () => {
      document.body.classList.remove("atelier-page");
    };
  }, []);

  return null;
}

