import Image from "next/image";
import { QuoteIcon } from "../../../Icons";

interface QuoteCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  className?: string;
}

const QuoteCard = ({
  quote,
  author,
  role,
  avatar,
  className = "",
}: QuoteCardProps) => {
  return (
    <div
      className={`shrink-0 w-85 max-sm:w-77  h-140 max-sm:h-116 bg-white/50 rounded-xl p-6 flex flex-col justify-between ${className} _eleX`}
    >
      <div className="space-y-6">
        <div className="text-text-primary-100/30 ">
          <QuoteIcon />
        </div>
        <h5 className=" text-text-primary-100">{quote}</h5>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden relative">
          <Image
            src={avatar}
            alt={author}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 leading-[100%]!">
          <div className="text-text-primary font-semibold text-base! leading-[100%]!">{author}</div>
          <div className="text-text-color-primary opacity-50 font-semibold tracking-[1px]! leading-[100%]! text-xs">{role.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
