'use client';

import { productService } from '@/services/productService';
import { Product } from '@/types/types';
import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(parseInt(resolvedParams.id));
        setProduct(productData);
      } catch (err: any) {
        console.log('Error caught:', err);
        console.log('Error status:', err.status);
        if (err.status === 404) {
          console.log('notFound() called');
          notFound();
        }
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  if (!product) return null;

  return (
    <div className="mx-auto min-h-screen px-[100px]">
      <div className="pt-[30px] pb-[49px]">
        <span className="text-sm font-light">Listing / Product</span>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-lg">${product.price}</p>
      </div>
    </div>
  );
}
