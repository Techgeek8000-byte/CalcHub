"use client"

import { Toaster as Sonner } from "sonner"

const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "!bg-white !text-slate-900 !shadow-lg !rounded-xl !border !border-slate-200",
          title: "!font-semibold",
        },
      }}
    />
  )
}

export { Toaster }