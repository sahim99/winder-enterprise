import { Skeleton } from '@/components/ui/skeleton'

export default function RootLoading() {
  return (
    <div className="w-full min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in-0 duration-200">
      {/* Hero Skeleton */}
      <Skeleton className="w-full h-[260px] sm:h-[320px] rounded-3xl" />

      {/* Marquee Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-36 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-[200px] sm:w-[260px] rounded-2xl shrink-0" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="space-y-4 pt-6">
        <Skeleton className="h-6 w-44 rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
