import { ProductProvider } from '@/context/ProductEditContext';
import { ProductEdit } from './ProductEdit';

export function ProductEditPage() {
  return (
    <ProductProvider>
      <ProductEdit />
    </ProductProvider>
  );
}
