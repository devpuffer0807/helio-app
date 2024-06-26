export function rgba(hex: string, alpha: number): string | undefined {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const newHex = hex.replace(
    shorthandRegex,
    (m, r: string, g: string, b: string) => {
      return r + r + g + g + b + b;
    },
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
  if (!result) {
    return undefined;
  }

  const color = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };

  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}
