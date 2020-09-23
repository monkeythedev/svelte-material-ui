export function getUnevenImageSize(counter, base, variance, preAdd = num => num) {
  const mid = (counter % 2 ? Math.cos : Math.sin)(counter) * variance;
  return base + Math.floor(preAdd(mid));
}