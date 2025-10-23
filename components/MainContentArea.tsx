import React from 'react';
import { Player, TranPhap, Item, PotentialStats, WorldMapArea, EquipmentSlot, Quest, StoredMedia, Companion, AlchemyRecipe, Title, LinhDiaArea, ChatMessage } from '../types.ts';
import CharacterPanel from './CharacterPanel.tsx';
import InventoryPanel from './InventoryPanel.tsx';
import SkillDisplay from './SkillDisplay.tsx';
import FormationPanel from './FormationPanel.tsx';
import StorePanel from './StorePanel.tsx';
import WorldMapPanel from './WorldMapPanel.tsx';
import QuestPanel from './QuestPanel.tsx';
import CompanionPanel from './CompanionPanel.tsx';
import CultivationAreasPanel from './CultivationAreasPanel.tsx';
import MediaRepositoryPanel from './ImageRepositoryPanel.tsx';
import AlchemyPanel from './AlchemyPanel.tsx';
import AdventurePanel from './AdventurePanel.tsx';
import ChatPanel from './ChatPanel.tsx';
import { MAIN_STORY_QUESTS } from '../data/mainStoryQuests.ts';

interface MainContentAreaProps {
  activePanel: string;
  player: Player;
  titles: Title[];
  isCultivating: boolean;
  setIsCultivating: (isCultivating: boolean) => void;
  cultivationBonus: number;
  onCultivate: () => () => void;
  isMeditating: boolean;
  setIsMeditating: (isMeditating: boolean) => void;
  onMeditate: () => () => void;
  onActivateFormation: (tranPhap: TranPhap) => void;
  onActivateCultivationMethod: (methodId: string) => void;
  onSpendPotentialPoint: (stat: keyof PotentialStats) => void;
  onEquipItem: (item: Item) => void;
  onUnequipItem: (slot: EquipmentSlot) => void;
  onItemUse: (item: Item) => void;
  onBuyItem: (itemId: string, price: number) => void;
  onNotify: (message: string) => void;
  onEnterArea: (area: WorldMapArea) => void;
  onSetActiveCompanion: (companionId: string | null) => void;
  onEquipItemOnCompanion: (companionId: string, item: Item) => void;
  onUnequipItemFromCompanion: (companionId: string, slot: EquipmentSlot) => void;
  onFindHiddenTreasure: (treasureId: string) => void;
  onSeekEnlightenment: (enlightenmentId: string) => void;
  onSearchForHerbs: (herbId: string) => void;
  masterItemList: Item[];
  onTriggerStoryEvent: (questId: string) => void;
  onSetActiveTitle: (title: string | null) => void;
  onEnlightenSkill: () => void;
  onObtainTitle: (titleId: string) => void;
  imageRepository: StoredMedia[];
  onUploadImage: (file: File) => void;
  onDeleteImage: (imageId: string) => void;
  onSetBackground: (url: string) => void;
  onOpenAvatarSelector: (type: 'player' | 'npc' | 'companion', id: string) => void;
  onSummonCompanion: (count: 1 | 10) => Companion[] | undefined;
  onRefinePill: (recipe: AlchemyRecipe, success: boolean) => void;
  onStartBattle: (monsterName: string) => void;
  onReceiveAdventureReward: (reward: { exp?: number; linhThach?: number; itemId?: string; rewardTitle?: string; }) => void;
  onBreakthrough: () => void;
  onStartLinhDiaExploration: (area: LinhDiaArea) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (content: string, channel: 'Thế Giới' | 'Khu Vực') => void;
  currentAreaId?: string | null;
}

const MainContentArea: React.FC<MainContentAreaProps> = (props) => {
  const { activePanel, player, titles } = props;

  const renderContent = () => {
    switch (activePanel) {
      case 'character':
        return <CharacterPanel 
            player={player}
            titles={titles}
            isCultivating={props.isCultivating}
            setIsCultivating={props.setIsCultivating}
            cultivationBonus={props.cultivationBonus}
            onCultivate={props.onCultivate}
            isMeditating={props.isMeditating}
            setIsMeditating={props.setIsMeditating}
            onMeditate={props.onMeditate}
            onSpendPotentialPoint={props.onSpendPotentialPoint}
            onUnequipItem={props.onUnequipItem}
            onActivateCultivationMethod={props.onActivateCultivationMethod}
            onSetActiveTitle={props.onSetActiveTitle}
            onEnlightenSkill={props.onEnlightenSkill}
            onObtainTitle={props.onObtainTitle}
            onBreakthrough={props.onBreakthrough}
        />;
      case 'inventory':
        return <InventoryPanel player={player} onItemUse={props.onItemUse} onEquip={props.onEquipItem} />;
      case 'quest':
        const storyQuestTemplate = player.activeStoryQuestId ? MAIN_STORY_QUESTS.find(q => q.id === player.activeStoryQuestId) ?? null : null;
        const storyQuest = storyQuestTemplate ? { ...storyQuestTemplate, progress: player.activeStoryQuestProgress } : null;
        return <QuestPanel 
            storyQuest={storyQuest}
            sideQuests={player.quests} 
            onTriggerStoryEvent={props.onTriggerStoryEvent}
        />;
      case 'chat':
        return <ChatPanel
            messages={props.chatMessages}
            onSendMessage={props.onSendMessage}
            currentPlayerName={player.name}
            currentAreaId={props.currentAreaId}
        />;
      case 'skills':
        return <SkillDisplay skills={player.skills} />;
      case 'map':
        return <WorldMapPanel 
            player={player} 
            onNotify={props.onNotify} 
            onEnterArea={props.onEnterArea}
            onFindHiddenTreasure={props.onFindHiddenTreasure}
            onSeekEnlightenment={props.onSeekEnlightenment}
            onSearchForHerbs={props.onSearchForHerbs}
        />;
      case 'adventure':
        return <AdventurePanel 
            onStartBattle={props.onStartBattle}
            onReceiveReward={props.onReceiveAdventureReward}
        />;
      case 'alchemy':
        return <AlchemyPanel 
            player={player} 
            onRefinePill={props.onRefinePill}
            onNotify={props.onNotify}
            masterItemList={props.masterItemList}
        />;
      case 'formation':
        return <FormationPanel player={player} onActivate={props.onActivateFormation} />;
      case 'store':
        return <StorePanel player={player} onBuyItem={props.onBuyItem} masterItemList={props.masterItemList} />;
      case 'companion':
        return <CompanionPanel 
            player={player} 
            onSetActiveCompanion={props.onSetActiveCompanion}
            onEquipItem={props.onEquipItemOnCompanion}
            onUnequipItem={props.onUnequipItemFromCompanion}
            onOpenAvatarSelector={(companionId) => props.onOpenAvatarSelector('companion', companionId)}
            onSummonCompanion={props.onSummonCompanion}
        />;
      case 'cultivation_area':
        return <CultivationAreasPanel player={player} onStartExploration={props.onStartLinhDiaExploration} />;
      case 'image_repository':
        return <MediaRepositoryPanel
            mediaRepository={props.imageRepository}
            onUpload={props.onUploadImage}
            onDelete={props.onDeleteImage}
            onSetBackground={props.onSetBackground}
        />
      default:
        return <p>Unknown panel</p>;
    }
  };

  return <div className="h-full w-full overflow-y-auto">{renderContent()}</div>;
};

export default MainContentArea;