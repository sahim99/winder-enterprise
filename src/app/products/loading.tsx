import { Skeleton } from '@/components/ui/skeleton'

export default function ProductsLoading() {
  return (
    <div className="bg-muted/10 min-h-[calc(100vh-4rem)] pt-4 md:pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded-lg" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          <Skeleton className="hidden lg:block w-64 h-96 rounded-3xl shrink-0" />
          <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
