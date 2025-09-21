import { productService } from '@/services/productService';
import { notFound } from 'next/navigation';
import ProductPageContent from './components/ProductPageContent';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  try {
    const product = await productService.getProductById(parseInt(resolvedParams.id));
    return (
      <div className="mx-auto min-h-screen px-[100px]">
        <div className="pt-[30px] pb-[49px]">
          <span className="text-sm font-light">Listing / Product</span>
        </div>
        <ProductPageContent product={product} />
      </div>
    );
  } catch (err: any) {
    if (err.status === 404) {
      notFound();
    }
    throw err;
  }
}
