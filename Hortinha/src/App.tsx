import { useState } from 'react';
import { ProductShelf } from './components/ProductShelf';
import { AddProduct } from './components/AddProduct';
import { MembersList } from './components/MembersList';
import { Plus, Home, Sprout, Users } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  type: 'vegetal' | 'fruta' | 'legume';
  quantity: number;
  unit: string;
  harvestDate: string;
}

export interface Activity {
  id: string;
  memberId: string;
  memberName: string;
  productName: string;
  action: 'added' | 'removed';
  quantity: number;
  unit: string;
  date: string;
}

export interface Member {
  id: string;
  name: string;
  apartment: string;
  activities: Activity[];
}

type Screen = 'shelf' | 'add' | 'members';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('shelf');
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [showMemberSelect, setShowMemberSelect] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'add' | 'update';
    data: any;
  } | null>(null);
  
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'Maria Silva',
      apartment: 'Apto 101',
      activities: [],
    },
    {
      id: '2',
      name: 'João Santos',
      apartment: 'Apto 203',
      activities: [],
    },
    {
      id: '3',
      name: 'Ana Costa',
      apartment: 'Apto 305',
      activities: [],
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Tomate',
      type: 'legume',
      quantity: 15,
      unit: 'unidades',
      harvestDate: '2024-11-28',
    },
    {
      id: '2',
      name: 'Alface',
      type: 'vegetal',
      quantity: 8,
      unit: 'unidades',
      harvestDate: '2024-11-25',
    },
    {
      id: '3',
      name: 'Morango',
      type: 'fruta',
      quantity: 25,
      unit: 'unidades',
      harvestDate: '2024-11-29',
    },
  ]);

  const addActivity = (memberId: string, activity: Omit<Activity, 'id' | 'memberId' | 'memberName' | 'date'>) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      memberId,
      memberName: member.name,
      date: new Date().toISOString(),
    };

    setMembers(members.map(m => {
      if (m.id === memberId) {
        return { ...m, activities: [newActivity, ...m.activities] };
      }
      return m;
    }));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    if (!currentMember) {
      setPendingAction({ type: 'add', data: product });
      setShowMemberSelect(true);
      return;
    }

    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
    
    addActivity(currentMember.id, {
      productName: product.name,
      action: 'added',
      quantity: product.quantity,
      unit: product.unit,
    });
    
    setCurrentScreen('shelf');
  };

  const updateQuantity = (id: string, change: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (change < 0 && !currentMember) {
      setPendingAction({ type: 'update', data: { id, change } });
      setShowMemberSelect(true);
      return;
    }

    setProducts(products.map(p => {
      if (p.id === id) {
        const newQuantity = Math.max(0, p.quantity + change);
        return { ...p, quantity: newQuantity };
      }
      return p;
    }).filter(p => p.quantity > 0));

    if (change < 0 && currentMember) {
      addActivity(currentMember.id, {
        productName: product.name,
        action: 'removed',
        quantity: Math.abs(change),
        unit: product.unit,
      });
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const selectMember = (member: Member) => {
    setCurrentMember(member);
    setShowMemberSelect(false);

    if (pendingAction) {
      if (pendingAction.type === 'add') {
        addProduct(pendingAction.data);
      } else if (pendingAction.type === 'update') {
        const { id, change } = pendingAction.data;
        updateQuantity(id, change);
      }
      setPendingAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sprout className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h1 className="text-green-900">Horta Colaborativa</h1>
                <p className="text-green-600">Gestão de Produtos</p>
              </div>
            </div>
            {currentMember && (
              <div className="text-right">
                <p className="text-gray-900">{currentMember.name}</p>
                <p className="text-gray-500">{currentMember.apartment}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Member Selection Modal */}
      {showMemberSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-4">Selecione seu nome</h2>
            <div className="space-y-2">
              {members.map(member => (
                <button
                  key={member.id}
                  onClick={() => selectMember(member)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <div className="text-gray-900">{member.name}</div>
                  <div className="text-gray-500">{member.apartment}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowMemberSelect(false);
                setPendingAction(null);
              }}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {currentScreen === 'shelf' && (
          <ProductShelf 
            products={products}
            onUpdateQuantity={updateQuantity}
            onDeleteProduct={deleteProduct}
          />
        )}
        
        {currentScreen === 'add' && (
          <AddProduct onAdd={addProduct} />
        )}

        {currentScreen === 'members' && (
          <MembersList members={members} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setCurrentScreen('shelf')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                currentScreen === 'shelf' 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <Home className="w-6 h-6" />
              <span>Estante</span>
            </button>
            <button
              onClick={() => setCurrentScreen('add')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                currentScreen === 'add' 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <Plus className="w-6 h-6" />
              <span>Adicionar</span>
            </button>
            <button
              onClick={() => setCurrentScreen('members')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                currentScreen === 'members' 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <Users className="w-6 h-6" />
              <span>Moradores</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for bottom nav */}
      <div className="h-20"></div>
    </div>
  );
}