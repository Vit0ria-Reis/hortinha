import { Member } from '../App';
import { Users, TrendingUp, TrendingDown, Activity as ActivityIcon } from 'lucide-react';

interface MembersListProps {
  members: Member[];
}

export function MembersList({ members }: MembersListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMemberStats = (member: Member) => {
    const added = member.activities.filter(a => a.action === 'added').length;
    const removed = member.activities.filter(a => a.action === 'removed').length;
    return { added, removed, total: added + removed };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Users className="w-6 h-6 text-green-700" />
        </div>
        <div>
          <h2 className="text-gray-900">Moradores</h2>
          <p className="text-gray-600">Atividades da horta colaborativa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {members.map(member => {
          const stats = getMemberStats(member);
          return (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-green-100 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900">{member.name}</h3>
                  <p className="text-gray-500">{member.apartment}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <ActivityIcon className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-gray-900">{stats.total}</div>
                  <div className="text-gray-500">Total</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-green-700">{stats.added}</div>
                  <div className="text-green-600">Colheu</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded-lg">
                  <div className="text-orange-700">{stats.removed}</div>
                  <div className="text-orange-600">Retirou</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <h3 className="text-gray-900 mb-4">Histórico de Atividades</h3>
        
        {members.every(m => m.activities.length === 0) ? (
          <div className="text-center py-8">
            <div className="inline-flex p-3 bg-gray-100 rounded-full mb-3">
              <ActivityIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Nenhuma atividade registrada ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {members
              .flatMap(member => member.activities)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 20)
              .map(activity => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.action === 'added' 
                      ? 'bg-green-100' 
                      : 'bg-orange-100'
                  }`}>
                    {activity.action === 'added' ? (
                      <TrendingUp className="w-4 h-4 text-green-700" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-orange-700" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span>{activity.memberName}</span>
                          <span className="text-gray-500">
                            {activity.action === 'added' ? ' colheu ' : ' retirou '}
                          </span>
                          <span>
                            {activity.quantity} {activity.unit} de {activity.productName}
                          </span>
                        </p>
                        <p className="text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
