"use client"

import React from "react"
import { cn } from "../../utils/cn"

const Switch = React.forwardRef(({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked || false)

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])

  const handleChange = (e) => {
    const newChecked = e.target.checked
    if (checked === undefined) {
      setIsChecked(newChecked)
    }
    onCheckedChange?.(newChecked)
  }

  return (
    <label
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors",
        isChecked ? "bg-cyan-500" : "bg-gray-700",
        className,
      )}
      {...props}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        ref={ref}
      />
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          isChecked ? "translate-x-5" : "translate-x-1",
        )}
      />
    </label>
  )
})

Switch.displayName = "Switch"

export { Switch }

