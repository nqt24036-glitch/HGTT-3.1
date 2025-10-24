import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Player, LinhDiaArea, Item } from '../types.ts';

interface LinhDiaExplorationPanelProps {
  player: Player;
  area: LinhDiaArea;
  onExit: () => void;
  onFoundReward: (rewards: { lp?: number; exp?: number; linhThach?: number; items?: Item[] }) => void;
  masterItemList: Item[];
}

// Reward structure for encounters
interface EncounterResult {
  message: string;
  rewards: {
    lp?: number;
    exp?: number;
    linhThach?: number;
    items?: Item[];
  };
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

const parseLevelRange = (range: string): [number, number] => {
    if (range.includes('+')) {
      return [parseInt(range, 10), Infinity];
    }
    const parts = range.split('-').map(Number);
    return [parts[0], parts[1] || parts[0]];
};

const LinhDiaExplorationPanel: React.FC<LinhDiaExplorationPanelProps> = ({ player, area, onExit, onFoundReward, masterItemList }) => {
  const [log, setLog] = useState<string[]>([]);
  const explorationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string) => {
    const timestamp = `[${new Date().toLocaleTimeString('en-GB')}]`;
    setLog(prev => [`${timestamp} ${message}`, ...prev].slice(0, 50));
  }, []);

  const generateRandomEncounter = useCallback((area: LinhDiaArea): EncounterResult => {
    const [minLevel] = parseLevelRange(area.levelRange);
    const rand = Math.random();

    if (rand < 0.4) { // 40% chance: Gain LP
      const lpGain = Math.floor(10 + minLevel * 2.5 + Math.random() * 20);
      return {
        message: `Hấp thụ được một luồng linh khí tinh thuần, tu vi tăng nhẹ.`,
        rewards: { lp: lpGain }
      };
    } else if (rand < 0.65) { // 25% chance: Gain EXP
      const expGain = Math.floor(15 + minLevel * 3 + Math.random() * 30);
      return {
        message: `Giao đấu với một yêu thú cấp thấp, thu được kinh nghiệm chiến đấu.`,
        rewards: { exp: expGain }
      };
    } else if (rand < 0.85) { // 20% chance: Find item
      const possibleItems = masterItemList.filter(i => i.rarity === 'Phổ thông' && i.type === 'Nguyên liệu');
      const foundItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
      if (foundItem) {
        return {
          message: `May mắn tìm thấy một bụi linh thảo: [${foundItem.name}].`,
          rewards: { items: [foundItem] }
        };
      }
    } else if (rand < 0.95) { // 10% chance: Find Linh Thach
      const linhThachGain = Math.floor(5 + minLevel * 0.5 + Math.random() * 10);
      return {
        message: `Phát hiện một túi linh thạch nhỏ bị ai đó đánh rơi.`,
        rewards: { linhThach: linhThachGain }
      };
    } else { // 5% chance: Rare encounter
      const possibleItems = masterItemList.filter(i => i.rarity === 'Quý' && (i.type === 'Nguyên liệu' || i.type === 'Tiêu hao'));
      const foundItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
      if (foundItem) {
        return {
          message: `✨ Cơ duyên đến! Bạn phát hiện một kỳ trân dị bảo: [${foundItem.name}]!`,
          rewards: { items: [foundItem] }
        };
      }
    }

    // Default fallback
    return {
      message: `Đi một vòng nhưng không phát hiện được gì.`,
      rewards: {}
    };
  }, [masterItemList]);

  useEffect(() => {
    addLog(`Bắt đầu thám hiểm tại ${area.name}...`);

    explorationIntervalRef.current = setInterval(() => {
      const event = generateRandomEncounter(area);
      addLog(event.message);
      onFoundReward(event.rewards);
    }, 7000); // Every 7 seconds

    return () => {
      if (explorationIntervalRef.current) {
        clearInterval(explorationIntervalRef.current);
      }
    };
  }, [area, onFoundReward, addLog, generateRandomEncounter]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [log]);

  return (
    <div className="fixed inset-0 bg-black/80 z-30 flex items-center justify-center p-4 text-white font-sans animate-fadeIn">
      <div className="bg-gray-900 border-2 border-cyan-700 rounded-lg w-full max-w-5xl h-[90vh] p-6 flex flex-col">
        <header className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-3xl font-serif text-cyan-300">Đang thám hiểm: {area.name}</h2>
            <p className="text-gray-400">{area.description}</p>
          </div>
          <button onClick={onExit} className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded font-semibold transition-colors">
            Kết thúc
          </button>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow min-h-0">
          {/* Player Info */}
          <aside className="md:col-span-1 bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
            <img src={player.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-yellow-400 object-cover mb-4" />
            <h3 className="text-2xl font-bold text-yellow-300">{player.name}</h3>
            <p className="text-sm text-gray-400 mb-4">
              Cấp {player.level} - {player.cultivation.realm} Tầng {player.cultivation.stage}
            </p>
            <div className="w-full space-y-2">
              <StatBar label="HP" value={player.hp} max={player.maxHp} gradient="bg-gradient-to-r from-red-600 to-red-400" />
              <StatBar label="MP" value={player.mp} max={player.maxMp} gradient="bg-gradient-to-r from-blue-600 to-blue-400" />
            </div>
            <div className="mt-auto pt-4 w-full text-center">
                <p className="text-lg font-bold text-cyan-400 animate-pulse">Tự động thám hiểm...</p>
                <p className="text-xs text-gray-500">Kỳ ngộ sẽ xuất hiện trong nhật ký.</p>
            </div>
          </aside>
          
          {/* Exploration Log */}
          <section className="md:col-span-2 bg-black/30 p-4 rounded-lg border border-gray-700 flex flex-col">
            <h3 className="text-xl font-bold text-yellow-300 mb-3 flex-shrink-0">Nhật Ký Thám Hiểm</h3>
            <div ref={logRef} className="flex-grow overflow-y-auto space-y-2 pr-2">
              {log.map((entry, index) => (
                <p key={index} className={`text-sm animate-fadeIn bg-gray-800/40 p-2 rounded ${entry.includes('✨') ? 'text-yellow-300' : 'text-gray-300'}`}>
                  {entry}
                </p>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LinhDiaExplorationPanel;