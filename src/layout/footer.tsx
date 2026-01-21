"use client";

import { useCallback, useContext, useRef } from "react";
import Link from "@/src/components/common/Link";
import { CustomButton } from "../components/common/CustomButton";
import NewsletterForm from "../components/common/NewsletterForm";
import {
  FooterWaveIcon,
  GambitLogo,
  LetTalkIcon,
  AddressIcon,
  EmailIcon,
  PhoneIcon,
  TwitterIcon,
  LinkedInIcon,
  FacebookIcon,
} from "../components/Icons";
import HeroSVGCircle from "../components/pages/homePage/hero/HeroSVGCircle";
import GeneralAnimation from "../components/common/Animation/GeneralAnimation";
import StrokeCanvasButton from "../components/common/StrokeCanvasButton";
import FooterAnimation from "../components/common/Animation/FooterAnimation";
import { isMobileContext } from "../contexts/isMobileContext";

const Footer = () => {
  const { isMobile } = useContext(isMobileContext);

  const logoRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<{ [key: string]: gsap.core.Timeline }>({});

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      <HeroSVGCircle
        trigger="footer"
        color="var(--primary)"
        className="reversed"
      />
      {!isMobile && <FooterAnimation />}

      {/* Footer Content */}

      <div ref={bottomRef} className="relative z-10 px-8 md:px-20">
        <GeneralAnimation
          containerRef={bottomRef}
          staggerTime={0.05}
          type="_eleY"
        >
          {/* TOP SECTION - Logo, Newsletter, CTA */}
          <div
            ref={logoRef}
            className="flex flex-col md:flex-row lg:items-center justify-between gap-8 py-10"
          >
            <GeneralAnimation containerRef={logoRef} type="_eleX">
              {/* Logo */}
              <Link
                href="/"
                className="cursor-pointer _eleX"
                aria-label="Go to home"
              >
                <GambitLogo
                  className="w-[10.62rem] h-auto"
                  color="currentColor"
                />
              </Link>

              {/* Newsletter & CTA Side */}
              <div className="flex md:flex-row items-center gap-4  w-full max-lg:max-w-140 max-w-160 _eleX">
                <NewsletterForm />

                <CustomButton
                  variant="transparent"
                  text="Let's Talk"
                  icon={<LetTalkIcon className="text-primary!" />}
                  url="/contact-us"
                  iconContainerBg="white"
                  customClass="whitespace-nowrap pe-6!"
                  textClass="text-base font-semibold max-sm:pr-4"
                />
              </div>
            </GeneralAnimation>
          </div>

          {/* MIDDLE SECTION - Links & Contact */}
          <div className="border-t border-b  border-white/30 py-16 md:py-28 max-lg:py-12! max-lg:pb-8! flex max-sm:flex-col items-start justify-between gap-16 lg:gap-0">
            {/* Links Columns */}
            <div className="flex max-lg:justify-between w-full gap-8 md:gap-16 lg:gap-48 flex-1 max-lg:mr-20 ">
              {/* Quick Links */}
              <div className="flex flex-col gap-8">
                <span className="text-xs font-semibold uppercase tracking-wider _eleY">
                  Quick Links
                </span>
                <ul className="flex flex-col gap-4">
                  {[
                    { label: "Home", href: "/" },
                    { label: "About us", href: "/about-us" },
                    { label: "Careers", href: "/contact-us" },
                    { label: "Contact us", href: "/contact-us" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors duration-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Do */}
              <div className="flex flex-col gap-8 ">
                <span className="text-xs font-semibold uppercase tracking-wider _eleY">
                  What We Do
                </span>
                <ul className="flex flex-col gap-4">
                  {[
                    "PR & Thought Leadership",
                    "Social Media",
                    "Influencer Management",
                    "Campaign Strategy & Execution",
                  ].map((service) => (
                    <li key={service}>
                      <Link
                        href={`/#${service
                          .toLowerCase()
                          .replace(/[& ]/g, "-")}`}
                        className="text-white/80 hover:text-white transition-colors duration-400 _eleY"
                      >
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Divisions */}
              <div className="flex flex-col gap-8">
                <span className="text-xs font-semibold uppercase tracking-wider _eleY">
                  Our Divisions
                </span>
                <ul className="flex flex-col gap-4">
                  {[
                    { label: "Atelier", href: "/atelier" },
                    { label: "Pulse", href: "/pulse" },
                    { label: "Sage", href: "/sage" },
                    { label: "FWD", href: "/fwd" },
                  ].map((division) => (
                    <li key={division.label}>
                      <Link
                        href={division.href}
                        className="text-white/80 hover:text-white transition-colors duration-400 _eleY"
                      >
                        {division.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Blocks */}
            <div className="flex justify-end w-full sm:w-1/2 max-lg:w-1/3! max-sm:w-full!">
              <div className="flex flex-col w-full lg:max-w-[45.625em]">
                {/* Address Block */}
                <div className="flex lg:gap-36  max-lg:flex-col max-sm:flex-row! items-start  max-lg:gap-4  py-5 first:pt-0 max-lg:w-full!">
                  <div className="flex items-center justify-center gap-2 px-4 h-11 rounded-full bg-primary border border-white/30 min-w-[8.125em] shrink-0 _eleY">
                    <AddressIcon />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Address
                    </span>
                  </div>

                  <div className="flex-1  max-w-94 _eleY">
                    <span className="text-base ">
                      Gambit Communications, The Binary by Omniyat, Offices
                      P3-14 & P3-15, Business Bay, Dubai
                    </span>
                  </div>
                </div>

                {/* Email Block */}
                <div className="flex lg:gap-36 max-lg:flex-col max-sm:flex-row! items-start  gap-6 max-lg:gap-4 py-5">
                  <div className="flex items-center justify-center gap-2 px-4 h-11 rounded-full bg-primary border border-white/30 min-w-[8.125em] shrink-0 _eleY">
                    <EmailIcon />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Email
                    </span>
                  </div>

                  <div className="flex-1 flex  md:flex-row justify-between gap-6 w-full max-w-94">
                    <div className="flex flex-col gap-2 items-start flex-1 _eleY">
                      <strong className="text-sm md:text-base font-semibold">
                        General
                      </strong>
                      <a
                        href="mailto:info@gambit.ae"
                        className="relative inline-block text-white/80 hover:text-white transition-all duration-400 "
                      >
                        info@gambit.ae
                      </a>
                    </div>
                    <div className="flex flex-col gap-2 items-start flex-1 _eleY">
                      <strong className="text-sm md:text-base font-semibold">
                        Careers
                      </strong>
                      <a
                        href="mailto:careers@gambit.ae"
                        className="relative inline-block text-white/80 hover:text-white transition-all duration-400"
                      >
                        careers@gambit.ae
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Block */}
                <div className="flex lg:gap-36 max-lg:flex-col max-sm:flex-row! items-start max-lg:gap-4 py-5">
                  <div className="flex items-center justify-center gap-2 px-4 h-11 rounded-full bg-primary border border-white/30 min-w-[8.125em] shrink-0 _eleY">
                    <PhoneIcon />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Phone
                    </span>
                  </div>

                  <div className="flex-1 flex justify-between max-w-94 _eleY">
                    <div className="flex flex-col gap-2 items-start">
                      <strong className="text-sm md:text-base font-semibold">
                        Customer Service
                      </strong>
                      <a
                        href="tel:+97145786446"
                        className="relative inline-block text-white/80 hover:text-white transition-all duration-400 "
                      >
                        +971 (0) 4 578 6446
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION - Social & Copyright */}
          <div className="py-4 flex max-lg:flex-col flex-col-reverse md:flex-row items-center md:items-end  justify-between lg:gap-6 max-lg:gap-4!">
            {/* Social Links */}
            <div className="flex gap-3 max-lg:justify-start w-full">
              <StrokeCanvasButton
                wrapperClassName="w-auto h-auto before:bg-primary"
                canvasColor="#ffffff"
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full border border-white/30 hover:text-white hover:bg-white/10 transition-colors duration-400 _eleY"
                  aria-label="X (Twitter)"
                >
                  <TwitterIcon />
                </a>
              </StrokeCanvasButton>
              <StrokeCanvasButton
                wrapperClassName="w-auto h-auto before:bg-primary"
                canvasColor="#ffffff"
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full border border-white/30 hover:text-white hover:bg-white/10 transition-colors duration-400 _eleY"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </StrokeCanvasButton>
              <StrokeCanvasButton
                wrapperClassName="w-auto h-auto before:bg-primary"
                canvasColor="#ffffff"
              >
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full border border-white/30 hover:text-white hover:bg-white/10 transition-colors duration-400 _eleY"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </StrokeCanvasButton>
            </div>

            {/* Copyright */}
            <span className="text-sm! tracking-[-0.03125rem] text-end max-lg:text-start w-full _eleY">
              © 2025 Gambit Communications. All Rights Reserved.
            </span>
          </div>
        </GeneralAnimation>
      </div>
    </footer>
  );
};

export default Footer;
