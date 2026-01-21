import Image from "next/image";

interface AchievementCardProps {
  image: string;
  description: string;
  className?: string;
}

const AchievementCard = ({
  image,
  description,
  className = "",
}: AchievementCardProps) => {
  return (
    <div
      className={`relative w-full h-[36rem]  rounded-2xl overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={description}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-text-color-primary bg-white m-5 rounded-2xl">
        <p className="text-base! leading-[150%]! font-semibold! text-text-primary-100! ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AchievementCard;
