export function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-800" />
      
      {/* Content Skeleton */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
        </div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mt-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md" />
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          {/* Price Skeleton */}
          <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded-md" />
          {/* Button Skeleton */}
          <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
