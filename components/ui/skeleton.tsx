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
      {/* Header Skeleton - matches exact header layout */}
      <header className="border-b-2 border-gray-200 bg-white rounded-b-lg flex-shrink-0">
        <div className="flex h-10 items-center justify-between pl-2 pr-1">
          {/* Left side - Logo and controls */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Skeleton className="w-7 h-7 rounded-full" />
            
            {/* Header controls */}
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
          
          {/* Right side - Tools and user */}
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

      {/* Content area with chart and right panel */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Chart Area Skeleton - main content */}
          <div className="flex-1 overflow-hidden bg-white p-4">
            <div className="w-full h-full flex flex-col">
              {/* Chart placeholder */}
              <div className="flex-1 bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Skeleton className="h-8 w-48 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                  {/* Chart skeleton bars */}
                  <div className="flex items-end justify-center gap-1 mt-8">
                    <Skeleton className="h-12 w-2" />
                    <Skeleton className="h-16 w-2" />
                    <Skeleton className="h-8 w-2" />
                    <Skeleton className="h-20 w-2" />
                    <Skeleton className="h-14 w-2" />
                    <Skeleton className="h-16 w-2" />
                    <Skeleton className="h-10 w-2" />
                    <Skeleton className="h-24 w-2" />
                    <Skeleton className="h-6 w-2" />
                    <Skeleton className="h-16 w-2" />
                    <Skeleton className="h-12 w-2" />
                    <Skeleton className="h-24 w-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Skeleton - draggable footer */}
          <footer className="bg-white border-t-2 border-gray-200 rounded-t-lg flex-shrink-0 h-10">
            <div className="flex items-center justify-between h-10 px-2">
              <div className="flex items-center gap-2 pl-4">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-6 w-18 rounded" />
                <Skeleton className="h-6 w-28 rounded" />
              </div>
              {/* Drag handle */}
              <Skeleton className="h-6 w-6 rounded" />
            </div>
          </footer>
        </div>
        
        {/* Right Side Panel Skeleton - vertical toolbar */}
        <div className="w-12 bg-white border-l-2 border-gray-200 rounded-l-lg flex flex-col flex-shrink-0">
          {/* Top tools */}
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
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Bottom tools */}
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
      {/* Header Skeleton - matches the actual header container width */}
      <div className="w-full h-16 px-3 py-2">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between bg-white/20 backdrop-blur-xl backdrop-saturate-[140%] rounded-xl px-4 border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-14" />
          </div>
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
      </div>
      
      {/* Hero Section Skeleton - matches main hero layout */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Main heading skeleton */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-12 w-4/5 mx-auto mb-4" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-12 w-2/3 mx-auto" />
        </div>
        
        {/* Subheading skeleton */}
        <div className="mb-8 space-y-3">
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        
        {/* Buttons skeleton */}
        <div className="flex justify-center space-x-4 mb-12">
          <Skeleton className="h-12 w-32 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
        
        {/* Hero image skeleton */}
        <div className="relative">
          <Skeleton className="h-96 w-full rounded-xl shadow-2xl" />
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
