// FIX: Replaced placeholder text with a fully functional main App component. This component manages game state, handles character creation, and orchestrates the different UI panels. Exporting the component resolves the "not a module" error.
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Player, CharacterCreationData, Monster, TranPhap, Item, EquipmentSlot, PotentialStats, WorldMapArea, Quest, Companion, NPC, Skill, CultivationMethod, PlayerSpiritRoot, WeatherType, StoredMedia, Buff, ItemRarity, AlchemyRecipe, CombatStats, Title, LinhDiaArea, OnlinePlayer, ChatMessage } from './types.ts';
// FIX: Import NPC_LIST to resolve reference error in useState.
import { MONSTERS, SKILLS, TRAN_PHAP_LIST, ITEM_LIST, COMPANION_LIST, NPC_LIST, CULTIVATION_METHODS_LIST, UPGRADE_COSTS, UPGRADE_MULTIPLIERS, UPGRADE_SUCCESS_RATES, SUMMON_COST_SINGLE, SUMMON_COST_TEN, SUMMON_RATES, ALCHEMY_EXP_TABLE, ALCHEMY_RECIPES, TITLES } from './data/gameData.ts';
import { CULTIVATION_REALMS, REALM_BREAKTHROUGH_FLAT_BONUS, REALM_BREAKTHROUGH_PERCENT_BONUS, STAGE_PERCENT_BONUS } from './constants.ts';
import { MAIN_STORY_QUESTS } from './data/mainStoryQuests.ts';
import { WORLD_MAP_DATA } from './data/worldMapData.ts';
import { WEATHER_DATA } from './data/weatherData.ts';
import { getAlchemyRankInfo } from './data/alchemyData.ts';
import { generateRandomSpiritRoot } from './services/geminiService.ts';
import { SPIRIT_ROOT_CLASSIFICATIONS } from './data/spiritRootClassification.ts';
import CharacterCreationScreen, { LoginOrRegisterScreen } from './components/CharacterCreationScreen.tsx';
import StatusBar from './components/StatusBar.tsx';
import MainContentArea from './components/MainContentArea.tsx';
import BottomNavBar from './components/BottomNavBar.tsx';
import BattleScreen from './components/BattleScreen.tsx';
import AreaDetailPanel from './components/AreaDetailPanel.tsx';
import BlacksmithPanel from './components/BlacksmithPanel.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';
import ActivityLogPanel from './components/ActivityLogPanel.tsx';
import MediaSelectorModal from './components/ImageSelectorModal.tsx';
import LinhDiaExplorationPanel from './components/LinhDiaExplorationPanel.tsx';

// Initial Player State
const createInitialPlayer = (data: CharacterCreationData & { spiritRoot: PlayerSpiritRoot }): Player => {
  // Base stats initialization
  const baseStats = { attack: 5, magicAttack: 5, defense: 5, magicDefense: 5, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, speed: 10, armorPen: 0, blockRate: 0, mentalDemonResistance: 0, luck: 0 };
  const initialCompanion = COMPANION_LIST.find(c => c.id === 'companion_001');
  const initialMethods = CULTIVATION_METHODS_LIST.filter(m => m.realmRequirement === 'Luyện Khí').map(m => m.id);
  const initialPotentialStats = { theChat: 5, triLuc: 5, linhMan: 5, sucManh: 5, canCo: 5, dinhLuc: 5 };

  return {
    name: data.name,
    gender: data.gender,
    sect: "Tán Tu",
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
    linhThach: 100,
    avatarUrl: data.gender === 'Nữ' 
      ? 'https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg' 
      : 'https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg',
    potentialPoints: 5,
    basePotentialStats: initialPotentialStats,
    potentialStats: initialPotentialStats,
    baseStats,
    totalStats: { ...baseStats },
    cultivation: { realm: 'Luyện Khí', stage: 1, lp: 0, lpToNext: 100 },
    alchemy: { level: 1, exp: 0, expToNext: ALCHEMY_EXP_TABLE[0], rank: 'Học đồ luyện đan', consecutiveSuccesses: 0 },
    inventory: [ ...ITEM_LIST.filter(i => ['item_001', 'item_002', 'item_004', 'item_019', 'cauldron_01'].includes(i.id)) ],
    equippedItems: {},
    skills: [ ...SKILLS.filter(s => s.id === 'skill_001') ],
    quests: [],
    knownTranPhapIds: ['tp_001'],
    activeTranPhap: null,
    knownCultivationMethodIds: initialMethods,
    activeCultivationMethod: null,
    companions: initialCompanion ? [initialCompanion] : [],
    activeCompanionId: null,
    foundTreasures: [],
    activeStoryQuestId: 'sq_01',
    activeStoryQuestProgress: 0,
    completedStoryQuestIds: [],
    bloodlineAwakened: false,
    path: null,
    titles: [],
    activeTitle: null,
    spiritRoot: data.spiritRoot,
    spiritRootAppraised: false,
    buffs: [],
  };
};

const App: React.FC = () => {
    // State management
    const [currentUser, setCurrentUser] = useState<string | null>(() => localStorage.getItem('currentUser'));
    const [player, setPlayer] = useState<Player | null>(null);

    const [npcList, setNpcList] = useState<NPC[]>(() => {
        const savedNpcs = localStorage.getItem('npcList');
        return savedNpcs ? JSON.parse(savedNpcs) : NPC_LIST;
    });
    const [activePanel, setActivePanel] = useState('character');
    const [currentMonster, setCurrentMonster] = useState<Monster | null>(null);
    const [isCultivating, setIsCultivating] = useState(false);
    const [isMeditating, setIsMeditating] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [currentArea, setCurrentArea] = useState<WorldMapArea | null>(null);
    const [currentWeather, setCurrentWeather] = useState<WeatherType>('Trời Quang');
    const [isBlacksmithOpen, setIsBlacksmithOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [masterMonsterList, setMasterMonsterList] = useState<Monster[]>([]);
    const [masterItemList, setMasterItemList] = useState<Item[]>(() => {
        const savedItems = localStorage.getItem('customItems');
        const customItems = savedItems ? JSON.parse(savedItems) : [];
        return [...ITEM_LIST, ...customItems];
    });
    const [isAdmin, setIsAdmin] = useState<boolean>(() => {
        const savedIsAdmin = localStorage.getItem('isAdmin');
        return savedIsAdmin ? JSON.parse(savedIsAdmin) : false;
    });
    const [activityLog, setActivityLog] = useState<string[]>([]);
    const [isLogVisible, setIsLogVisible] = useState(false);
    const [isBottomNavBarVisible, setIsBottomNavBarVisible] = useState<boolean>(() => JSON.parse(localStorage.getItem('isBottomNavBarVisible') ?? 'true'));
    const [showBTHChoiceModal, setShowBTHChoiceModal] = useState(false);
    const [exploringLinhDiaArea, setExploringLinhDiaArea] = useState<LinhDiaArea | null>(null);
    const [otherPlayers, setOtherPlayers] = useState<OnlinePlayer[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
        const saved = localStorage.getItem('chat_messages');
        return saved ? JSON.parse(saved) : [];
    });
    const channelRef = useRef<BroadcastChannel | null>(null);


    // Media Repository State
    const [mediaRepository, setMediaRepository] = useState<StoredMedia[]>(() => {
        try {
            const savedMedia = localStorage.getItem('mediaRepository');
            return savedMedia ? JSON.parse(savedMedia) : [];
        } catch (e) {
            console.error("Failed to load media repository from localStorage", e);
            return [];
        }
    });

    const [mediaSelector, setMediaSelector] = useState<{
        isOpen: boolean;
        type: 'player' | 'npc' | 'companion' | null;
        id: string | null;
    }>({ isOpen: false, type: null, id: null });

    
    const cultivationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const weatherIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const npcMovementIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

     // Real-time communication effect for listening to other players
    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = new BroadcastChannel('huyen_gioi_tu_tien_online');
        }
        const channel = channelRef.current;

        const handleMessage = (event: MessageEvent) => {
            const { type, payload } = event.data;

            if (type === 'PLAYER_LIST_UPDATE') {
                const allPlayers: Record<string, OnlinePlayer> = payload;
                if (currentUser && currentArea) {
                    const playersInMyArea = Object.values(allPlayers)
                        .filter(p => p.username !== currentUser && p.areaId === currentArea.id);
                    setOtherPlayers(playersInMyArea);
                } else {
                    setOtherPlayers([]);
                }
            } else if (type === 'CHAT_MESSAGE') {
                setChatMessages(prev => {
                    const newMessages = [...prev, payload].slice(-100); // Keep last 100 messages
                    localStorage.setItem('chat_messages', JSON.stringify(newMessages));
                    return newMessages;
                });
            }
        };

        channel.onmessage = handleMessage;

        // Initial load of players in the same area
        const allPlayersRaw = localStorage.getItem('online_players');
        if (allPlayersRaw) {
            handleMessage({ data: { type: 'PLAYER_LIST_UPDATE', payload: JSON.parse(allPlayersRaw) } } as MessageEvent);
        }


        return () => {
            channel.onmessage = null;
        };
    }, [currentUser, currentArea]);

    // Effect to announce presence, departure, and area changes
    useEffect(() => {
        const channel = channelRef.current ?? new BroadcastChannel('huyen_gioi_tu_tien_online');
        if (!channelRef.current) channelRef.current = channel;

        const broadcastUpdate = () => {
            const playersRaw = localStorage.getItem('online_players') || '{}';
            channel.postMessage({ type: 'PLAYER_LIST_UPDATE', payload: JSON.parse(playersRaw) });
        };

        const updateAndBroadcast = (updateFn: (players: Record<string, OnlinePlayer>) => void) => {
            const playersRaw = localStorage.getItem('online_players') || '{}';
            const players = JSON.parse(playersRaw);
            updateFn(players);
            localStorage.setItem('online_players', JSON.stringify(players));
            broadcastUpdate();
        };
        
        // Announce login
        if (currentUser && player) {
            updateAndBroadcast(players => {
                players[currentUser] = { username: currentUser, avatarUrl: player.avatarUrl, areaId: currentArea?.id || null };
            });
        }

        const handleUnload = () => {
            if (currentUser) {
                updateAndBroadcast(players => {
                    delete players[currentUser];
                });
            }
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            handleUnload();
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [currentUser, player]);

    // Effect to announce area changes specifically
    useEffect(() => {
        const channel = channelRef.current;
        if (currentUser && player && channel) {
             const players = JSON.parse(localStorage.getItem('online_players') || '{}');
            if (players[currentUser]) {
                players[currentUser].areaId = currentArea?.id || null;
                localStorage.setItem('online_players', JSON.stringify(players));
                channel.postMessage({ type: 'PLAYER_LIST_UPDATE', payload: players });
            }
        }
    }, [currentArea]);


    // Activity Log Handler
    const addActivityLog = useCallback((message: string) => {
        const timestamp = `[${new Date().toLocaleTimeString('en-GB')}]`;
        setActivityLog(prev => [`${timestamp} ${message}`, ...prev].slice(0, 100)); // Keep max 100 entries
    }, []);

    const handleSendMessage = useCallback((content: string, channel: 'Thế Giới' | 'Khu Vực') => {
        if (!player || !currentUser) return;
        const message: ChatMessage = {
            id: `msg_${Date.now()}_${Math.random()}`,
            username: player.name,
            avatarUrl: player.avatarUrl,
            content,
            timestamp: Date.now(),
            channel,
            areaId: channel === 'Khu Vực' ? currentArea?.id : undefined,
        };

        // Add to local state immediately for responsiveness
        const newMessages = [...chatMessages, message].slice(-100);
        setChatMessages(newMessages);
        localStorage.setItem('chat_messages', JSON.stringify(newMessages));

        // Broadcast to other tabs
        channelRef.current?.postMessage({ type: 'CHAT_MESSAGE', payload: message });
    }, [player, currentUser, currentArea, chatMessages]);

    // Load initial data
    useEffect(() => {
        const customMonstersRaw = localStorage.getItem('customMonsters');
        const customMonsters = customMonstersRaw ? JSON.parse(customMonstersRaw) : [];
        setMasterMonsterList([...MONSTERS, ...customMonsters]);
    }, []);

    // Load player data when user logs in
    useEffect(() => {
        if (currentUser) {
            const savedPlayer = localStorage.getItem(`player_data_${currentUser}`);
            if (savedPlayer) {
                setPlayer(JSON.parse(savedPlayer));
            } else {
                setPlayer(null); // No character created for this user yet
            }
        } else {
            setPlayer(null); // No user logged in
        }
    }, [currentUser]);

    // Persist data to localStorage
    useEffect(() => {
        if (player && currentUser) {
            localStorage.setItem(`player_data_${currentUser}`, JSON.stringify(player));
        }
    }, [player, currentUser]);

    useEffect(() => {
        localStorage.setItem('npcList', JSON.stringify(npcList));
    }, [npcList]);
    
    useEffect(() => {
        if (masterMonsterList.length > MONSTERS.length) {
            const customMonsters = masterMonsterList.slice(MONSTERS.length);
            localStorage.setItem('customMonsters', JSON.stringify(customMonsters));
        }
    }, [masterMonsterList]);
    
    useEffect(() => {
        if (masterItemList.length > ITEM_LIST.length) {
            const customItems = masterItemList.slice(ITEM_LIST.length);
            localStorage.setItem('customItems', JSON.stringify(customItems));
        }
    }, [masterItemList]);

    useEffect(() => {
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    }, [isAdmin]);

    useEffect(() => {
        localStorage.setItem('isBottomNavBarVisible', JSON.stringify(isBottomNavBarVisible));
    }, [isBottomNavBarVisible]);

    useEffect(() => {
        localStorage.setItem('mediaRepository', JSON.stringify(mediaRepository));
    }, [mediaRepository]);

    // On app load, check for saved background
    useEffect(() => {
        const savedBg = localStorage.getItem('backgroundImage');
        if (savedBg) {
            document.body.style.backgroundImage = `url('${savedBg}')`;
        }
    }, []);

    // NPC Movement Handler
    useEffect(() => {
        if (npcMovementIntervalRef.current) clearInterval(npcMovementIntervalRef.current);

        npcMovementIntervalRef.current = setInterval(() => {
            const now = Date.now();
            let hasMovement = false;
            const updatedNpcList = npcList.map(npc => {
                if (!npc.movement || now - npc.movement.lastMoveTime < npc.movement.interval) {
                    return npc;
                }

                hasMovement = true;
                const newNpc = JSON.parse(JSON.stringify(npc)); // Deep copy to avoid mutation issues
                
                // Move to the next point in the path
                const newPathIndex = (newNpc.movement.currentPathIndex + 1) % newNpc.movement.path.length;
                const newAreaId = newNpc.movement.path[newPathIndex];
                
                // Update NPC state
                newNpc.currentAreaId = newAreaId;
                newNpc.movement.currentPathIndex = newPathIndex;
                newNpc.movement.lastMoveTime = now;
                
                // Log the movement
                const areaName = WORLD_MAP_DATA.flatMap(r => r.areas).find(a => a.id === newAreaId)?.name || 'nơi vô định';
                addActivityLog(`${newNpc.name} đã di chuyển đến ${areaName}.`);
                
                return newNpc;
            });

            if (hasMovement) {
                setNpcList(updatedNpcList);
            }
        }, 30 * 1000); // Check for NPC movement every 30 seconds

        return () => {
            if (npcMovementIntervalRef.current) clearInterval(npcMovementIntervalRef.current);
        };
    }, [npcList, addActivityLog]);

    // Notification handler
    const addNotification = useCallback((message: string) => {
        setNotifications(prev => [...prev, message]);
        setTimeout(() => setNotifications(prev => prev.slice(1)), 3000);
    }, []);

    // Weather change handler
    useEffect(() => {
        if (weatherIntervalRef.current) clearInterval(weatherIntervalRef.current);
    
        weatherIntervalRef.current = setInterval(() => {
            if (currentArea && currentArea.possibleWeather && currentArea.possibleWeather.length > 0) {
                const newWeather = currentArea.possibleWeather[Math.floor(Math.random() * currentArea.possibleWeather.length)];
                if (newWeather !== currentWeather) {
                    setCurrentWeather(newWeather);
                    addNotification(`Thời tiết đã thay đổi: ${newWeather}`);
                }
            }
        }, 5 * 60 * 1000); // Change every 5 minutes
    
        return () => {
            if (weatherIntervalRef.current) clearInterval(weatherIntervalRef.current);
        };
    }, [currentArea, addNotification, currentWeather]);

    // Weather world effect handler (e.g., HP drain)
    useEffect(() => {
        if (!player || currentMonster) return; // Don't apply world effects during battle or if no player
    
        const weatherData = WEATHER_DATA[currentWeather];
        if (!weatherData?.world?.hpDrain) return;
    
        const drainInterval = setInterval(() => {
            setPlayer(p => {
                if (!p) return null;
                const newHp = Math.max(1, p.hp - weatherData.world!.hpDrain!);
                if (newHp < p.hp) {
                    addNotification("Bạn đang kiệt sức vì nắng nóng!");
                }
                return { ...p, hp: newHp };
            });
        }, 15000); // every 15 seconds
    
        return () => clearInterval(drainInterval);
    }, [currentWeather, player, currentMonster, addNotification]);

    // Companion stat calculation
    const calculateCompanionTotalStats = useCallback((c: Companion): Companion => {
        const updatedCompanion = { ...c };
        let newStats = { ...c.baseStats };
        let maxHpBonusFromItems = 0;
        let maxMpBonusFromItems = 0;
    
        const companionTemplate = COMPANION_LIST.find(comp => comp.id === c.id);
        if (!companionTemplate) return c;
    
        // Recalculate level up bonuses from scratch
        const levelUpHpBonus = (c.level - 1) * 15;
        const levelUpMpBonus = (c.level - 1) * 8;
    
        // Equipment stats
        Object.values(c.equippedItems).forEach(item => {
            if (item?.stats) {
                for (const [stat, value] of Object.entries(item.stats)) {
                    if (stat === 'hp') maxHpBonusFromItems += value;
                    else if (stat === 'mp') maxMpBonusFromItems += value;
                    else newStats[stat as keyof typeof newStats] += value;
                }
            }
        });
    
        updatedCompanion.totalStats = newStats;
        updatedCompanion.maxHp = companionTemplate.maxHp + levelUpHpBonus + maxHpBonusFromItems;
        updatedCompanion.maxMp = companionTemplate.maxMp + levelUpMpBonus + maxMpBonusFromItems;
        updatedCompanion.hp = Math.min(updatedCompanion.hp, updatedCompanion.maxHp);
        updatedCompanion.mp = Math.min(updatedCompanion.mp, updatedCompanion.maxMp);
    
        return updatedCompanion;
    }, []);

    // Recalculate player total stats
    const calculateTotalStats = useCallback((p: Player): Player => {
        const updatedPlayer = { ...p };

        // --- Calculate potentialStats with bonuses from spirit root and cultivation ---
        let tempPotentialStats = { ...p.basePotentialStats };

        // 1. Spirit Root bonus based on level
        const spiritRootBonus: { [key in keyof PotentialStats]: number } = { theChat: 0, triLuc: 0, linhMan: 0, sucManh: 0, canCo: 0, dinhLuc: 0 };
        const bonusPerLevel = 0.1; // 1 point every 10 levels per attribute

        p.spiritRoot.attributes.forEach(attr => {
            const isMutated = ['Phong', 'Lôi', 'Băng'].includes(attr);
            const multiplier = isMutated ? 2 : 1;
            switch(attr) {
                case 'Kim':
                    spiritRootBonus.sucManh += p.level * bonusPerLevel * multiplier;
                    spiritRootBonus.canCo += p.level * bonusPerLevel * multiplier;
                    break;
                case 'Mộc':
                    spiritRootBonus.theChat += p.level * bonusPerLevel * multiplier;
                    spiritRootBonus.dinhLuc += p.level * bonusPerLevel * multiplier;
                    break;
                case 'Thủy':
                    spiritRootBonus.triLuc += p.level * bonusPerLevel * multiplier;
                    spiritRootBonus.linhMan += p.level * bonusPerLevel * multiplier;
                    break;
                case 'Hỏa':
                    spiritRootBonus.sucManh += p.level * bonusPerLevel * multiplier;
                    spiritRootBonus.triLuc += p.level * bonusPerLevel * multiplier;
                    break;
                case 'Thổ':
                    spiritRootBonus.theChat += p.level * bonusPerLevel * multiplier;
                    spiritRootBonus.canCo += p.level * bonusPerLevel * multiplier;
                    break;
                case 'Phong':
                    spiritRootBonus.linhMan += p.level * bonusPerLevel * multiplier;
                    break;
                case 'Lôi':
                    spiritRootBonus.sucManh += p.level * bonusPerLevel * multiplier;
                    break;
                case 'Băng':
                    spiritRootBonus.dinhLuc += p.level * bonusPerLevel * multiplier;
                    break;
            }
        });

        for (const key in spiritRootBonus) {
            const statKey = key as keyof PotentialStats;
            tempPotentialStats[statKey] += Math.floor(spiritRootBonus[statKey]);
        }
        
        // 2. Cultivation bonus
        const currentRealmIndex = CULTIVATION_REALMS.indexOf(p.cultivation.realm);
        if (currentRealmIndex !== -1) {
            // Apply bonuses for all COMPLETED realms
            for (let i = 0; i < currentRealmIndex; i++) {
                const flatBonus = REALM_BREAKTHROUGH_FLAT_BONUS[i] || 0;
                const percentBonus = REALM_BREAKTHROUGH_PERCENT_BONUS[i] || 0;
                for (const key in tempPotentialStats) {
                    const statKey = key as keyof PotentialStats;
                    tempPotentialStats[statKey] += flatBonus;
                    tempPotentialStats[statKey] *= (1 + percentBonus);
                }
            }

            // Apply bonuses for stages in the CURRENT realm (additive percentage)
            const stagesCompleted = p.cultivation.stage - 1;
            if (stagesCompleted > 0) {
                const stagePercentBonus = STAGE_PERCENT_BONUS[currentRealmIndex] || 0;
                const totalStageMultiplier = 1 + (stagesCompleted * stagePercentBonus);
                for (const key in tempPotentialStats) {
                    const statKey = key as keyof PotentialStats;
                    tempPotentialStats[statKey] *= totalStageMultiplier;
                }
            }
        }
        
        // Round the potential stats to avoid long decimals and assign
        for (const key in tempPotentialStats) {
            const statKey = key as keyof PotentialStats;
            tempPotentialStats[statKey] = Math.round(tempPotentialStats[statKey]);
        }
        updatedPlayer.potentialStats = tempPotentialStats;
        // --- END OF POTENTIAL STATS CALCULATION ---
        

        let newStats = { ...p.baseStats };
        let maxHpBonus = 0;
        let maxMpBonus = 0;
        
        // Ensure luck is initialized
        newStats.luck = newStats.luck || 0;

        // Apply potential stats bonuses (using the newly calculated potentialStats)
        newStats.attack += updatedPlayer.potentialStats.sucManh * 2;
        newStats.speed += updatedPlayer.potentialStats.linhMan * 1;
        maxHpBonus += updatedPlayer.potentialStats.theChat * 10;
        newStats.defense += updatedPlayer.potentialStats.theChat * 1;
        maxMpBonus += updatedPlayer.potentialStats.triLuc * 5;
        newStats.magicAttack += updatedPlayer.potentialStats.triLuc * 2;
        newStats.magicDefense += (updatedPlayer.potentialStats.canCo * 1) + (updatedPlayer.potentialStats.dinhLuc * 1);
        newStats.mentalDemonResistance += updatedPlayer.potentialStats.dinhLuc * 0.005;

        // Equipment stats
        Object.values(p.equippedItems).forEach(item => {
            if (item?.stats) {
                for (const [stat, value] of Object.entries(item.stats)) {
                    if (stat === 'hp') maxHpBonus += value;
                    else if (stat === 'mp') maxMpBonus += value;
                    else newStats[stat as keyof typeof newStats] += value;
                }
            }
        });

        // Passive skill stats
        p.skills.forEach(skill => {
            if (skill.type === 'Bị Động' && skill.passiveBonus) {
                 for (const [stat, value] of Object.entries(skill.passiveBonus)) {
                    if (stat === 'hp') maxHpBonus += value;
                    else if (stat === 'mp') maxMpBonus += value;
                    else if (stat !== 'cultivationSpeedBonus' && newStats.hasOwnProperty(stat)) {
                        newStats[stat as keyof typeof newStats] += value;
                    }
                }
            }
        });

        // Formation stats
        if (p.activeTranPhap?.combatBonus) {
             for (const [stat, value] of Object.entries(p.activeTranPhap.combatBonus)) {
                newStats[stat as keyof typeof newStats] += value;
            }
        }
        
        // Active Cultivation Method stats
        if (p.activeCultivationMethod?.bonuses) {
             for (const [stat, value] of Object.entries(p.activeCultivationMethod.bonuses)) {
                if (stat === 'hp') maxHpBonus += value;
                else if (stat === 'mp') maxMpBonus += value;
                else if (stat !== 'cultivationSpeedBonus' && newStats.hasOwnProperty(stat)) {
                    newStats[stat as keyof typeof newStats] += value;
                }
            }
        }

        // Companion Passive Skill stats
        if (p.activeCompanionId) {
            const activeCompanion = p.companions.find(c => c.id === p.activeCompanionId);
            if (activeCompanion?.passiveSkills) {
                activeCompanion.passiveSkills.forEach(passiveSkill => {
                    for (const [stat, value] of Object.entries(passiveSkill.statBonuses)) {
                        if (stat === 'hp') maxHpBonus += value;
                        else if (stat === 'mp') maxMpBonus += value;
                        else if (newStats.hasOwnProperty(stat)) {
                            (newStats[stat as keyof typeof newStats] as number) += value;
                        }
                    }
                });
            }
        }

        // Apply buffs
        p.buffs.forEach(buff => {
            for (const [stat, value] of Object.entries(buff.statModifiers)) {
                if (newStats.hasOwnProperty(stat)) {
                    (newStats[stat as keyof typeof newStats] as number) += value;
                }
            }
        });

        // Apply active title bonuses
        if (p.activeTitle) {
            const titleData = TITLES.find(t => t.id === p.activeTitle);
            if (titleData?.bonuses) {
                 for (const [stat, value] of Object.entries(titleData.bonuses)) {
                    if (stat === 'hp') maxHpBonus += value;
                    else if (stat === 'mp') maxMpBonus += value;
                    else if (newStats.hasOwnProperty(stat)) {
                        (newStats[stat as keyof typeof newStats] as number) += value;
                    }
                }
            }
        }

        updatedPlayer.totalStats = newStats;
        
        const baseHpFromLevel = 100 + (p.level - 1) * 10;
        const baseMpFromLevel = 50 + (p.level - 1) * 5;
        
        updatedPlayer.maxHp = baseHpFromLevel + maxHpBonus;
        updatedPlayer.maxMp = baseMpFromLevel + maxMpBonus;
        
        return updatedPlayer;
    }, []);
    
    const processLevelUps = useCallback((playerState: Player): { finalPlayer: Player, notifications: string[] } => {
        const updatedPlayer = JSON.parse(JSON.stringify(playerState));
        const newNotifications: string[] = [];
    
        let playerLeveledUp = false;
        let companionLeveledUp = false;
        let alchemyLeveledUp = false;
    
        // Player Character Level Up
        while (updatedPlayer.exp >= updatedPlayer.expToNextLevel) {
            playerLeveledUp = true;
            updatedPlayer.exp -= updatedPlayer.expToNextLevel;
            updatedPlayer.level += 1;
            updatedPlayer.expToNextLevel = Math.floor(updatedPlayer.expToNextLevel * 1.5 + 50 * updatedPlayer.level);
            updatedPlayer.potentialPoints += 5;
            updatedPlayer.baseStats.attack += 1;
            updatedPlayer.baseStats.defense += 1;
            newNotifications.push(`Chúc mừng! Bạn đã đột phá Cấp ${updatedPlayer.level}!`);
        }
    
        // Alchemy Level Up
        while (updatedPlayer.alchemy.exp >= updatedPlayer.alchemy.expToNext) {
            alchemyLeveledUp = true;
            updatedPlayer.alchemy.exp -= updatedPlayer.alchemy.expToNext;
            updatedPlayer.alchemy.level += 1;
            const nextLevelIndex = updatedPlayer.alchemy.level - 1;
            if (nextLevelIndex < ALCHEMY_EXP_TABLE.length) {
                updatedPlayer.alchemy.expToNext = ALCHEMY_EXP_TABLE[nextLevelIndex];
                newNotifications.push(`Luyện Đan Sư đột phá! Đạt đến cấp ${updatedPlayer.alchemy.level}!`);
            } else {
                updatedPlayer.alchemy.expToNext = Infinity;
                newNotifications.push(`Chúc mừng! Kỹ năng Luyện Đan đã đạt đến đỉnh cao!`);
            }
        }
    
        // Companion Level Up
        updatedPlayer.companions.forEach((comp: Companion) => {
            let leveledUp = false;
            while (comp.exp >= comp.expToNextLevel) {
                leveledUp = true;
                comp.exp -= comp.expToNextLevel;
                comp.level += 1;
                comp.expToNextLevel = Math.floor(comp.expToNextLevel * 1.6);
                comp.baseStats.attack += 2;
                comp.baseStats.defense += 1;
                newNotifications.push(`Đồng hành [${comp.name}] đã lên Cấp ${comp.level}!`);
            }
            if (leveledUp) {
                companionLeveledUp = true;
                const newStatsComp = calculateCompanionTotalStats(comp);
                comp.maxHp = newStatsComp.maxHp;
                comp.maxMp = newStatsComp.maxMp;
                comp.totalStats = newStatsComp.totalStats;
                comp.hp = comp.maxHp;
                comp.mp = comp.maxMp;
            }
        });
    
        const somethingChanged = playerLeveledUp || companionLeveledUp || alchemyLeveledUp;
    
        if (somethingChanged) {
            const playerWithNewStats = calculateTotalStats(updatedPlayer);

            if (playerLeveledUp) {
                playerWithNewStats.hp = playerWithNewStats.maxHp;
                playerWithNewStats.mp = playerWithNewStats.maxMp;
                newNotifications.push(`HP/MP đã hồi phục hoàn toàn!`);
            } else {
                playerWithNewStats.hp = Math.min(updatedPlayer.hp, playerWithNewStats.maxHp);
                playerWithNewStats.mp = Math.min(updatedPlayer.mp, playerWithNewStats.maxMp);
            }
            
            playerWithNewStats.companions = updatedPlayer.companions;
            
            return { finalPlayer: playerWithNewStats, notifications: newNotifications };
        }
        
        // If nothing changed, return the original state
        return { finalPlayer: playerState, notifications: [] };
    }, [calculateTotalStats, calculateCompanionTotalStats]);


    // Auto-level up effect for player and companions, now using the centralized function
    useEffect(() => {
        if (!player) return;
        
        const { finalPlayer, notifications } = processLevelUps(player);
        
        if (notifications.length > 0) {
            // Compare to avoid infinite loops if the level-up logic produces the exact same object
            if (JSON.stringify(finalPlayer) !== JSON.stringify(player)) {
                notifications.forEach(addNotification);
                setPlayer(finalPlayer);
            }
        }
    }, [player, processLevelUps, addNotification]);
    
    // --- START: NEW QUEST SYSTEM ---
    const handleQuestCompletion = useCallback((playerState: Player, quest: Quest): { player: Player; needsRecalculation: boolean } => {
        // FIX: Cast the result of JSON.parse to Player to preserve literal types and prevent type widening.
        let updatedPlayer = JSON.parse(JSON.stringify(playerState)) as Player;
        let needsRecalculation = false;
        
        const questCompleteMsg = `Hoàn thành nhiệm vụ: ${quest.title}!`;
        addNotification(questCompleteMsg);
        addActivityLog(questCompleteMsg);

        // Apply rewards
        if (quest.rewardObject) {
            if (quest.rewardObject.characterExp) updatedPlayer.exp += quest.rewardObject.characterExp;
            if (quest.rewardObject.cultivationExp) {
                const currentLp = updatedPlayer.cultivation.lp;
                const maxLp = updatedPlayer.cultivation.lpToNext;
                if (currentLp < maxLp) {
                    const newLp = Math.min(currentLp + quest.rewardObject.cultivationExp, maxLp);
                    updatedPlayer.cultivation.lp = newLp;
                    if (newLp === maxLp) {
                        addNotification("Linh lực đã đầy, cần đột phá!");
                    }
                }
            }
            if (quest.rewardObject.linhThach) updatedPlayer.linhThach += quest.rewardObject.linhThach;
            if (quest.rewardObject.itemId) {
                const item = masterItemList.find(i => i.id === quest.rewardObject.itemId);
                if (item) {
                    updatedPlayer.inventory.push(item);
                    const rewardItemMsg = `Nhận được phần thưởng nhiệm vụ: ${item.name}`;
                    addNotification(rewardItemMsg);
                    addActivityLog(rewardItemMsg);
                }
            }
        }

        // Handle story triggers
        if (quest.storyTriggers) {
            switch (quest.storyTriggers.type) {
                case 'AWAKEN_BLOODLINE':
                    if (!updatedPlayer.bloodlineAwakened) {
                        updatedPlayer.bloodlineAwakened = true;
                        updatedPlayer.basePotentialStats.theChat += 10;
                        updatedPlayer.basePotentialStats.sucManh += 10;
                        addNotification("Huyết mạch của bạn đã thức tỉnh! Tiềm năng tăng vọt!");
                        needsRecalculation = true;
                    }
                    break;
                case 'GAIN_TITLE':
                    if (quest.storyTriggers.value && !updatedPlayer.titles.includes(quest.storyTriggers.value)) {
                        updatedPlayer.titles.push(quest.storyTriggers.value);
                        const titleName = TITLES.find(t => t.id === quest.storyTriggers.value)?.name || quest.storyTriggers.value;
                        addNotification(`Bạn đã nhận được danh hiệu: [${titleName}]`);
                    }
                    break;
            }
        }

        // Handle turning in items
        if (quest.turnInItems) {
            quest.turnInItems.forEach(turnIn => {
                for (let i = 0; i < turnIn.count; i++) {
                    const itemIndex = updatedPlayer.inventory.findIndex((invItem: Item) => invItem.id === turnIn.itemId);
                    if (itemIndex > -1) {
                        updatedPlayer.inventory.splice(itemIndex, 1);
                    }
                }
            });
        }

        return { player: updatedPlayer, needsRecalculation };
    }, [addNotification, addActivityLog, masterItemList]);

    // FIX: Updated the 'action' type to include 'event' to handle event-based quest progression.
    const updateQuestProgress = useCallback((playerState: Player, action: { type: 'KILL' | 'COLLECT' | 'CRAFT' | 'event'; targetId: string; }): Player => {
        // FIX: Cast the result of JSON.parse to Player to preserve literal types and prevent type widening.
        let updatedPlayer = JSON.parse(JSON.stringify(playerState)) as Player;
        let needsRecalculation = false;

        // 1. Update Story Quest
        if (updatedPlayer.activeStoryQuestId) {
            const storyQuest = MAIN_STORY_QUESTS.find(q => q.id === updatedPlayer.activeStoryQuestId);
            if (storyQuest && storyQuest.objective && updatedPlayer.activeStoryQuestProgress < storyQuest.target) {
                let progressMade = false;
                
                if (action.type === 'KILL' && storyQuest.objective.type === 'kill') {
                    const monster = masterMonsterList.find(m => m.id === action.targetId);
                    if (storyQuest.objective.targetId === action.targetId || storyQuest.objective.targetName === monster?.name) {
                        progressMade = true;
                    } else if (storyQuest.objective.targetId === 'area_me_anh_any_monster') {
                        const monsterArea = WORLD_MAP_DATA.flatMap(r => r.areas).find(a => a.monsters?.includes(monster?.name ?? ''));
                        if (monsterArea?.id === 'area_me_anh') progressMade = true;
                    }
                } else if (action.type === 'CRAFT' && storyQuest.objective.type === 'craft' && storyQuest.objective.targetId === action.targetId) {
                    progressMade = true;
                // FIX: Added logic to handle 'event' type actions for story quests.
                } else if (action.type === 'event' && storyQuest.objective.type === 'event' && storyQuest.id === action.targetId) {
                    progressMade = true;
                } else if (action.type === 'COLLECT' && storyQuest.objective.type === 'collect' && storyQuest.objective.itemId === action.targetId) {
                    const currentCount = updatedPlayer.inventory.filter((i: Item) => i.id === action.targetId).length;
                    if (currentCount > updatedPlayer.activeStoryQuestProgress) {
                        updatedPlayer.activeStoryQuestProgress = Math.min(currentCount, storyQuest.target);
                        addNotification(`Nhiệm vụ [${storyQuest.title}]: ${updatedPlayer.activeStoryQuestProgress}/${storyQuest.target}`);
                    }
                }

                if (progressMade) {
                    updatedPlayer.activeStoryQuestProgress++;
                    addNotification(`Nhiệm vụ [${storyQuest.title}]: ${updatedPlayer.activeStoryQuestProgress}/${storyQuest.target}`);
                }

                if (updatedPlayer.activeStoryQuestProgress >= storyQuest.target) {
                    const { player: playerAfterCompletion, needsRecalculation: recalc } = handleQuestCompletion(updatedPlayer, storyQuest);
                    updatedPlayer = playerAfterCompletion;
                    if (recalc) needsRecalculation = true;

                    updatedPlayer.completedStoryQuestIds.push(storyQuest.id);
                    updatedPlayer.activeStoryQuestId = storyQuest.nextQuestId;
                    updatedPlayer.activeStoryQuestProgress = 0;
                }
            }
        }

        // 2. Update Side Quests
        const remainingQuests: Quest[] = [];
        const completedQuests: Quest[] = [];

        updatedPlayer.quests.forEach((quest: Quest) => {
            if (quest.progress >= quest.target) {
                remainingQuests.push(quest); return;
            }

            let newProgress = quest.progress;
            let progressMade = false;

            if (action.type === 'KILL' && quest.objective?.type === 'kill' && (quest.objective.targetId === action.targetId || quest.objective.targetName === masterMonsterList.find(m => m.id === action.targetId)?.name)) {
                newProgress++;
                progressMade = true;
            } else if (action.type === 'CRAFT' && quest.objective?.type === 'craft' && quest.objective.targetId === action.targetId) {
                newProgress++;
                progressMade = true;
            } else if (action.type === 'COLLECT' && quest.objective?.type === 'collect' && quest.objective.itemId === action.targetId) {
                const currentCount = updatedPlayer.inventory.filter((i: Item) => i.id === action.targetId).length;
                if (currentCount > quest.progress) {
                    newProgress = Math.min(currentCount, quest.target);
                    progressMade = true;
                }
            }

            if (progressMade) {
                addNotification(`Nhiệm vụ [${quest.title}]: ${newProgress}/${quest.target}`);
                const updatedQuest = { ...quest, progress: newProgress };
                if (newProgress >= quest.target) completedQuests.push(updatedQuest);
                else remainingQuests.push(updatedQuest);
            } else {
                remainingQuests.push(quest);
            }
        });

        if (completedQuests.length > 0) {
            completedQuests.forEach(cq => {
                const { player: playerAfterCompletion, needsRecalculation: recalc } = handleQuestCompletion(updatedPlayer, cq);
                updatedPlayer = playerAfterCompletion;
                if (recalc) needsRecalculation = true;
            });
        }
        updatedPlayer.quests = remainingQuests;

        return needsRecalculation ? calculateTotalStats(updatedPlayer) : updatedPlayer;
    }, [addActivityLog, addNotification, handleQuestCompletion, masterMonsterList, calculateTotalStats, masterItemList]);
    // --- END: NEW QUEST SYSTEM ---

    const handleLinhDiaReward = useCallback((rewards: { lp?: number; exp?: number; linhThach?: number; items?: Item[] }) => {
        setPlayer(p => {
            if (!p) return null;
            
            let updatedPlayer = JSON.parse(JSON.stringify(p));
    
            if (rewards.lp) {
                const currentLp = updatedPlayer.cultivation.lp;
                const maxLp = updatedPlayer.cultivation.lpToNext;
                if (currentLp < maxLp) {
                    const newLp = Math.min(currentLp + rewards.lp, maxLp);
                    updatedPlayer.cultivation.lp = newLp;
                    if (newLp === maxLp) {
                        addNotification("Linh lực đã đầy, cần đột phá!");
                    }
                }
            }
            if (rewards.exp) {
                updatedPlayer.exp += rewards.exp;
            }
            if (rewards.linhThach) {
                updatedPlayer.linhThach += rewards.linhThach;
            }
            if (rewards.items) {
                updatedPlayer.inventory.push(...rewards.items);
            }
            
            // Check for level ups after applying rewards
            const { finalPlayer, notifications } = processLevelUps(updatedPlayer);
            if (notifications.length > 0) {
                notifications.forEach(addNotification);
            }
    
            return finalPlayer;
        });
    }, [addNotification, processLevelUps]);

    // Media Repository Handlers
    const handleUploadMedia = async (file: File) => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) {
            addNotification("Chỉ chấp nhận tệp hình ảnh hoặc video.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            addNotification("Tệp quá lớn. Vui lòng chọn tệp dưới 5MB.");
            return;
        }

        const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        
        const newMedia: StoredMedia = {
            id: `media_${Date.now()}`,
            name: file.name,
            dataUrl,
            mediaType: isVideo ? 'video' : 'image',
        };

        setMediaRepository(prev => [...prev, newMedia]);
        addNotification(`Đã tải lên: ${file.name}`);
    };

    const handleDeleteMedia = (mediaId: string) => {
        setMediaRepository(prev => prev.filter(media => media.id !== mediaId));
    };

    const handleSetBackground = (dataUrl: string) => {
        document.body.style.backgroundImage = `url('${dataUrl}')`;
        localStorage.setItem('backgroundImage', dataUrl);
        addNotification("Đã cập nhật ảnh nền.");
    };

    const handleOpenAvatarSelector = (type: 'player' | 'npc' | 'companion', id: string) => {
        setMediaSelector({ isOpen: true, type, id });
    };

    const handleSelectAvatar = (dataUrl: string) => {
        const { type, id } = mediaSelector;
        if (!type || !id) return;

        if (type === 'player') {
            setPlayer(p => p ? { ...p, avatarUrl: dataUrl } : null);
        } else if (type === 'npc') {
            setNpcList(prev => prev.map(npc => npc.id === id ? { ...npc, avatarUrl: dataUrl } : npc));
        } else if (type === 'companion') {
            setPlayer(p => {
                if (!p) return null;
                const newCompanions = p.companions.map(c => c.id === id ? { ...c, avatarUrl: dataUrl } : c);
                return { ...p, companions: newCompanions };
            });
        }
        
        addNotification("Đã cập nhật avatar.");
        setMediaSelector({ isOpen: false, type: null, id: null });
    };

    // --- Authentication Handlers ---
    const handleLogin = (username: string, password: string): boolean => {
        const accountsRaw = localStorage.getItem('user_accounts');
        const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};
        if (accounts[username] && accounts[username] === password) {
            localStorage.setItem('currentUser', username);
            setCurrentUser(username);
            addNotification(`Chào mừng trở lại, ${username}!`);
            return true;
        }
        return false;
    };

    const handleRegister = (username: string, password: string): boolean => {
        const accountsRaw = localStorage.getItem('user_accounts');
        const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};
        if (accounts[username]) {
            return false; // User already exists
        }
        accounts[username] = password;
        localStorage.setItem('user_accounts', JSON.stringify(accounts));
        localStorage.setItem('currentUser', username);
        setCurrentUser(username);
        addNotification(`Tài khoản ${username} đã được tạo!`);
        return true;
    };

    const handleLogout = () => {
        addNotification(`Tạm biệt, ${currentUser}!`);
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setPlayer(null); // Clear player data from state
    };


    // Character Creation
    const handleCharacterCreate = (data: CharacterCreationData) => {
        if (!currentUser) return; // Should not happen
        const spiritRoot = generateRandomSpiritRoot();
        const newPlayer = createInitialPlayer({ ...data, spiritRoot });
        const finalPlayer = calculateTotalStats(newPlayer);
        localStorage.setItem(`player_data_${currentUser}`, JSON.stringify(finalPlayer));
        setPlayer(finalPlayer);
        addActivityLog("Chào mừng đến với Huyền Giới Tu Tiên!");
    };
    
    // Cultivation & Meditation Logic
    const cultivationBonus = useMemo(() => {
        if (!player) return 0;
        let bonus = 0;
        if (player.activeTranPhap) bonus += player.activeTranPhap.cultivationBonus;
        player.skills.forEach(s => {
            if (s.type === 'Bị Động' && s.passiveBonus?.cultivationSpeedBonus) {
                bonus += s.passiveBonus.cultivationSpeedBonus;
            }
        });
        if (player.activeCultivationMethod?.bonuses?.cultivationSpeedBonus) {
            bonus += player.activeCultivationMethod.bonuses.cultivationSpeedBonus;
        }
        return bonus;
    }, [player]);

    const lpPerSecond = useMemo(() => {
        if (!player) return 0;
        const baseLpGain = 1 + Math.round(player.cultivation.stage * (1 + cultivationBonus));
        const finalLpGain = Math.round(baseLpGain * player.spiritRoot.multiplier);
        return finalLpGain / 2; // Divided by 2 because the interval is 2000ms
    }, [player, cultivationBonus]);

    const stopActivities = () => {
        setIsCultivating(false);
        setIsMeditating(false);
        if (cultivationIntervalRef.current) {
            clearInterval(cultivationIntervalRef.current);
            cultivationIntervalRef.current = null;
        }
    };
    
    const handleCultivate = useCallback(() => {
        if (!player) return () => {};
        if (isCultivating || isMeditating) {
            stopActivities();
            return () => {};
        }
        
        if (player.cultivation.lp >= player.cultivation.lpToNext) {
            addNotification("Linh lực đã đầy, cần đột phá để tiếp tục tu luyện!");
            return () => {};
        }

        setIsCultivating(true);
        cultivationIntervalRef.current = setInterval(() => {
            setPlayer(p => {
                if (!p) return null;
                const currentLp = p.cultivation.lp;
                const maxLp = p.cultivation.lpToNext;

                if (currentLp >= maxLp) {
                    stopActivities();
                    return p;
                }

                const baseLpGain = 1 + Math.round(p.cultivation.stage * (1 + cultivationBonus));
                const finalLpGain = Math.round(baseLpGain * p.spiritRoot.multiplier);
                const newLp = Math.min(currentLp + finalLpGain, maxLp);

                if (newLp >= maxLp) {
                    addNotification("Linh lực đã đầy, cần đột phá!");
                    stopActivities();
                }

                return { ...p, cultivation: { ...p.cultivation, lp: newLp } };
            });
        }, 2000);
        return stopActivities;
    }, [player, isCultivating, isMeditating, cultivationBonus, addNotification]);
    
    const handleMeditate = useCallback(() => {
        if (!player) return () => {};
        if (isCultivating || isMeditating) {
            stopActivities();
            return () => {};
        }

        setIsMeditating(true);
        cultivationIntervalRef.current = setInterval(() => {
            setPlayer(p => {
                if (!p) return null;
                const hpGain = Math.round(p.maxHp * 0.05);
                const mpGain = Math.round(p.maxMp * 0.05);
                const newHp = Math.min(p.maxHp, p.hp + hpGain);
                const newMp = Math.min(p.maxMp, p.mp + mpGain);
                if (newHp === p.maxHp && newMp === p.maxMp) {
                    stopActivities();
                    addNotification("Đã hồi phục hoàn toàn.");
                }
                return { ...p, hp: newHp, mp: newMp };
            });
        }, 3000);
        return stopActivities;
    }, [player, isCultivating, isMeditating, addNotification]);
    
    const handleBreakthrough = useCallback(() => {
        setPlayer(p => {
            if (!p || p.cultivation.lp < p.cultivation.lpToNext) {
                addNotification("Linh lực chưa đủ để đột phá!");
                return p;
            }

            let updatedPlayer = JSON.parse(JSON.stringify(p));
            let realmLeveledUp = false;

            updatedPlayer.cultivation.lp -= updatedPlayer.cultivation.lpToNext;
            updatedPlayer.cultivation.stage += 1;
            updatedPlayer.cultivation.lpToNext = Math.floor(updatedPlayer.cultivation.lpToNext * 1.2 + 20 * updatedPlayer.cultivation.stage);

            if (updatedPlayer.cultivation.stage > 10) {
                const currentRealmIndex = CULTIVATION_REALMS.indexOf(updatedPlayer.cultivation.realm);
                if (currentRealmIndex < CULTIVATION_REALMS.length - 1) {
                    realmLeveledUp = true;
                    updatedPlayer.cultivation.realm = CULTIVATION_REALMS[currentRealmIndex + 1];
                    updatedPlayer.cultivation.stage = 1;
                    addNotification(`Cảnh giới đại đột phá! Chúc mừng bạn đã tiến vào ${updatedPlayer.cultivation.realm}!`);

                    const newlyUnlockedMethods = CULTIVATION_METHODS_LIST.filter(method => 
                        method.realmRequirement === updatedPlayer.cultivation.realm && 
                        !updatedPlayer.knownCultivationMethodIds.includes(method.id)
                    );
                    if (newlyUnlockedMethods.length > 0) {
                        newlyUnlockedMethods.forEach(method => {
                            updatedPlayer.knownCultivationMethodIds.push(method.id);
                            addNotification(`Lĩnh ngộ công pháp mới: [${method.name}]!`);
                        });
                    }
                } else {
                     addNotification(`Chúc mừng! Tu vi đột phá ${updatedPlayer.cultivation.realm} Tầng ${updatedPlayer.cultivation.stage}!`);
                }
            } else {
                 addNotification(`Chúc mừng! Tu vi đột phá ${updatedPlayer.cultivation.realm} Tầng ${updatedPlayer.cultivation.stage}!`);
            }

            const playerWithNewStats = calculateTotalStats(updatedPlayer);

            if (realmLeveledUp) {
                playerWithNewStats.hp = playerWithNewStats.maxHp;
                playerWithNewStats.mp = playerWithNewStats.maxMp;
                addNotification(`HP/MP đã hồi phục hoàn toàn!`);
            }

            return playerWithNewStats;
        });
    }, [calculateTotalStats, addNotification]);


    // Battle Logic
    const handleStartBattle = (monsterName: string) => {
        if (!player) return;

        const monsterTemplate = masterMonsterList.find(m => m.name === monsterName);
        if (monsterTemplate) {
            stopActivities();
            const monsterForBattle: Monster = JSON.parse(JSON.stringify(monsterTemplate));
            setCurrentMonster(monsterForBattle);
            addNotification(`Bạn đã gặp phải ${monsterForBattle.name} (Cấp ${monsterForBattle.level})!`);
        } else {
            console.error(`Monster with name "${monsterName}" not found in masterMonsterList.`);
            // FIX: In `handleStartBattle`, replaced `onNotify` with the correctly scoped `addNotification` function to handle the case where a monster is not found.
            addNotification(`Lỗi: Không tìm thấy yêu thú "${monsterName}".`);
        }
    };
    
    const handleBachThienHuyenDefeated = () => {
        setShowBTHChoiceModal(true);
    };
    
    const handleBTHChoice = (choice: 'seal' | 'marry') => {
        setShowBTHChoiceModal(false);
        const boss = masterMonsterList.find(m => m.id === 'monster_boss_bth');
        if (!boss || !player) return;

        let updatedPlayer: Player = JSON.parse(JSON.stringify(player));
        const itemsToAdd: Item[] = [];

        // Common rewards
        const rewardItem1 = masterItemList.find(i => i.id === 'item_bth_01'); // Long Linh Thánh Y
        const rewardItem2 = masterItemList.find(i => i.id === 'item_bth_03'); // Long Vũ Lưu Quang
        if (rewardItem1) itemsToAdd.push(rewardItem1);
        if (rewardItem2) itemsToAdd.push(rewardItem2);

        if (choice === 'seal') {
            const rewardItem3 = masterItemList.find(i => i.id === 'item_bth_02'); // Long Tinh Sơ Thủy
            if (rewardItem3) itemsToAdd.push(rewardItem3);
            addNotification("Bạn đã phong ấn Bạch Thiên Huyên, nhận được Long Tinh Sơ Thủy!");
        } else {
            const bthCompanion = COMPANION_LIST.find(c => c.id === 'companion_bth');
            if (bthCompanion && !updatedPlayer.companions.some(c => c.id === bthCompanion.id)) {
                updatedPlayer.companions.push(bthCompanion);
                addNotification("Bạch Thiên Huyên đã đồng ý trở thành đạo lữ của bạn!");
            }
        }
        
        updatedPlayer.inventory.push(...itemsToAdd);
        itemsToAdd.forEach(item => addNotification(`Nhận được [${item.name}]!`));

        // Update quest
        let finalPlayerState = updateQuestProgress(updatedPlayer, { type: 'KILL', targetId: 'monster_boss_bth' });

        setPlayer(finalPlayerState);
        setCurrentMonster(null);
    };


    const handleBattleEnd = (victory: boolean, finalPlayerHp: number, finalPlayerMp: number, finalCompanionState: { hp: number; mp: number } | null, monsterDefeated: Monster | null) => {
        setCurrentMonster(null);
        if (victory && player && monsterDefeated) {
            const { characterExp, cultivationExp, linhThach, items } = monsterDefeated.rewards;
            const rewardMsg = `Chiến thắng! Nhận ${characterExp} EXP, ${cultivationExp} Linh Lực, ${linhThach} Linh Thạch.`;
            addNotification(rewardMsg);
            addActivityLog(rewardMsg);
            
            setPlayer(p => {
                if (!p) return null;
                
                // 1. Apply direct battle rewards
                let updatedPlayer = { 
                    ...p, 
                    hp: finalPlayerHp, 
                    mp: finalPlayerMp, 
                    exp: p.exp + characterExp,
                    linhThach: p.linhThach + linhThach,
                };
                
                const currentLp = p.cultivation.lp;
                const maxLp = p.cultivation.lpToNext;
                if (currentLp < maxLp) {
                    const newLp = Math.min(currentLp + cultivationExp, maxLp);
                    updatedPlayer.cultivation = { ...p.cultivation, lp: newLp };
                    if (newLp === maxLp) {
                        addNotification("Linh lực đã đầy, cần đột phá!");
                    }
                }

                // 2. Handle companion EXP
                if (p.activeCompanionId && finalCompanionState) {
                    const companionIndex = updatedPlayer.companions.findIndex(c => c.id === p.activeCompanionId);
                    if (companionIndex !== -1) {
                        const companionExpGain = Math.floor(characterExp / 2);
                        updatedPlayer.companions[companionIndex].hp = finalCompanionState.hp;
                        updatedPlayer.companions[companionIndex].mp = finalCompanionState.mp;
                        updatedPlayer.companions[companionIndex].exp += companionExpGain;
                        addNotification(`Đồng hành [${updatedPlayer.companions[companionIndex].name}] nhận được ${companionExpGain} EXP.`);
                    }
                }

                // 3. Handle item drops
                const droppedItems: Item[] = [];
                items.forEach(itemDrop => {
                    if (Math.random() < itemDrop.chance) {
                        const item = masterItemList.find(i => i.id === itemDrop.itemId);
                        if(item) {
                           droppedItems.push(item);
                           const itemMsg = `Nhặt được: ${item.name}`;
                           addNotification(itemMsg);
                           addActivityLog(itemMsg);
                        }
                    }
                });
                updatedPlayer.inventory = [...updatedPlayer.inventory, ...droppedItems];

                // 4. Update quest progress for the kill
                let playerAfterKill = updateQuestProgress(updatedPlayer, { type: 'KILL', targetId: monsterDefeated.id });

                // 5. Update quest progress for each collected item
                let finalPlayerState = droppedItems.reduce(
                    (currentPlayer, item) => updateQuestProgress(currentPlayer, { type: 'COLLECT', targetId: item.id }),
                    playerAfterKill
                );

                return finalPlayerState;
            });
        } else {
            const failMsg = "Thất bại... Hãy tu luyện thêm.";
            addNotification(failMsg);
            addActivityLog(failMsg);
            setPlayer(p => {
                if (!p) return null;
                const updatedPlayer = { ...p, hp: Math.max(1, finalPlayerHp), mp: finalPlayerMp };
                if (p.activeCompanionId && finalCompanionState) {
                    const companionIndex = updatedPlayer.companions.findIndex(c => c.id === p.activeCompanionId);
                    if (companionIndex !== -1) {
                        updatedPlayer.companions[companionIndex].hp = Math.max(1, finalCompanionState.hp);
                        updatedPlayer.companions[companionIndex].mp = finalCompanionState.mp;
                    }
                }
                return updatedPlayer;
            });
        }
    };
    
    // Inventory and Equipment
    const handleEquipItem = (item: Item) => {
        if (!player || !item.slot) return;
        
        setPlayer(p => {
            if (!p) return null;
            const newEquipped = { ...p.equippedItems };
            // Find the specific instance of the item to equip
            const itemIndex = p.inventory.findIndex(invItem => 
                invItem.id === item.id && (invItem.upgradeLevel || 0) === (item.upgradeLevel || 0)
            );
            if (itemIndex === -1) return p;
            
            const newInventory = [...p.inventory];
            newInventory.splice(itemIndex, 1);
    
            const previouslyEquipped = newEquipped[item.slot!];
            if (previouslyEquipped) {
                newInventory.push(previouslyEquipped);
            }
            
            newEquipped[item.slot!] = item;
            const updatedPlayer = { ...p, inventory: newInventory, equippedItems: newEquipped };
            return calculateTotalStats(updatedPlayer);
        });
        addNotification(`Đã trang bị ${item.name}.`);
    };

    const handleUnequipItem = (slot: EquipmentSlot) => {
        if (!player) return;
        setPlayer(p => {
            if (!p || !p.equippedItems[slot]) return p;
            
            const itemToUnequip = p.equippedItems[slot]!;
            const newEquipped = { ...p.equippedItems };
            delete newEquipped[slot];

            const newInventory = [...p.inventory, itemToUnequip];
            const updatedPlayer = { ...p, inventory: newInventory, equippedItems: newEquipped };
            return calculateTotalStats(updatedPlayer);
        });
         addNotification(`Đã tháo ${player.equippedItems[slot]?.name}.`);
    };

    const handleEquipItemOnCompanion = (companionId: string, item: Item) => {
        if (!player || !item.slot) return;
    
        setPlayer(p => {
            if (!p) return null;
            
            const itemIndexInInventory = p.inventory.findIndex(invItem => invItem.id === item.id);
            if (itemIndexInInventory === -1) return p;
    
            const companionIndex = p.companions.findIndex(c => c.id === companionId);
            if (companionIndex === -1) return p;
    
            const updatedPlayer = JSON.parse(JSON.stringify(p));
            const newInventory = updatedPlayer.inventory;
            const companion = updatedPlayer.companions[companionIndex];
    
            newInventory.splice(itemIndexInInventory, 1);
    
            const previouslyEquipped = companion.equippedItems[item.slot!];
            if (previouslyEquipped) {
                newInventory.push(previouslyEquipped);
            }
    
            companion.equippedItems[item.slot!] = item;
    
            updatedPlayer.companions[companionIndex] = calculateCompanionTotalStats(companion);
            
            addNotification(`Đã trang bị ${item.name} cho ${companion.name}.`);
            return updatedPlayer;
        });
    };
    
    const handleUnequipItemFromCompanion = (companionId: string, slot: EquipmentSlot) => {
        if (!player) return;
    
        setPlayer(p => {
            if (!p) return null;
            
            const companionIndex = p.companions.findIndex(c => c.id === companionId);
            if (companionIndex === -1) return p;
    
            const updatedPlayer = JSON.parse(JSON.stringify(p));
            const companion = updatedPlayer.companions[companionIndex];
            const itemToUnequip = companion.equippedItems[slot];
    
            if (!itemToUnequip) return p;
    
            updatedPlayer.inventory.push(itemToUnequip);
            delete companion.equippedItems[slot];
    
            updatedPlayer.companions[companionIndex] = calculateCompanionTotalStats(companion);
    
            addNotification(`Đã tháo ${itemToUnequip.name} từ ${companion.name}.`);
            return updatedPlayer;
        });
    };

    const handleItemUse = (item: Item) => {
        if (!player) return;
        setPlayer(p => {
            if (!p) return null;
            const itemIndex = p.inventory.findIndex(invItem => invItem.id === item.id);
            if (itemIndex === -1) return p;
            const newInv = [...p.inventory];
            newInv.splice(itemIndex, 1);
            
            let updatedPlayer = { ...p, inventory: newInv };

            if (item.restores?.hp) {
                updatedPlayer.hp = Math.min(p.maxHp, p.hp + item.restores.hp);
            }
            if (item.restores?.hpPercent) {
                updatedPlayer.hp = Math.min(p.maxHp, p.hp + Math.floor(p.maxHp * item.restores.hpPercent));
            }
            if (item.restores?.mp) {
                updatedPlayer.mp = Math.min(p.maxMp, p.mp + item.restores.mp);
            }
            if(item.expGain) {
                const currentLp = p.cultivation.lp;
                const maxLp = p.cultivation.lpToNext;
                if (currentLp < maxLp) {
                    const newLp = Math.min(currentLp + item.expGain, maxLp);
                    updatedPlayer.cultivation = { ...p.cultivation, lp: newLp };
                    if (newLp === maxLp) {
                        addNotification("Linh lực đã đầy, cần đột phá!");
                    }
                }
            }
            if(item.skillId) {
                const skill = SKILLS.find(s => s.id === item.skillId);
                if (skill && !p.skills.some(s => s.id === skill.id)) {
                    addNotification(`Đã học được [${skill.name}]!`);
                    updatedPlayer.skills = [...p.skills, skill];
                } else {
                    addNotification(`Bạn đã biết kỹ năng này.`);
                    return p; // No change if skill is known
                }
            }

            if (item.buffs) {
                addNotification(`Hiệu ứng [${item.name}] đã kích hoạt!`);
                const newBuff: Buff = {
                    effectId: item.id,
                    source: item.name,
                    statModifiers: item.buffs.statModifiers,
                    duration: item.buffs.duration, // in turns or seconds, needs logic in battle/world
                    cancellable: item.buffs.cancellable ?? true, // Default to cancellable
                };
                 // Remove any existing buffs from the same source item to refresh duration
                const otherBuffs = updatedPlayer.buffs.filter(b => b.effectId !== newBuff.effectId);
                updatedPlayer.buffs = [...otherBuffs, newBuff];
            }

            return calculateTotalStats(updatedPlayer);
        });
    };
    
    const handleUseItemInBattle = (itemToUse: Item) => {
        if (!player) return;
        setPlayer(p => {
            if (!p) return null;
            const itemIndex = p.inventory.findIndex(invItem => invItem.id === itemToUse.id);
            if (itemIndex === -1) return p; // Item not found, shouldn't happen
            
            const newInventory = [...p.inventory];
            newInventory.splice(itemIndex, 1);
            
            return { ...p, inventory: newInventory };
        });
    };

    const handleBuyItem = (itemId: string, price: number) => {
        const item = masterItemList.find(i => i.id === itemId);
        if (!player || !item || player.linhThach < price) {
            addNotification("Không đủ Linh Thạch.");
            return;
        };
        setPlayer(p => {
            if (!p) return null;
            const playerAfterPurchase = { ...p, linhThach: p.linhThach - price, inventory: [...p.inventory, item] };
            return playerAfterPurchase;
        });
        addNotification(`Đã mua ${item.name}.`);
    };

    const handleSellItem = (itemToSell: Item) => {
        if (!player) return;
        const sellValue = Math.floor((itemToSell.value || 0) / 2);
        if (sellValue <= 0) {
            addNotification("Vật phẩm này không thể bán.");
            return;
        }

        setPlayer(p => {
            if (!p) return null;
            const itemIndex = p.inventory.findIndex(i => i.id === itemToSell.id && (i.upgradeLevel || 0) === (itemToSell.upgradeLevel || 0));
            if (itemIndex === -1) return p;

            const newInventory = [...p.inventory];
            newInventory.splice(itemIndex, 1);
            
            const playerAfterSell = { ...p, linhThach: p.linhThach + sellValue, inventory: newInventory };
            return playerAfterSell;
        });
        addNotification(`Đã bán ${itemToSell.name} được ${sellValue} Linh Thạch.`);
    };
    
    const handleCraftItem = (inputIds: [string, string], outputId: string) => {
        if (!player) return;
        
        setPlayer(p => {
            if (!p) return null;
            
            const newInventory = [...p.inventory];
            let foundCount = 0;
            
            for (const inputId of inputIds) {
                const index = newInventory.findIndex(i => i.id === inputId);
                if (index > -1) {
                    newInventory.splice(index, 1);
                    foundCount++;
                }
            }

            if (foundCount !== inputIds.length) {
                addNotification("Lỗi: Không đủ nguyên liệu để chế tạo.");
                return p;
            }

            const outputItem = masterItemList.find(i => i.id === outputId);
            if (outputItem) {
                newInventory.push(outputItem);
                addNotification(`Chế tạo thành công: ${outputItem.name}`);
            }

            return { ...p, inventory: newInventory };
        });
    };
    
    const handleUpgradeItem = (itemToUpgrade: Item) => {
        if (!player) return;

        const currentLevel = itemToUpgrade.upgradeLevel || 0;
        if (currentLevel >= 20) {
            addNotification("Trang bị đã đạt cấp tối đa.");
            return;
        }

        const cost = UPGRADE_COSTS[currentLevel];
        const successRate = UPGRADE_SUCCESS_RATES[currentLevel];
        if (!cost) {
            addNotification("Không thể cường hóa vật phẩm này.");
            return;
        }
        
        setPlayer(p => {
            if (!p) return null;

            // 1. Check resources
            const hasLinhThach = p.linhThach >= cost.linhThach;
            const inventoryCounts = p.inventory.reduce((acc, item) => {
                acc[item.id] = (acc[item.id] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const hasMaterials = cost.materials.every(mat => (inventoryCounts[mat.itemId] || 0) >= mat.count);
            
            if (!hasLinhThach || !hasMaterials) {
                addNotification("Không đủ nguyên liệu hoặc linh thạch.");
                return p;
            }

            // 2. Consume resources
            let tempInventory = [...p.inventory];
            for (const mat of cost.materials) {
                for (let i = 0; i < mat.count; i++) {
                    const matIndex = tempInventory.findIndex(invItem => invItem.id === mat.itemId);
                    if (matIndex > -1) {
                        tempInventory.splice(matIndex, 1);
                    }
                }
            }
            
            const newLinhThach = p.linhThach - cost.linhThach;

            // 3. Determine success and update item
            const isSuccess = Math.random() < successRate;
            let finalInventory = tempInventory;
            let finalEquipped = { ...p.equippedItems };
            const newUpgradeLevel = currentLevel + 1;
            
            if (isSuccess) {
                addNotification(`Cường hóa ${itemToUpgrade.name} +${newUpgradeLevel} thành công!`);

                const upgradedItem = JSON.parse(JSON.stringify(itemToUpgrade));
                upgradedItem.upgradeLevel = newUpgradeLevel;

                const baseStats = upgradedItem.baseStats || upgradedItem.stats;
                const newStats: Partial<CombatStats & { hp: number; mp: number }> = {};
                const multiplier = UPGRADE_MULTIPLIERS[currentLevel];

                if (baseStats) {
                    for (const key in baseStats) {
                        const statKey = key as keyof typeof baseStats;
                        newStats[statKey] = Math.round(baseStats[statKey]! * (1 + multiplier));
                    }
                }
                upgradedItem.stats = newStats;
                
                // Find and replace the item
                // FIX: Cast the result of Object.values and use a type guard to ensure type safety when accessing properties on equipped items.
                const isEquipped = (Object.values(p.equippedItems) as (Item | undefined)[])
                    .filter((item): item is Item => !!item)
                    .some(i => i.id === itemToUpgrade.id && (i.upgradeLevel || 0) === currentLevel);
                if (isEquipped && itemToUpgrade.slot) {
                    finalEquipped[itemToUpgrade.slot] = upgradedItem;
                } else {
                    const itemIndex = finalInventory.findIndex(i => i.id === itemToUpgrade.id && (i.upgradeLevel || 0) === currentLevel);
                    if (itemIndex > -1) {
                        finalInventory.splice(itemIndex, 1, upgradedItem);
                    } else {
                        // This case can happen if the item was equipped. Let's double-check.
                        const slotKey = (Object.keys(p.equippedItems) as EquipmentSlot[]).find(slot => p.equippedItems[slot]?.id === itemToUpgrade.id && (p.equippedItems[slot]!.upgradeLevel || 0) === currentLevel);
                        if (slotKey) {
                            finalEquipped[slotKey] = upgradedItem;
                        }
                    }
                }
            } else {
                addNotification(`Cường hóa ${itemToUpgrade.name} thất bại!`);
            }
            
            const finalPlayerState = { ...p, linhThach: newLinhThach, inventory: finalInventory, equippedItems: finalEquipped };
            return calculateTotalStats(finalPlayerState);
        });
    };
    
    const handleSummonCompanion = (count: 1 | 10): Companion[] | undefined => {
        const cost = count === 1 ? SUMMON_COST_SINGLE : SUMMON_COST_TEN;
        if (!player || player.linhThach < cost) {
            addNotification("Không đủ Linh Thạch.");
            return;
        }

        const newCompanions: Companion[] = [];
        const guaranteedRareOrBetter = count === 10;
        
        for (let i = 0; i < count; i++) {
            const rand = Math.random();
            let rarity: ItemRarity = 'Quý'; // Default rarity if logic fails
            let cumulativeRate = 0;

            const rates = Object.entries(SUMMON_RATES) as [ItemRarity, number][];
            rates.sort(([,a], [,b]) => a - b); // Sort by probability ascending

            for (const [rarityKey, rate] of rates) {
                cumulativeRate += rate;
                if (rand < cumulativeRate) {
                    rarity = rarityKey;
                    break;
                }
            }

            if (guaranteedRareOrBetter && i === count - 1 && newCompanions.every(c => c.rarity === 'Quý')) {
                // Ensure at least one "Hiếm" or better if none were summoned
                const highTierRand = Math.random();
                if (highTierRand < (SUMMON_RATES['Truyền Kỳ'] / (SUMMON_RATES['Hiếm'] + SUMMON_RATES['Truyền Kỳ'] + SUMMON_RATES['Thần Thoại']))) {
                    rarity = 'Truyền Kỳ';
                } else {
                    rarity = 'Hiếm';
                }
            }

            const availableCompanions = COMPANION_LIST.filter(c => c.rarity === rarity);
            if (availableCompanions.length > 0) {
                const summonedTemplate = availableCompanions[Math.floor(Math.random() * availableCompanions.length)];
                const newCompanion = JSON.parse(JSON.stringify(summonedTemplate));
                
                // Randomize base stats by +/- 15%
                for (const key in newCompanion.baseStats) {
                    const statKey = key as keyof CombatStats;
                    const originalValue = newCompanion.baseStats[statKey] as number;
                    if (originalValue > 0) {
                        const multiplier = 1 + (Math.random() * 0.3 - 0.15); // Random number between 0.85 and 1.15
                        newCompanion.baseStats[statKey] = Math.round(originalValue * multiplier);
                    }
                }

                newCompanions.push(newCompanion);
            }
        }
        
        setPlayer(p => {
            if (!p) return null;
            const existingCompanionIds = new Set(p.companions.map(c => c.id));
            const trulyNewCompanions = newCompanions.filter(nc => !existingCompanionIds.has(nc.id));
            
            const playerAfterSummon = { ...p, linhThach: p.linhThach - cost, companions: [...p.companions, ...trulyNewCompanions] };
            
            if (trulyNewCompanions.length > 0) {
                 addNotification(`Đã triệu hồi ${trulyNewCompanions.length} đồng hành mới!`);
            } else {
                 addNotification(`Đã triệu hồi ${newCompanions.length} đồng hành (đã có).`);
            }
            
            return playerAfterSummon;
        });

        return newCompanions;
    };
    
    // Alchemy
    const handleRefinePill = (recipe: AlchemyRecipe, success: boolean) => {
        setPlayer(p => {
            if (!p) return null;

            let updatedPlayer = JSON.parse(JSON.stringify(p));

            const rankInfo = getAlchemyRankInfo(p.alchemy.level);
            let tamDanNhatNiemBonus = p.alchemy.consecutiveSuccesses >= 3 ? 0.2 : 0;
            const finalSuccessChance = recipe.successChance + rankInfo.successBonus + tamDanNhatNiemBonus + (success ? 0.1 : -0.1); // Add minigame bonus/penalty
            const isSuccess = Math.random() < finalSuccessChance;

            // Material consumption
            let materialsConsumed = true;
            for (const input of recipe.inputs) {
                let consumedCount = 0;
                for (let i = 0; i < input.count; i++) {
                    const itemIndex = updatedPlayer.inventory.findIndex((invItem: Item) => invItem.id === input.itemId);
                    if (itemIndex > -1) {
                        updatedPlayer.inventory.splice(itemIndex, 1);
                        consumedCount++;
                    }
                }
                if (consumedCount < input.count) materialsConsumed = false;
            }

            if (!materialsConsumed) {
                addNotification("Lỗi: Không đủ nguyên liệu mặc dù đã kiểm tra.");
                return p;
            }

            // Outcome
            if (isSuccess) {
                const outputItem = masterItemList.find(i => i.id === recipe.outputId);
                if (outputItem) {
                    updatedPlayer.inventory.push(outputItem);
                    addNotification(`Luyện chế [${outputItem.name}] thành công!`);
                    addActivityLog(`Luyện chế thành công: 1x ${outputItem.name}.`);
                    updatedPlayer.alchemy.exp += recipe.expGain;
                    updatedPlayer.alchemy.consecutiveSuccesses++;
                }
            } else {
                 const pheDan = masterItemList.find(i => i.id === 'mat_dan_phe');
                 if (pheDan) updatedPlayer.inventory.push(pheDan);
                 addNotification(`Luyện chế thất bại! Nhận được 1x Đan Phế.`);
                 addActivityLog(`Luyện chế thất bại.`);
                 updatedPlayer.alchemy.consecutiveSuccesses = 0;
            }

            const { finalPlayer } = processLevelUps(updatedPlayer);

            return finalPlayer;
        });
    };

    const handleReceiveAdventureReward = (reward: { exp?: number; linhThach?: number; itemId?: string, rewardTitle?: string }) => {
        if (!player) return;

        let rewardMessages: string[] = [];
        if (reward.exp) rewardMessages.push(`${reward.exp} EXP`);
        if (reward.linhThach) rewardMessages.push(`${reward.linhThach} Linh Thạch`);

        setPlayer(p => {
            if (!p) return null;
            let updatedPlayer = JSON.parse(JSON.stringify(p));
            if (reward.exp) updatedPlayer.exp += reward.exp;
            if (reward.linhThach) updatedPlayer.linhThach += reward.linhThach;
            if (reward.itemId) {
                const item = masterItemList.find(i => i.id === reward.itemId);
                if (item) {
                    updatedPlayer.inventory.push(item);
                    rewardMessages.push(`[${item.name}]`);
                }
            }
            if (reward.rewardTitle) {
                const titleData = TITLES.find(t => t.name === reward.rewardTitle);
                if (titleData && !updatedPlayer.titles.includes(titleData.id)) {
                    updatedPlayer.titles.push(titleData.id);
                    rewardMessages.push(`danh hiệu [${titleData.name}]`);
                }
            }
            addNotification(`Nhận được phần thưởng: ${rewardMessages.join(', ')}.`);
            return updatedPlayer;
        });
    };


    // Main return logic
    if (!currentUser) {
        return <LoginOrRegisterScreen onLogin={handleLogin} onRegister={handleRegister} />;
    }

    if (!player) {
        return <CharacterCreationScreen onCharacterCreate={handleCharacterCreate} />;
    }
    
    if (exploringLinhDiaArea) {
        return (
          <LinhDiaExplorationPanel
            player={player}
            area={exploringLinhDiaArea}
            onExit={() => setExploringLinhDiaArea(null)}
            onFoundReward={handleLinhDiaReward}
            masterItemList={masterItemList}
          />
        );
    }

    if (currentMonster) {
        const activeCompanion = player.companions.find(c => c.id === player.activeCompanionId) || null;
        return <BattleScreen 
            player={player} 
            activeCompanion={activeCompanion} 
            monster={currentMonster} 
            onBattleEnd={handleBattleEnd} 
            isMuted={isMuted} 
            onUseItem={handleUseItemInBattle}
            weather={currentWeather}
            onBossDefeated={handleBachThienHuyenDefeated}
        />;
    }
    
    return (
    <div className="h-screen w-screen flex flex-col p-4 gap-4">
      {notifications.map((msg, index) => (
        <div key={index} className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
          {msg}
        </div>
      ))}
       {showBTHChoiceModal && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                <div className="bg-gray-900 border border-yellow-600 rounded-lg p-6 w-full max-w-lg text-center animate-fadeIn">
                    <h2 className="text-2xl font-bold text-yellow-300">Lựa Chọn Vận Mệnh</h2>
                    <p className="text-gray-300 my-4">Bạch Thiên Huyên đã bị đánh bại. Bạn sẽ làm gì với nàng?</p>
                    <div className="flex justify-center gap-4 mt-6">
                        <button onClick={() => handleBTHChoice('seal')} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded font-semibold">Phong Ấn</button>
                        <button onClick={() => handleBTHChoice('marry')} className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded font-semibold">Kết làm Đạo Lữ</button>
                    </div>
                </div>
            </div>
        )}
      {currentArea && (
        <div className="fixed inset-0 bg-black/80 z-20 flex items-center justify-center p-4" onClick={() => setCurrentArea(null)}>
          <div className="bg-gray-900 border-2 border-cyan-700 rounded-lg w-full max-w-5xl h-[90vh] p-6 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <AreaDetailPanel
              area={currentArea}
              player={player}
              otherPlayers={otherPlayers}
              onLeaveArea={() => setCurrentArea(null)}
              onStartBattle={handleStartBattle}
              onAcceptQuest={(quest) => setPlayer(p => p ? { ...p, quests: [...p.quests, quest] } : null)}
              onNotify={addNotification}
              onOpenBlacksmith={() => setIsBlacksmithOpen(true)}
              masterMonsterList={masterMonsterList}
              npcList={npcList}
              onOpenAvatarSelector={(npcId) => handleOpenAvatarSelector('npc', npcId)}
              weather={currentWeather}
              onAppraiseSpiritRoot={() => setPlayer(p => p ? {...p, spiritRootAppraised: true} : null)}
              onReforgeSpiritRoot={() => {
                const reforgeStone = player.inventory.find(i => i.id === 'mat_tay_linh_thach');
                if (reforgeStone) {
                    setPlayer(p => {
                        if (!p) return null;
                        const stoneIndex = p.inventory.findIndex(i => i.id === 'mat_tay_linh_thach');
                        const newInventory = [...p.inventory];
                        newInventory.splice(stoneIndex, 1);
                        const newSpiritRoot = generateRandomSpiritRoot();
                        addNotification(`Linh căn đã được tẩy luyện thành công!`);
                        const updatedPlayer = { ...p, inventory: newInventory, spiritRoot: newSpiritRoot };
                        return calculateTotalStats(updatedPlayer);
                    });
                } else {
                    addNotification("Không có Tẩy Linh Thạch trong túi đồ!");
                }
              }}
            />
          </div>
        </div>
      )}
      {isBlacksmithOpen && (
        <BlacksmithPanel 
            player={player} 
            onClose={() => setIsBlacksmithOpen(false)} 
            onBuyItem={handleBuyItem}
            onSellItem={handleSellItem}
            onCraftItem={handleCraftItem}
            onUpgradeItem={handleUpgradeItem}
            onNotify={addNotification}
            masterItemList={masterItemList}
        />
      )}
      {isSettingsOpen && (
        <SettingsPanel 
            player={player} 
            onClose={() => setIsSettingsOpen(false)}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
            onUpdatePlayerName={(name) => setPlayer(p => p ? {...p, name} : null)}
            onOpenAvatarSelector={() => handleOpenAvatarSelector('player', player.name)}
            onLogout={handleLogout}
            onRedeemGiftcode={(code) => {
                if (code.toLowerCase() === 'admin') {
                    setIsAdmin(true);
                    addNotification("Đã kích hoạt chế độ ADMIN.");
                } else if(code.toLowerCase() === 'gemini') {
                     setPlayer(p => p ? { ...p, linhThach: p.linhThach + 10000, potentialPoints: p.potentialPoints + 20 } : null);
                     addNotification("Cảm ơn đã sử dụng Gemini! Nhận 10,000 Linh Thạch và 20 điểm tiềm năng.");
                } else if (code.toLowerCase() === 'admin2410') {
                    setIsAdmin(true);
                    setPlayer(p => {
                        if (!p) return null;

                        let updatedPlayer = JSON.parse(JSON.stringify(p));

                        // Max level and cultivation
                        updatedPlayer.level = 999;
                        updatedPlayer.exp = 0;
                        updatedPlayer.expToNextLevel = Infinity;
                        updatedPlayer.cultivation.realm = CULTIVATION_REALMS[CULTIVATION_REALMS.length - 1];
                        updatedPlayer.cultivation.stage = 10;
                        updatedPlayer.cultivation.lp = 999999999;
                        updatedPlayer.cultivation.lpToNext = Infinity;
                        updatedPlayer.potentialPoints = 9999;

                        // All items
                        updatedPlayer.inventory = masterItemList;

                        // All titles
                        updatedPlayer.titles = TITLES.map(t => t.id);

                        // All main quests complete
                        updatedPlayer.completedStoryQuestIds = MAIN_STORY_QUESTS.map(q => q.id);
                        updatedPlayer.activeStoryQuestId = null;
                        updatedPlayer.activeStoryQuestProgress = 0;

                        // All skills
                        updatedPlayer.skills = SKILLS;

                        // All companions
                        updatedPlayer.companions = COMPANION_LIST;
                        
                        // Return recalculated player state
                        return calculateTotalStats(updatedPlayer);
                    });
                    addNotification("Mã Siêu Cấp ADMIN đã được kích hoạt! Tận hưởng sức mạnh tối thượng!");
                }
                 else {
                    addNotification("Mã không hợp lệ.");
                }
            }}
            isAdmin={isAdmin}
            onAdminAddItem={(item) => setPlayer(p => p ? {...p, inventory: [...p.inventory, item]} : null)}
            onAdminLearnSkill={(skill) => setPlayer(p => (p && !p.skills.some(s => s.id === skill.id)) ? {...p, skills: [...p.skills, skill]} : p)}
            onAdminCreateItem={(item) => setMasterItemList(prev => [...prev, item])}
            onAdminCreateMonster={(monster) => setMasterMonsterList(prev => [...prev, monster])}
            masterItemList={masterItemList}
            isBottomNavBarVisible={isBottomNavBarVisible}
            onToggleBottomNavBar={() => setIsBottomNavBarVisible(v => !v)}
        />
      )}
      {isLogVisible && <ActivityLogPanel logs={activityLog} onClose={() => setIsLogVisible(false)} />}
      {mediaSelector.isOpen && <MediaSelectorModal images={mediaRepository} onClose={() => setMediaSelector({isOpen: false, type: null, id: null})} onSelect={handleSelectAvatar} />}
      <header className="flex-shrink-0">
        <StatusBar 
            player={player} 
            titles={TITLES}
            onAvatarClick={() => setIsSettingsOpen(true)} 
            onToggleLog={() => setIsLogVisible(!isLogVisible)}
            isLogVisible={isLogVisible}
            cultivationSpeed={lpPerSecond * 2}
        />
      </header>
      <main className="flex-grow bg-black/30 border border-gray-700 rounded-lg p-4 relative overflow-hidden backdrop-blur-sm">
        <MainContentArea
          activePanel={activePanel}
          player={player}
          titles={TITLES}
          isCultivating={isCultivating}
          setIsCultivating={setIsCultivating}
          cultivationBonus={cultivationBonus}
          onCultivate={handleCultivate}
          isMeditating={isMeditating}
          setIsMeditating={setIsMeditating}
          onMeditate={handleMeditate}
          onActivateFormation={(tf) => setPlayer(p => p ? {...p, activeTranPhap: p.activeTranPhap?.id === tf.id ? null : tf} : null)}
          onActivateCultivationMethod={(methodId) => {
              const method = CULTIVATION_METHODS_LIST.find(m => m.id === methodId);
              setPlayer(p => {
                  if (!p || !method) return p;
                  const newPlayer = {...p, activeCultivationMethod: p.activeCultivationMethod?.id === methodId ? null : method };
                  return calculateTotalStats(newPlayer);
              })
          }}
          onSpendPotentialPoint={(stat) => setPlayer(p => {
              if (!p || p.potentialPoints <= 0) return p;
              const newBasePotentialStats = { ...p.basePotentialStats, [stat]: p.basePotentialStats[stat] + 1 };
              const updatedPlayer = { ...p, potentialPoints: p.potentialPoints - 1, basePotentialStats: newBasePotentialStats };
              return calculateTotalStats(updatedPlayer);
          })}
          onEquipItem={handleEquipItem}
          onUnequipItem={handleUnequipItem}
          onItemUse={handleItemUse}
          onBuyItem={handleBuyItem}
          onNotify={addNotification}
          onEnterArea={(area) => { setActivePanel('map'); setCurrentArea(area); }}
          onSetActiveCompanion={(companionId) => setPlayer(p => {
              if (!p) return null;
              const newPlayer = {...p, activeCompanionId: p.activeCompanionId === companionId ? null : companionId };
              return calculateTotalStats(newPlayer);
          })}
          onEquipItemOnCompanion={handleEquipItemOnCompanion}
          onUnequipItemFromCompanion={handleUnequipItemFromCompanion}
          onFindHiddenTreasure={(treasureId) => {
              if (player.foundTreasures.includes(treasureId)) return;
              setPlayer(p => {
                  if (!p) return null;
                  const newItem = masterItemList.find(i => i.id === 'item_epi_02');
                  const newInventory = newItem ? [...p.inventory, newItem] : p.inventory;
                  addNotification("Bạn đã tìm thấy một bảo vật ẩn giấu: Hắc Thạch Hộ Thuẫn!");
                  return {...p, inventory: newInventory, foundTreasures: [...p.foundTreasures, treasureId]};
              });
          }}
          onSeekEnlightenment={(enlightenmentId) => {
             if (player.foundTreasures.includes(enlightenmentId)) return;
              setPlayer(p => {
                  if (!p) return null;
                  const updatedPlayer = {...p, potentialPoints: p.potentialPoints + 1, foundTreasures: [...p.foundTreasures, enlightenmentId]};
                  addNotification("Ngắm nhìn hoàng hôn, bạn có một tia lĩnh ngộ. Tiềm năng +1!");
                  return calculateTotalStats(updatedPlayer);
              });
          }}
          onSearchForHerbs={(herbId) => {
              if (player.foundTreasures.includes(herbId)) return;
              setPlayer(p => {
                  if (!p) return null;
                  const newItem = masterItemList.find(i => i.id === 'item_004');
                  const newInventory = newItem ? [...p.inventory, newItem, newItem, newItem] : p.inventory;
                  addNotification("Bạn đã tìm thấy một bụi Cỏ Linh Tinh quý!");
                  return {...p, inventory: newInventory, foundTreasures: [...p.foundTreasures, herbId]};
              });
          }}
          masterItemList={masterItemList}
          onTriggerStoryEvent={(questId) => {
              const quest = MAIN_STORY_QUESTS.find(q => q.id === questId);
              if (quest?.storyTriggers?.type === 'CHOOSE_PATH') {
                // Here you could open a modal for the player to choose
                // For now, we'll just auto-choose 'Chính Đạo' for simplicity
                setPlayer(p => {
                    if (!p || p.path) return p;
                    // FIX: Explicitly type `updatedPlayer` as `Player` to prevent TypeScript from incorrectly widening the `path` property to `string`.
                    const updatedPlayer: Player = {...p, path: 'Chính Đạo'};
                    addNotification("Bạn đã chọn con đường Chính Đạo!");
                    return updateQuestProgress(updatedPlayer, {type: 'event', targetId: questId});
                })
              } else if (quest?.id === 'sq_11') {
                 setPlayer(p => p ? updateQuestProgress(p, {type: 'event', targetId: questId}) : null);
              } else if (quest?.id === 'sq_14') {
                 setPlayer(p => p ? updateQuestProgress(p, {type: 'event', targetId: questId}) : null);
              }
          }}
          onSetActiveTitle={(titleId) => {
            setPlayer(p => {
                if(!p) return null;
                const newPlayer = {...p, activeTitle: titleId};
                return calculateTotalStats(newPlayer);
            });
          }}
          onEnlightenSkill={() => {
              addNotification("Chức năng Lĩnh Ngộ Kỹ Năng đang được phát triển.");
          }}
          onObtainTitle={(titleId) => {
            setPlayer(p => {
                if (!p || p.titles.includes(titleId)) return p;
                const title = TITLES.find(t => t.id === titleId);
                if (title) {
                    addNotification(`Bạn đã nhận được danh hiệu: [${title.name}]`);
                    return {...p, titles: [...p.titles, titleId]};
                }
                return p;
            })
          }}
          imageRepository={mediaRepository}
          onUploadImage={handleUploadMedia}
          onDeleteImage={handleDeleteMedia}
          onSetBackground={handleSetBackground}
          onOpenAvatarSelector={handleOpenAvatarSelector}
          onSummonCompanion={handleSummonCompanion}
          onRefinePill={handleRefinePill}
          onStartBattle={handleStartBattle}
          onReceiveAdventureReward={handleReceiveAdventureReward}
          onBreakthrough={handleBreakthrough}
          onStartLinhDiaExploration={setExploringLinhDiaArea}
          chatMessages={chatMessages}
          onSendMessage={handleSendMessage}
          currentAreaId={currentArea?.id}
        />
      </main>
      {isBottomNavBarVisible && <footer className="flex-shrink-0">
        <BottomNavBar activePanel={activePanel} onPanelChange={setActivePanel} />
      </footer>}
    </div>
  );
};
export default App;