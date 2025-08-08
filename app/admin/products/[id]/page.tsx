
import ProductReview from './ProductReview';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function AdminProductPage({ params }: { params: { id: string } }) {
  return <ProductReview productId={params.id} />;
}
