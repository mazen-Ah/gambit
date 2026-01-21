import gsap from "gsap";

export const px = (n: number) => Number.isFinite(n) ? n : 0;
export const emPx = (el: HTMLDivElement) => parseFloat(getComputedStyle(el).fontSize) || 16;
export const getEm = (el: HTMLDivElement) => parseFloat(getComputedStyle(el).fontSize);
export const computeGridShift = (grid: HTMLDivElement, card: HTMLDivElement) => {
  const wrap = grid.parentElement;
  if(!wrap) return;

  const wrapRect = wrap.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const em    = emPx(card);
  const newW  = 60 * em;
  const edgeG = parseFloat(getComputedStyle(card).paddingLeft) || 0;

  // Calculate the future center of the card (assuming it expands to the right)
  // The left position remains the same relative to the grid, but the width increases.
  const futureCardCenter = cardRect.left + newW / 2;
  const wrapCenter = wrapRect.left + wrapRect.width / 2;

  let minCenter = wrapRect.left  + edgeG + newW / 2;
  let maxCenter = wrapRect.right - edgeG - newW / 2;

  if (minCenter > maxCenter) {
    minCenter = maxCenter = wrapCenter;
  }

  const desiredCenter = Math.min(Math.max(futureCardCenter, minCenter), maxCenter);

  const deltaCard = desiredCenter - futureCardCenter;

  const currentX = px(Number(gsap.getProperty(grid, "x")));
  return currentX + deltaCard;
}