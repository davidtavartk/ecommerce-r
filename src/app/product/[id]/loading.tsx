export default function Loading() {
  return (
    <div className="mx-auto min-h-screen px-[100px]">
      <div className="pt-[30px] pb-[49px]">
        <span className="text-sm font-light">Listing / Product</span>
      </div>
      <div className="animate-pulse">
        <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
        <div className="h-6 w-1/4 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
