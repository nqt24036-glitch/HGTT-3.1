import React from 'react';
import { NPC, CombatStats, EquipmentSlot } from '../types.ts';
import { COMBAT_STAT_LABELS, ITEM_RARITY_TEXT_COLORS } from '../constants.ts';

interface NpcDetailModalProps {
  npc: NPC;
  onClose: () => void;
  onOpenAvatarSelector: (npcId: string) => void;
}

const NpcDetailModal: React.FC<NpcDetailModalProps> = ({ npc, onClose, onOpenAvatarSelector }) => {

  const AvatarDisplay: React.FC<{ avatarUrl: string; alt: string; className: string; }> = ({ avatarUrl, alt, className }) => {
    const isVideo = avatarUrl.startsWith('data:video') || avatarUrl.endsWith('.mp4');
    if (isVideo) {
        return <video src={avatarUrl} className={className} autoPlay loop muted playsInline aria-label={alt} />;
    }
    return <img src={avatarUrl} alt={alt} className={className} />;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-gray-900 border-2 border-cyan-700 rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        {/* Left Side: Avatar & Customization */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <div className="relative group">
                <AvatarDisplay avatarUrl={npc.avatarUrl} alt={npc.name} className="w-48 h-48 rounded-lg border-2 border-gray-600 object-cover mb-4" />
                <button 
                    onClick={() => onOpenAvatarSelector(npc.id)}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                >
                    Thay đổi Avatar
                </button>
            </div>
            <h2 className="text-2xl font-bold text-cyan-300">{npc.name}</h2>
            <p className="text-md text-gray-300">Cấp {npc.level} - {npc.cultivation.realm} Tầng {npc.cultivation.stage}</p>
            <p className="text-sm text-gray-400 italic mt-1">"{npc.description}"</p>
        </div>
        
        {/* Right Side: Stats & Equipment */}
        <div className="w-full md:w-2/3">
            {/* Combat Stats */}
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-yellow-300 border-b border-gray-600 pb-2 mb-3">Thuộc Tính</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {Object.entries(npc.totalStats).map(([key, value]) => {
                        const statKey = key as keyof CombatStats;
                        const label = COMBAT_STAT_LABELS[statKey];
                        const isPercent = ['critRate', 'critDamage', 'accuracy', 'evasion', 'armorPen', 'blockRate', 'mentalDemonResistance'].includes(key);
                        const displayValue = isPercent ? `${((value as number) * 100).toFixed(2)}%` : Math.round(value as number);

                        return (
                            <div key={key} className="flex justify-between border-b border-gray-800 py-1">
                                <span className="text-gray-400">{label}:</span>
                                <span className="font-semibold text-white">{displayValue}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Equipped Items */}
            {Object.values(npc.equippedItems).filter(Boolean).length > 0 && (
                <div className="mt-4 bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg text-yellow-300 mb-2">Trang bị:</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(Object.keys(npc.equippedItems) as EquipmentSlot[]).map(slot => {
                        const item = npc.equippedItems[slot];
                        return (
                          item && (
                            <div key={slot} className="p-2 rounded bg-gray-800 border border-gray-600 flex items-center gap-2 text-sm" title={`${item.name}\n${item.description}`}>
                              <span className="text-xl w-8 h-8 flex items-center justify-center overflow-hidden rounded">
                                {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                              </span>
                              <span className={ITEM_RARITY_TEXT_COLORS[item.rarity]}>{item.name}</span>
                            </div>
                          )
                        );
                      })}
                    </div>
                </div>
            )}
             <div className="mt-6 flex justify-end gap-4">
                <button onClick={onClose} className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition-colors">
                    Đóng
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NpcDetailModal;