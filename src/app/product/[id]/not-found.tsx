import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-[100px]">
      <h2 className="mb-4 text-2xl font-semibold">Product Not Found</h2>
      <p className="mb-6 text-gray-600">The product you are looking for does not exist.</p>
      <Link href="/" className="bg-c-orange rounded-lg px-6 py-2 text-white hover:opacity-90">
        Back to Products
      </Link>
    </div>
  );
}
