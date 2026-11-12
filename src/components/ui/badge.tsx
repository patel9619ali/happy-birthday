import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-white/20 text-white backdrop-blur-sm shadow",
        secondary:
          "border-transparent bg-amber-500/20 text-amber-200 border border-amber-500/30",
        destructive:
          "border-transparent bg-red-500 text-white shadow",
        outline: "text-white border-white/30",
        celebration:
          "border-pink-500/40 bg-pink-500/20 text-pink-200 shadow-sm shadow-pink-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
