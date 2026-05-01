"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
export function CheckboxWithState() {
  const [checked, setChecked] = React.useState(false)
  return (
    <div className="flex items-center space-x-2">
      <Checkbox type="checkbox" id="subscribe" checked={checked} onCheckedChange={setChecked} />
      <label htmlFor="subscribe">Subscribe to newsletter</label>
    </div>
  )
}