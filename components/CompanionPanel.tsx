import React, { useState, useEffect } from 'react';
import { Player, Companion, CombatStats, Skill, EquipmentSlot, Item } from '../types.ts';
import { COMBAT_STAT_LABELS, ITEM_RARITY_COLORS, ITEM_RARITY_TEXT_COLORS } from '../constants.ts';
import { SparklesIcon } from './IconComponents.tsx';
import CompanionEquipModal from './CompanionEquipModal.tsx';
import { SUMMON_COST_SINGLE, SUMMON_COST_TEN } from '../data/gameData.ts';

interface CompanionPanelProps {
  player: Player;
  onSetActiveCompanion: (companionId: string | null) => void;
  onEquipItem: (companionId: string, item: Item) => void;
  onUnequipItem: (companionId: string, slot: EquipmentSlot) => void;
  onOpenAvatarSelector: (companionId: string) => void;
  onSummonCompanion: (count: 1 | 10) => Companion[] | undefined;
}

const AvatarDisplay: React.FC<{ avatarUrl: string; alt: string; className: string; }> = ({ avatarUrl, alt, className }) => {
    const isVideo = avatarUrl.startsWith('data:video') || avatarUrl.endsWith('.mp4');
    if (isVideo) {
        return <video src={avatarUrl} className={className} autoPlay loop muted playsInline aria-label={alt} />;
    }
    return <img src={avatarUrl} alt={alt} className={className} />;
};

const StatDisplay: React.FC<{ label: string; value: number | string; }> = ({ label, value }) => (
    <div className="flex justify-between border-b border-gray-800 py-1 text-sm">
        <span className="text-gray-400">{label}:</span>
        <span className="font-semibold text-white">{value}</span>
    </div>
);

const CompanionDetailsTab: React.FC<Omit<CompanionPanelProps, 'onSummonCompanion'>> = ({ player, onSetActiveCompanion, onEquipItem, onUnequipItem, onOpenAvatarSelector }) => {
    const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(player.companions.length > 0 ? player.companions[0] : null);
    const [isEquipModalOpen, setIsEquipModalOpen] = useState(false);
    const [slotToEquip, setSlotToEquip] = useState<EquipmentSlot | null>(null);

    useEffect(() => {
        if (selectedCompanion) {
            const updatedCompanion = player.companions.find(c => c.id === selectedCompanion.id);
            setSelectedCompanion(updatedCompanion || (player.companions.length > 0 ? player.companions[0] : null));
        } else if (player.companions.length > 0) {
            setSelectedCompanion(player.companions[0]);
        }
    }, [player.companions]);

    const handleOpenEquipModal = (slot: EquipmentSlot) => {
        setSlotToEquip(slot);
        setIsEquipModalOpen(true);
    };

    const handleEquipItemSelected = (item: Item) => {
        if (selectedCompanion && slotToEquip) {
            onEquipItem(selectedCompanion.id, item);
        }
        setIsEquipModalOpen(false);
        setSlotToEquip(null);
    };

    const renderEquipment = () => {
        if (!selectedCompanion) return null;
        const slots: EquipmentSlot[] = ['vũ khí', 'áo giáp', 'pháp bảo'];
        return (
            <div>
                <h5 className="font-semibold text-yellow-300 mb-2 mt-4">Trang Bị</h5>
                <div className="grid grid-cols-3 gap-3">
                {slots.map(slot => {
                    const item = selectedCompanion.equippedItems[slot];
                    return item ? (
                    <div key={slot} className={`p-2 rounded-lg border-2 h-28 flex flex-col justify-between text-center ${ITEM_RARITY_COLORS[item.rarity]} bg-gray-800/50`}>
                        <div className="text-2xl h-10 w-10 mx-auto flex items-center justify-center overflow-hidden rounded-md">
                            {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                        </div>
                        <p className={`text-xs font-semibold truncate ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>{item.name}</p>
                        <button onClick={() => onUnequipItem(selectedCompanion.id, slot)} className="w-full text-xs bg-red-600 hover:bg-red-500 rounded py-1">Tháo</button>
                    </div>
                    ) : (
                    <button key={slot} onClick={() => handleOpenEquipModal(slot)} className="p-2 rounded-lg border-2 border-dashed border-gray-600 h-28 flex flex-col justify-center items-center text-gray-500 hover:bg-gray-800/50 hover:border-gray-500 transition-colors">
                        <span className="text-xs uppercase">{slot}</span>
                        <span className="text-sm mt-1">Trống</span>
                    </button>
                    );
                })}
                </div>
            </div>
        );
    };
    
    return (
    <>
        {isEquipModalOpen && selectedCompanion && slotToEquip && (
            <CompanionEquipModal playerInventory={player.inventory} slotToEquip={slotToEquip} onClose={() => setIsEquipModalOpen(false)} onEquip={handleEquipItemSelected} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <div className="md:col-span-1">
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
              {player.companions.length > 0 ? (
                  player.companions.map(comp => (
                      <button key={comp.id} onClick={() => setSelectedCompanion(comp)} className={`w-full text-left p-3 rounded-lg border-2 transition-colors flex items-center gap-3 ${selectedCompanion?.id === comp.id ? 'bg-yellow-800/50 border-yellow-600' : 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/50'}`}>
                          <AvatarDisplay avatarUrl={comp.avatarUrl} alt={comp.name} className="w-12 h-12 rounded-full border-2 border-gray-600 flex-shrink-0 object-cover" />
                          <div>
                            <p className="font-semibold">{comp.name}</p>
                            <p className="text-xs text-gray-400">Cấp {comp.level}</p>
                            {player.activeCompanionId === comp.id && <span className="text-xs text-cyan-400 font-bold">Đang triệu hồi</span>}
                          </div>
                      </button>
                  ))
              ) : (
                  <p className="text-center text-gray-500 mt-8">Chưa có đồng hành nào.</p>
              )}
          </div>
        </div>
        <div className="md:col-span-2">
          {selectedCompanion ? (
              <div className="p-4 rounded-lg border-2 border-purple-700 bg-gray-900/70 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                      <div className="relative group flex-shrink-0">
                          <AvatarDisplay avatarUrl={selectedCompanion.avatarUrl} alt={selectedCompanion.name} className="w-32 h-32 rounded-lg border-2 border-gray-600 object-cover" />
                           <button onClick={() => onOpenAvatarSelector(selectedCompanion.id)} className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">Thay đổi</button>
                      </div>
                      <div className="flex-grow">
                          <h4 className="text-2xl font-bold text-purple-300">{selectedCompanion.name}</h4>
                          <p className="text-sm text-gray-400 italic">"{selectedCompanion.description}"</p>
                          <div className="mt-2 text-sm">
                              <p>Cấp: <span className="font-bold text-white">{selectedCompanion.level}</span></p>
                              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(selectedCompanion.exp / selectedCompanion.expToNextLevel) * 100}%` }}></div></div>
                              <p className="text-xs text-right">{selectedCompanion.exp} / {selectedCompanion.expToNextLevel} EXP</p>
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h5 className="font-semibold text-yellow-300 mb-2">Thuộc Tính</h5>
                        <div className="space-y-1">
                            <StatDisplay label="HP" value={`${selectedCompanion.hp} / ${selectedCompanion.maxHp}`} />
                            <StatDisplay label="MP" value={`${selectedCompanion.mp} / ${selectedCompanion.maxMp}`} />
                            {Object.entries(selectedCompanion.totalStats).map(([key, value]) => (<StatDisplay key={key} label={COMBAT_STAT_LABELS[key as keyof CombatStats]} value={Math.round(value as number)} />))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold text-yellow-300 mb-2">Kỹ Năng</h5>
                        <div className="space-y-2">{selectedCompanion.skills.map(skill => (<div key={skill.id} className="p-2 bg-gray-800/50 rounded border border-gray-700"><div className="flex items-center gap-2"><div className={`p-1 rounded flex-shrink-0 ${skill.type === 'Chủ Động' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}><SparklesIcon /></div><p className="font-semibold">{skill.name}</p></div><p className="text-xs text-gray-400 mt-1">{skill.description}</p></div>))}</div>
                        
                        {selectedCompanion.passiveSkills && selectedCompanion.passiveSkills.length > 0 && (
                            <div>
                                <h5 className="font-semibold text-yellow-300 mb-2 mt-4">Kỹ Năng Bị Động (Hỗ Trợ Chủ Nhân)</h5>
                                <div className="space-y-2">
                                    {selectedCompanion.passiveSkills.map((skill, index) => (
                                        <div key={index} className="p-2 bg-gray-800/50 rounded border border-gray-700">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1 rounded flex-shrink-0 bg-purple-500/20 text-purple-400"><SparklesIcon /></div>
                                                <p className="font-semibold">{skill.name}</p>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1 pl-8">{skill.description}</p>
                                            <div className="text-xs mt-2 pl-8 space-y-1">
                                                {Object.entries(skill.statBonuses).map(([key, value]) => {
                                                    const label = COMBAT_STAT_LABELS[key as keyof typeof COMBAT_STAT_LABELS] || (key === 'hp' ? 'HP Tối Đa' : key === 'mp' ? 'MP Tối Đa' : key);
                                                    let formattedValue = `+${value}`;
                                                    if (['critRate', 'evasion', 'accuracy', 'armorPen', 'blockRate', 'mentalDemonResistance'].includes(key)) {
                                                        formattedValue = `+${(Number(value) * 100).toFixed(1)}%`;
                                                    } else if (key === 'critDamage') {
                                                        formattedValue = `+${(Number(value) * 100).toFixed(1)}%`;
                                                    }
                                                    return <p key={key}><span className="text-gray-400">{label}:</span> <span className="font-semibold text-white">{formattedValue}</span></p>;
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                  </div>
                  {renderEquipment()}
                  <div className="pt-4 text-center"><button onClick={() => onSetActiveCompanion(selectedCompanion.id)} className={`w-full max-w-xs py-3 rounded-lg font-bold text-lg transition-colors ${player.activeCompanionId === selectedCompanion.id ? 'bg-red-600 hover:bg-red-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}>{player.activeCompanionId === selectedCompanion.id ? 'Nghỉ Ngơi' : 'Triệu Hồi'}</button></div>
              </div>
          ) : (
              <div className="flex items-center justify-center h-full p-4 rounded-lg border-2 border-dashed border-gray-700"><p className="text-gray-500">Chọn một đồng hành để xem chi tiết.</p></div>
          )}
        </div>
      </div>
    </>
    );
};

const SummonTab: React.FC<Pick<CompanionPanelProps, 'player' | 'onSummonCompanion'>> = ({ player, onSummonCompanion }) => {
    const [summonResults, setSummonResults] = useState<Companion[] | null>(null);
    const [isSummoning, setIsSummoning] = useState(false);

    const handleSummon = (count: 1 | 10) => {
        if (isSummoning) return;
        setIsSummoning(true);
        setSummonResults(null);
        
        setTimeout(() => {
            const results = onSummonCompanion(count);
            if (results) {
                setSummonResults(results);
            }
            setIsSummoning(false);
        }, 1500);
    };

    const ResultOverlay: React.FC = () => {
        if (!summonResults) return null;
        return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSummonResults(null)}>
                <div className="bg-gray-900 border-2 border-yellow-600 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                    <h2 className="text-2xl font-serif text-yellow-300 mb-4 text-center">Kết Quả Triệu Hồi</h2>
                    <div className="flex-grow overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
                        {summonResults.map((comp, index) => (
                            <div key={index} className={`p-3 rounded-lg border-2 ${ITEM_RARITY_COLORS[comp.rarity || 'Phổ thông']} bg-gray-800/70 flex flex-col items-center text-center animate-fadeIn`} style={{animationDelay: `${index * 100}ms`}}>
                                <AvatarDisplay avatarUrl={comp.avatarUrl} alt={comp.name} className="w-24 h-24 rounded-md border-2 border-gray-600 object-cover" />
                                <p className={`mt-2 font-bold ${ITEM_RARITY_TEXT_COLORS[comp.rarity || 'Phổ thông']}`}>{comp.name}</p>
                                <p className={`text-sm font-semibold ${ITEM_RARITY_TEXT_COLORS[comp.rarity || 'Phổ thông']}`}>{comp.rarity}</p>
                            </div>
                        ))}
                    </div>
                     <div className="mt-4 text-center">
                        <button onClick={() => setSummonResults(null)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold">OK</button>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <ResultOverlay />
             <h3 className="text-3xl font-serif text-yellow-300">Tụ Nghĩa Đài</h3>
             <p className="text-gray-400 mt-2 mb-6">Dùng Linh Thạch để triệu hồi đồng hành từ khắp các cõi, tìm kiếm trợ thủ đắc lực.</p>
             <div className="mb-6 text-lg bg-gray-900/50 border border-gray-700 px-4 py-1 rounded-lg">
                <span className="text-gray-400">Linh Thạch: </span>
                <span className="font-bold text-yellow-400">{player.linhThach}</span>
            </div>
             <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                 <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full blur-2xl transition-all duration-1000 ${isSummoning ? 'opacity-70 animate-spin' : 'opacity-30'}`}></div>
                 <div className={`absolute inset-2 bg-gray-900 rounded-full transition-all duration-500 ${isSummoning ? 'scale-95' : 'scale-100'}`}></div>
                 <SparklesIcon className={`absolute text-yellow-300 w-48 h-48 transition-all duration-1000 ${isSummoning ? 'opacity-100 animate-pulse' : 'opacity-40'}`} />
                 <p className={`relative font-bold text-xl transition-opacity ${isSummoning ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>Đang triệu hồi...</p>
             </div>
             <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => handleSummon(1)} disabled={isSummoning || player.linhThach < SUMMON_COST_SINGLE} className="px-8 py-4 text-xl font-bold rounded-lg border-2 transition-all duration-300 bg-blue-600 hover:bg-blue-500 border-blue-400 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20">
                    Triệu Hồi x1<br/><span className="text-sm">({SUMMON_COST_SINGLE} Linh Thạch)</span>
                </button>
                 <button onClick={() => handleSummon(10)} disabled={isSummoning || player.linhThach < SUMMON_COST_TEN} className="px-8 py-4 text-xl font-bold rounded-lg border-2 transition-all duration-300 bg-purple-600 hover:bg-purple-500 border-purple-400 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20">
                    Triệu Hồi x10<br/><span className="text-sm">({SUMMON_COST_TEN} Linh Thạch)</span>
                </button>
             </div>
        </div>
    );
};

const CompanionPanel: React.FC<CompanionPanelProps> = (props) => {
    const [activeTab, setActiveTab] = useState('details'); // 'details', 'summon'

    const tabs = [
      { id: 'details', label: 'Chi Tiết' },
      { id: 'summon', label: 'Triệu Hồi' },
  ];

    const renderContent = () => {
        switch(activeTab) {
          case 'details':
            return <CompanionDetailsTab {...props} />;
          case 'summon':
            return <SummonTab player={props.player} onSummonCompanion={props.onSummonCompanion} />;
          default:
            return null;
        }
    }
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-center border-b border-gray-700 mb-4 flex-shrink-0">
                {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2 text-lg font-semibold transition-colors ${
                    activeTab === tab.id
                        ? 'text-yellow-300 border-b-2 border-yellow-300'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                >
                    {tab.label}
                </button>
                ))}
            </div>
            <div className="flex-grow overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default CompanionPanel;