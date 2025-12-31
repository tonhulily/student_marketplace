import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 transform active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-0.5",
        outline:
          "border-2 border-gray-200 bg-white text-gray-700 hover:border-violet-500 hover:text-violet-600",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
        secondary: "bg-white text-violet-600 shadow-md hover:bg-gray-50",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

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

export default Button;