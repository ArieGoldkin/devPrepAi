"use client"

import type React from "react"

export const LoadingView = (): React.JSX.Element => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-gray-600">Loading assessment questions...</p>
    </div>
  </div>
)