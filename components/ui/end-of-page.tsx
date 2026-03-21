"use client"

export default function EndOfPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-12">
      {/* Solid horizontal line with center text */}
      <div className="flex w-full items-center">
        <div className="h-px grow bg-current opacity-20" />
        <span className="space-nowrap mx-6 text-xs text-muted-foreground">
          You've reached the end
        </span>
        <div className="h-px grow bg-current opacity-20" />
      </div>

      {/* Subtle Back to top trigger */}
    </div>
  )
}
