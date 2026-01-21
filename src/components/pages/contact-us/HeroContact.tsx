import React from "react";
import ListCardsContact from "./ListCardsContact";
import Badge from "../../common/Badge";

const HeroContact = (props: any) => {
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const subtitle = getText(data?.content?.title); // Swapped: title -> subtitle
  const description = getText(data?.content?.description);
  
  return (
    <div className="bg-primary w-full pb-0.5">
      <div className="relative pt-24 min-h-screen flex flex-col w-full">
        <div className=" text-white max-w-360 h-full m-auto text-center flex flex-col items-center justify-center gap-6 w-full space-y  ">
          <Badge className="">{subtitle || "Contact Us"}</Badge>
          <h1 className="hero__heading perspective-[1000px]">{title || "Let's Play."}</h1>
          {description && <p>{description}</p>}
        </div>
        <ListCardsContact data={data} />
      </div>
    </div>
  );
};

export default HeroContact;
