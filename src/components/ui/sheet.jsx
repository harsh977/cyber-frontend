"use client"

import React from "react"
import { X } from "lucide-react"
import { cn } from "../../utils/cn"
import { Button } from "./button"

const Sheet = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (open) => {
    if (open !== undefined) {
      setIsOpen(open)
      onOpenChange?.(open)
    }
  }

  return (
    <SheetContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>{children}</SheetContext.Provider>
  )
}

const SheetContext = React.createContext({
  open: false,
  onOpenChange: () => {},
})

const useSheetContext = () => {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error("Sheet components must be used within a Sheet provider")
  }
  return context
}

const SheetTrigger = React.forwardRef(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = useSheetContext()

  const handleClick = (e) => {
    e.preventDefault()
    onOpenChange(true)
    props.onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick: handleClick,
    })
  }

  return (
    <button ref={ref} onClick={handleClick} {...props}>
      {children}
    </button>
  )
})

SheetTrigger.displayName = "SheetTrigger"

const SheetClose = React.forwardRef(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = useSheetContext()

  const handleClick = (e) => {
    e.preventDefault()
    onOpenChange(false)
    props.onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick: handleClick,
    })
  }

  return (
    <button ref={ref} onClick={handleClick} {...props}>
      {children}
    </button>
  )
})

SheetClose.displayName = "SheetClose"

const SheetContent = React.forwardRef(({ children, side = "right", className, ...props }, ref) => {
  const { open, onOpenChange } = useSheetContext()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    // Add body scroll lock when sheet is open
    if (open) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!mounted) return null

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 h-full gap-4 bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out",
          {
            "inset-y-0 left-0 border-r": side === "left",
            "inset-y-0 right-0 border-l": side === "right",
            "inset-x-0 top-0 border-b": side === "top",
            "inset-x-0 bottom-0 border-t": side === "bottom",
          },
          className,
        )}
        {...props}
      >
        {children}
        <Button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
          variant="ghost"
          size="icon"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
})

SheetContent.displayName = "SheetContent"

const SheetHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)

SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)

SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
))

SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))

SheetDescription.displayName = "SheetDescription"

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }

