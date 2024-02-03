const elementToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

export const convertRgbToHex = (r: number, g: number, b: number): string => {
  return `#${elementToHex(r)}${elementToHex(g)}${elementToHex(b)}`;
};
