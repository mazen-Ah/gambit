'use client'

import { 
  useEffect, 
  useRef, 
  useState, 
  ReactNode, 
  forwardRef, 
  useImperativeHandle 
} from 'react'
import Flickity from 'flickity'
import 'flickity/css/flickity.css'

export interface FlickityCarouselRef {
  flickityInstance: Flickity | null
  next: () => void
  previous: () => void
  resize: () => void
  reposition: () => void
}

export interface FlickityCarouselProps {
  children: ReactNode
  className?: string
  options?: any
  resizeOnMount?: boolean
  onScroll?: (flkty: Flickity, progress: number) => void
}

const FlickityCarousel = forwardRef<FlickityCarouselRef, FlickityCarouselProps>(
  function FlickityCarousel({ children, className = '', options = {}, resizeOnMount = false, onScroll }, ref) {
    const carouselRef = useRef<HTMLDivElement>(null)
    const flickityInstanceRef = useRef<Flickity | null>(null)
    const [isTouch] = useState(() => 
      typeof window !== 'undefined' && 'ontouchstart' in window
    )

    useEffect(() => {
      if (!carouselRef.current) return
      const currentRef = carouselRef.current

      const defaultOptions: any = {
        prevNextButtons: false,
        accessibility: true,
        pageDots: false,
        draggable: true,
        percentPosition: false,
        selectedAttraction: isTouch ? 0.05 : 0.01,
        contain: true, 
        adaptiveHeight: true,
        setGallerySize: true,
        cellAlign: 'left',
        friction: isTouch ? 0.4 : 0.2,
        groupCells: false,
        wrapAround: false, 
        rightToLeft: false,
        freeScroll: false, 
        ...options,
      }

      const flkty = new Flickity(currentRef, defaultOptions)
      if(onScroll) {
        flkty.on( 'scroll', (event: any)=> onScroll(flkty, event))
      }
      flickityInstanceRef.current = flkty

      if (resizeOnMount) {
        const timer = setTimeout(() => {
          flkty.resize()
          flkty.reposition()
        }, 100)

        return () => {
          clearTimeout(timer)
          flkty.destroy()
          flickityInstanceRef.current = null
        }
      }

      return () => {
        flkty.destroy()
        flickityInstanceRef.current = null
      }
    }, [isTouch, options, resizeOnMount])

    useImperativeHandle(
      ref,
      () => ({
        flickityInstance: flickityInstanceRef.current,
        next: () => flickityInstanceRef.current?.next(true, false),
        previous: () => flickityInstanceRef.current?.previous(true, false),
        resize: () => flickityInstanceRef.current?.resize(),
        reposition: () => flickityInstanceRef.current?.reposition(),
      }),
      []
    )

    return (
      <div className='space-x'>
        <div ref={carouselRef} className={`${className}`}>
          {children}
        </div>
      </div>
    )
  }
)

export default FlickityCarousel