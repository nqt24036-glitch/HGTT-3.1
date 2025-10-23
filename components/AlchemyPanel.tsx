import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Player, AlchemyRecipe, Item } from '../types.ts';
import { ALCHEMY_RECIPES } from '../data/gameData.ts';
import { ITEM_RARITY_TEXT_COLORS } from '../constants.ts';
import { getAlchemyRankInfo } from '../data/alchemyData.ts';

interface AlchemyPanelProps {
    player: Player;
    onRefinePill: (recipe: AlchemyRecipe, success: boolean) => void;
    onNotify: (message: string) => void;
    masterItemList: Item[];
}

const MiniGameOverlay: React.FC<{ onComplete: (success: boolean) => void }> = ({ onComplete }) => {
    const [position, setPosition] = useState(50);
    const [velocity, setVelocity] = useState(0);
    const gameTime = 10; // seconds
    const [timeLeft, setTimeLeft] = useState(gameTime);
    const targetZone = { start: 40, end: 60 };
    const successThreshold = 0.7; // Must be in target zone for 70% of the time
    
    const inZoneTime = useRef(0);
    const lastTime = useRef(performance.now());
    const gameLoopRef = useRef<number | null>(null);

    const handleKeyPress = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        // Apply an upward force
        setVelocity(v => v - 2.5);
    };

    useEffect(() => {
        const tick = (now: number) => {
            const delta = (now - lastTime.current) / 1000;
            lastTime.current = now;

            // Apply "gravity" - a constant downward force
            const gravity = 15;
            setVelocity(v => v + gravity * delta);
            
            // Damping to prevent infinite velocity
            setVelocity(v => v * 0.98);

            setPosition(p => {
                const newPos = p + velocity * delta * 10; // Multiplier to make it feel more responsive
                return Math.max(0, Math.min(100, newPos));
            });

            // Track success time
            if (position >= targetZone.start && position <= targetZone.end) {
                inZoneTime.current += delta;
            }

            setTimeLeft(t => Math.max(0, t - delta));

            gameLoopRef.current = requestAnimationFrame(tick);
        };

        gameLoopRef.current = requestAnimationFrame(tick);
        
        const gameTimer = setTimeout(() => {
            if(gameLoopRef.current) {
               cancelAnimationFrame(gameLoopRef.current);
            }
            const successRatio = inZoneTime.current / gameTime;
            onComplete(successRatio >= successThreshold);
        }, gameTime * 1000);

        return () => {
            if(gameLoopRef.current) {
               cancelAnimationFrame(gameLoopRef.current);
            }
            clearTimeout(gameTimer);
        };
    }, [onComplete]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 flex-col"
            onMouseDown={handleKeyPress}
            onTouchStart={handleKeyPress}
        >
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Khống Chế Hỏa Hầu!</h3>
            <p className="text-gray-400 mb-6">Chạm hoặc click để giữ thanh chỉ báo trong vùng màu xanh lá.</p>
            <div className="w-full max-w-md h-12 bg-gray-900 border-2 border-gray-600 rounded-lg relative overflow-hidden">
                {/* Target Zone */}
                <div 
                    className="absolute h-full bg-green-500/30"
                    style={{ left: `${targetZone.start}%`, width: `${targetZone.end - targetZone.start}%` }}
                ></div>
                {/* Indicator */}
                <div
                    className="absolute top-0 h-full w-1.5 bg-cyan-400 border-x border-black transition-all duration-75"
                    style={{ left: `${position}%` }}
                ></div>
            </div>
            <p className="text-4xl font-bold mt-6">{timeLeft.toFixed(1)}s</p>
        </div>
    );
};

const AlchemyPanel: React.FC<AlchemyPanelProps> = ({ player, onRefinePill, onNotify, masterItemList }) => {
    const [selectedRecipe, setSelectedRecipe] = useState<AlchemyRecipe | null>(ALCHEMY_RECIPES.length > 0 ? ALCHEMY_RECIPES[0] : null);
    const [isRefining, setIsRefining] = useState(false);
    const [filter, setFilter] = useState<{level: number | 'all', cauldron: number | 'all'}>({level: 'all', cauldron: 'all'});
    
    const equippedCauldron = player.inventory.find(i => i.type === 'Đan Lô');
    const equippedCauldronLevel = equippedCauldron ? (parseInt(equippedCauldron.id.split('_')[1]) || 1) : 0;

    const filteredRecipes = useMemo(() => {
        return ALCHEMY_RECIPES.filter(r => 
            (filter.level === 'all' || r.level === filter.level) &&
            (filter.cauldron === 'all' || r.requiredCauldronLevel <= filter.cauldron)
        );
    }, [filter]);

    useEffect(() => {
        if (!selectedRecipe || !filteredRecipes.some(r => r.id === selectedRecipe.id)) {
            setSelectedRecipe(filteredRecipes.length > 0 ? filteredRecipes[0] : null);
        }
    }, [filteredRecipes, selectedRecipe]);


    const playerInventoryCounts = useMemo(() => {
        return player.inventory.reduce((acc, item) => {
            acc[item.id] = (acc[item.id] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [player.inventory]);

    const handleStartRefining = () => {
        if (!selectedRecipe) return;

        const canAfford = selectedRecipe.inputs.every(input => 
            (playerInventoryCounts[input.itemId] || 0) >= input.count
        );
        const levelOk = player.alchemy.level >= selectedRecipe.requiredLevel;
        const cauldronOk = equippedCauldronLevel >= selectedRecipe.requiredCauldronLevel;

        if (canAfford && levelOk && cauldronOk) {
            setIsRefining(true);
        } else if (!levelOk) {
            onNotify("Cấp Luyện Đan Sư không đủ.");
        } else if (!cauldronOk) {
            onNotify("Cần Đan Lô cao cấp hơn.");
        } else {
            onNotify("Không đủ nguyên liệu.");
        }
    };
    
    const handleMiniGameComplete = (success: boolean) => {
        setIsRefining(false);
        if (selectedRecipe) {
            onRefinePill(selectedRecipe, success);
        }
    };
    
    const alchemyPercent = player.alchemy.expToNext > 0 ? (player.alchemy.exp / player.alchemy.expToNext) * 100 : 100;

    const rankInfo = getAlchemyRankInfo(player.alchemy.level);
    const tamDanNhatNiemBonus = player.alchemy.consecutiveSuccesses >= 3 ? 0.2 : 0;

    return (
        <div className="h-full w-full flex flex-col">
            {isRefining && <MiniGameOverlay onComplete={handleMiniGameComplete} />}

            <div className="text-center mb-4">
                 <h3 className="text-3xl font-serif text-yellow-300">Luyện Đan</h3>
                 <p className="text-gray-400 mt-1">Chế tạo đan dược để hỗ trợ con đường tu tiên.</p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-bold text-orange-400">{rankInfo.name}</p>
                        <p className="text-xs text-gray-400">{rankInfo.perk}</p>
                    </div>
                     <div className="text-right">
                         <p className="text-sm">Luyện Đan Sư Cấp {player.alchemy.level}</p>
                        <div className="w-40 bg-gray-800 rounded-full h-2.5 border border-gray-600 mt-1">
                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full" style={{ width: `${alchemyPercent}%` }}></div>
                        </div>
                    </div>
                </div>
                {player.alchemy.consecutiveSuccesses > 0 && (
                    <div className={`mt-2 text-center text-sm font-bold animate-pulse ${tamDanNhatNiemBonus > 0 ? 'text-cyan-400' : 'text-yellow-400'}`}>
                        {tamDanNhatNiemBonus > 0 ? 'Tâm Đan Nhất Niệm đã kích hoạt!' : `Chuỗi thành công: ${player.alchemy.consecutiveSuccesses}`}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow min-h-0">
                {/* Recipe List */}
                <div className="md:col-span-1 flex flex-col">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-yellow-300">Đan Phương</h4>
                        {/* Add filters later if needed */}
                     </div>
                     <div className="space-y-2 overflow-y-auto flex-grow border rounded border-gray-700 p-2 bg-black/20">
                        {filteredRecipes.map(recipe => {
                            const isSelected = selectedRecipe?.id === recipe.id;
                            const levelOk = player.alchemy.level >= recipe.requiredLevel;
                            const cauldronOk = equippedCauldronLevel >= recipe.requiredCauldronLevel;
                            const canCraft = levelOk && cauldronOk;
                            return (
                                <button 
                                    key={recipe.id}
                                    onClick={() => setSelectedRecipe(recipe)}
                                    className={`w-full text-left p-2 rounded flex items-center gap-2 transition-colors ${isSelected ? 'bg-yellow-800/50' : 'bg-gray-800/70 hover:bg-gray-700/80'} ${!canCraft && 'opacity-50'}`}
                                >
                                    <div className="flex-grow">
                                        <p className={`font-semibold ${canCraft ? 'text-white' : 'text-gray-500'}`}>{recipe.name} <span className="text-xs text-gray-400">(Cấp {recipe.level})</span></p>
                                        {!levelOk && <p className="text-xs text-red-500">Y/c Luyện Đan Cấp {recipe.requiredLevel}</p>}
                                        {!cauldronOk && <p className="text-xs text-red-500">Y/c Đan Lô Cấp {recipe.requiredCauldronLevel}</p>}
                                    </div>
                                </button>
                            )
                        })}
                     </div>
                </div>

                {/* Recipe Details */}
                <div className="md:col-span-2 bg-gray-800/50 rounded border border-gray-700 p-4 flex flex-col">
                    {!selectedRecipe ? (
                         <div className="flex-grow flex items-center justify-center">
                            <p className="text-gray-500">Chọn một đan phương để xem chi tiết.</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-4">
                                <h4 className="text-2xl font-bold text-cyan-300">{selectedRecipe.name}</h4>
                            </div>
                            <div className="flex-grow space-y-3 overflow-y-auto pr-2">
                                <div>
                                    <h5 className="font-semibold text-gray-400 mb-2">Nguyên Liệu Cần Thiết</h5>
                                    <div className="space-y-2">
                                        {selectedRecipe.inputs.map(input => {
                                            const itemInfo = masterItemList.find(i => i.id === input.itemId);
                                            const have = playerInventoryCounts[input.itemId] || 0;
                                            const hasEnough = have >= input.count;
                                            return (
                                                <div key={input.itemId} className="flex justify-between items-center bg-black/20 p-2 rounded">
                                                    <span className={`${ITEM_RARITY_TEXT_COLORS[itemInfo?.rarity || 'Phổ thông']}`}>{itemInfo?.name || 'Vật phẩm lạ'}</span>
                                                    <span className={hasEnough ? 'text-green-400' : 'text-red-400'}>{have} / {input.count}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                 <div>
                                    <h5 className="font-semibold text-gray-400 mb-2">Thành Phẩm</h5>
                                     <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                                        {(() => {
                                            const itemInfo = masterItemList.find(i => i.id === selectedRecipe.outputId);
                                            if (!itemInfo) return <span>Vật phẩm lạ</span>;
                                            return (
                                                <>
                                                    <span className={`${ITEM_RARITY_TEXT_COLORS[itemInfo.rarity]}`}>{itemInfo.name}</span>
                                                    <span className="text-xs text-gray-400">{itemInfo.effect}</span>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <h5 className="font-semibold text-gray-400 mb-2">Tỉ Lệ Thành Công</h5>
                                    <div className="text-sm bg-black/20 p-2 rounded space-y-1">
                                        <p>Cơ bản: <span className="font-mono float-right">{selectedRecipe.successChance * 100}%</span></p>
                                        <p>Cấp bậc (<span className="text-orange-400">{rankInfo.name}</span>): <span className="font-mono float-right text-green-400">+{rankInfo.successBonus * 100}%</span></p>
                                        {tamDanNhatNiemBonus > 0 && <p className="text-cyan-400">Tâm Đan Nhất Niệm: <span className="font-mono float-right">+20%</span></p>}
                                        <p className="border-t border-gray-600 pt-1 mt-1">Khống Hỏa (dự kiến): <span className="font-mono float-right text-green-400">~+10%</span></p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={handleStartRefining}
                                disabled={isRefining}
                                className="w-full mt-4 py-3 rounded-lg font-bold text-lg bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                            >
                                Bắt Đầu Luyện Chế
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlchemyPanel;