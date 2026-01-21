import { useEffect, useState } from "react"
import type { Swiper as SwiperType } from "swiper"

export default function useHandleGeneralSwiperAutoRotate({
  swiperInstance,
  autoRotate,
  enteredViewPort,
}: {
  swiperInstance: SwiperType | null
  autoRotate?: boolean
  enteredViewPort: boolean
}) {
  const [hoverOnSwiper, setHoverOnSwiper] = useState(false)
  useEffect(() => {
    if (swiperInstance && autoRotate) {
      if (enteredViewPort && !hoverOnSwiper) {
        swiperInstance?.autoplay?.start()
      } else {
        swiperInstance?.autoplay?.stop()
      }

    }
  }, [swiperInstance, enteredViewPort, hoverOnSwiper, autoRotate])

  useEffect(() => {
    if (swiperInstance) {
      const handleMouseEnter = () => {
        swiperInstance.autoplay?.pause()
        setHoverOnSwiper(true)
      }
      const handleMouseLeave = () => {
        swiperInstance.autoplay?.resume()
        setHoverOnSwiper(false)
      }

      swiperInstance?.el?.addEventListener("mouseenter", handleMouseEnter)
      swiperInstance?.el?.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        swiperInstance?.el?.removeEventListener("mouseenter", handleMouseEnter)
        swiperInstance?.el?.removeEventListener("mouseleave", handleMouseLeave)
      }

    }
  }, [swiperInstance])

  return null
}

