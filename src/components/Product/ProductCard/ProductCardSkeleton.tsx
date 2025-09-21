const ProductCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-[10px]">
      {/* Image skeleton */}
      <div className="aspect-[412/549] w-full rounded-[10px] bg-gray-200"></div>

      {/* Text skeletons */}
      <div className="flex flex-col gap-0.5">
        <div className="h-5 w-3/4 rounded bg-gray-200"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
