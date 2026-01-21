"use client";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useState } from 'react'

type AnimationTypes = "_eleX" | "_eleY" | Array<string>;

interface GeneralAnimationProps {
  children: React.ReactNode;
  dependencies?: any;
  containerRef?: any;
  triggerSelector?: string;
  staggerTime?: number;
  delayTime?: number;
  durationTime?: number;
  easeFunction?: string;
  start?: string;
  end?: string;
  markers?: boolean;
  type?: AnimationTypes;
  plus?: string;
  onEnter?: () => void;
  onComplete?: () => void;
}

function GeneralAnimation({ 
  children,
  dependencies,
  containerRef,
  triggerSelector,
  delayTime,
  staggerTime,
  durationTime,
  easeFunction,
  start,
  end,
  markers,
  type,
  plus,
  onEnter,
  onComplete,
}: GeneralAnimationProps) {
  useEffect(() => {
    if(!containerRef.current) return;

    const container = containerRef.current;

    const query = gsap.utils.selector(container);
    const target = triggerSelector ? query(triggerSelector) : container;

    let elements: any, 
    tweendProperties = {}, 
    ease: any,
    duration: any,
    delay: any,
    stagger: any;

    // Types
    if(type === "_eleX") {
      elements = query("._eleX");
      gsap.set(elements, { x: 40, autoAlpha: 0});
      tweendProperties = Object.assign(tweendProperties, { x: 0, autoAlpha: 1 });

      delay = delayTime || 0.25;
      duration = durationTime || 1; 
      ease = easeFunction || 'power3.out'; 
      stagger = staggerTime || 0.1;
    }

    if(type === "_eleY") {
      elements = query("._eleY");
      gsap.set(elements, { y: 40, autoAlpha: 0});
      tweendProperties = Object.assign(tweendProperties, { y: 0, autoAlpha: 1 });

      delay = delayTime || 0.25;
      duration = durationTime || 1; 
      ease = easeFunction || 'power3.out'; 
      stagger = staggerTime || 0.1;
    }

    // Plus
    if(plus === "PN") {
      gsap.set(elements, { pointerEvents: "none"});
      tweendProperties = Object.assign(tweendProperties, { pointerEvents: "auto" });
    }

    const trigger = ScrollTrigger.create({
      trigger: target,
      start: start || "top bottom",
      end: end || start || "top bottom",
      once: true,
      markers,
      onEnter: () => {
        if(type) {
          gsap.to(elements, { 
            delay,
            duration,
            stagger,
            ease,
            onComplete,
            ...tweendProperties
          });
        }
        onEnter?.();
      },
    });

    return () => trigger.kill();
  }, dependencies || []);

  return (
    <>
      {children}
    </>
  )
}

export default GeneralAnimation