import { ProductList } from '@/components/products/ProductList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TechPro | Sản Phẩm Nổi Bật',
  description: 'Khám phá danh sách các sản phẩm công nghệ âm thanh tốt nhất từ Sony tại TechPro.',
};

export default function ProductsPage() {
  return (
    <main>
      <ProductList />
    </main>
  );
}
