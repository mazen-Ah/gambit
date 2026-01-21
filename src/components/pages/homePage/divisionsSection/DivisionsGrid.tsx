"use client";

import { useRef } from "react";
import DivisionCard, { Division } from "./DivisionCard";

interface DivisionsGridProps {
  divisions: Division[];
}

const DivisionsGrid = ({ divisions }: DivisionsGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} className="dv_grid_set">
      <div
        ref={gridRef}
        className="dv_grid flex flex-col min-[600px]:flex-row gap-[2em] lg:gap-0"
      >
        {divisions?.map((division, i) => (
          <DivisionCard
            key={division.id}
            division={division}
          />
        ))}
      </div>
    </div>
  );
};

export default DivisionsGrid;
