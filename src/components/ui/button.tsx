import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:shadow-blue-500/40",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/40",
        secondary:
          "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10",
        ghost: "text-white/80 hover:bg-white/10 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline",
        celebrate:
          "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 border border-white/20 font-bold",
        gold: "bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/30 hover:bg-amber-300 hover:scale-105",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base tracking-wide font-bold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
