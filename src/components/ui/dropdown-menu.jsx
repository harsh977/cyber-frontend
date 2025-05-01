"use client"

import React from "react"
import { cn } from "../../utils/cn"

const DropdownMenu = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (open) => {
    if (onOpenChange) {
      onOpenChange(open)
    } else {
      setIsOpen(open)
    }
  }

  return (
    <DropdownMenuContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuContext = React.createContext({
  open: false,
  onOpenChange: () => {},
})

const useDropdownMenuContext = () => {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu components must be used within a DropdownMenu provider")
  }
  return context
}

const DropdownMenuTrigger = React.forwardRef(({ children, asChild, ...props }, ref) => {
  const { open, onOpenChange } = useDropdownMenuContext()

  const handleClick = (e) => {
    e.preventDefault()
    onOpenChange(!open)
    props.onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick: handleClick,
      "aria-expanded": open,
    })
  }

  return (
    <button ref={ref} onClick={handleClick} aria-expanded={open} {...props}>
      {children}
    </button>
  )
})

DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(
  ({ children, className, align = "center", side = "bottom", sideOffset = 4, ...props }, ref) => {
    const { open, onOpenChange } = useDropdownMenuContext()
    const [mounted, setMounted] = React.useState(false)
    const containerRef = React.useRef(null)

    React.useEffect(() => {
      setMounted(true)

      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          onOpenChange(false)
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open, onOpenChange])

    if (!mounted || !open) return null

    return (
      <div
        ref={containerRef}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          "data-[side=top]:animate-slide-down-fade",
          "data-[side=bottom]:animate-slide-up-fade",
          "data-[side=left]:animate-slide-right-fade",
          "data-[side=right]:animate-slide-left-fade",
          className,
        )}
        data-side={side}
        {...props}
      >
        {children}
      </div>
    )
  },
)

DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
))

DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }

