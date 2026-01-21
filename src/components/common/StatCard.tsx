import React from "react";

interface StatCardProps {
  value: string;
  suffix?: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix,
  label,
  className = "",
}) => {
  return (
    <div
      className={`stat_card flex flex-col gap-[1em] pl-[2.5em] border-l border-white/30 w-full sm:w-[50%] ${className}`}
      style={{ flex: "50% 0 0" }}
    >
      <h2 className="flex tracking-normal   max-[375px]:text-[7vw]!">
        <span className="odometer tracking-normal!" data-counter={value}></span>
        {suffix && <span>{suffix}</span>}
      </h2>
      <span className="max-[375px]:text-[2.5vw]!">{label}</span>
    </div>
  );
};

export default StatCard;
