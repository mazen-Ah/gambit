import React from "react";
import Shapes from "../../common/Animation/Shapes";
import Badge from "../../common/Badge";

const HeroPlayers = (props: any) => {
  const data = props.data || props;
  
  // Helper function to get text from multilingual object
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };

  const title = getText(data?.content?.title) || 'The Players';
  const subtitle = getText(data?.content?.subtitle) || 'Meet the players behind every winning move.';
  const description = getText(data?.content?.description) || 'The thinkers, creators, and communicators shaping stories across the region';
  
  return (
    <div className="bg-primary w-full relative">
      <div className="relative pt-24 min-h-screen flex flex-col w-full ">
        <div className=" text-white max-w-360 h-full m-auto text-center flex flex-col items-center justify-center gap-6 w-full relative z-9">
          <Badge className="">{title}</Badge>
          <h1 className="hero__heading perspective-[1000px] max-w-297">
            {subtitle}
          </h1>
          <p className="hero__paragraph">
            {description}
          </p>
        </div>
      </div>
      <Shapes
        className="animated_svg shape_b top-[7.5rem]! right-[20rem]! absolute lg:translate-x-[50%]! max-sm:-translate-x-[50%]!"
        dataSpeed="1.2"
      >
        <svg
          width="751"
          height="982"
          viewBox="0 0 751 982"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M550.398 293.934C504.68 200.155 466.642 102.302 436.888 1.27358L340.309 171.953L194.473 112.291L195.233 269.857L1.23749 295.271C83.7937 360.665 160.306 432.555 230.165 510.042M349.722 657.949C481.714 835.162 582.198 1035.29 645.346 1249.72M642.828 460.149C757.778 648.861 905.774 816.931 1081 955.726M713.677 412.336L278.45 706.047L172.457 548.985L607.685 255.274L713.677 412.336ZM1250.95 1052.04L670.648 1443.66L572.809 1298.68L1153.11 907.06L1250.95 1052.04Z"
            stroke="white"
            strokeOpacity="0.3"
            strokeMiterlimit="10"
          />
        </svg>
      </Shapes>
    </div>
  );
};

export default HeroPlayers;
