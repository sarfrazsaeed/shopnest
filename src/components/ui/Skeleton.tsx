export function ProductCardSkeleton() {
    return (
      <div className="card-dark p-0 overflow-hidden">
        <div className="skeleton h-64 rounded-t-2xl rounded-b-none" />
        <div className="p-4 space-y-3">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
          <div className="flex justify-between items-center pt-1">
            <div className="skeleton h-6 w-20 rounded" />
            <div className="skeleton h-9 w-24 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }
  
  export function ProductDetailSkeleton() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="skeleton h-[500px] rounded-2xl" />
        <div className="space-y-4">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-10 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-8 w-28 rounded" />
          <div className="skeleton h-20 w-full rounded" />
        </div>
      </div>
    )
  }