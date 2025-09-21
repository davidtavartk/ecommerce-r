export default function Loading() {
  return (
    <div className="flex h-screen">
      {/* Left side - Image placeholder */}
      <div className="flex-1 animate-pulse bg-gray-200">
        <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-200"></div>
      </div>

      {/* Right side - Loading content */}
      <div className="mx-auto flex flex-1 flex-col items-center justify-center">
        <div className="mx-auto flex w-[554px] flex-col gap-10">
          {/* Title skeleton */}
          <div className="h-12 w-48 animate-pulse rounded bg-gray-200"></div>

          {/* Form skeleton */}
          <div className="flex flex-col gap-6">
            {/* Avatar placeholder */}
            <div className="flex">
              <div className="h-[100px] w-[100px] animate-pulse rounded-full bg-gray-200"></div>
            </div>

            {/* Input skeletons */}
            <div className="flex flex-col gap-6">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
            </div>

            {/* Button skeleton */}
            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>

            {/* Bottom text skeleton */}
            <div className="flex justify-center gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
