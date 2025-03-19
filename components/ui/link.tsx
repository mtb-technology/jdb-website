import { cn } from "@/lib/utils"
import NextLink from "next/link"
import { ComponentPropsWithoutRef, forwardRef } from "react"

export interface LinkProps extends ComponentPropsWithoutRef<typeof NextLink> {
  className?: string
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <NextLink
        className={cn(
          "font-medium text-primary underline-offset-4 hover:underline",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)
Link.displayName = "Link"

export { Link }
