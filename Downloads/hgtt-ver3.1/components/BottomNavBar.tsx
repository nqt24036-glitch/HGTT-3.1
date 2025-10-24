import React from 'react';
import { CharacterIcon, InventoryIcon, SkillIcon, FormationIcon, ShoppingCartIcon, MapIcon, QuestIcon, CompanionIcon, MountainIcon, ImageIcon, CauldronIcon, AdventureIcon, ChatIcon } from './IconComponents.tsx';

interface BottomNavBarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
}

const navItems = [
  { id: 'character', label: 'Nhân Vật', icon: CharacterIcon },
  { id: 'skills', label: 'Kỹ Năng', icon: SkillIcon },
  { id: 'inventory', label: 'Túi Đồ', icon: InventoryIcon },
  { id: 'companion', label: 'Đồng Hành', icon: CompanionIcon },
  { id: 'quest', label: 'Nhiệm Vụ', icon: QuestIcon },
  { id: 'chat', label: 'Trò Chuyện', icon: ChatIcon },
  { id: 'adventure', label: 'Luyện Lịch', icon: AdventureIcon },
  { id: 'alchemy', label: 'Luyện Đan', icon: CauldronIcon },
  { id: 'map', label: 'Bản Đồ', icon: MapIcon },
  { id: 'cultivation_area', label: 'Linh Địa', icon: MountainIcon },
  // { id: 'image_repository', label: 'Thư Viện', icon: ImageIcon },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePanel, onPanelChange }) => {
  return (
    <div className="bg-black/60 border border-gray-700 rounded-lg p-2 backdrop-blur-sm">
      {/* FIX: Replaced dynamic grid-cols class with a static one, as Tailwind's JIT compiler doesn't support string interpolation for class names. */}
      <div className="grid grid-cols-10 gap-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 ${
              activePanel === item.id ? 'bg-yellow-500/20 text-yellow-300' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            <item.icon />
            <span className="text-xs mt-1 hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;