"use client";

import { useTextScramble } from "@/lib/use-text-scramble";
import { cn } from "@/lib/utils";

export function ScrambleHeading({
  text,
  as: Tag = "h2",
  className,
  speed = 26,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  speed?: number;
}) {
  const { ref, output } = useTextScramble(text, speed);
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={cn("vv-mono-whitespace", className)} data-text={text}>
      {output}
    </Tag>
  );
}
