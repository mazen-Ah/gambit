import React from "react";
import Image from "next/image";

interface AwardIconProps {
  icon: string;
  text: string;
  alt: string;
}

const AwardIcon = ({ icon, text, alt }: AwardIconProps) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-49.25 h-49.25 max-lg:w-[14.25rem] max-lg:h-[14.25rem] rounded-full bg-transparent border border-white/20 flex flex-col  gap-4 items-center justify-center">
      <Image
        src={icon}
        alt={alt}
        width={60}
        height={60}
        className="object-contain"
      />
      <p className="text-white text-xs! font-normal! text-center">{text}</p>
    </div>
  </div>
);

export default AwardIcon;
