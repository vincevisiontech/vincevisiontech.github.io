import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-cyan-500 to-violet-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-violet-500/35 hover:brightness-110",
        outline:
          "border border-cyan-400/40 text-cyan-100 hover:bg-cyan-500/10 hover:border-cyan-300/60",
        ghost: "text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50",
        whatsapp:
          "border border-emerald-400/50 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-[0.8rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
