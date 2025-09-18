'use client';

import { productService } from '@/services/productService';

export default function Home() {
  const handleClick = async () => {
    try {
      const response = await productService.getProductById(2);

      console.log(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <div className="bg-amber-600" onClick={handleClick}>
      Click me to fetch products
    </div>
  );
}
