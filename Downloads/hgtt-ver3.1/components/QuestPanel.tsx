import React from 'react';
// FIX: Added .ts extension to fix module resolution error.
import { Quest } from '../types.ts';

interface QuestPanelProps {
  storyQuest: Quest | null;
  sideQuests: Quest[];
  onTriggerStoryEvent: (questId: string) => void;
}

const QuestDisplay: React.FC<{ quest: Quest; isStory?: boolean; onTriggerStoryEvent?: (questId: string) => void }> = ({ quest, isStory = false, onTriggerStoryEvent }) => {
  const objectiveText = quest.objective?.targetId === 'area_me_anh_any_monster' 
    ? `Tiêu diệt ${quest.target} yêu thú bất kỳ tại Rừng Mê Ảnh`
    : `${quest.objective?.type === 'collect' ? 'Thu thập' : quest.objective?.type === 'kill' ? 'Tiêu diệt' : ''} ${quest.objective?.targetName}`;

  return (
    <div className={`p-4 rounded-lg ${isStory ? 'bg-yellow-900/40 border-2 border-yellow-600' : 'bg-gray-900/50 border border-gray-700'}`}>
      <h4 className={`text-lg font-bold ${isStory ? 'text-yellow-300' : 'text-gray-200'}`}>{quest.title}</h4>
      <p className="text-sm text-gray-300 my-2">{quest.description}</p>
      {quest.objective?.type !== 'event' ? (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Tiến độ: <span className="font-semibold text-white">{objectiveText}</span></span>
            <span>{quest.progress} / {quest.target}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${(quest.progress / quest.target) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center">
            <p className="text-cyan-400 font-semibold mb-2">{quest.objective.targetName}</p>
            {onTriggerStoryEvent && (
                 <button onClick={() => onTriggerStoryEvent(quest.id)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold">
                    Thực Hiện
                 </button>
            )}
        </div>
      )}
      <p className="text-sm text-yellow-500 mt-3 border-t border-gray-600 pt-2">
        <span className="font-semibold">Phần thưởng:</span> {quest.reward}
      </p>
    </div>
  );
};


const QuestPanel: React.FC<QuestPanelProps> = ({ storyQuest, sideQuests, onTriggerStoryEvent }) => {
  return (
    <div className="space-y-6">
        <div>
            <h3 className="text-2xl font-serif text-yellow-400 border-b-2 border-yellow-700/50 pb-2 mb-4">Nhiệm Vụ Chính</h3>
            {storyQuest ? (
                <QuestDisplay quest={storyQuest} isStory={true} onTriggerStoryEvent={onTriggerStoryEvent} />
            ) : (
                <p className="text-center text-gray-500">Bạn đã hoàn thành tất cả nhiệm vụ chính!</p>
            )}
        </div>

        <div>
            <h3 className="text-2xl font-serif text-gray-300 border-b border-gray-600 pb-2 mb-4">Nhiệm Vụ Phụ</h3>
            <div className="space-y-4">
                {sideQuests.length > 0 ? (
                    sideQuests.map(quest => (
                        <QuestDisplay key={quest.id} quest={quest} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không có nhiệm vụ phụ nào.</p>
                )}
            </div>
       </div>
    </div>
  );
};

export default QuestPanel;