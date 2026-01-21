"use client";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";

export interface GameItem {
  title: string;
  description: string;
  icon: string;
}

interface GameGridProps {
  items: GameItem[];
}

const GameGrid = ({ items }: GameGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="grid max-[601px]:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative z-10">
        {items?.map((item, index) => (
          <GameCard
            key={index}
            index={index}
            activeIndex={hoveredIndex}
            title={item.title}
            description={item.description}
            icon={item.icon}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
