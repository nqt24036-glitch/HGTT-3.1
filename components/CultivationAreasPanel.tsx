import React, { useState } from 'react';
import { Player, WorldMapArea, LinhDiaRealm, LinhDiaArea } from '../types.ts';
import { LINH_DIA_REALMS } from '../data/cultivationAreasData.ts';
import { CULTIVATION_REALMS } from '../constants.ts';

interface CultivationAreasPanelProps {
  player: Player;
  onStartExploration: (area: LinhDiaArea) => void;
}

const parseLevelRange = (range: string): [number, number] => {
    if (range.includes('+')) {
      return [parseInt(range, 10), Infinity];
    }
    const parts = range.split('-').map(Number);
    return [parts[0], parts[1] || parts[0]];
};

const CultivationAreasPanel: React.FC<CultivationAreasPanelProps> = ({ player, onStartExploration }) => {
    const [expandedRealmId, setExpandedRealmId] = useState<string | null>(null);

    const toggleRealm = (realmId: string) => {
        setExpandedRealmId(prev => (prev === realmId ? null : realmId));
    };
    
    const checkRequirements = (area: LinhDiaArea): { met: boolean, reason: string } => {
        const [minLevel] = parseLevelRange(area.levelRange);
        if (player.level < minLevel) return { met: false, reason: `Cần Cấp ${minLevel}` };

        if (area.realmRequirement) {
            const playerRealmIndex = CULTIVATION_REALMS.indexOf(player.cultivation.realm);
            const requiredRealmIndex = CULTIVATION_REALMS.indexOf(area.realmRequirement.realm);
            const requiredStage = area.realmRequirement.stage;

            if (area.realmRequirement.comparison === 'above') {
                if (playerRealmIndex < requiredRealmIndex) return { met: false, reason: `Cần Cảnh giới ${area.realmRequirement.realm}` };
                if (playerRealmIndex === requiredRealmIndex && player.cultivation.stage < requiredStage) {
                    return { met: false, reason: `Cần ${area.realmRequirement.realm} Tầng ${requiredStage}` };
                }
            } else { // 'below'
                if (playerRealmIndex > requiredRealmIndex) return { met: false, reason: `Cảnh giới quá cao` };
                if (playerRealmIndex === requiredRealmIndex && player.cultivation.stage >= requiredStage) {
                    return { met: false, reason: `Phải dưới ${area.realmRequirement.realm} Tầng ${requiredStage}` };
                }
            }
        }
        return { met: true, reason: '' };
    };

    return (
        <div className="h-full w-full overflow-y-auto pr-2">
            <h3 className="text-3xl font-serif text-yellow-300 text-center mb-6">Linh Địa Tu Luyện</h3>
            <p className="text-center text-gray-400 mb-8">Đây là những nơi có linh khí dồi dào hoặc ẩn chứa cơ duyên đặc biệt, giúp đẩy nhanh con đường tu tiên của bạn.</p>
            <div className="space-y-4">
                {LINH_DIA_REALMS.map(realm => {
                    const isExpanded = expandedRealmId === realm.id;
                    return (
                        <div key={realm.id} className={`bg-gray-900/50 border-2 rounded-lg transition-all duration-300 ${isExpanded ? 'border-yellow-600' : 'border-gray-700'}`}>
                            <button
                                onClick={() => toggleRealm(realm.id)}
                                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-800/50"
                            >
                                <h2 className="text-2xl font-serif text-yellow-300">{realm.name}</h2>
                                <div className={`text-2xl transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                ▼
                                </div>
                            </button>
                            {isExpanded && (
                                <div className="p-4 border-t-2 border-yellow-600/50 space-y-3">
                                    {realm.areas.map(area => {
                                        const { met, reason } = checkRequirements(area);
                                        return (
                                            <div key={area.id} className={`p-3 rounded-lg border ${met ? 'bg-gray-800/70 border-gray-600' : 'bg-black/50 border-gray-800 opacity-60'}`}>
                                                <div className="flex flex-col sm:flex-row items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-4xl w-16 h-16 rounded bg-black/30 flex items-center justify-center flex-shrink-0">{area.icon}</div>
                                                        <div>
                                                            <h4 className={`text-xl font-bold ${met ? 'text-cyan-300' : 'text-gray-500'}`}>{area.name}</h4>
                                                            <p className="text-sm text-gray-400">Cấp: {area.levelRange}</p>
                                                            <p className="mt-1 text-xs italic text-gray-500">{area.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0 ml-0 sm:ml-4 mt-4 sm:mt-0">
                                                        <button
                                                            onClick={() => onStartExploration(area)}
                                                            disabled={!met}
                                                            className="px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 border border-blue-400"
                                                        >
                                                            {met ? 'Tiến Vào' : reason}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CultivationAreasPanel;