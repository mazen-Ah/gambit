"use client";

import StatCard from "@/src/components/common/StatCard";
import { useEffect } from "react";
import Odometer from "odometer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LetterAnimation from "@/src/components/common/Animation/LetterAnimation";

const stats = [
  { value: "258", suffix: "", label: "Nominations" },
  { value: "96", suffix: "", label: "Awards" },
  { value: "8", suffix: "x", label: "Agency of the Year" },
  { value: "300", suffix: "+", label: "Clients in 10+ Industries" },
];

const HeroSectionStats = (data: any) => {
  useEffect(() => {
    const facts = document.querySelectorAll(
      ".odometer"
    ) as NodeListOf<HTMLElement>;
    const triggers: any = [];

    facts.forEach((ele: HTMLElement, index) => {
      new Odometer({
        el: ele,
        format: "(,ddd).dd",
      });

      triggers.push(
        ScrollTrigger.create({
          id: "animation-",
          invalidateOnRefresh: true,
          trigger: ele,
          start: "0% 100%",
          scrub: 1,
          onEnter: function () {
            ele.innerHTML = ele.dataset.counter || "";
          },
          onLeaveBack: function () {
            ele.innerHTML = "0";
          },
        })
      );
    });

    return () => {
      triggers.forEach((trigger: any) => trigger.kill());
    };
  }, []);
  return (
    <div className="flex flex-col min-[601px]:flex-row items-start justify-between gap-[4em] py-[5em]">
      <div className="w-full lg:max-w-[55em] max-lg:w-full">
        <h3 className="max-[601px]:leading-[125%]!">
          <LetterAnimation text={data?.data?.title} />
        </h3>
      </div>
      <div className="w-full lg:max-w-[45.3125em]">
        <div className="flex flex-wrap gap-y-[4.5em]">
          {data?.data?.stats.map((stat: any, index: number) => (
            <StatCard
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionStats;
