import { Product } from '../App';
import { ProductCard } from './ProductCard';
import { Leaf } from 'lucide-react';

interface ProductShelfProps {
  products: Product[];
  onUpdateQuantity: (id: string, change: number) => void;
  onDeleteProduct: (id: string) => void;
}

export function ProductShelf({ products, onUpdateQuantity, onDeleteProduct }: ProductShelfProps) {
  const productsByType = {
    vegetal: products.filter(p => p.type === 'vegetal'),
    fruta: products.filter(p => p.type === 'fruta'),
    legume: products.filter(p => p.type === 'legume'),
  };

  const typeLabels = {
    vegetal: 'Vegetais',
    fruta: 'Frutas',
    legume: 'Legumes',
  };

  const typeColors = {
    vegetal: 'bg-green-100 text-green-800',
    fruta: 'bg-rose-100 text-rose-800',
    legume: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="space-y-6">
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
            <Leaf className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-gray-600 mb-2">Nenhum produto na estante</h2>
          <p className="text-gray-500">Adicione produtos cultivados na horta</p>
        </div>
      ) : (
        <>
          {(Object.keys(productsByType) as Array<keyof typeof productsByType>).map(type => {
            const typeProducts = productsByType[type];
            if (typeProducts.length === 0) return null;
            
            return (
              <div key={type} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full ${typeColors[type]}`}>
                    {typeLabels[type]}
                  </span>
                  <span className="text-gray-500">
                    {typeProducts.length} {typeProducts.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {typeProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onUpdateQuantity={onUpdateQuantity}
                      onDelete={onDeleteProduct}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
