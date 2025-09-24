'use client';

import ProductHeader from '@/components/Product/ProductHeader/ProductHeader';
import { productService } from '@/services/productService';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/Product/ProductCard/ProductCard';
import { Product } from '@/types/types';
import Pagination from '@/components/common/Pagination/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCardSkeleton from '@/components/Product/ProductCard/ProductCardSkeleton';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [meta, setMeta] = useState<any>(null);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    sortBy: '',
  });

  const fetchProducts = async (page: number, filterParams = filters) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
      });

      if (filterParams.priceFrom && filterParams.priceFrom.trim()) {
        params.append('filter[price_from]', filterParams.priceFrom);
      }
      if (filterParams.priceTo && filterParams.priceTo.trim()) {
        params.append('filter[price_to]', filterParams.priceTo);
      }
      if (filterParams.sortBy) {
        params.append('sort', filterParams.sortBy);
      }

      const response = await productService.getAllProducts(params.toString());

      setProducts(response.data);
      setCurrentPage(response.meta.current_page);
      setTotalPages(response.meta.last_page);
      setMeta(response.meta);

      router.push(`/?${params.toString()}`);
    } catch (error) {
      const errorWithStatus = error as { status?: number };
      if (errorWithStatus.status === 404) {
        setError('No products found');
      } else if (errorWithStatus.status && errorWithStatus.status >= 500) {
        setError('Server error. Please try again later.');
      } else if (!navigator.onLine) {
        setError('No internet connection. Please check your network.');
      } else {
        setError('Failed to load products. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1');
    const priceFromUrl = searchParams.get('filter[price_from]') || '';
    const priceToUrl = searchParams.get('filter[price_to]') || '';
    const sortFromUrl = searchParams.get('sort') || '';

    const urlFilters = {
      priceFrom: priceFromUrl,
      priceTo: priceToUrl,
      sortBy: sortFromUrl,
    };

    setFilters(urlFilters);
    fetchProducts(pageFromUrl, urlFilters);
  }, []);

  const handleFilterApply = (priceFrom: string, priceTo: string) => {
    const newFilters = { ...filters, priceFrom, priceTo };
    setFilters(newFilters);
    fetchProducts(1, newFilters);
  };

  const handleSortChange = (sortType: string) => {
    const newFilters = { ...filters, sortBy: sortType };
    setFilters(newFilters);
    fetchProducts(1, newFilters);
  };

  return (
    <div className="mx-auto mt-[72px] flex min-h-screen flex-col gap-8 px-[100px] py-32">
      <ProductHeader
        from={meta?.from}
        to={meta?.to}
        total={meta?.total}
        currentSort={filters.sortBy}
        currentPriceFrom={filters.priceFrom}
        currentPriceTo={filters.priceTo}
        onApplyFilter={handleFilterApply}
        onSortChange={handleSortChange}
      />
      <main className="grid grid-cols-4 gap-6">
        {loading && products.length === 0 ? (
          // Show 8 skeleton cards while loading
          Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : error && products.length === 0 ? (
          <div className="col-span-4 flex flex-col items-center gap-4 py-20">
            <p className="text-c-orange">{error}</p>
            <button
              onClick={() => fetchProducts(currentPage)}
              className="bg-c-orange rounded-lg px-4 py-2 text-white hover:opacity-90"
            >
              Try Again
            </button>
          </div>
        ) : products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-4 flex justify-center py-20">
            <p className="text-l-blue">No products found</p>
          </div>
        )}
      </main>
      <div className="flex items-center justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => fetchProducts(page)} />
      </div>
    </div>
  );
}
