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

// Charts Page Skeleton - matches the exact layout of the charts page
function ChartsPageSkeleton() {
  return (
    <div className="h-screen bg-white text-gray-900 flex flex-col overflow-hidden">
      {/* Header Skeleton */}
      <header className="border-b-2 border-gray-200 bg-white rounded-b-lg flex-shrink-0">
        <div className="flex h-10 items-center justify-between pl-2 pr-1">
          <div className="flex items-center gap-4">
            <Skeleton className="w-7 h-7 rounded-full" />
            
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-36 rounded" />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <Skeleton className="h-6 w-12 rounded" />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <Skeleton className="h-6 w-16 rounded" />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <Skeleton className="h-6 w-20 rounded" />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <Skeleton className="h-6 w-16 rounded" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 pr-4">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Chart Area Skeleton */}
          <div className="flex-1 overflow-hidden bg-white">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
                <div className="grid grid-cols-4 gap-4 mt-8">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-28 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Skeleton */}
          <footer className="bg-white border-t-2 border-gray-200 rounded-t-lg flex-shrink-0 h-10">
            <div className="flex items-center justify-between h-10 px-2">
              <div className="flex items-center gap-2 pl-4">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-6 w-18 rounded" />
                <Skeleton className="h-6 w-28 rounded" />
              </div>
              <Skeleton className="h-6 w-6 rounded" />
            </div>
          </footer>
        </div>
        
        {/* Right Side Panel Skeleton */}
        <div className="w-12 bg-white border-l-2 border-gray-200 rounded-l-lg flex flex-col flex-shrink-0">
          <div className="flex flex-col items-center p-2 gap-3">
            <Skeleton className="w-8 h-8 rounded" />
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            <Skeleton className="w-8 h-8 rounded" />
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            <Skeleton className="w-8 h-8 rounded" />
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            <Skeleton className="w-8 h-8 rounded" />
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            <Skeleton className="w-8 h-8 rounded" />
          </div>
          
          <div className="flex-1"></div>
          
          <div className="flex flex-col items-center gap-3 p-2">
            <Skeleton className="w-8 h-8 rounded" />
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            <Skeleton className="w-8 h-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Landing Page Skeleton - matches the exact layout of the home page
function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="w-full h-16 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
      
      {/* Hero Section Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
      
      {/* Customers Section Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Skeleton className="h-8 w-64 mx-auto mb-12" />
        <div className="flex justify-center items-center space-x-8 opacity-50">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-28" />
          <Skeleton className="h-12 w-36" />
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
      
      {/* Features Section Skeleton */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-56 w-full rounded-lg" />
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>
      </div>
      
      {/* Footer Skeleton */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton, ChartsPageSkeleton, LandingPageSkeleton }
