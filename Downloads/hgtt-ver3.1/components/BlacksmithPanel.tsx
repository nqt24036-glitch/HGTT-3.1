import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Player, Item, EquipmentSlot } from '../types.ts';
import { BLACKSMITH_INVENTORY, CRAFTING_RECIPES, UPGRADE_COSTS, UPGRADE_MULTIPLIERS, UPGRADE_SUCCESS_RATES } from '../data/gameData.ts';
import { ITEM_RARITY_COLORS, ITEM_RARITY_TEXT_COLORS, COMBAT_STAT_LABELS } from '../constants.ts';

interface BlacksmithPanelProps {
  player: Player;
  onClose: () => void;
  onBuyItem: (itemId: string, price: number) => void;
  onSellItem: (item: Item) => void;
  onCraftItem: (inputIds: [string, string], outputId: string) => void;
  onUpgradeItem: (item: Item) => void;
  onNotify: (message: string) => void;
  masterItemList: Item[];
}

interface StackedItem {
  item: Item;
  count: number;
}

const UpgradeAnimationOverlay: React.FC<{
    status: 'in_progress' | 'success' | 'failure';
    item: Item | null;
    onClose: () => void;
}> = ({ status, item, onClose }) => {
    
    useEffect(() => {
        if (status === 'success' || status === 'failure') {
            const timer = setTimeout(onClose, 2500); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [status, onClose]);

    if (!item) return null;

    const renderContent = () => {
        switch(status) {
            case 'in_progress':
                return (
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-yellow-400 mx-auto animate-upgrade-forge" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <p className="text-3xl font-bold text-yellow-300 mt-4 animate-pulse">Đang cường hóa...</p>
                    </div>
                );
            case 'success':
                 const newLevel = (item.upgradeLevel || 0) + 1;
                 const isHighTier = newLevel >= 10;
                 return (
                     <div className={`text-center animate-upgrade-success-glow ${isHighTier ? 'animate-upgrade-shake' : ''}`}>
                         <div className="animate-upgrade-fly-in" style={{ animationDelay: '0.2s' }}>
                            <h2 className="text-5xl font-bold text-green-400 drop-shadow-lg">THÀNH CÔNG</h2>
                            <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center text-6xl my-6 mx-auto overflow-hidden border-4 border-yellow-400 shadow-2xl">
                                {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                            </div>
                            <p className={`text-3xl font-bold ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>{item.name} <span className="text-yellow-300">+{newLevel}</span></p>
                         </div>
                     </div>
                 );
            case 'failure':
                return (
                    <div className="text-center animate-upgrade-shake">
                         <div className="animate-upgrade-fly-in" style={{ animationDelay: '0.2s' }}>
                            <h2 className="text-5xl font-bold text-red-500 drop-shadow-lg">THẤT BẠI</h2>
                             <div className="relative w-32 h-32 my-6 mx-auto">
                                <div className="absolute inset-0 flex items-center justify-center text-8xl text-red-500 opacity-70 transform rotate-12">✕</div>
                                <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center text-6xl overflow-hidden border-4 border-gray-600 shadow-inner grayscale">
                                    {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                                </div>
                            </div>
                            <p className="text-2xl text-gray-400">Chúc bạn may mắn lần sau!</p>
                         </div>
                    </div>
                );
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            {renderContent()}
        </div>
    );
};


const BlacksmithPanel: React.FC<BlacksmithPanelProps> = ({ player, onClose, onBuyItem, onSellItem, onCraftItem, onUpgradeItem, onNotify, masterItemList }) => {
  const [activeTab, setActiveTab] = useState('upgrade');

  // State for Sell Tab
  const [sellSelectedItem, setSellSelectedItem] = useState<Item | null>(null);

  // State for Craft Tab
  const [craftSlot1, setCraftSlot1] = useState<Item | null>(null);
  const [craftSlot2, setCraftSlot2] = useState<Item | null>(null);
  
  // State for Upgrade Tab
  const [selectedUpgradeItem, setSelectedUpgradeItem] = useState<Item | null>(null);
  const [upgradingStatus, setUpgradingStatus] = useState<'idle' | 'in_progress' | 'success' | 'failure'>('idle');
  const [itemBeingUpgraded, setItemBeingUpgraded] = useState<Item | null>(null);
  const prevPlayerRef = useRef(player);


  const upgradableItems = useMemo(() => {
    // FIX: Use Object.keys and a type guard to safely filter equipped items, avoiding issues with Object.values returning `unknown[]`.
    const equipped = (Object.keys(player.equippedItems) as EquipmentSlot[])
        .map(slot => player.equippedItems[slot])
        .filter((item): item is Item => !!item && !!item.slot);
    const inventory = player.inventory.filter(item => item.slot);
    // Combine and create unique keys for rendering based on id and upgrade level
    const combined = [...equipped, ...inventory];
    return combined.sort((a,b) => (b.upgradeLevel || 0) - (a.upgradeLevel || 0));
  }, [player.equippedItems, player.inventory]);

  useEffect(() => {
    if(activeTab === 'upgrade') {
        // If the selected item still exists in the list, find its updated version and set it.
        if (selectedUpgradeItem) {
            const updatedVersion = upgradableItems.find(item => 
                item.id === selectedUpgradeItem.id && 
                (item.upgradeLevel || 0) === (selectedUpgradeItem.upgradeLevel || 0)
            );
            setSelectedUpgradeItem(updatedVersion || (upgradableItems.length > 0 ? upgradableItems[0] : null));
        } else if (upgradableItems.length > 0) {
            setSelectedUpgradeItem(upgradableItems[0]);
        }
    }
  }, [player, upgradableItems, activeTab, selectedUpgradeItem]);
  
   useEffect(() => {
        if (upgradingStatus === 'in_progress' && itemBeingUpgraded) {
            // Check if player object has actually changed. If not, do nothing.
            if (prevPlayerRef.current === player) {
                return;
            }

            // FIX: Add optional chaining to 'i' because Object.values(player.equippedItems) can include undefined for empty slots. This prevents a runtime error.
            const upgradedItemExists = [...Object.values(player.equippedItems), ...player.inventory].some(
                i => i?.id === itemBeingUpgraded.id && (i?.upgradeLevel || 0) === (itemBeingUpgraded.upgradeLevel || 0) + 1
            );

            if (upgradedItemExists) {
                setUpgradingStatus('success');
            } else {
                setUpgradingStatus('failure');
            }
        }
        prevPlayerRef.current = player;
    }, [player, upgradingStatus, itemBeingUpgraded]);


  const stackedCraftableInventory = useMemo((): StackedItem[] => {
    const itemMap = new Map<string, StackedItem>();
    player.inventory.filter(i => i.type === 'Nguyên liệu' || i.type === 'Nhiệm vụ').forEach(item => {
        if (itemMap.has(item.id)) {
            itemMap.get(item.id)!.count++;
        } else {
            itemMap.set(item.id, { item: { ...item }, count: 1 });
        }
    });
    return Array.from(itemMap.values());
  }, [player.inventory]);

  const craftResult = useMemo(() => {
    if (!craftSlot1 || !craftSlot2) return null;
    const inputIds = [craftSlot1.id, craftSlot2.id].sort();
    const recipe = CRAFTING_RECIPES.find(r => r.inputs.slice().sort().join(',') === inputIds.join(','));
    if (!recipe) return null;
    return masterItemList.find(i => i.id === recipe.output) || null;
  }, [craftSlot1, craftSlot2, masterItemList]);

  const handleSellItemClick = (item: Item) => {
    setSellSelectedItem(item);
  };

  const handleConfirmSell = () => {
    if (sellSelectedItem) {
      onSellItem(sellSelectedItem);
      setSellSelectedItem(null);
    }
  };

  const handleAddToCraftSlot = (item: Item) => {
    if (!craftSlot1) {
      setCraftSlot1(item);
    } else if (!craftSlot2) {
      setCraftSlot2(item);
    }
  };

  const handleRemoveFromCraftSlot = (slot: 1 | 2) => {
    if (slot === 1) setCraftSlot1(null);
    if (slot === 2) setCraftSlot2(null);
  };
  
  const handleCraft = () => {
    if (craftResult && craftSlot1 && craftSlot2) {
      const pInvCounts = player.inventory.reduce((acc, item) => {
          acc[item.id] = (acc[item.id] || 0) + 1;
          return acc;
      }, {} as Record<string, number>);

      const hasSlot1 = pInvCounts[craftSlot1.id] >= 1;
      const hasSlot2 = pInvCounts[craftSlot2.id] >= (craftSlot1.id === craftSlot2.id ? 2 : 1);

      if (hasSlot1 && hasSlot2) {
        onCraftItem([craftSlot1.id, craftSlot2.id], craftResult.id);
        setCraftSlot1(null);
        setCraftSlot2(null);
      } else {
        onNotify("Không đủ nguyên liệu trong túi đồ.");
      }
    }
  };

  const handleInitiateUpgrade = () => {
    const currentLevel = selectedUpgradeItem?.upgradeLevel || 0;
    const isMaxLevel = currentLevel >= 20;
    const cost = UPGRADE_COSTS[currentLevel];
    if (!selectedUpgradeItem || isMaxLevel || !cost) return;

    if (player.linhThach < cost.linhThach) return;
    const matsOk = cost.materials.every(mat => {
        const countInInventory = player.inventory.filter(i => i.id === mat.itemId).length;
        return countInInventory >= mat.count;
    });
    if (!matsOk) return;

    setItemBeingUpgraded(selectedUpgradeItem);
    setUpgradingStatus('in_progress');
    
    // The actual upgrade logic is delayed slightly to allow the animation to start smoothly
    setTimeout(() => {
      onUpgradeItem(selectedUpgradeItem);
    }, 100);
  };


  const sellableInventory = useMemo((): StackedItem[] => {
    const itemMap = new Map<string, StackedItem>();
    player.inventory.filter(i => i.value !== undefined && i.value > 0).forEach(item => {
        const key = `${item.id}_${item.upgradeLevel || 0}`; // Treat upgraded items as unique for selling
        if (itemMap.has(key)) {
            itemMap.get(key)!.count++;
        } else {
            itemMap.set(key, { item: { ...item }, count: 1 });
        }
    });
    return Array.from(itemMap.values());
  }, [player.inventory]);


  const renderBuyTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] p-1">
      {BLACKSMITH_INVENTORY.map(({ itemId, price }) => {
        const item = masterItemList.find(i => i.id === itemId);
        if (!item) return null;
        const canAfford = player.linhThach >= price;
        return (
          <div key={itemId} className={`p-3 rounded-lg border-2 ${ITEM_RARITY_COLORS[item.rarity]} bg-gray-800/50 flex flex-col`}>
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-xl overflow-hidden">
                  {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                </div>
                <div>
                  <h4 className={`font-semibold ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>{item.name}</h4>
                  <p className="text-sm text-yellow-400">{price} Linh Thạch</p>
                </div>
              </div>
            <p className="text-xs text-gray-400 flex-grow mb-3">{item.description}</p>
            <button onClick={() => onBuyItem(itemId, price)} disabled={!canAfford} className="w-full mt-auto px-3 py-1 rounded font-semibold transition-colors bg-green-700 hover:bg-green-600 border border-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed">
              {canAfford ? 'Mua' : 'Không đủ Linh Thạch'}
            </button>
          </div>
        );
      })}
    </div>
  );

  const renderSellTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="flex flex-col min-h-0">
        <h4 className="text-lg font-semibold text-yellow-300 mb-2 flex-shrink-0">Túi Đồ Của Bạn</h4>
        <div className="space-y-2 overflow-y-auto flex-grow border rounded border-gray-700 p-2 bg-black/20">
          {sellableInventory.length > 0 ? (
            sellableInventory.map(({ item, count }) => (
              <button key={`${item.id}_${item.upgradeLevel||0}`} onClick={() => handleSellItemClick(item)} className={`w-full text-left p-2 rounded flex items-center gap-2 transition-colors ${sellSelectedItem === item ? 'bg-yellow-800/50' : 'bg-gray-800/70 hover:bg-gray-700/80'}`}>
                <span className="text-lg w-8 h-8 flex items-center justify-center overflow-hidden rounded flex-shrink-0">
                  {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                </span>
                <span className={`flex-grow ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>
                    {item.name}
                    {item.upgradeLevel && item.upgradeLevel > 0 && <span className="text-yellow-400 font-bold ml-2">+{item.upgradeLevel}</span>}
                    {count > 1 && <span className="text-yellow-400 font-normal ml-2">x{count}</span>}
                </span>
                <span className="text-sm text-yellow-400">{Math.floor((item.value || 0) / 2)} LT</span>
              </button>
            ))
          ) : (
             <p className="text-gray-500 text-center p-4">Không có gì để bán.</p>
          )}
        </div>
      </div>
      <div className="bg-gray-800/50 rounded border border-gray-700 p-4 flex flex-col justify-center items-center">
        {sellSelectedItem ? (
          <>
            <h4 className="text-xl font-bold">Bán <span className={ITEM_RARITY_TEXT_COLORS[sellSelectedItem.rarity]}>{sellSelectedItem.name} {sellSelectedItem.upgradeLevel ? `+${sellSelectedItem.upgradeLevel}` : ''}</span></h4>
            <p className="text-2xl text-yellow-300 my-4">{Math.floor((sellSelectedItem.value || 0) / 2)} Linh Thạch</p>
            <div className="flex gap-4">
              <button onClick={() => setSellSelectedItem(null)} className="px-6 py-2 rounded bg-gray-600 hover:bg-gray-500">Hủy</button>
              <button onClick={handleConfirmSell} className="px-6 py-2 rounded bg-green-600 hover:bg-green-500">Xác Nhận</button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Chọn một vật phẩm để bán.</p>
        )}
      </div>
    </div>
  );
  
  const CraftSlot: React.FC<{item: Item | null, onRemove: () => void, placeholder: string}> = ({ item, onRemove, placeholder }) => (
    <div className="w-28 h-28 border-2 border-dashed border-gray-600 rounded bg-black/30 flex justify-center items-center relative">
      {item ? (
        <>
          <div className="text-center">
            <div className="text-3xl h-12 w-12 mx-auto flex items-center justify-center overflow-hidden rounded-md">
                {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
            </div>
            <div className={`text-xs ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>{item.name}</div>
          </div>
          <button onClick={onRemove} className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full text-white font-bold text-sm">X</button>
        </>
      ) : (
        <span className="text-gray-500 text-sm">{placeholder}</span>
      )}
    </div>
  );

  const renderCraftTab = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="flex flex-col min-h-0">
            <h4 className="text-lg font-semibold text-yellow-300 mb-2 flex-shrink-0">Nguyên Liệu</h4>
            <div className="space-y-2 overflow-y-auto flex-grow border rounded border-gray-700 p-2 bg-black/20">
                {stackedCraftableInventory.length > 0 ? (
                    stackedCraftableInventory.map(({ item, count }) => (
                        <button key={item.id} onClick={() => handleAddToCraftSlot(item)} className="w-full text-left p-2 rounded flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700/80">
                            <span className="text-lg w-8 h-8 flex items-center justify-center overflow-hidden rounded flex-shrink-0">
                                {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                            </span>
                            <span className={`flex-grow ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>{item.name}</span>
                            {count > 1 && <span className="text-yellow-400 font-normal">x{count}</span>}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500 text-center p-4">Không có nguyên liệu.</p>
                )}
            </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 bg-gray-800/50 rounded border border-gray-700 p-4">
            <div className="flex items-center gap-4">
                <CraftSlot item={craftSlot1} onRemove={() => handleRemoveFromCraftSlot(1)} placeholder="NL 1" />
                <span className="text-3xl font-bold">+</span>
                <CraftSlot item={craftSlot2} onRemove={() => handleRemoveFromCraftSlot(2)} placeholder="NL 2" />
            </div>
            <div className="text-4xl">↓</div>
            <div className="w-40 h-28 border-2 border-green-500 rounded bg-black/30 flex justify-center items-center">
                {craftResult ? (
                    <div className="text-center">
                        <div className="text-3xl h-12 w-12 mx-auto flex items-center justify-center overflow-hidden rounded-md">
                            {craftResult.icon.startsWith('http') ? <img src={craftResult.icon} alt={craftResult.name} className="w-full h-full object-cover" /> : craftResult.icon}
                        </div>
                        <div className={`text-sm ${ITEM_RARITY_TEXT_COLORS[craftResult.rarity]}`}>{craftResult.name}</div>
                    </div>
                ) : (
                    <span className="text-gray-500 text-sm">Thành Phẩm</span>
                )}
            </div>
             <button onClick={handleCraft} disabled={!craftResult} className="w-full mt-4 py-3 rounded-lg font-bold text-lg bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">Chế Tạo</button>
        </div>
     </div>
  );

  const renderUpgradeTab = () => {
    const currentLevel = selectedUpgradeItem?.upgradeLevel || 0;
    const isMaxLevel = currentLevel >= 20;
    const upgradeCost = !isMaxLevel ? UPGRADE_COSTS[currentLevel] : null;
    const successRate = !isMaxLevel ? UPGRADE_SUCCESS_RATES[currentLevel] : 0;

    let hasMaterials = false;
    if (upgradeCost) {
        const hasLinhThach = player.linhThach >= upgradeCost.linhThach;
        const hasUpgradeStones = upgradeCost.materials.every(mat => {
            const countInInventory = player.inventory.filter(i => i.id === mat.itemId).length;
            return countInInventory >= mat.count;
        });
        hasMaterials = hasLinhThach && hasUpgradeStones;
    }

    const getNextStats = (item: Item) => {
        if (!item || isMaxLevel) return null;
        const nextStats: Partial<Item['stats']> = {};
        const base = item.baseStats || item.stats;
        if (!base) return null;
        const multiplier = UPGRADE_MULTIPLIERS[currentLevel];
        for (const key in base) {
            const statKey = key as keyof typeof base;
            if (typeof base[statKey] === 'number') {
                nextStats[statKey] = Math.round(base[statKey]! * (1 + multiplier));
            }
        }
        return nextStats;
    };

    const nextStats = selectedUpgradeItem ? getNextStats(selectedUpgradeItem) : null;
    
    const getRateColor = (rate: number, type: 'text' | 'bg') => {
        const color = rate >= 0.7 ? 'green' : rate >= 0.3 ? 'yellow' : 'red';
        const shade = type === 'text' ? '400' : '500';
        return type === 'text' ? `text-${color}-${shade}` : `bg-${color}-${shade}`;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="flex flex-col min-h-0">
                <h4 className="text-lg font-semibold text-yellow-300 mb-2 flex-shrink-0">Trang Bị Có Thể Cường Hóa</h4>
                <div className="space-y-2 overflow-y-auto flex-grow border rounded border-gray-700 p-2 bg-black/20">
                    {upgradableItems.length > 0 ? (
                        upgradableItems.map((item, index) => (
                            <button key={`${item.id}-${index}`} onClick={() => setSelectedUpgradeItem(item)} className={`w-full text-left p-2 rounded flex items-center gap-2 transition-colors ${selectedUpgradeItem === item ? 'bg-yellow-800/50' : 'bg-gray-800/70 hover:bg-gray-700/80'}`}>
                                <span className="text-lg w-8 h-8 flex items-center justify-center overflow-hidden rounded flex-shrink-0">
                                    {item.icon.startsWith('http') ? <img src={item.icon} alt={item.name} className="w-full h-full object-cover" /> : item.icon}
                                </span>
                                <span className={`flex-grow ${ITEM_RARITY_TEXT_COLORS[item.rarity]}`}>{item.name}</span>
                                <span className="text-yellow-400 font-bold">+{item.upgradeLevel || 0}</span>
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center p-4">Không có trang bị để cường hóa.</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col bg-gray-800/50 rounded border border-gray-700 p-4">
                {!selectedUpgradeItem ? (
                    <div className="flex-grow flex items-center justify-center">
                         <p className="text-gray-500">Chọn một trang bị để cường hóa.</p>
                    </div>
                ) : (
                    <>
                    <div className="text-center mb-4">
                        <h4 className={`text-xl font-bold ${ITEM_RARITY_TEXT_COLORS[selectedUpgradeItem.rarity]}`}>{selectedUpgradeItem.name}</h4>
                        <p className="text-3xl font-bold text-yellow-300">+{currentLevel} <span className="text-xl text-gray-400">→</span> <span className="text-green-400">+{currentLevel + 1}</span></p>
                    </div>
                    <div className="p-2 border border-gray-600 rounded bg-black/20 mb-4 overflow-y-auto">
                        <h5 className="font-semibold text-gray-400 mb-1">So sánh chỉ số</h5>
                        {selectedUpgradeItem.stats && Object.entries(selectedUpgradeItem.stats).map(([key, value]) => {
                             const nextValue = isMaxLevel ? null : (nextStats ? nextStats[key as keyof typeof nextStats] : null);
                             return (
                                <p key={key} className="text-sm">
                                    {COMBAT_STAT_LABELS[key as keyof typeof COMBAT_STAT_LABELS] || key}: 
                                    <span className="text-white font-semibold ml-2">{value}</span>
                                    {/* FIX: Add a `typeof value === 'number'` check to ensure type safety before comparison, as `Object.entries` doesn't strictly type the value. */}
                                    {nextValue && typeof value === 'number' && nextValue > value && (
                                        <span className="text-green-400 font-semibold"> → {nextValue}</span>
                                    )}
                                </p>
                             )
                        })}
                    </div>
                    
                    <div className="flex-grow">
                        <h5 className="font-semibold text-yellow-300 mb-2">Yêu Cầu Cường Hóa</h5>
                        {isMaxLevel ? <p className="text-center text-yellow-400 p-4">Đã đạt cấp tối đa</p> : upgradeCost && (
                            <div className="space-y-2 text-sm bg-black/20 p-3 rounded border border-gray-600">
                                <div className="flex justify-between">
                                    <span>Linh Thạch:</span>
                                    <span className={player.linhThach >= upgradeCost.linhThach ? 'text-green-400' : 'text-red-400'}>
                                        {player.linhThach} / {upgradeCost.linhThach}
                                    </span>
                                </div>
                                {upgradeCost.materials.map(mat => {
                                    const have = player.inventory.filter(i => i.id === mat.itemId).length;
                                    const materialItem = masterItemList.find(i => i.id === mat.itemId);
                                    return (
                                        <div key={mat.itemId} className="flex justify-between">
                                            <span>{materialItem?.name || mat.itemId}:</span>
                                            <span className={have >= mat.count ? 'text-green-400' : 'text-red-400'}>
                                                {have} / {mat.count}
                                            </span>
                                        </div>
                                    )
                                })}
                                <div className="pt-2 border-t border-gray-700 mt-2">
                                    <div className="flex justify-between font-bold text-base mb-1">
                                        <span className="text-cyan-300">Tỉ lệ thành công:</span>
                                        <span className={getRateColor(successRate, 'text')}>{(successRate * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className={`${getRateColor(successRate, 'bg')} h-2.5 rounded-full`} style={{width: `${successRate * 100}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                      onClick={handleInitiateUpgrade}
                      disabled={isMaxLevel || !hasMaterials}
                      className="w-full mt-4 py-3 rounded-lg font-bold text-lg bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      {isMaxLevel ? 'Cấp Tối Đa' : 'Cường Hóa'}
                    </button>
                    </>
                )}
            </div>
        </div>
    );
};


  return (
    <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4" onClick={upgradingStatus === 'idle' ? onClose : undefined}>
      {upgradingStatus !== 'idle' && (
        <UpgradeAnimationOverlay
            status={upgradingStatus}
            item={itemBeingUpgraded}
            onClose={() => {
                const lastUpgradedItem = itemBeingUpgraded;
                setUpgradingStatus('idle');
                setItemBeingUpgraded(null);
                // Reselect the (potentially) upgraded item
                if(lastUpgradedItem){
                    const newVersion = upgradableItems.find(i => i.id === lastUpgradedItem.id && (i.upgradeLevel || 0) > (lastUpgradedItem.upgradeLevel || 0));
                    setSelectedUpgradeItem(newVersion || lastUpgradedItem);
                }
            }}
        />
      )}
      <div className="bg-gray-900 border-2 border-yellow-700 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col animate-fadeIn" onClick={e => e.stopPropagation()}>
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-serif text-yellow-300">Tiệm Rèn</h2>
            <p className="text-gray-400">Mua, bán, chế tạo và cường hóa trang bị.</p>
          </div>
          <div className="text-lg bg-gray-800 border border-gray-600 px-3 py-1 rounded">
            <span className="text-gray-400">Linh Thạch: </span>
            <span className="font-bold text-yellow-400">{player.linhThach}</span>
          </div>
        </header>
        <nav className="flex justify-center border-b border-gray-700">
          {[
            { id: 'upgrade', label: 'Cường Hóa' },
            { id: 'craft', label: 'Chế Tạo' },
            { id: 'buy', label: 'Mua' },
            { id: 'sell', label: 'Bán' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 text-lg font-semibold transition-colors ${activeTab === tab.id ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <main className="p-4 flex-grow overflow-hidden min-h-0">
          {activeTab === 'upgrade' && renderUpgradeTab()}
          {activeTab === 'craft' && renderCraftTab()}
          {activeTab === 'buy' && renderBuyTab()}
          {activeTab === 'sell' && renderSellTab()}
        </main>
        <footer className="p-4 border-t border-gray-700 text-right">
            <button onClick={onClose} className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition-colors">
                Đóng
            </button>
        </footer>
      </div>
    </div>
  );
};

export default BlacksmithPanel;