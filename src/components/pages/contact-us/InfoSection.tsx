import React from "react";
import ArrowIcon from "./ArrowIcon";

interface InfoSectionProps {
  title: string;
  content: string;
  linkText?: string;
  useFullOpacity?: boolean;
  href?: string;
}

const InfoSection = ({
  title,
  content,
  linkText,
  useFullOpacity = false,
  href,
}: InfoSectionProps) => {
  const ContentWrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div>
      <div className="font-semibold text-text-primary-100 text-base">
        {title}
      </div>
      <ContentWrapper
        {...wrapperProps}
        className={`text-base! font-normal! leading-[160%]! tracking-[-0.03125rem]! block ${
          useFullOpacity ? "text-text-primary-100" : "text-text-primary-100/80"
        } ${href ? "hover:underline cursor-pointer" : ""}`}
      >
        {content}
      </ContentWrapper>
      {linkText && (
        <ContentWrapper
          {...wrapperProps}
          className="flex items-center gap-2 text-primary! text-base! font-normal! cursor-pointer mt-1"
        >
          {linkText} <ArrowIcon />
        </ContentWrapper>
      )}
    </div>
  );
};

export default InfoSection;
