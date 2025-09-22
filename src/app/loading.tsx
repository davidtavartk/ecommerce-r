import LoadingSpinner from '@/components/common/Loading/LoadingSpinner/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <LoadingSpinner size="lg" className="h-20 w-20 border-8" />

        {/* Brand Logo/Name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-d-blue text-2xl font-semibold">RedSeam Clothing</h1>
          <p className="text-l-blue text-lg">Loading your experience...</p>
        </div>
      </div>
    </div>
  );
}
