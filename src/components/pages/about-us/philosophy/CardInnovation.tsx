import React from "react";
import Image from "next/image";

interface CardInnovationProps {
  title?: string;
  subtitle?: string;
}

const CardInnovation = ({ title, subtitle }: CardInnovationProps = {}) => {
  return (
    <div className="bg-white/50  rounded-4xl h-[46.8123rem] pt-23 overflow-hidden relative _eleX">
      <div className="mt-auto h-full">
        <div className="relative w-full h-full flex items-end justify-center -right-[25%] max-lg:-right-[37%] max-[600px]:-right-[23%]">
          <Image
            src="/images/innovation-card.svg"
            alt="Innovation Card"
            width={290}
            height={654}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="absolute top-[4.22rem] left-[3.67rem]   w-[45%] max-sm:w-[50%] gap-[0.62rem]">
        <h4 className="leading-[100%]! mb-2 text-[1.75rem]!">
          {title || <>Innovation <br /> by instinct</>}
        </h4>
        <p className="text-[1.3125rem]! leading-[150%]! font-normal! text-text-primary-100! mt-1">
          {subtitle || "We move with the times and, often, ahead of them"}
        </p>
      </div>
    </div>
  );
};

export default CardInnovation;
