"use client";

import { useRouter } from "next/navigation";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "transparent" | "white";
  text?: string;
  url?: string;
  icon?: React.ReactNode;
  action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  customClass?: string;
  blank?: boolean;
  iconContainerBg?: "white" | "primary";
  textClass?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  transparent: "bg-black/15 text-white hover:bg-black/25",
  white: "bg-white hover:bg-white/90",
};

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      text,
      icon,
      url,
      action,
      customClass = "",
      disabled,
      children,
      blank,
      iconContainerBg = "white",
      textClass = "",
      type,
      ...props
    },
    ref
  ) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (action && !disabled) action(e);
      if (url && !disabled) {
        if (blank) {
          window.open(url, "_blank");
        } else {
          router.push(url);
        }
      }
    };

    return (
      <button
        ref={ref}
        className={`flex items-center justify-center gap-[0.9375em] h-16  px-2.5 lg:pe-6 rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          variantClasses[variant]
        } ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${customClass}`}
        disabled={disabled}
        type={type || "button"}
        onClick={handleClick}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            {icon && (
              <span
                className={`w-11 h-11 aspect-square rounded-full flex items-center p-2 justify-center ${
                  iconContainerBg === "white" ? "bg-white" : "bg-primary"
                }`}
              >
                {icon}
              </span>
            )}
            {text && (
              <strong className={`uppercase tracking-[0.0625em] ${textClass}`}>
                {text}
              </strong>
            )}
          </>
        )}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";
