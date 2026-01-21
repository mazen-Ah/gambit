"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "@/src/components/common/Link";
import Image from "next/image";
import { GambitLogo } from "../components/Icons";
import BurgerMenu from "../components/common/Menu/BurgerMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isFwdPage = pathname === "/fwd";

  return (
    <>
      <div className="header_side fixed top-15 z-998 flex items-center justify-end gap-[0.5em] w-full space-x _hide">
        <a
          href="#"
          aria-label="Let's Talk"
          className="icon_button w-[11.5em] h-[4em] pr-[1.5625em] pl-[0.625em] flex items-center gap-[0.9375em] overflow-hidden rounded-full whitespace-nowrap bg-[rgba(0,0,0,.15)]"
        >
          <span className="icon_set flex items-center justify-center size-[2.75em] aspect-square rounded-full bg-white">
            <svg
              className="_shape w-[1.5em] text-primary!"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 14h1.502a2.5 2.5 0 0 0 2.5-2.5v-5a2.5 2.5 0 0 0-2.5-2.5h-9a2.5 2.5 0 0 0-2.5 2.5V8m7.5 0h-9a2.5 2.5 0 0 0-2.5 2.5v5a2.5 2.5 0 0 0 2.5 2.5h.5v2.5l4.5-2.5h4a2.5 2.5 0 0 0 2.5-2.5v-5a2.5 2.5 0 0 0-2.5-2.5"
              ></path>
            </svg>
          </span>
          <strong className="uppercase text-white tracking-[0.0625em]">
            Let’s Talk
          </strong>
        </a>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`menu_button ${
            isOpen ? "active" : ""
          } icon_button w-[4em] lg:w-[8.85em] h-[4em] pr-[1.5625em] pl-[0.625em] flex items-center gap-[0.9375em] overflow-hidden rounded-full bg-white cursor-pointer`}
        >
          <ul className="icon_set flex flex-col items-center justify-center gap-[0.25em] size-[2.75em] aspect-square rounded-full bg-primary">
            <li className="bg-white h-0.5 w-[0.9em]"></li>
            <li className="bg-white h-0.5 w-[0.9em]"></li>
            <li className="bg-white h-0.5 w-[0.9em]"></li>
          </ul>
          <div className="menu_button_label relative text-primary">
            <strong
              className="uppercase pink_color _open tracking-[0.0625em] _open"
              data-hover="Menu"
            >
              Menu
            </strong>
            <strong
              className="uppercase pink_color _close absolute left-0 opacity-0 _close"
              data-hover="Close"
            >
              Close
            </strong>
          </div>
        </div>
      </div>
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
