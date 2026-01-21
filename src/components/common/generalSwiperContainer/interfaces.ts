import type { ReactNode } from "react"
import type { Swiper as SwiperType } from "swiper"

export interface IGeneralSwiperProps {
  breakPointsObject?: { [key: number]: { [key: string]: any } }
  swiperKey: string
  children: ReactNode
  slideEffect?: boolean
  customClass?: string
  onChangeSlider?: (currActive: number) => void
  autoRotate?: boolean
  speed?: number
  slideFade?: boolean
  initialSlide?: number
  baseSlidesPerView?: number | "auto"
  setSwiper?: (swiper: SwiperType) => void
  setSwiperActiveIndex?: React.Dispatch<React.SetStateAction<number>>
  swiperActiveIndex?: number
  baseSpaceBetween?: number
  slidesPerGroup?: number
  customNextBtnClass?: string
  customPrevBtnClass?: string
  noDrag?: boolean
  noMouseWheel?: boolean
  noKeyboardInteractions?: boolean
  loop?: boolean
  enableFreeMode?: boolean
  onProgressFn?: (swiper: SwiperType, progress: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
  direction?: "vertical" | "horizontal"
  thumbs?: any
  isDragging?: boolean
  centeredSlides?: boolean
  slidesOffsetAfter?: number
  slidesOffsetBefore?: number
  centerInsufficientSlides?: boolean
  onSlidePositionChange?: (status: {
    isFirst: boolean
    isLast: boolean
  }) => void
  setSwiperRef?: React.Dispatch<React.SetStateAction<SwiperType | null>>
  showMainArrows?: boolean
  onTouchClass?: string
  slidesPerView?: {
    desktop?: number
    tablet?: number
    mobile?: number
  }
  loopAdditionalSlides?: number
  centeredSlidesBounds?: boolean
  paginationEl?:string
  withoutAnimation?: boolean
  limitPaginationToOriginalSlides?: boolean
  originalSlidesCount?: number
  watchSlidesProgress?: boolean
}
