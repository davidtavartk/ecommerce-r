'use client';

import ProductHeader from '@/components/Product/ProductHeader/ProductHeader';
import { productService } from '@/services/productService';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/Product/ProductCard/ProductCard';
import { Product } from '@/types/types';
import Pagination from '@/components/common/Pagination/Pagination';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      console.log('Products response:', response);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen flex-col gap-8 px-[100px] mt-[72px]">
      <ProductHeader />
      <main className="grid grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Loading products...</p>
        )}
      </main>
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log('Page changed to:', page)}
      />
    </div>
  );
}
