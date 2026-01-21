import Image from "next/image";

interface AwardDisplayCardProps {
  category?: string;
  title: string;
  image: string;
  className?: string;
  svgColor?: string;
  icon?: string;
}

const AwardDisplayCard = ({
  category,
  title,
  image,
  className = "",
  svgColor = "#e3e7ef",
  icon,
}: AwardDisplayCardProps) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden ${className} h-140 max-sm:h-116`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover lg:scale-110 origin-center"
          data-speed="0.95"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
        {category && <div className="text-[0.75rem]">{category}</div>}
        <h5 className="max-w-[72%] max-lg:w-[100% - 20rem]">{title}</h5>
      </div>

      <div className="absolute bottom-0 right-0 h-[6.5rem] w-[6.5rem] z-50">
        <div className="absolute top-[1.4em] right-0 z-[99] bottom-0 left-[1.4em] max-sm:top-[1em] max-sm:left-[1em] bg-white rounded-[0.625em] p-[0.5em] flex items-center justify-center">
          <Image
            src={icon || "/images/logo-21.png"}
            alt="Award Badge"
            className="object-contain w-full h-full"
            width={64}
            height={50}
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 100 100"
          className="absolute inset-0 pointer-events-none "
        >
          <path
            fill={svgColor}
            d="M8 105v-8c0 3.21-2.5 8-8 8zM104 9V.578C104 3.788 101.5 9 96 9zM8 17a8 8 0 0 1 8-8h88v96H8z"
          />
        </svg>
      </div>
    </div>
  );
};

export default AwardDisplayCard;
