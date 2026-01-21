import { ReactNode, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

function LetterAnimation({ text }: { text: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setIsFontLoaded(true);
    })
  }, []);

  useEffect(() => {
    if(!isFontLoaded) return;

    const getLine = container.current;
    const splitLines = new SplitText(getLine, {
      type: "lines",
      linesClass: "SplitClass",
      mask: "lines",
    });

    gsap.set(getLine, { autoAlpha: 1 });
    gsap.set(splitLines.lines, { y: "100%" });

    const trigger = ScrollTrigger.create({
      trigger: getLine,
      start: "top bottom",
      once: true,
      onEnter: () => {
        gsap.to(splitLines.lines, {
          delay: 0.1,
          duration: 0.7,
          stagger: 0.1,
          y: 0,
          autoAlpha: 1,
          ease: "power3.out",
        });
      },
    });

    return () => {
      splitLines.revert();
      trigger.kill();
    }
  }, [text, isFontLoaded]);

  return (
    <span ref={container} className="_splitLines">
      {text}
    </span>
  );
}

export default LetterAnimation;
