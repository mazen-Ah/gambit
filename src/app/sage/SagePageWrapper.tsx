"use client";

import { useEffect } from "react";

export default function SagePageWrapper() {
  useEffect(() => {
    // Add sage-page class to body when component mounts
    document.body.classList.add("sage-page");

    // Cleanup: remove class when component unmounts
    return () => {
      document.body.classList.remove("sage-page");
    };
  }, []);

  return null;
}

