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

  const fetchProducts = async (page: number) => {
    try {
      const response = await productService.getAllProducts(page);
      console.log('Products response:', response);
      setProducts(response.data);
      setCurrentPage(response.meta.current_page);
      setTotalPages(response.meta.last_page);

      router.push(`/?page=${page}`, { scroll: false });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1');
    fetchProducts(pageFromUrl);
  }, []);

  return (
    <div className="mx-auto mt-[72px] flex min-h-screen flex-col gap-8 px-[100px] py-32">
      <ProductHeader />
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
