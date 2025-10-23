import React from 'react';
// FIX: Added .ts extension to fix module resolution error.
import { Player, Title, TitleRarity } from '../types.ts';
import { LogIcon } from './IconComponents.tsx';

interface StatusBarProps {
  player: Player;
  titles: Title[];
  onAvatarClick: () => void;
  onToggleLog: () => void;
  isLogVisible: boolean;
  cultivationSpeed: number;
}

const StatBar: React.FC<{ label: string; value: number; max: number; gradient: string; }> = ({ label, value, max, gradient }) => {
  const percent = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full bg-gray-800 rounded-full h-4 relative overflow-hidden border border-gray-700">
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white z-10">
        {label}: {value} / {max}
      </div>
      <div className={`${gradient} h-full rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  );
};

const TITLE_RARITY_CLASSES: Record<TitleRarity, string> = {
  'Phổ thông': 'text-white italic',
  'Quý': 'text-green-400 italic',
  'Hiếm': 'text-blue-400 italic animate-pulse',
  'Truyền Kỳ': 'text-orange-400 italic animate-pulse',
  'Thần thoại': 'text-red-500 italic animate-lightning-glow',
};

const StatusBar: React.FC<StatusBarProps> = ({ player, titles, onAvatarClick, onToggleLog, isLogVisible, cultivationSpeed }) => {
  const isVideoAvatar = player.avatarUrl.startsWith('data:video') || player.avatarUrl.endsWith('.mp4');
  const activeTitleData = player.activeTitle ? titles.find(t => t.id === player.activeTitle) : null;
  
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={onAvatarClick} className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full transition-all">
          {isVideoAvatar ? (
            <video src={player.avatarUrl} className="w-12 h-12 rounded-full border-2 border-yellow-400 hover:border-yellow-200 object-cover" autoPlay loop muted playsInline />
          ) : (
            <img src={player.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-yellow-400 hover:border-yellow-200" />
          )}
        </button>
        <div>
          <h2 className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            {activeTitleData && (
                <span 
                  className={`text-sm font-semibold px-2 py-0.5 rounded-md bg-black/40 border border-gray-600 ${TITLE_RARITY_CLASSES[activeTitleData.rarity]}`}
                  title={activeTitleData.description}
                >
                  [{activeTitleData.name}]
                </span>
              )}
            {player.name}
          </h2>
          <p className="text-sm text-gray-400">
            {player.sect} - Cấp {player.level} - {player.cultivation.realm} Tầng {player.cultivation.stage}
          </p>
          <div className="flex items-center gap-4 text-xs mt-1 text-gray-300">
            <div className="flex items-center gap-1" title="Linh Thạch">
                <span role="img" aria-label="Linh Thạch">💎</span>
                <span className="font-mono">{player.linhThach.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1" title={`Tốc độ tu luyện: ${cultivationSpeed.toFixed(1)} LP/giây`}>
                <span role="img" aria-label="Tốc độ tu luyện">⚡</span>
                <span className="font-mono">{cultivationSpeed.toFixed(1)}/s</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 items-center">
        <StatBar label="HP" value={player.hp} max={player.maxHp} gradient="bg-gradient-to-r from-red-600 to-red-400" />
        <StatBar label="MP" value={player.mp} max={player.maxMp} gradient="bg-gradient-to-r from-blue-600 to-blue-400" />
        <StatBar label="EXP" value={player.exp} max={player.expToNextLevel} gradient="bg-gradient-to-r from-green-600 to-green-400" />
        {/* FIX: Changed player.cultivation.exp and expToNext to lp and lpToNext to match the type definition. */}
        <StatBar label="Linh Lực" value={player.cultivation.lp} max={player.cultivation.lpToNext} gradient="bg-gradient-to-r from-purple-600 to-purple-400" />
      </div>
      <div className="flex items-center justify-end">
        <button 
          onClick={onToggleLog} 
          className={`p-2 rounded-full transition-colors ${isLogVisible ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
          title="Nhật ký hoạt động"
        >
          <LogIcon />
        </button>
      </div>
    </div>
  );
};

export default StatusBar;