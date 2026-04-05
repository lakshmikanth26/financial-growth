export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Breadcrumb Skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6 animate-pulse"></div>

            {/* Article Header Skeleton */}
            <header className="mb-8">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6 animate-pulse"></div>
              
              {/* Meta Skeleton */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
              </div>

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
                ))}
              </div>
            </header>

            {/* Article Content Skeleton */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    {i % 3 === 0 && <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Calculators Skeleton */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-8">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Skeleton */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6 animate-pulse"></div>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar Skeleton */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Ad Slot Skeleton */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>

              {/* Navigation Skeleton */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Popular Calculators Skeleton */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}