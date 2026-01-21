import React from "react";

interface StatItemProps {
  label: string;
  children: React.ReactNode;
  showDivider?: boolean;
  className?: string;
}

const StatItem = ({
  label,
  children,
  showDivider = true,
  className = "",
}: StatItemProps) => (
  <>
    {showDivider && <div className="h-px bg-white/20 w-full" />}
    <div
      className={`flex items-center max-lg:justify-between py-15 max-md:py-10 ${className}`}
    >
      <div className="w-3/6 max-lg:max-w-[285px]!">
        <div className="px-6 py-3 rounded-full max-sm:w-full text-center  bg-transparent border border-white/20 text-white text-base! font-semibold! w-[15rem]">
          {label}
        </div>
      </div>
      <div className="flex items-center max-sm:items-end  gap-4 ">
        {children}
      </div>
    </div>
  </>
);

export default StatItem;
