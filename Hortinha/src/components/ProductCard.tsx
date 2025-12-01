import { Product } from '../App';
import { Plus, Minus, Trash2, Calendar } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: string, change: number) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onUpdateQuantity, onDelete }: ProductCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Colhido em {formatDate(product.harvestDate)}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(product.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Excluir produto"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
          <button
            onClick={() => onUpdateQuantity(product.id, -1)}
            disabled={product.quantity === 0}
            className="p-1 bg-white rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="text-center min-w-[60px]">
            <div className="text-gray-900">{product.quantity}</div>
            <div className="text-gray-500">{product.unit}</div>
          </div>

          <button
            onClick={() => onUpdateQuantity(product.id, 1)}
            className="p-1 bg-white rounded-md text-green-700 hover:bg-green-50 transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
