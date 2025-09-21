export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Large Spinner */}
        <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-200 border-t-c-orange"></div>
        
        {/* Brand Logo/Name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold text-d-blue">RedSeam Clothing</h1>
          <p className="text-l-blue text-lg">Loading your experience...</p>
        </div>
      </div>
    </div>
  );
}