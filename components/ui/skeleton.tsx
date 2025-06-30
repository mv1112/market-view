import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-100 dark:bg-gray-800", className)}
      {...props}
    />
  )
}

// Charts Page Skeleton - realistic layout, all skeleton blocks, no real content
function ChartsPageSkeleton() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between h-12 px-4 border-b-2 border-gray-700 bg-black">
        {/* Left: Logo and search */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-20 h-6 rounded" />
          <Skeleton className="w-12 h-6 rounded" />
        </div>
        {/* Center: Controls */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-16 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
        </div>
        {/* Right: User/tools */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </div>
      <div className="flex flex-1 min-h-0 min-w-0">
        {/* Main chart area */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 bg-black rounded-lg border-2 border-gray-700 flex flex-col justify-between">
            {/* Chart area skeleton */}
            <div className="flex-1 flex flex-col justify-center items-center">
              <Skeleton className="w-2/3 h-8 mb-4" />
              <Skeleton className="w-1/2 h-4 mb-8" />
              {/* Simulated chart bars */}
              <div className="flex items-end gap-1 w-full justify-center">
                {[...Array(16)].map((_, i) => (
                  <Skeleton key={i} className="w-2" style={{ height: `${Math.random() * 60 + 20}px` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Right Toolbar Skeleton */}
        <div className="w-12 flex-shrink-0 border-l-2 border-gray-700 bg-black flex flex-col items-center py-4 gap-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-8 h-8 rounded" />
          ))}
          <div className="flex-1" />
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="w-8 h-8 rounded" />
          ))}
        </div>
      </div>
      {/* Footer Skeleton */}
      <div className="flex items-center justify-between h-12 px-4 border-t-2 border-gray-700 bg-black">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Landing Page Skeleton - matches the exact layout of the home page
function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section Skeleton - matches main hero layout */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Main heading skeleton */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-12 w-4/5 mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-12 w-2/3 mx-auto bg-gray-800" />
        </div>
        
        {/* Subheading skeleton */}
        <div className="mb-8 space-y-3">
          <Skeleton className="h-6 w-2/3 mx-auto bg-gray-800" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-gray-800" />
        </div>
        
        {/* Buttons skeleton */}
        <div className="flex justify-center space-x-4 mb-12">
          <Skeleton className="h-12 w-32 rounded-lg bg-gray-800" />
          <Skeleton className="h-12 w-40 rounded-lg bg-gray-800" />
        </div>
        
        {/* Hero image skeleton */}
        <div className="relative">
          <Skeleton className="h-96 w-full rounded-xl shadow-2xl bg-gray-800" />
        </div>
      </div>
      
      {/* Customers Section Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Skeleton className="h-8 w-64 mx-auto mb-12 bg-gray-800" />
        <div className="flex justify-center items-center space-x-8 opacity-50">
          <Skeleton className="h-12 w-32 bg-gray-800" />
          <Skeleton className="h-12 w-28 bg-gray-800" />
          <Skeleton className="h-12 w-36 bg-gray-800" />
          <Skeleton className="h-12 w-24 bg-gray-800" />
          <Skeleton className="h-12 w-32 bg-gray-800" />
        </div>
      </div>
      
      {/* Features Section Skeleton */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Skeleton className="h-64 w-full rounded-lg bg-gray-800" />
          <Skeleton className="h-64 w-full rounded-lg bg-gray-800" />
          <Skeleton className="h-64 w-full rounded-lg bg-gray-800" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Skeleton className="h-48 w-full rounded-lg bg-gray-800" />
          <Skeleton className="h-48 w-full rounded-lg bg-gray-800" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-56 w-full rounded-lg bg-gray-800" />
          <Skeleton className="h-56 w-full rounded-lg bg-gray-800" />
        </div>
      </div>
      
      {/* Footer Skeleton */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Skeleton className="h-32 w-full bg-gray-800" />
            <Skeleton className="h-32 w-full bg-gray-800" />
            <Skeleton className="h-32 w-full bg-gray-800" />
            <Skeleton className="h-32 w-full bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton, ChartsPageSkeleton, LandingPageSkeleton }
