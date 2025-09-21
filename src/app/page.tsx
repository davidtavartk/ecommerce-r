'use client';

import ProductHeader from '@/components/Product/ProductHeader/ProductHeader';
import { productService } from '@/services/productService';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/Product/ProductCard/ProductCard';
import { Product } from '@/types/types';
import Pagination from '@/components/common/Pagination/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    try {
      const params = new URLSearchParams({
        page: page.toString(),
      });

      if (filterParams.priceFrom) params.append('filter[price_from]', filterParams.priceFrom);
      if (filterParams.priceTo) params.append('filter[price_to]', filterParams.priceTo);
      if (filterParams.sortBy) params.append('sort', filterParams.sortBy);

      const response = await productService.getAllProducts(params.toString());

      setProducts(response.data);
      setCurrentPage(response.meta.current_page);
      setTotalPages(response.meta.last_page);
      setMeta(response.meta);

      router.push(`/?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error('Error fetching products:', error);
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
    fetchProducts(currentPage, newFilters);
    console.log('Applied filters:', priceFrom, priceTo);
  };

  const handleSortChange = (sortType: string) => {
    const newFilters = { ...filters, sortBy: sortType };
    setFilters(newFilters);
    fetchProducts(currentPage, newFilters);
    console.log('Selected sort type:', sortType);
  };

  return (
    <div className="mx-auto mt-[72px] flex min-h-screen flex-col gap-8 px-[100px] py-32">
      <ProductHeader
        from={meta?.from}
        to={meta?.to}
        total={meta?.total}
        currentSort={filters.sortBy}
        onApplyFilter={handleFilterApply}
        onSortChange={handleSortChange}
      />
      <main className="grid grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Loading products...</p>
        )}
      </main>
      <div className="flex items-center justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => fetchProducts(page)} />
      </div>
    </div>
  );
}
