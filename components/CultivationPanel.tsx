import React from 'react';
import { Player } from '../types.ts';
import { CULTIVATION_METHODS_LIST } from '../data/gameData.ts';
import { COMBAT_STAT_LABELS } from '../constants.ts';

interface CultivationPanelProps {
  player: Player;
  onCultivate: () => void;
  isCultivating: boolean;
  cultivationBonus: number;
  onMeditate: () => void;
  isMeditating: boolean;
  onActivateCultivationMethod: (methodId: string) => void;
  onEnlightenSkill: () => void;
  onBreakthrough: () => void;
}

const STAT_BONUS_FORMAT: Record<string, (v: number) => string> = {
  cultivationSpeedBonus: (v: number) => `Tốc độ tu luyện +${(v * 100).toFixed(0)}%`,
  hp: (v: number) => `HP Tối đa +${v}`,
  mp: (v: number) => `MP Tối đa +${v}`,
};


const CultivationPanel: React.FC<CultivationPanelProps> = ({ player, onCultivate, isCultivating, cultivationBonus, onMeditate, isMeditating, onActivateCultivationMethod, onEnlightenSkill, onBreakthrough }) => {
  const { realm, stage, lp, lpToNext } = player.cultivation;
  const lpPercent = (lp / lpToNext) * 100;
  const isFullHealth = player.hp === player.maxHp && player.mp === player.maxMp;
  
  const enlightenCost = Math.floor(lpToNext * 0.8);
  const canBreakthrough = lp >= lpToNext;
  const canEnlighten = player.cultivation.lp >= enlightenCost && !isCultivating && !isMeditating && !canBreakthrough;


  const knownMethods = CULTIVATION_METHODS_LIST.filter(method => 
    player.knownCultivationMethodIds.includes(method.id)
  );

  const totalMultiplier = (1 + cultivationBonus) * player.spiritRoot.multiplier;

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-3xl font-serif text-yellow-300">Tu Luyện</h3>
      <p className="text-gray-400 mt-2">Hấp thụ linh lực trời đất, đột phá cảnh giới.</p>
      
      <div className="my-8 p-6 bg-gray-900/50 border-2 border-yellow-700 rounded-xl w-full max-w-sm">
        <p className="text-lg text-gray-300">Cảnh giới hiện tại</p>
        <p className="text-4xl font-bold text-white my-2">{realm} <span className="text-yellow-400">Tầng {stage}</span></p>
      </div>
      
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Linh Lực</span>
          <span>{lp} / {lpToNext}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-5 border border-gray-700">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${canBreakthrough ? 'bg-yellow-400 animate-pulse' : 'bg-gradient-to-r from-purple-600 to-purple-400'}`}
            style={{ width: `${lpPercent}%` }}
          ></div>
        </div>
         <div className="text-sm text-cyan-400 mt-2 text-right">
            <span>
                (Linh Căn x{player.spiritRoot.multiplier} + Bổ trợ +{Math.round(cultivationBonus * 100)}%) = 
            </span>
            <span className="font-bold text-lg"> Tổng x{totalMultiplier.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-2xl">
        {canBreakthrough ? (
            <button
                onClick={onBreakthrough}
                className="w-full px-8 py-4 text-2xl font-bold rounded-lg border-2 transition-all duration-300 bg-yellow-500 hover:bg-yellow-400 text-black border-yellow-300 shadow-lg shadow-yellow-400/30 animate-pulse"
            >
                ⚡ ĐỘT PHÁ ⚡
            </button>
        ) : (
            <>
                <button
                onClick={onCultivate}
                disabled={isCultivating || isMeditating}
                className="flex-1 px-8 py-4 text-xl font-bold rounded-lg border-2 transition-all duration-300 bg-purple-600 hover:bg-purple-500 border-purple-400 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                >
                {isCultivating ? 'Đang Tu Luyện...' : 'Hấp Thu Linh Lực'}
                </button>
                <button
                onClick={onMeditate}
                disabled={isMeditating || isCultivating || isFullHealth}
                className="flex-1 px-8 py-4 text-xl font-bold rounded-lg border-2 transition-all duration-300 bg-green-600 hover:bg-green-500 border-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
                >
                {isMeditating ? 'Đang Hồi Phục...' : 'Đả Tọa Hồi Phục'}
                </button>
            </>
        )}
      </div>
      
      <div className="w-full max-w-lg mt-10 p-4 bg-gray-900/50 border-2 border-cyan-700 rounded-xl">
        <h4 className="text-xl font-bold text-cyan-300">Bế Quan Lĩnh Ngộ</h4>
        <p className="text-sm text-gray-400 my-2">Tiêu hao một lượng lớn linh lực để thử lĩnh ngộ một công pháp mới phù hợp với Linh Căn của bạn.</p>
        <button
          onClick={onEnlightenSkill}
          disabled={!canEnlighten}
          className="w-full px-6 py-3 text-lg font-bold rounded-lg border-2 transition-all duration-300 bg-cyan-600 hover:bg-cyan-500 border-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          {canEnlighten ? `Lĩnh Ngộ (-${enlightenCost} Linh Lực)` : `Cần ${enlightenCost} Linh Lực`}
        </button>
      </div>


      <div className="w-full max-w-2xl mt-12">
        <h4 className="text-2xl font-serif text-yellow-300 border-t border-gray-700 pt-6">Công Pháp Tu Luyện</h4>
        <p className="text-gray-400 mt-2 mb-6">Chọn một công pháp để vận hành. Mỗi công pháp mang lại hiệu quả khác nhau.</p>
        
        <div className="space-y-4">
          {knownMethods.map(method => {
            const isActive = player.activeCultivationMethod?.id === method.id;
            return (
              <div 
                key={method.id}
                className={`p-4 rounded-lg border-2 text-left transition-all ${isActive ? 'bg-yellow-800/70 border-yellow-500' : 'bg-gray-900/50 border-gray-700'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-lg font-bold text-yellow-300">{method.name}</h5>
                    <p className="text-sm text-gray-400 flex-grow my-2">{method.description}</p>
                  </div>
                  <button
                    onClick={() => onActivateCultivationMethod(method.id)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors flex-shrink-0 ${isActive ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                  >
                    {isActive ? 'Hủy Bỏ' : 'Vận Hành'}
                  </button>
                </div>
                <div className="text-left text-xs my-2 pt-2 border-t border-gray-600/50 grid grid-cols-2 gap-1">
                  {Object.entries(method.bonuses).map(([key, value]) => {
                    const label = STAT_BONUS_FORMAT[key] 
                        ? STAT_BONUS_FORMAT[key](value as number)
                        : `${COMBAT_STAT_LABELS[key as keyof typeof COMBAT_STAT_LABELS] || key} +${value}`;
                    return <p key={key} className="text-cyan-400">{label}</p>
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default CultivationPanel;