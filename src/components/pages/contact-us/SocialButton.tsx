import React from "react";
import StrokeCanvasButton from "../../common/StrokeCanvasButton";

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

const SocialButton = ({ href, icon, ariaLabel }: SocialButtonProps) => (
  <StrokeCanvasButton
    wrapperClassName="w-auto h-auto before:bg-transparent border-text-primary-100/30 border-solid border-[1px] rounded-full"
    canvasColor="#ffffff"
  >
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full border border-white/30 hover:text-text-color-primary hover:bg-white/10 transition-colors duration-400 _eleY"
      aria-label={ariaLabel}
    >
      {icon}
    </a>
  </StrokeCanvasButton>
);

export default SocialButton;
