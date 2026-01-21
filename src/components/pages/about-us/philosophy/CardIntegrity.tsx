import Image from "next/image";

interface CardIntegrityProps {
  title?: string;
  subtitle?: string;
}

const CardIntegrity = ({ title, subtitle }: CardIntegrityProps = {}) => {
  return (
    <div className="bg-white/50  rounded-4xl h-[46.8123rem] pt-23 overflow-hidden relative _eleX">
      <div className="mt-auto h-full">
        <div className="relative w-full h-full flex items-end justify-center ">
          <Image
            src="/images/integrity-card.svg"
            alt="Integrity Card"
            width={497}
            height={659}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] z-10 lg:w-[65%] max-sm:w-[55%] max-lg:w-[40%] justify-between flex flex-col items-center gap- bottom-5.5">
        <h4 className="text-white font-medium text-center text-[1.75rem]!">
          {title || <>Integrity <br /> in impact</>}
        </h4>
        <p className="text-white text-[1.3125rem]! leading-[150%]! font-normal! tracking-[-0.01563rem]! text-center max-w-82x">
          {subtitle || "Every message, every partnership, every headline. It all matters"}
        </p>
      </div>
    </div>
  );
};

export default CardIntegrity;
