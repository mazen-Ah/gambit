import Image from "next/image";

interface CardCultureProps {
  title?: string;
  subtitle?: string;
}

const CultureFirstCard = ({ title, subtitle }: CardCultureProps = {}) => {
  return (
    <div className="bg-white/50  rounded-4xl h-[46.8123rem] pt-23 overflow-hidden relative _eleX">
      <div className="mt-auto h-full">
        <div className="relative w-full h-full flex items-end justify-center -left-[26.5%] max-lg:-left-[38%] max-[600px]:-left-[25%]">
          <Image
            src="/images/culture-card.svg"
            alt="Culture Card"
            width={265}
            height={659}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="absolute top-[55%] right-[4.36rem]  z-10 w-[46%] max-sm:w-[50%] flex flex-col gap-[0.62rem] h-[40%]">
        <h4 className="text-text-primary-100! text-[1.75rem]!">
          {title || "Culture First"}
        </h4>
        <p className=" text-text-primary-100! text-[1.3125rem]! leading-[150%] font-normal!">
          {subtitle || "Because the best work starts with the right people."}
        </p>
      </div>
    </div>
  );
};

export default CultureFirstCard;
