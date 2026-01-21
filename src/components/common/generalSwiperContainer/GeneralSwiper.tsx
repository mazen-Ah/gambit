"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/parallax";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";
import "swiper/css/pagination";

import { useContext, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import {
  Autoplay,
  EffectCreative,
  EffectFade,
  FreeMode,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Thumbs,
} from "swiper/modules";
import { Swiper } from "swiper/react";

import type { IGeneralSwiperProps } from "./interfaces";
import useHandleGeneralSwiperAutoRotate from "./useHandleGeneralSwiperAutoRotate";
import { generalSwiperDataContext } from "@/src/app/contexts/GeneralSwiperDataContext";
import useSwiperArrowsStore from "@/src/app/stores/useSwiperArrowsStore";
import useIsInViewPort from "@/src/app/hooks/useIsInViewPort";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import gsap from "gsap";

export default function GeneralSwiper({
  breakPointsObject,
  children,
  slidesPerGroup,
  swiperKey,
  autoRotate,
  baseSlidesPerView,
  baseSpaceBetween,
  customClass,
  initialSlide,
  onChangeSlider,
  setSwiper,
  setSwiperActiveIndex,
  slideEffect,
  slideFade,
  speed,
  noDrag,
  customNextBtnClass,
  customPrevBtnClass,
  noMouseWheel,
  noKeyboardInteractions,
  loop,
  enableFreeMode,
  onProgressFn,
  onDragStart,
  onDragEnd,
  thumbs,
  direction = "horizontal",
  isDragging,
  slidesOffsetAfter,
  slidesOffsetBefore,
  centeredSlides,
  onSlidePositionChange,
  setSwiperRef,
  showMainArrows,
  centerInsufficientSlides,
  onTouchClass,
  slidesPerView,
  swiperActiveIndex,
  loopAdditionalSlides,
  centeredSlidesBounds,
  paginationEl,
  limitPaginationToOriginalSlides,
  originalSlidesCount,
  watchSlidesProgress
}: IGeneralSwiperProps) {
  const swiperInstance = useRef<SwiperType>(null);
  const { isMobile, isTablet } = useContext(isMobileContext);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const { enteredViewPort } = useIsInViewPort(swiperContainerRef);
  const [swiperInstanceForHook, setSwiperInstanceForHook] =
    useState<SwiperType | null>(null);
  const { handleChangeSwiperPagination } = useContext(generalSwiperDataContext);
  const {
    removeSwiperExceedsScreenWidth,
    addSwiperExceedsScreenWidth,
    addSwiperInstance,
    replaceSwiperInstance,
  } = useSwiperArrowsStore((state) => state);

  useHandleGeneralSwiperAutoRotate({
    autoRotate,
    enteredViewPort,
    swiperInstance: swiperInstanceForHook,
  });

  useEffect(() => {
    if (swiperInstance.current) {
      if (setSwiperRef) setSwiperRef(swiperInstance.current);
      swiperInstance.current.allowTouchMove = !noDrag;
    }
  }, [noDrag, setSwiperRef]);

  // Handle pagination bullets for duplicated slides
  useEffect(() => {
    if (
      !limitPaginationToOriginalSlides ||
      !originalSlidesCount ||
      !swiperInstance.current
    ) {
      return;
    }

    const hidePaginationBullets = () => {
      const paginationSelector =
        paginationEl || `.swiper-pagination-${swiperKey}`;
      const paginationContainer =
        swiperContainerRef.current?.querySelector(paginationSelector) ||
        document.querySelector(paginationSelector);

      if (paginationContainer) {
        const bullets = paginationContainer.querySelectorAll(
          ".swiper-pagination-bullet"
        );
        bullets.forEach((bullet: Element, index: number) => {
          if (index >= originalSlidesCount) {
            (bullet as HTMLElement).style.display = "none";
          } else {
            (bullet as HTMLElement).style.display = "";
          }
        });
      }
    };

    const updatePaginationActiveState = (swiper: SwiperType) => {
      if (!originalSlidesCount) return;

      const paginationSelector =
        paginationEl || `.swiper-pagination-${swiperKey}`;
      const paginationContainer =
        swiperContainerRef.current?.querySelector(paginationSelector) ||
        document.querySelector(paginationSelector);

      if (paginationContainer) {
        const bullets = paginationContainer.querySelectorAll(
          ".swiper-pagination-bullet"
        );
        const realIndex = swiper.realIndex % originalSlidesCount;

        // Remove active class from all bullets
        bullets.forEach((bullet: Element) => {
          bullet.classList.remove("swiper-pagination-bullet-active");
        });

        // Add active class to the mapped bullet
        if (bullets[realIndex]) {
          bullets[realIndex].classList.add("swiper-pagination-bullet-active");
        }
      }
    };

    const addBulletClickHandlers = () => {
      const paginationSelector =
        paginationEl || `.swiper-pagination-${swiperKey}`;
      const paginationContainer =
        swiperContainerRef.current?.querySelector(paginationSelector) ||
        document.querySelector(paginationSelector);

      if (paginationContainer && swiperInstance.current) {
        const bullets = paginationContainer.querySelectorAll(
          ".swiper-pagination-bullet"
        );
        bullets.forEach((bullet: Element, index: number) => {
          if (index < originalSlidesCount) {
            // Remove default Swiper click handler and add custom one
            (bullet as HTMLElement).onclick = (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (swiperInstance.current) {
                swiperInstance.current.slideToLoop(index);
              }
            };
          }
        });
      }
    };

    // Run immediately and after a short delay to ensure Swiper has rendered
    hidePaginationBullets();
    const timeoutId = setTimeout(() => {
      hidePaginationBullets();
      addBulletClickHandlers();
    }, 100);

    // Add slideChange event listener to handle pagination active state
    const handleSlideChange = () => {
      updatePaginationActiveState(swiperInstance.current!);
    };

    swiperInstance.current.on("slideChange", handleSlideChange);
    // Update immediately for current slide
    updatePaginationActiveState(swiperInstance.current);

    return () => {
      clearTimeout(timeoutId);
      swiperInstance.current?.off("slideChange", handleSlideChange);
    };
  }, [
    limitPaginationToOriginalSlides,
    originalSlidesCount,
    swiperKey,
    paginationEl,
  ]);

  return (
    <div ref={swiperContainerRef} className="w-full h-full">
      <Swiper
        direction={direction}
        initialSlide={initialSlide}
        modules={[
          Navigation,
          Pagination,
          Keyboard,
          Mousewheel,
          Autoplay,
          EffectFade,
          EffectCreative,
          Parallax,
          FreeMode,
          Thumbs,
        ]}
        allowTouchMove={!noDrag}
        parallax
        thumbs={thumbs}
        data-swiper-parallax="-100%"
        navigation={
          showMainArrows
            ? true
            : {
                nextEl: customNextBtnClass || `.swiper-next-btn-${swiperKey}`,
                prevEl: customPrevBtnClass || `.swiper-prev-btn-${swiperKey}`,
              }
        }
        pagination={{
          el: paginationEl || `.swiper-pagination-${swiperKey}`,
          clickable: true,
        }}
        slidesPerGroup={slidesPerGroup}
        keyboard={
          !noKeyboardInteractions && {
            enabled: true,
            onlyInViewport: true,
          }
        }
        mousewheel={
          !noMouseWheel && {
            forceToAxis: true,
          }
        }
        loop={loop}
        centerInsufficientSlides={centerInsufficientSlides}
        loopAdditionalSlides={loopAdditionalSlides}
        centeredSlidesBounds={centeredSlidesBounds}
        breakpoints={{
          0: {
            slidesPerView: baseSlidesPerView || 1,
            spaceBetween:
              baseSpaceBetween || baseSpaceBetween == 0 ? baseSpaceBetween : 30,
          },
          ...breakPointsObject,
        }}
        speed={speed || 1000}
        effect={slideEffect ? "creative" : slideFade ? "fade" : undefined}
        fadeEffect={{
          crossFade: true,
        }}
        centeredSlides={centeredSlides}
        creativeEffect={
          slideEffect
            ? {
                prev: {
                  translate: ["-20%", 0, -1],
                },
                next: {
                  translate: ["100%", 0, 0],
                },
              }
            : {}
        }
        autoplay={
          enteredViewPort && autoRotate
            ? {
                delay: 5000,
              }
            : false
        }
        key={swiperKey}
        className={`${customClass}`}
        onSwiper={(swiper: SwiperType) => {
          swiperInstance.current = swiper;
          setSwiperInstanceForHook(swiper);
          if (setSwiper) setSwiper(swiper);

          // Ensure swiper instance is added to store immediately
          if (swiperKey) {
            addSwiperInstance({
              swiperInstance: swiper,
              swiperKey: swiperKey,
            });
          }

          handleChangeSwiperPagination(
            swiperKey,
            (swiper as unknown as { virtualSize: number; size: number })
              .virtualSize >
              (swiper as unknown as { virtualSize: number; size: number }).size
          );
          const checkSwiperWidth = () => {
            if (
              (swiper as unknown as { virtualSize: number; size: number })
                .virtualSize -
                (slidesOffsetAfter || 0) >
              (swiper as unknown as { virtualSize: number; size: number }).size
            ) {
              addSwiperExceedsScreenWidth(swiperKey);
            } else {
              removeSwiperExceedsScreenWidth(swiperKey);
            }
          };

          checkSwiperWidth();
          window.addEventListener("resize", checkSwiperWidth);
        }}
        onSlideChange={(swiper) => {
          // Prefer realIndex so consumers get index within original dataset
          // if (onChangeSlider) onChangeSlider(swiper.index)
          // if (setSwiperActiveIndex) setSwiperActiveIndex(swiper.index)
          if (onChangeSlider) onChangeSlider(swiper.realIndex);
          if (setSwiperActiveIndex) setSwiperActiveIndex(swiper.realIndex);
          replaceSwiperInstance({
            swiperInstance: swiper,
            swiperKey: swiperKey,
          });
          if (typeof onSlidePositionChange === "function") {
            onSlidePositionChange({
              isFirst: swiper.isBeginning,
              isLast: swiper.isEnd,
            });
          }
        }}
        freeMode={{
          enabled: enableFreeMode,
        }}
        watchSlidesProgress={watchSlidesProgress}
        onProgress={(swiper, progress) => {
          // if (!isDragging && onProgressFn) onProgressFn();
          onProgressFn?.(swiper, progress);
        }}
        onTouchStart={(swiper) => {
          if (onDragStart) onDragStart();
        }}
        onTouchEnd={() => {
          if (onDragEnd) onDragEnd();
        }}
        slidesOffsetAfter={slidesOffsetAfter}
        slidesOffsetBefore={slidesOffsetBefore}
      >
        {children}
      </Swiper>
    </div>
  );
}
