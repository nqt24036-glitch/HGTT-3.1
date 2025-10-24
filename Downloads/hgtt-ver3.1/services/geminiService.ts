// MODIFIED: This file is updated to call a serverless function proxy instead of the Gemini API directly.
// This is a CRITICAL security measure to protect the API key.

// FIX: Added .ts extension to import path.
import { WorldMapArea, Player, Quest, NpcDialogue, NPC, PlayerSpiritRoot, SpiritRootType, SpiritRootClassificationId, AdventureStorylet } from '../types.ts';
import { ITEM_LIST } from '../data/gameData.ts';
import { SPIRIT_ROOT_CLASSIFICATIONS } from '../data/spiritRootClassification.ts';

// The GoogleGenAI client is now initialized on the server, not here.

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate a random Spirit Root based on weighted probabilities (this function runs on client, it's fine)
export const generateRandomSpiritRoot = (): PlayerSpiritRoot => {
    const rand = Math.random() * 100;
    let classificationId: SpiritRootClassificationId;

    if (rand < 1) { // 1% for Biến Dị
        classificationId = 'bien_di';
    } else if (rand < 6) { // 5% for Thiên
        classificationId = 'thien';
    } else if (rand < 26) { // 20% for Song
        classificationId = 'song';
    } else if (rand < 56) { // 30% for Tam
        classificationId = 'tam';
    } else if (rand < 81) { // 25% for Tứ
        classificationId = 'tu';
    } else { // 19% for Ngũ
        classificationId = 'ngu';
    }

    const classification = SPIRIT_ROOT_CLASSIFICATIONS.find(c => c.id === classificationId)!;
    let attributes: SpiritRootType[] = [];
    const NORMAL_ATTRIBUTES: SpiritRootType[] = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    const MUTATED_ATTRIBUTES: SpiritRootType[] = ['Phong', 'Lôi', 'Băng'];

    switch (classificationId) {
        case 'ngu':
            attributes = NORMAL_ATTRIBUTES;
            break;
        case 'tu':
            attributes = shuffleArray(NORMAL_ATTRIBUTES).slice(0, 4);
            break;
        case 'tam':
            attributes = shuffleArray(NORMAL_ATTRIBUTES).slice(0, 3);
            break;
        case 'song':
            attributes = shuffleArray(NORMAL_ATTRIBUTES).slice(0, 2);
            break;
        case 'thien':
            attributes = [NORMAL_ATTRIBUTES[Math.floor(Math.random() * NORMAL_ATTRIBUTES.length)]];
            break;
        case 'bien_di':
            const subRand = Math.random() * 100;
            if (subRand < 5) { // 5% chance for 2 mutated
                attributes = shuffleArray(MUTATED_ATTRIBUTES).slice(0, 2);
            } else if (subRand < 30) { // 25% chance for 1 mutated + 1 normal
                attributes.push(MUTATED_ATTRIBUTES[Math.floor(Math.random() * MUTATED_ATTRIBUTES.length)]);
                attributes.push(NORMAL_ATTRIBUTES[Math.floor(Math.random() * NORMAL_ATTRIBUTES.length)]);
            } else { // 70% chance for 1 mutated
                attributes.push(MUTATED_ATTRIBUTES[Math.floor(Math.random() * MUTATED_ATTRIBUTES.length)]);
            }
            break;
    }

    return {
        classificationId: classification.id,
        attributes: attributes.filter((value, index, self) => self.indexOf(value) === index), // Ensure unique
        multiplier: classification.expMultiplier,
    };
};

// Generic function to call our backend proxy
async function callGeminiProxy(payload: object): Promise<any> {
    const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API call failed');
    }

    return response.json();
}


export const generateQuest = async (npc: string, area: WorldMapArea, player: Player, allNpcs: NPC[]): Promise<Quest | null> => {
    // These schemas now live on the server, but we define them here to know what to send.
    // In a real production app with a build system, you'd share types between frontend/backend.
    const questSchema = {
      type: 'OBJECT', // Using strings since we don't have the `Type` enum
      properties: {
        id: { type: 'STRING' }, title: { type: 'STRING' }, description: { type: 'STRING' },
        progress: { type: 'INTEGER' }, target: { type: 'INTEGER' }, reward: { type: 'STRING' },
        rewardObject: {
          type: 'OBJECT', properties: { characterExp: { type: 'INTEGER' }, cultivationExp: { type: 'INTEGER' }, linhThach: { type: 'INTEGER' }, itemId: { type: 'STRING' } }
        },
        objective: {
          type: 'OBJECT', properties: { type: { type: 'STRING' }, targetName: { type: 'STRING' }, itemId: { type: 'STRING' } }, required: ["type", "targetName"]
        }
      },
      required: ["id", "title", "description", "progress", "target", "reward", "objective", "rewardObject"]
    };

    const availableMonsters = area.monsters?.filter(m => m !== 'Không có (thành an toàn)') || [];
    const monsterList = availableMonsters.length > 0 ? availableMonsters.join(', ') : 'không có yêu thú nào';
    const otherNpcsInArea = allNpcs.filter(n => n.currentAreaId === area.id && n.name !== npc);
    const otherNpcs = otherNpcsInArea.length > 0 ? otherNpcsInArea.map(n => n.name).join(', ') : 'không có ai khác';
    const availableCollectibles = ITEM_LIST.filter(i => i.type === 'Nguyên liệu');
    const collectableItems = availableCollectibles.length > 0 ? availableCollectibles.map(i => `${i.name} (id: ${i.id})`).join('; ') : 'không có vật phẩm nào';
    const rewardableItems = ITEM_LIST.filter(i => ['Nguyên liệu', 'Tiêu hao', 'Sách Kỹ Năng'].includes(i.type)).map(i => `${i.name} (id: ${i.id})`).join('; ');
    const possibleQuestTypes = [];
    if (availableMonsters.length > 0) possibleQuestTypes.push("'kill'");
    if (availableCollectibles.length > 0) possibleQuestTypes.push("'collect'");
    if (otherNpcsInArea.length > 0) possibleQuestTypes.push("'talk'");

    if (possibleQuestTypes.length === 0) {
        console.warn(`No possible quest types for NPC ${npc} in area ${area.name}.`);
        return null;
    }

    const questTypesString = possibleQuestTypes.join(', ');
  
    const prompt = `Tạo một nhiệm vụ ngắn trong bối cảnh thế giới tu tiên huyền huyễn cho một người chơi, tuân thủ nghiêm ngặt các yêu cầu về cấu trúc dữ liệu.

    Bối cảnh:
    - Người chơi: ${player.name}, Cấp ${player.level}, thuộc phái ${player.sect}.
    - Địa điểm: ${area.name} (${area.description}).
    - NPC giao nhiệm vụ: ${npc}.
    - Các yêu thú có thể có trong khu vực (dùng cho nhiệm vụ 'kill'): ${monsterList}.
    - Các vật phẩm có thể thu thập (dùng cho nhiệm vụ 'collect'): ${collectableItems}.
    - Các NPC khác trong khu vực (dùng cho nhiệm vụ 'talk'): ${otherNpcs}.
    - Các vật phẩm có thể làm phần thưởng: ${rewardableItems}.

    Yêu cầu CỐ ĐỊNH (phải tuân theo):
    1.  **Nội dung**: Tạo một nhiệm vụ phù hợp với bối cảnh. Lời thoại của NPC (${npc}) phải được tích hợp vào phần mô tả nhiệm vụ.
    2.  **Loại nhiệm vụ**: Dựa vào bối cảnh, hãy chọn một loại nhiệm vụ từ danh sách sau: ${questTypesString}. Đừng tạo nhiệm vụ loại 'kill' nếu không có yêu thú, 'collect' nếu không có vật phẩm, hoặc 'talk' nếu không có NPC khác.
    3.  **Cấu trúc dữ liệu**:
      *   \\\`id\\\`: Chuỗi ngẫu nhiên độc nhất (ví dụ: quest_thotren_12345).
      *   \\\`progress\\\`: Luôn là số 0.
      *   \\\`target\\\`: Một con số hợp lý (ví dụ: 5 cho kill/collect, 1 cho talk).
      *   \\\`reward\\\`: Chuỗi mô tả phần thưởng (ví dụ: "100 EXP, 50 Linh Thạch, 2x Luyện Khí Tán").
      *   **\\\`objective\\\` (BẮT BUỘC)**:
          *   \\\`type\\\` phải là một trong các chuỗi được phép: ${questTypesString}.
          *   \\\`targetName\\\` phải là tên của mục tiêu và PHẢI khớp với một trong các tên đã được cung cấp trong bối cảnh (tên yêu thú, tên vật phẩm, hoặc tên NPC).
          *   Nếu \\\`type\\\` là "collect", BẮT BUỘC phải có trường \\\`itemId\\\` và giá trị của nó phải khớp với ID của vật phẩm trong danh sách vật phẩm thu thập.
      *   **\\\`rewardObject\\\` (BẮT BUỘC)**:
          *   Các trường (\\\`characterExp\\\`, \\\`cultivationExp\\\`, \\\`linhThach\\\`) phải là SỐ và khớp với chuỗi \\\`reward\\\`.
          *   Nếu có vật phẩm thưởng, \\\`itemId\\\` phải là một trong các ID đã được cung cấp trong danh sách vật phẩm.
          *   Ví dụ: Nếu \\\`reward\\\` là "150 EXP Tu Luyện, 75 Linh Thạch, 1x Da Sói", thì \\\`rewardObject\\\` phải là \\\`{ "cultivationExp": 150, "linhThach": 75, "itemId": "item_005" }\\\`.`;

    try {
        const data = await callGeminiProxy({ prompt, schema: questSchema });
        return data as Quest;
    } catch (error) {
        console.error("Error generating quest via proxy:", error);
        return null;
    }
};

export const generateNpcDialogue = async (npc: NPC, area: WorldMapArea, player: Player): Promise<NpcDialogue | null> => {
    const dialogueSchema = {
        type: 'OBJECT',
        properties: {
            greeting: { type: 'STRING' },
            options: {
                type: 'ARRAY',
                items: {
                    type: 'OBJECT',
                    properties: {
                        id: { type: 'STRING' },
                        text: { type: 'STRING' },
                        response: { type: 'STRING' }
                    },
                    required: ["id", "text"]
                }
            }
        },
        required: ["greeting", "options"]
    };

    const isMerchant = npc.name.includes('Thợ rèn') || npc.name.includes('Thương nhân');
    const tradeOptionInstruction = isMerchant ? "Bao gồm một lựa chọn 'trade' với text 'Giao dịch / Xem hàng'." : "Không bao gồm lựa chọn 'trade'.";
    const isAppraiser = npc.name.includes('Yến Tử Nguyệt');
    let appraiserInstruction = "";
    if (isAppraiser) {
        if (!player.spiritRootAppraised && player.level >= 5) {
             appraiserInstruction = "Bắt buộc phải có một lựa chọn với id='appraise_spirit_root' và text='Nhờ giám định linh căn.'";
        } else if (player.spiritRootAppraised) {
             appraiserInstruction = "Bắt buộc phải có một lựa chọn với id='appraise_spirit_root' và text='Nhờ tẩy luyện linh căn.'";
        }
    }

    const prompt = `Tạo một đoạn hội thoại ngắn cho một NPC trong game tu tiên.

    Bối cảnh:
    - Người chơi: ${player.name}, Cấp ${player.level}.
    - Địa điểm: ${area.name} (${area.description}).
    - NPC: ${npc.name} (${npc.description}).

    Yêu cầu:
    1.  Tạo một lời chào ngắn gọn, nhập vai NPC.
    2.  Cung cấp một danh sách các lựa chọn hội thoại cho người chơi.
    3.  **Luôn luôn** bao gồm lựa chọn có id='quest' (text: "Có nhiệm vụ nào không?") và id='leave' (text: "Tạm biệt.").
    4.  Tạo thêm 1-2 lựa chọn ngẫu nhiên có id là 'about_area' (Hỏi về khu vực) hoặc 'rumors' (Hỏi tin đồn).
    5.  Với các lựa chọn 'about_area' và 'rumors', hãy tạo một câu trả lời ngắn gọn, thú vị, phù hợp bối cảnh và đưa vào trường 'response'.
    6.  ${tradeOptionInstruction}
    7.  ${appraiserInstruction}
    8.  Tất cả nội dung phải bằng tiếng Việt.`;

    try {
        const dialogue = await callGeminiProxy({ prompt, schema: dialogueSchema }) as NpcDialogue;
        if (!dialogue.options.some(opt => opt.id === 'leave')) {
            dialogue.options.push({ id: 'leave', text: 'Tạm biệt.' });
        }
        return dialogue;
    } catch (error) {
        console.error("Error generating NPC dialogue via proxy:", error);
        return null;
    }
};

export const generateAdventureStorylet = async (): Promise<AdventureStorylet | null> => {
      const adventureStoryletSchema = {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          startStepId: { type: 'STRING' },
          steps: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                id: { type: 'STRING' },
                description: { type: 'STRING' },
                choices: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      text: { type: 'STRING' },
                      outcome: {
                        type: 'OBJECT',
                        properties: {
                          type: { type: 'STRING' },
                          nextStepId: { type: 'STRING' },
                          monsterName: { type: 'STRING' },
                          rewardDescription: { type: 'STRING' },
                          rewardExp: { type: 'INTEGER' },
                          rewardLinhThach: { type: 'INTEGER' },
                          rewardItemId: { type: 'STRING' },
                          rewardTitle: { type: 'STRING' },
                        },
                        required: ['type']
                      }
                    },
                    required: ['text', 'outcome']
                  }
                }
              },
              required: ['id', 'description', 'choices']
            }
          }
        },
        required: ['title', 'startStepId', 'steps']
      };
      
      const availableMonsters = ['Chuột Đói', 'Chó Hoang', 'Nhện Độc', 'Hổ Vằn Lửa Rừng', 'Linh Thạch Nhân', 'Ma Ảnh Linh Hồn'].join(', ');
      const availableItems = ITEM_LIST.filter(i => ['Nguyên liệu', 'Tiêu hao'].includes(i.type)).map(i => `${i.name} (id: ${i.id})`).slice(0, 10).join('; ');
      
      const prompt = `Tạo một cuộc phiêu lưu ngắn (storylet) trong bối cảnh tu tiên huyền huyễn.
      
      Bối cảnh:
      - Một người tu sĩ cấp thấp đang khám phá thế giới.
      - Cuộc phiêu lưu nên có từ 3-5 bước, mỗi bước có 2-4 lựa chọn.
      - Kết quả có thể là tiếp tục câu chuyện, một trận chiến, nhận phần thưởng, hoặc kết thúc.
      - Tên quái vật cho kết quả 'battle' PHẢI là một trong các tên sau: ${availableMonsters}.
      - ID vật phẩm cho kết quả 'reward' PHẢI là một trong các ID đã được cung cấp trong danh sách vật phẩm.
      - Có thể thưởng một danh hiệu (rewardTitle) nếu phù hợp, ví dụ: 'Nhà Thám Hiểm May Mắn'.
      
      Yêu cầu cấu trúc:
      - Tuân thủ nghiêm ngặt JSON schema được cung cấp.
      - Nội dung phải hấp dẫn, phù hợp với không khí tu tiên.
      - Tất cả nội dung phải bằng tiếng Việt.`;
  
      try {
          const data = await callGeminiProxy({ prompt, schema: adventureStoryletSchema });
          return data as AdventureStorylet;
      } catch (error) {
          console.error("Error generating adventure storylet via proxy:", error);
          return null;
      }
  };
