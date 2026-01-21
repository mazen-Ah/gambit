"use client";

import { useEffect } from "react";

export default function DivisionPageWrapper({
  divisionId,
}: {
  divisionId: string;
}) {
  useEffect(() => {
    // Add division-specific class to body
    const className = `${divisionId}-page`;
    document.body.classList.add(className);

    // Cleanup
    return () => {
      document.body.classList.remove(className);
    };
  }, [divisionId]);

  return null;
}
