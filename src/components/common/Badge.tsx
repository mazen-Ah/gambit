import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  icon?: React.ReactNode;
  textClassName?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  animationClass = "_eleY",
  icon,
  textClassName = "",
}) => {
  return (
    <div
      className={`${animationClass} flex items-center justify-center gap-2 px-[0.9375em] h-11 rounded-full border  border-white/30 bg-transparent w-fit ${className}`}
    >
      {icon && (
        <span className="w-[0.85rem] flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className={`text-xs font-semibold uppercase tracking-[1px] ${textClassName}`}>
        {children}
      </span>
    </div>
  );
};

export default Badge;

