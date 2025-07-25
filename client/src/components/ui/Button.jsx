import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:shadow-glow hover:scale-105 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg",
        outline: "border border-border bg-card/50 backdrop-blur-sm hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
        ghost: "hover:bg-primary/10 hover:text-primary transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        premium: "bg-gradient-financial text-background font-bold hover:shadow-glow hover:scale-105 transform transition-all duration-300",
        gold: "bg-gradient-gold text-accent-foreground font-bold hover:shadow-lg hover:scale-105 transform transition-all duration-300",
        glass: "bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10 hover:shadow-glow transition-all duration-300",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-10 text-lg font-bold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
