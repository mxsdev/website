import React from "react"
import "../styles/globals.scss"

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-[800px] mx-auto px-4">
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout