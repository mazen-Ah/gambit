"use client";

import { useEffect } from "react";

export default function FwdPageWrapper() {
  useEffect(() => {
    // Add fwd-page class to body when component mounts
    document.body.classList.add("fwd-page");

    // Cleanup: remove class when component unmounts
    return () => {
      document.body.classList.remove("fwd-page");
    };
  }, []);

  return null;
}
