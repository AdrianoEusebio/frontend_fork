import { ProductProvider } from '@/context/ProductEditContext';
import { ProductEditPage } from './ProductEdit';

export function ProductEditPageWrapper() {
  return (
    <ProductProvider>
      <ProductEditPage />
    </ProductProvider>
  );
}
