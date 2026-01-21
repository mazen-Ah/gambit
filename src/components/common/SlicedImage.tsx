import React from 'react'

// "url(/images/dv1.webp)"
// "url(/images/dv1_bg.webp)"

function SlicedImage({ 
  FrontImageUrl,
  BackImageUrl,
  sliceCount = 8,
  color,
  yOffset = 0,
 }: {
  FrontImageUrl: string, 
  BackImageUrl: string,
  sliceCount?: number,
  yOffset?: number,
  color?: string
}) {
  const slices = Array.from({ length: sliceCount }, (_, i) => i + 1);
  const sliceHeightPct = 100 / slices.length;

  return (
    <>
      {slices.map((slice, idx) => {
        const sliceTopPct = idx * sliceHeightPct;
        return (
          <div
            key={idx}
            className="slice3d absolute left-0 right-0 slice_wrap perspective-[50em] will-change-transform transform-3d"
            style={{
              height: `${sliceHeightPct}%`,
              top: `${sliceTopPct - idx * 0.1}%`,
            }}
          >


            <div className="slice_node absolute inset-0 origin-center will-change-transform transform-3d">
              <div className="front_wrap absolute inset-0 overflow-hidden transform-3d">
        <div className={`absolute inset-0 bg-[${color}]! z-9999999 `}  />

                <div
                  className="face-front image-face absolute left-0 right-0"
                  style={{
                    height: `${sliceCount * 100}%`,
                    top: `-${idx * 100}%`,
                    backgroundImage: `url(${FrontImageUrl})`,
                    backgroundPosition: `50% ${yOffset}%`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backfaceVisibility: "hidden",
                    mixBlendMode: "multiply",
                  }}
                ></div>

              </div>
              <div
                className="back_wrap absolute inset-0 overflow-hidden"
                style={{
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="face-back image-face absolute left-0 right-0"
                  style={{
                    height: `${sliceCount * 100}%`,
                    top: `-${idx * 100}%`,
                    backgroundImage: `url(${BackImageUrl || FrontImageUrl})`,
                    backgroundPosition: `50% ${yOffset}%`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  )
}

export default SlicedImage