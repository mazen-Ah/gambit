'use client'

import gsap from 'gsap';
import { useEffect, useRef } from 'react'

function HeroSVGCircle({ trigger, className, color }: { trigger?: string, className?: string, color: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    if(wrapperRef.current === null) return;
		
    let start;
    let wrap = wrapperRef.current;

    const circlePath = wrap.querySelector('path');
		
		if (!circlePath) return;

		let isReversed = wrap.classList.contains('reversed');
		if(isReversed) {
			start = 'M 0 0 L 0 0 Q 400 60 800 0 L 800 0 Z';
		} else {
			start = 'M 0 0 L 0 0 Q 400 150 800 0 L 800 0 Z';
		}
		const end   = 'M 0 0 L 0 0 Q 400 0 800 0 L 800 0 Z';

		circlePath.setAttribute('shape-rendering', 'geometricPrecision');

		gsap.timeline({
			scrollTrigger: {
				trigger: trigger || wrap,
				start: function(){ return !isReversed ? "100% 100%" : "0% 100%" },
				end:   function(){ return !isReversed ? "100% 0%" : "100% 100%" },
				scrub: 0.4,
				invalidateOnRefresh: true,
			},
			defaults:{ ease:'none' }
		})
		.fromTo(circlePath,
			{ morphSVG: { shape: start, shapeIndex: 0 } },
			{ morphSVG: { shape: end, shapeIndex: 0 } }
		);
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={`circle_motion absolute left-0 right-0 z-99 pointer-events-none ${className}`}
    >
      <svg className="will-change-transform w-full" xmlns="http://www.w3.org/2000/svg" width="800" height="300" fill="none" viewBox="0 0 800 300" preserveAspectRatio="none">
        <path className="will-change-transform" d="M 0 0 L 0 0 Q 400 300 800 0 L 800 0 Z" fill={color} />
      </svg>
    </div>
  )
}

export default HeroSVGCircle