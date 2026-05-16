"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
        "data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-4 data-[size=sm]:w-8",
        "data-checked:bg-primary data-unchecked:bg-surface-cream-strong",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-md transition-all duration-300",
          "group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-3",
          "group-data-[size=default]/switch:data-checked:translate-x-5",
          "group-data-[size=sm]/switch:data-checked:translate-x-4",
          "group-data-[size=default]/switch:data-unchecked:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
