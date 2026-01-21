import Image from "next/image";

interface AwardCardProps {
  type: "wide" | "slim";
  category?: string;
  title: string;
  image: string;
  icon?: string;
  className?: string;
  svgColor?: string;
}

const AwardCard = ({
  type,
  category,
  title,
  image,
  icon,
  className = "",
  svgColor = "var(--secondary)",
}: AwardCardProps) => {
  const width =
    type === "wide"
      ? "w-[52rem] max-sm:w-[85vw]" // Wide cards: ~832px desktop, 85vw mobile
      : "w-[21.25rem] max-sm:w-77"; // Slim cards: ~340px desktop, 75vw mobile

  return (
    <div
      className={`shrink-0 ${width} h-140 max-sm:h-116 rounded-xl overflow-hidden relative ${className} border-none! _eleX`}
    >
      <div className="award-card absolute -top-[5em]! -bottom-[5em]! w-full">
        <div className="parallex-image absolute -left-[5em]! -right-[5em]! h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover h-full"
            data-speed="0.95"
          />
        </div>
      </div>

      {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" /> */}

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
        {category && <div className="text-[0.75rem]">{category}</div>}
        <h5 className={`${type === "wide" ? "max-w-[80%]" : "max-w-[60%]"} `}>
          {title}
        </h5>
      </div>

      <div className="absolute bottom-0 right-0 h-[6.5rem] w-[6.5rem] z-50 border-none!">
        {/* White Logo Container */}
        <div className="absolute top-[1.4em] right-0 z-[99] bottom-0 left-[1.4em] max-sm:top-[1em] max-sm:left-[1em] border-none! bg-white rounded-[0.625em] p-[0.5em] flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={icon || ""}
                alt="Award Badge"
                className="object-contain"
                fill
              />
            </div>
         
        </div>
        {/* Corner Shape */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 100 100"
          className="absolute inset-0 pointer-events-none border-none!"
        >
          <path
            fill={svgColor}
            d="M8 105v-8c0 3.21-2.5 8-8 8zM104 9V.578C104 3.788 101.5 9 96 9zM8 17a8 8 0 0 1 8-8h88v96H8z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 100 100"
          className="absolute inset-0 pointer-events-none border-none!"
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

export default AwardCard;
