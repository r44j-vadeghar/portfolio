import readingTime from "reading-time";

export function estimateReadingTime(text: string): number {
  const stats = readingTime(text);
  return Math.ceil(stats.minutes);
}
