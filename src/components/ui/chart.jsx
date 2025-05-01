import { cn } from "../../utils/cn"

const ChartContainer = ({ children, config, className, ...props }) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
}

const ChartTooltip = ({ content, ...props }) => {
  return content
}

const ChartTooltipContent = ({ className, ...props }) => {
  return <div className={cn("rounded-lg border bg-gray-900 p-2 shadow-md border-gray-800", className)} {...props} />
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }

