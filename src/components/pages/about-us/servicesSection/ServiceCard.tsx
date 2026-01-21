import Image from "next/image";

interface ServiceCardProps {
  icon: string;
  category: string;
  title: string;
  className?: string;
}

const ServiceCard = ({
  icon,
  category,
  title,
  className = "",
}: ServiceCardProps) => {
  return (
    <div
      className={`bg-white/50 rounded-2xl p-[1.88rem] flex flex-col gap-4 shrink-0 min-h-90 justify-between ${className}`}
    >
      <div className="w-12 h-12 flex items-center justify-center text-text-primary-100 relative">
        <Image
          src={icon}
          alt={title}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <div className="space-y-[1.19rem]">
        <p className="text-base! font-normal! leading-[100%]! text-text-primary-100! tracking-[-0.03125rem]!">
          {category}
        </p>
        <h4 className="text-[1.75rem]! font-medium! text-text-primary-100! leading-[100%]! tracking-[-0.0625rem]!">
          {title}
        </h4>
      </div>
    </div>
  );
};

export default ServiceCard;
