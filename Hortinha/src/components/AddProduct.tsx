import { useState } from 'react';
import { Product } from '../App';
import { Leaf, Calendar, Hash, Package } from 'lucide-react';

interface AddProductProps {
  onAdd: (product: Omit<Product, 'id'>) => void;
}

export function AddProduct({ onAdd }: AddProductProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'vegetal' | 'fruta' | 'legume'>('vegetal');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('unidades');
  const [harvestDate, setHarvestDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !quantity) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    onAdd({
      name,
      type,
      quantity: parseInt(quantity),
      unit,
      harvestDate,
    });

    // Reset form
    setName('');
    setQuantity('');
    setUnit('unidades');
    setHarvestDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Leaf className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h2 className="text-gray-900">Adicionar Produto</h2>
            <p className="text-gray-600">Registre novos itens da horta</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Nome do Produto
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Tomate, Alface, Morango..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 mb-2">
              Tipo
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setType('vegetal')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  type === 'vegetal'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                }`}
              >
                Vegetal
              </button>
              <button
                type="button"
                onClick={() => setType('fruta')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  type === 'fruta'
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-rose-300'
                }`}
              >
                Fruta
              </button>
              <button
                type="button"
                onClick={() => setType('legume')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  type === 'legume'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300'
                }`}
              >
                Legume
              </button>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-gray-700 mb-2">
                Quantidade
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="unit" className="block text-gray-700 mb-2">
                Unidade
              </label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="unidades">Unidades</option>
                <option value="kg">Kg</option>
                <option value="g">Gramas</option>
                <option value="maços">Maços</option>
              </select>
            </div>
          </div>

          {/* Harvest Date */}
          <div>
            <label htmlFor="harvestDate" className="block text-gray-700 mb-2">
              Data da Colheita
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="harvestDate"
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Adicionar à Estante
          </button>
        </form>
      </div>
    </div>
  );
}
