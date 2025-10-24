import React, { useState } from 'react';
import { WorldMapArea, Player, Quest, NPC, EquipmentSlot, Monster, WeatherType, NpcDialogue, NpcDialogueOption, OnlinePlayer } from '../types.ts';
import { generateQuest, generateNpcDialogue } from '../services/geminiService.ts';
import { ITEM_RARITY_TEXT_COLORS } from '../constants.ts';
import NpcDetailModal from './NpcDetailModal.tsx';
import WeatherDisplay from './WeatherDisplay.tsx';

interface AreaDetailPanelProps {
  area: WorldMapArea;
  player: Player;
  onLeaveArea: () => void;
  onStartBattle: (monsterName: string) => void;
  onAcceptQuest: (quest: Quest) => void;
  onNotify: (message: string) => void;
  onOpenBlacksmith: () => void;
  masterMonsterList: Monster[];
  npcList: NPC[];
  onOpenAvatarSelector: (npcId: string) => void;
  weather: WeatherType;
  onAppraiseSpiritRoot: () => void;
  // FIX: Add onReforgeSpiritRoot prop to match props passed in App.tsx
  onReforgeSpiritRoot: () => void;
  otherPlayers: OnlinePlayer[];
}

const AreaDetailPanel: React.FC<AreaDetailPanelProps> = ({ area, player, onLeaveArea, onStartBattle, onAcceptQuest, onNotify, onOpenBlacksmith, masterMonsterList, npcList, onOpenAvatarSelector, weather, onAppraiseSpiritRoot, onReforgeSpiritRoot, otherPlayers }) => {
  const [showNpcDetails, setShowNpcDetails] = useState<NPC | null>(null);
  const [dialogueState, setDialogueState] = useState<{
    npc: NPC | null;
    greeting: string;
    options: NpcDialogueOption[];
    currentResponse: string | null;
    isLoading: boolean;
    quest: Quest | null;
  }>({
    npc: null,
    greeting: '',
    options: [],
    currentResponse: null,
    isLoading: false,
    quest: null,
  });

  const resetDialogue = () => {
    setDialogueState({ npc: null, greeting: '', options: [], currentResponse: null, isLoading: false, quest: null });
  };

  const handleNpcClick = async (npcName: string) => {
    const npcData = npcList.find(npc => npc.name === npcName);
    if (!npcData) {
      onNotify("Không tìm thấy thông tin NPC.");
      return;
    }

    if (npcName === 'Thợ rèn') {
      onOpenBlacksmith();
      return;
    }

    setDialogueState(prev => ({ ...prev, npc: npcData, isLoading: true }));
    try {
      const dialogue = await generateNpcDialogue(npcData, area, player);
      if (dialogue) {
        setDialogueState(prev => ({ ...prev, greeting: dialogue.greeting, options: dialogue.options, isLoading: false }));
      } else {
        onNotify("NPC này dường như không muốn nói chuyện.");
        resetDialogue();
      }
    } catch (e) {
      console.error("Failed to handle NPC click interaction:", e);
      onNotify("Có lỗi xảy ra khi trò chuyện với NPC.");
      resetDialogue();
    }
  };

  const handleDialogueOptionClick = async (option: NpcDialogueOption) => {
    if (!dialogueState.npc) return;

    switch (option.id) {
      case 'quest':
        setDialogueState(prev => ({ ...prev, isLoading: true, options: [], greeting: '' }));
        // FIX: Pass the 'npcList' prop to provide full context for quest generation.
        const quest = await generateQuest(dialogueState.npc.name, area, player, npcList);
        if (quest) {
          setDialogueState(prev => ({ ...prev, quest, isLoading: false }));
        } else {
          setDialogueState(prev => ({ ...prev, currentResponse: "Ta không có nhiệm vụ nào cho ngươi lúc này.", isLoading: false }));
        }
        break;
      // FIX: Differentiate between appraising and reforging the spirit root.
      case 'appraise_spirit_root':
        if (player.spiritRootAppraised) {
          // This is reforging
          if (window.confirm("Tẩy Linh Căn sẽ tiêu tốn 1 [Tẩy Linh Thạch] từ túi đồ. Bạn có chắc chắn muốn thực hiện không?")) {
              onReforgeSpiritRoot();
              resetDialogue();
          }
        } else {
          // This is the initial appraisal
          onAppraiseSpiritRoot();
          resetDialogue();
        }
        break;
      case 'about_area':
      case 'rumors':
        setDialogueState(prev => ({ ...prev, currentResponse: option.response || "Ta không có gì để nói về chuyện đó." }));
        break;
      case 'trade':
        onNotify("NPC này không có gì để giao dịch.");
        break;
      case 'leave':
        resetDialogue();
        break;
    }
  };
  
  const handleAcceptQuest = () => {
    if (dialogueState.quest) {
      onAcceptQuest(dialogueState.quest);
    }
    resetDialogue();
  };

  const DialogueModal: React.FC = () => {
    const { npc, isLoading, greeting, options, currentResponse, quest } = dialogueState;
    if (!npc) return null;

    const renderContent = () => {
      if (isLoading) {
        return (
          <div>
            <h3 className="text-xl font-bold text-yellow-300">Đang trò chuyện với {npc.name}...</h3>
            <p className="text-gray-400 mt-4 animate-pulse">Xin chờ một chút...</p>
          </div>
        );
      }
      if (currentResponse) {
        return (
          <div>
            <p className="italic text-gray-300">"{currentResponse}"</p>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setDialogueState(prev => ({ ...prev, currentResponse: null }))} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded">Trở lại</button>
            </div>
          </div>
        );
      }
      if (quest) {
        return (
          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-2">{quest.title}</h3>
            <p className="text-gray-300 mb-4">{quest.description}</p>
            <div className="border-t border-gray-700 pt-4">
              <p className="font-semibold">Mục tiêu: <span className="font-normal text-white">{quest.objective?.targetName} x {quest.target}</span></p>
              <p className="font-semibold">Phần thưởng: <span className="font-normal text-green-400">{quest.reward}</span></p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={resetDialogue} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded">Từ Chối</button>
              <button onClick={handleAcceptQuest} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded">Chấp Nhận</button>
            </div>
          </div>
        );
      }
      return (
        <div>
          <p className="italic text-gray-300 mb-4">"{greeting}"</p>
          <div className="space-y-3">
            {options.map(opt => (
              <button key={opt.id} onClick={() => handleDialogueOptionClick(opt)} className="w-full text-left p-3 rounded-lg bg-gray-800/70 border border-gray-600 hover:bg-gray-700/90 transition-colors">
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-yellow-600 rounded-lg p-6 w-full max-w-lg animate-fadeIn">
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-700">
            <button onClick={() => setShowNpcDetails(npc)} className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg transition-all" title="Xem chi tiết thuộc tính">
              <img src={npc.avatarUrl} alt={npc.name} className="w-20 h-20 rounded-lg border-2 border-gray-600 flex-shrink-0 object-cover" />
            </button>
            <div>
              <p className="font-bold text-xl text-white">{npc.name}</p>
              <p className="italic text-sm text-gray-400">"{npc.description}"</p>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto animate-fadeIn relative">
      {dialogueState.npc && <DialogueModal />}
      {showNpcDetails && <NpcDetailModal npc={showNpcDetails} onClose={() => setShowNpcDetails(null)} onOpenAvatarSelector={onOpenAvatarSelector} />}
      <WeatherDisplay weather={weather} />

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-serif text-cyan-300">{area.name}</h2>
          <p className="text-gray-400">{area.description}</p>
        </div>
        <button onClick={onLeaveArea} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition-colors">
          Rời Khỏi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* NPCs Section */}
        <div>
          <h3 className="text-xl font-bold text-yellow-300 border-b-2 border-yellow-700/50 pb-2 mb-4">Nhân Vật</h3>
          <div className="space-y-3">
            {area.npcs && area.npcs.length > 0 ? (
              area.npcs.map(npcName => (
                <button key={npcName} onClick={() => handleNpcClick(npcName)} className="w-full text-left p-3 bg-gray-800/70 border border-gray-600 rounded-lg hover:bg-gray-700/90 transition-colors">
                  <p className="font-semibold text-white">{npcName}</p>
                  <p className="text-xs text-gray-400">Nhấn để tương tác</p>
                </button>
              ))
            ) : (
              <p className="text-gray-500 italic">Không có ai ở đây cả.</p>
            )}
          </div>
        </div>

        {/* Monsters Section */}
        <div>
          <h3 className="text-xl font-bold text-red-400 border-b-2 border-red-700/50 pb-2 mb-4">Yêu Thú</h3>
          <div className="space-y-3">
            {area.monsters && area.monsters.length > 0 && area.monsters[0] !== 'Không có (thành an toàn)' ? (
              area.monsters.map(monsterName => {
                const monsterData = masterMonsterList.find(m => m.name === monsterName);
                return (
                  <div key={monsterName} className="p-3 bg-black/50 border border-gray-700 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold text-red-300">{monsterName}</p>
                      {monsterData && <p className="text-xs text-gray-400">Cấp {monsterData.level} - {monsterData.cultivation.realm} Tầng {monsterData.cultivation.stage}</p>}
                    </div>
                    <button onClick={() => onStartBattle(monsterName)} className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded font-semibold text-sm transition-colors">
                      Tấn Công
                    </button>
                  </div>
                )
              })
            ) : (
              <p className="text-gray-500 italic">Khu vực này an toàn.</p>
            )}
          </div>
        </div>
      </div>
       {/* Other Players Section */}
        {otherPlayers.length > 0 && (
          <div className="mt-8">
              <h3 className="text-xl font-bold text-green-300 border-b-2 border-green-700/50 pb-2 mb-4">Người Chơi Khác</h3>
              <div className="flex flex-wrap gap-4 p-3 bg-black/30 rounded-lg min-h-[80px]">
                  {otherPlayers.map(p => (
                      <div key={p.username} className="flex flex-col items-center gap-1 group animate-fadeIn" title={p.username}>
                          <img src={p.avatarUrl} alt={p.username} className="w-12 h-12 rounded-full border-2 border-green-400 group-hover:scale-110 transition-transform object-cover" />
                          <p className="text-xs text-gray-300 truncate w-16 text-center">{p.username}</p>
                      </div>
                  ))}
              </div>
          </div>
      )}
      
      {/* BOSS Section */}
      {area.boss && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-purple-400 border-b-2 border-purple-700/50 pb-2 mb-4 animate-pulse">THỦ LĨNH KHU VỰC</h3>
          <div className="p-4 bg-black/60 border-2 border-purple-500 rounded-lg flex flex-col md:flex-row justify-between items-center shadow-lg shadow-purple-500/20">
            <div>
              <p className="font-bold text-2xl text-purple-300">{area.boss}</p>
              <p className="text-sm text-gray-400">Một sự hiện diện cổ xưa và mạnh mẽ đang chờ đợi.</p>
            </div>
            <button 
              onClick={() => onStartBattle(area.boss!)} 
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-purple-800 to-red-800 hover:from-purple-700 hover:to-red-700 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Khiêu Chiến
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AreaDetailPanel;