import React, { useState } from 'react';
// FIX: Added .ts extension to fix module resolution error.
import { Player, PotentialStats, CombatStats, SpiritRoot, EquipmentSlot, Item, Title, TitleRarity } from '../types.ts';
// FIX: Added .tsx extension to fix module resolution error.
import CultivationPanel from './CultivationPanel.tsx';
// FIX: Added .ts extension to fix module resolution error.
import { ITEM_RARITY_COLORS, ITEM_RARITY_TEXT_COLORS, COMBAT_STAT_LABELS, CULTIVATION_REALMS } from '../constants.ts';
import { SPIRIT_ROOT_CLASSIFICATIONS } from '../data/spiritRootClassification.ts';

// Props for the main panel
interface CharacterPanelProps {
  player: Player;
  isCultivating: boolean;
  setIsCultivating: (isCultivating: boolean) => void;
  cultivationBonus: number;
  onCultivate: () => () => void;
  isMeditating: boolean;
  setIsMeditating: (isMeditating: boolean) => void;
  onMeditate: () => () => void;
  onSpendPotentialPoint: (stat: keyof PotentialStats) => void;
  onUnequipItem: (slot: EquipmentSlot) => void;
  onActivateCultivationMethod: (methodId: string) => void;
  onSetActiveTitle: (title: string | null) => void;
  onEnlightenSkill: () => void;
  titles: Title[];
  onObtainTitle: (titleId: string) => void;
  onBreakthrough: () => void;
}

// Props for the info tab
interface InfoTabProps {
  player: Player;
  onSpendPotentialPoint: (stat: keyof PotentialStats) => void;
}

// Props for the equipment tab
interface EquipmentTabProps {
  player: Player;
  onUnequipItem: (slot: EquipmentSlot) => void;
}

// Props for the titles tab
interface TitlesTabProps {
  player: Player;
  titles: Title[];
  onSetActiveTitle: (title: string | null) => void;
  onObtainTitle: (titleId: string) => void;
}


// Labels for potential stats for UI display
const POTENTIAL_STAT_LABELS: Record<keyof PotentialStats, string> = {
  theChat: 'Thể Chất',
  triLuc: 'Trí Lực',
  linhMan: 'Linh Mẫn',
  sucManh: 'Sức Mạnh',
  canCo: 'Căn Cơ',
  dinhLuc: 'Định Lực',
};

const POTENTIAL_STAT_TOOLTIPS: Record<keyof PotentialStats, string> = {
  theChat: 'Tăng HP tối đa và Phòng Ngự.',
  triLuc: 'Tăng MP tối đa và Pháp Công.',
  linhMan: 'Tăng Tốc Độ.',
  sucManh: 'Tăng Công Kích.',
  canCo: 'Tăng Kháng Phép.',
  dinhLuc: 'Tăng Kháng Phép và Kháng Tâm Ma.',
};

const TITLE_RARITY_CLASSES: Record<TitleRarity, string> = {
  'Phổ thông': 'text-white',
  'Quý': 'text-green-400',
  'Hiếm': 'text-blue-400',
  'Truyền Kỳ': 'text-orange-400',
  'Thần thoại': 'text-red-500',
};

// Sub-component for displaying character info and stats
const InfoTab: React.FC<InfoTabProps> = ({ player, onSpendPotentialPoint }) => {
  const spiritRootInfo = SPIRIT_ROOT_CLASSIFICATIONS.find(c => c.id === player.spiritRoot.classificationId);
  const isFemale = player.gender === 'Nữ';
  const isMale = player.gender === 'Nam';

  let imageUrl: string | null = null;
  if (isFemale) {
    imageUrl = "https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg";
  } else if (isMale) {
    imageUrl = "https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg";
  }

  const AvatarDisplay: React.FC<{ avatarUrl: string; alt: string; className: string; style?: React.CSSProperties }> = ({ avatarUrl, alt, className, style }) => {
      const isVideo = avatarUrl.startsWith('data:video');
      if (isVideo) {
        return <video src={avatarUrl} className={className} style={style} autoPlay loop muted playsInline aria-label={alt} />;
      }
      return <img src={avatarUrl} alt={alt} className={className} style={style} />;
  };

  return (
    <div className={`grid grid-cols-1 ${imageUrl ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 h-full`}>
      
      {/* Character Image: On mobile, it appears first due to source order. On desktop, it becomes the 2nd column. */}
      {imageUrl && (
        <div className="lg:col-span-1 lg:order-2 flex items-start justify-center pt-4">
            <AvatarDisplay 
              avatarUrl={imageUrl} 
              alt="Nhân vật" 
              className="rounded-lg shadow-2xl shadow-black/50 object-contain w-full"
              style={{ maxHeight: 'calc(100vh - 250px)' }}
            />
        </div>
      )}

      {/* Left Column: Potential Stats & Spirit Root */}
      <div className="lg:col-span-1 lg:order-1 space-y-6">
        {/* Potential Stats */}
        <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
          <h4 className="text-lg font-bold text-yellow-300 border-b border-gray-600 pb-2 mb-3">Tiềm Năng</h4>
          <p className="mb-3 text-sm text-gray-400">Điểm còn lại: <span className="font-bold text-white text-lg">{player.potentialPoints}</span></p>
          <div className="space-y-2">
            {Object.entries(player.potentialStats).map(([key, value]) => {
              const statKey = key as keyof PotentialStats;
              const baseValue = player.basePotentialStats[statKey];
              // FIX: Explicitly cast `value` to number. `Object.entries` may have weak type inference for object values, causing a type error in the arithmetic operation.
              const bonus = (value as number) - baseValue;
              
              let bonusColor = 'text-green-400';
              if (bonus >= 50) bonusColor = 'text-red-500 font-bold';
              else if (bonus >= 20) bonusColor = 'text-yellow-300';
              else if (bonus >= 10) bonusColor = 'text-purple-400';
              else if (bonus >= 5) bonusColor = 'text-blue-400';

              return (
              <div key={key} className="relative group flex justify-between items-center text-sm">
                <span className="text-gray-300 cursor-help">{POTENTIAL_STAT_LABELS[statKey]}:</span>
                 <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                >
                    {POTENTIAL_STAT_TOOLTIPS[statKey]}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white w-20 text-right" title={`Cơ bản: ${baseValue}`}>
                    {value}
                    {bonus > 0 && <span className={`${bonusColor} text-xs ml-1`}>(+{bonus})</span>}
                  </span>
                  {player.potentialPoints > 0 && (
                    <button onClick={() => onSpendPotentialPoint(statKey)} className="w-6 h-6 bg-green-600 text-white rounded-full hover:bg-green-500 transition-colors">+</button>
                  )}
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Spirit Root */}
        <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
           <h4 className="text-lg font-bold text-yellow-300 border-b border-gray-600 pb-2 mb-3">Linh Căn</h4>
           {player.spiritRootAppraised ? (
            spiritRootInfo && (
                <div className="space-y-1 text-sm">
                    <p>Loại: <span className="font-semibold text-cyan-300">{spiritRootInfo.name}</span></p>
                    <p>Thuộc tính: <span className="font-semibold text-white">{player.spiritRoot.attributes.join(', ')}</span></p>
                    <p>Tốc độ tu luyện: <span className="font-semibold text-purple-400">{spiritRootInfo.cultivationSpeed} (x{spiritRootInfo.expMultiplier})</span></p>
                    <p className="text-gray-400 italic text-xs mt-2">"{spiritRootInfo.note}"</p>
                </div>
            )
           ) : (
                <div className="text-sm">
                    <p className="font-semibold text-gray-400">Chưa biết</p>
                    <p className="text-xs text-gray-500 mt-1">Đạt cấp 5 và đến gặp Giám Linh Sư Yến Tử Nguyệt tại Thành Vân Lâm để giám định.</p>
                </div>
           )}
        </div>
      </div>

      {/* Right Column: Combat Stats */}
      <div className="lg:col-span-2 lg:order-3 bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
         <h4 className="text-lg font-bold text-yellow-300 border-b border-gray-600 pb-2 mb-3">Thuộc Tính Tổng</h4>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {Object.entries(player.totalStats).map(([key, value]) => {
                const statKey = key as keyof CombatStats;
                const label = COMBAT_STAT_LABELS[statKey];
                let displayValue: React.ReactNode;

                if (statKey === 'critRate') {
                    const total = player.totalStats.critRate;
                    const bonus = total - player.baseStats.critRate;
                    displayValue = (
                        <span className="flex items-center justify-end">
                            <span>{(total * 100).toFixed(2)}%</span>
                            {bonus > 0.0001 && <span className="text-green-400 ml-1">(+{(bonus * 100).toFixed(2)}%)</span>}
                        </span>
                    );
                } else if (statKey === 'critDamage') {
                    const total = player.totalStats.critDamage;
                    const bonus = total - player.baseStats.critDamage;
                    displayValue = (
                        <span className="flex items-center justify-end">
                            <span>+{((total - 1) * 100).toFixed(2)}%</span>
                            {bonus > 0.0001 && <span className="text-green-400 ml-1">(+{(bonus * 100).toFixed(2)}%)</span>}
                        </span>
                    );
                } else {
                    const isPercent = ['accuracy', 'evasion', 'armorPen', 'blockRate', 'mentalDemonResistance'].includes(key);
                    const displayValueNum = isPercent ? `${((value as number) * 100).toFixed(2)}%` : Math.round(value as number);
                    displayValue = <span>{displayValueNum}</span>;
                }

                return (
                    <div key={key} className="flex justify-between border-b border-gray-800 py-1">
                        <span className="text-gray-400">{label}:</span>
                        <span className="font-semibold text-white text-right">{displayValue}</span>
                    </div>
                );
            })}
         </div>
      </div>
    </div>
  );
};

// Sub-component for displaying equipped items
const EquipmentTab: React.FC<EquipmentTabProps> = ({ player, onUnequipItem }) => {
  const slots: EquipmentSlot[] = ['vũ khí', 'áo giáp', 'pháp bảo'];

  const renderItemCard = (item: Item | null, slot: EquipmentSlot) => {
    return (
      <div className={`p-4 rounded-lg border-2 h-52 flex flex-col justify-between ${item ? ITEM_RARITY_COLORS[item.rarity] : 'border-gray-700 border-dashed'} bg-gray-900/50`}>
        <div>
          <p className="text-sm uppercase text-gray-500">{slot}</p>
          {item ? (
            <>
              <h5 className={`font-bold text-lg ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>{item.name}</h5>
              <div className="text-xs mt-2">
                {item.stats && Object.entries(item.stats).map(([key, value]) => (
                  <p key={key} className="text-green-400 capitalize">{key}: +{value}</p>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600 mt-4">Chưa trang bị</p>
          )}
        </div>
        {item && (
          <div className="mt-auto">
            <p className="text-xs text-right text-gray-400 mb-2">{item.rarity}</p>
            <button 
              onClick={() => onUnequipItem(slot)} 
              className="w-full px-3 py-1 text-sm bg-red-600 hover:bg-red-500 rounded font-semibold transition-colors"
            >
              Tháo
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
        <h3 className="text-2xl font-serif text-yellow-300 text-center">Trang Bị Trên Người</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {slots.map(slot => (
                <div key={slot}>
                    {renderItemCard(player.equippedItems[slot] ?? null, slot)}
                </div>
            ))}
        </div>
    </div>
  );
};

const checkTitleRequirements = (player: Player, titleId: string): boolean => {
    switch (titleId) {
        case 'Nha_Tham_Hiem_May_Man':
            return player.foundTreasures.length >= 3;
        case 'Bac_Thay_Cuong_Hoa':
            return [...Object.values(player.equippedItems), ...player.inventory].some(item => item && item.upgradeLevel && item.upgradeLevel >= 5);
        case 'Ban_Huu_Cua_Linh_Thu':
            return player.companions.length >= 3;
        case 'Dan_Su_So_Cap': {
            const playerRealmIndex = CULTIVATION_REALMS.indexOf(player.cultivation.realm);
            const trucCoIndex = CULTIVATION_REALMS.indexOf('Trúc Cơ');
            return playerRealmIndex >= trucCoIndex;
        }
        case 'Chien_Binh_Thanh_Van':
            return player.completedStoryQuestIds.includes('sq_06');
        case 'Nghich_Thien_Hanh_Gia': {
            const playerRealmIndex = CULTIVATION_REALMS.indexOf(player.cultivation.realm);
            const chanTienIndex = CULTIVATION_REALMS.indexOf('Chân Tiên');
            return playerRealmIndex >= chanTienIndex;
        }
        case 'Ke_Diet_Chuot':
        case 'Nguoi_Thu_Gom_Linh_Thao':
        case 'Nha_Gia_Kim_Tap_Su':
        case 'Tho_San_Me_Anh':
        case 'Nhan_Tu_Hao_Hiep':
        case 'Ke_Khai_Mo_Linh_Mach':
        case 'Tru_Ma_Dao_Ton':
        case 'Nguoi_Thua_Ke_Ban_Co':
            return false;
        case 'Kiếm Khách Vô Danh':
        case 'Thần Nông Trợ Thủ':
        case 'Hộ Hoa Sứ Giả':
        case 'Thợ Săn Tập Sự':
        case 'Kẻ Kế Thừa Mặt Trời':
        case 'Phá Thiên':
        case 'Gia Tộc Bất Diệt':
        case 'Thien_Dao_Sat_Than':
            return false;

        default:
            return false;
    }
};

// Sub-component for managing titles
const TitlesTab: React.FC<TitlesTabProps> = ({ player, titles, onSetActiveTitle, onObtainTitle }) => {
    return (
        <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-serif text-yellow-300 text-center">Danh Sách Danh Hiệu</h3>
            <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg max-h-[60vh] overflow-y-auto space-y-2">
                {titles.map(titleData => {
                    const isOwned = player.titles.includes(titleData.id);
                    const canObtain = !isOwned && checkTitleRequirements(player, titleData.id);
                    const isLocked = !isOwned && !canObtain;
                    
                    return (
                        <div 
                            key={titleData.id} 
                            className={`group relative p-3 rounded-md border transition-all duration-300 ${isLocked ? 'bg-black/40 border-gray-800 opacity-70' : 'bg-gray-800/50 border-gray-700'}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className={`font-semibold ${isLocked ? 'text-gray-500 italic' : TITLE_RARITY_CLASSES[titleData.rarity]}`}>
                                    {isLocked && '🔒 '}
                                    {titleData.name}
                                </span>
                                
                                {isOwned && (
                                    <button 
                                        onClick={() => onSetActiveTitle(player.activeTitle === titleData.id ? null : titleData.id)}
                                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                            player.activeTitle === titleData.id 
                                            ? 'bg-yellow-600 text-black font-bold border-yellow-400' 
                                            : 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white'
                                        }`}
                                    >
                                        {player.activeTitle === titleData.id ? '★ Đang Trang Bị' : 'Trang Bị'}
                                    </button>
                                )}
                                
                                {canObtain && (
                                    <button
                                        onClick={() => onObtainTitle(titleData.id)}
                                        className="px-4 py-1 text-sm rounded-md font-bold bg-green-600 hover:bg-green-500 border border-green-400 text-white animate-pulse"
                                    >
                                        Nhận
                                    </button>
                                )}
                            </div>
                            
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-gray-900 border border-gray-600 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                <p className={`font-bold ${TITLE_RARITY_CLASSES[titleData.rarity]}`}>{titleData.name} ({titleData.rarity})</p>
                                <p className="italic text-gray-400 my-1">{titleData.description}</p>
                                <div className="border-t border-gray-700 pt-1 mt-1">
                                    {Object.entries(titleData.bonuses).map(([stat, value]) => {
                                        const label = COMBAT_STAT_LABELS[stat as keyof CombatStats] || (stat.charAt(0).toUpperCase() + stat.slice(1));
                                        const isPercent = ['critRate', 'critDamage', 'evasion', 'armorPen', 'blockRate', 'mentalDemonResistance'].includes(stat);
                                        const displayValue = isPercent ? `${(value as number) * 100}%` : value;
                                        return <p key={stat} className="text-green-300">{label}: +{displayValue}</p>;
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {player.activeTitle && (
                <button onClick={() => onSetActiveTitle(null)} className="w-full text-center text-sm text-red-400 hover:text-red-300 mt-2 py-2 bg-red-900/50 rounded-md border border-red-800">
                    Gỡ Danh Hiệu
                </button>
            )}
        </div>
    );
};


// Main Character Panel Component
const CharacterPanel: React.FC<CharacterPanelProps> = ({ player, titles, onSpendPotentialPoint, onUnequipItem, onActivateCultivationMethod, onSetActiveTitle, onEnlightenSkill, onObtainTitle, onBreakthrough, ...cultivationProps }) => {
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'cultivation', 'equipment', 'titles'

  const tabs = [
      { id: 'info', label: 'Thông Tin' },
      { id: 'equipment', label: 'Trang Bị' },
      { id: 'titles', label: 'Danh Hiệu' },
      { id: 'cultivation', label: 'Tu Luyện' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'info':
        return <InfoTab player={player} onSpendPotentialPoint={onSpendPotentialPoint} />;
      case 'cultivation':
        return <CultivationPanel player={player} onActivateCultivationMethod={onActivateCultivationMethod} onEnlightenSkill={onEnlightenSkill} onBreakthrough={onBreakthrough} {...cultivationProps} />;
      case 'equipment':
        return <EquipmentTab player={player} onUnequipItem={onUnequipItem} />;
      case 'titles':
        return <TitlesTab player={player} titles={titles} onSetActiveTitle={onSetActiveTitle} onObtainTitle={onObtainTitle} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center border-b border-gray-700 mb-4">
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
      <div className="flex-grow overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default CharacterPanel;