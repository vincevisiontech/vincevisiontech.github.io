import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="vv-eyebrow mb-3">{eyebrow}</p>
      <h2 className="vv-heading">{title}</h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
