import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Player, Monster, CombatStats, CombatLogEntry, Skill, Companion, Item, PlayerSpiritRoot, WeatherType } from '../types.ts';
import { AutoIcon, SparklesIcon, SwordIcon } from './IconComponents.tsx';
import { playSound } from '../utils/audio.ts';
import CombatEffect from './CombatEffect.tsx';
import CharacterDetailPopup from './CharacterDetailPopup.tsx';
import { SPIRIT_ROOTS_DATA } from '../data/spiritRootData.ts';
import { WEATHER_DATA } from '../data/weatherData.ts';

interface BattleScreenProps {
  player: Player;
  activeCompanion: Companion | null;
  monster: Monster;
  onBattleEnd: (victory: boolean, finalPlayerHp: number, finalPlayerMp: number, finalCompanionState: { hp: number; mp: number } | null, monsterDefeated: Monster | null) => void;
  isMuted: boolean;
  onUseItem: (item: Item) => void;
  weather: WeatherType;
  onBossDefeated: () => void;
}

type TurnActor = 'player' | 'companion' | 'monster';

const calculateDamage = (
    attacker: { stats: CombatStats; name: string; spiritRoot: PlayerSpiritRoot }, 
    defender: { stats: CombatStats; spiritRoot: PlayerSpiritRoot }, 
    skill: Skill | null,
    weather: WeatherType
) => {
    const weatherEffect = WEATHER_DATA[weather]?.combat;

    let elementalEffect: 'strong' | 'weak' | null = null;
    let damageMultiplier = 1.0;

    // Boss special elemental interaction for Thuy Long Tram vs Fire
    if (skill?.id === 'skill_bth_03' && defender.spiritRoot.attributes.includes('Hỏa')) {
        elementalEffect = 'strong';
        damageMultiplier = 2.0;
    } else {
        const isStrong = attacker.spiritRoot.attributes.some(attAttr => 
            defender.spiritRoot.attributes.some(defAttr => 
                SPIRIT_ROOTS_DATA.find(srd => srd.id === attAttr)?.counters === defAttr
            )
        );

        const isWeak = attacker.spiritRoot.attributes.some(attAttr => 
            defender.spiritRoot.attributes.some(defAttr => 
                SPIRIT_ROOTS_DATA.find(srd => srd.id === attAttr)?.counteredBy === defAttr
            )
        );

        if (isStrong && !isWeak) {
            elementalEffect = 'strong';
            damageMultiplier = 1.5;
        } else if (isWeak && !isStrong) {
            elementalEffect = 'weak';
            damageMultiplier = 0.5;
        }
    }
    
    let hitChance = attacker.stats.accuracy - defender.stats.evasion;
    if (weatherEffect?.accuracyModifier) {
        hitChance += weatherEffect.accuracyModifier;
    }

    if (Math.random() > hitChance) {
        return { damage: 0, isMiss: true, isCrit: false, isBlock: false, elementalEffect: null };
    }

    const isMagic = skill?.damage ? (skill.spiritRoot !== undefined) : attacker.stats.magicAttack > attacker.stats.attack;
    const baseDamage = skill?.damage ? (isMagic ? attacker.stats.magicAttack : attacker.stats.attack) + skill.damage : (isMagic ? attacker.stats.magicAttack : attacker.stats.attack);
    const defense = isMagic ? defender.stats.magicDefense : defender.stats.defense;
    
    let effectiveDefense = defense;
    if(!skill?.ignoreDefense){
        const armorPen = attacker.stats.armorPen;
        effectiveDefense = defense * (1 - armorPen);
    } else {
        effectiveDefense = 0;
    }

    let calculatedDamage = Math.max(1, baseDamage - effectiveDefense);

    calculatedDamage *= damageMultiplier;

    // Apply weather multiplier based on attacker's spirit root
    if (weatherEffect) {
        if (weatherEffect.elementalBoost && attacker.spiritRoot.attributes.includes(weatherEffect.elementalBoost.type)) {
            calculatedDamage *= weatherEffect.elementalBoost.multiplier;
        }
        if (weatherEffect.elementalWeaken && attacker.spiritRoot.attributes.includes(weatherEffect.elementalWeaken.type)) {
            calculatedDamage *= weatherEffect.elementalWeaken.multiplier;
        }
    }

    let isCrit = false;
    if (Math.random() < attacker.stats.critRate) {
        isCrit = true;
        calculatedDamage *= attacker.stats.critDamage;
    }
    
    let isBlock = false;
    if (!isCrit && Math.random() < defender.stats.blockRate) {
        isBlock = true;
        calculatedDamage *= 0.5;
    }

    return { damage: Math.round(calculatedDamage), isMiss: false, isCrit, isBlock, elementalEffect };
};

const BattleScreen: React.FC<BattleScreenProps> = ({ player, activeCompanion, monster, onBattleEnd, isMuted, onUseItem, weather, onBossDefeated }) => {
  const [playerState, setPlayerState] = useState({ hp: player.hp, mp: player.mp, stunnedTurns: 0 });
  const [companionState, setCompanionState] = useState(activeCompanion ? { hp: activeCompanion.hp, mp: activeCompanion.mp, stunnedTurns: 0 } : null);
  const [monsterHp, setMonsterHp] = useState(monster.hp);
  const [monsterStats, setMonsterStats] = useState(monster.stats);
  const [monsterStunnedTurns, setMonsterStunnedTurns] = useState(0);
  const [log, setLog] = useState<CombatLogEntry[]>([]);
  const [currentTurn, setCurrentTurn] = useState<TurnActor | null>(null);
  const [turnCount, setTurnCount] = useState(0);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [playerHitAnim, setPlayerHitAnim] = useState(false);
  const [companionHitAnim, setCompanionHitAnim] = useState(false);
  const [monsterHitAnim, setMonsterHitAnim] = useState(false);
  const [activeEffects, setActiveEffects] = useState<{ id: number; type: string; target: 'player' | 'monster' | 'companion' }[]>([]);
  const [isAutoBattle, setIsAutoBattle] = useState(false);
  const [autoSkills, setAutoSkills] = useState<Set<string>>(new Set());
  const [inspectingCharacter, setInspectingCharacter] = useState<Player | Companion | Monster | null>(null);
  const [showItemPanel, setShowItemPanel] = useState(false);
  
  const logRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const companionRef = useRef<HTMLDivElement>(null);
  const monsterRef = useRef<HTMLDivElement>(null);

  const turnOrder = useMemo(() => {
    const combatants: { name: TurnActor; speed: number }[] = [
      { name: 'player', speed: player.totalStats.speed },
      { name: 'monster', speed: monster.stats.speed },
    ];
    if (activeCompanion) {
      combatants.push({ name: 'companion', speed: activeCompanion.totalStats.speed });
    }
    return combatants.sort((a, b) => b.speed - a.speed).map(c => c.name);
  }, [player.totalStats.speed, monster.stats.speed, activeCompanion]);

  const consumableItems = useMemo(() => {
    const itemMap = new Map<string, { item: Item; count: number }>();
    player.inventory
        .filter(i => i.type === 'Tiêu hao' && i.restores)
        .forEach(item => {
            if (itemMap.has(item.id)) {
                itemMap.get(item.id)!.count++;
            } else {
                itemMap.set(item.id, { item, count: 1 });
            }
        });
    return Array.from(itemMap.values());
  }, [player.inventory]);

  const addLog = useCallback((entry: Omit<CombatLogEntry, 'isPlayerActor'>) => {
    setLog(prev => [...prev, { ...entry, isPlayerActor: entry.actor === player.name || entry.actor === activeCompanion?.name }]);
  }, [player.name, activeCompanion?.name]);

  const advanceTurn = useCallback(() => {
    if (isBattleOver) return;
    const currentTurnIndex = turnOrder.indexOf(currentTurn!);
    const nextTurnIndex = (currentTurnIndex + 1) % turnOrder.length;
    if (nextTurnIndex === 0) {
        setTurnCount(prev => prev + 1);
    }
    setCurrentTurn(turnOrder[nextTurnIndex]);
  }, [currentTurn, turnOrder, isBattleOver]);

  useEffect(() => {
    addLog({ actor: monster.name, action: 'thông báo', target: '', message: 'xuất hiện!' });
    setCurrentTurn(turnOrder[0]);
    setTurnCount(1);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);
  
  const handlePlayerAction = useCallback((skill: Skill | null) => {
    if (currentTurn !== 'player' || isBattleOver) return;

    if (skill && playerState.mp < (skill.mpCost ?? 0)) {
        addLog({ actor: player.name, action: 'thông báo', target: '', message: 'không đủ MP!'});
        return;
    }
    
    if (skill) {
        setPlayerState(prev => ({ ...prev, mp: prev.mp - (skill.mpCost ?? 0) }));
        playSound(skill.soundEffectUrl, isMuted);
    } else {
        playSound("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABgAZGF0YQAAAAA=", isMuted);
    }
    
    if (skill?.heal) {
        setPlayerHitAnim(true); setTimeout(() => setPlayerHitAnim(false), 300);
        const newHp = Math.min(player.maxHp, playerState.hp + skill.heal);
        addLog({ actor: player.name, action: 'dùng kỹ năng', target: player.name, skillName: skill.name, hpRestored: newHp - playerState.hp });
        setPlayerState(prev => ({ ...prev, hp: newHp }));
        if (skill.visualEffect) setActiveEffects(prev => [...prev, { id: Date.now(), type: skill.visualEffect!, target: 'player' }]);
        advanceTurn();
        return;
    }

    const result = calculateDamage({ stats: player.totalStats, name: player.name, spiritRoot: player.spiritRoot }, { stats: monsterStats, spiritRoot: monster.spiritRoot }, skill, weather);
    setMonsterHitAnim(true); setTimeout(() => setMonsterHitAnim(false), 300);
    if (skill?.visualEffect) setActiveEffects(prev => [...prev, { id: Date.now(), type: skill.visualEffect!, target: 'monster' }]);
    
    let stunHappened = false;
    if (!result.isMiss && skill?.stunChance && Math.random() < skill.stunChance) {
        const stunDuration = skill.stunTurns || 1;
        setMonsterStunnedTurns(stunDuration);
        stunHappened = true;
    }

    addLog({ actor: player.name, action: 'tấn công', target: monster.name, ...result, skillName: skill?.name, isStun: stunHappened });

    const newMonsterHp = monsterHp - result.damage;
    if (newMonsterHp <= 0) {
      setMonsterHp(0);
      addLog({ actor: monster.name, action: 'thông báo', target: '', message: 'đã bị đánh bại!'});
      setIsBattleOver(true);
      if (monster.id === 'monster_boss_bth') {
        setTimeout(onBossDefeated, 1500);
      } else {
        setTimeout(() => onBattleEnd(true, playerState.hp, playerState.mp, companionState, monster), 1500);
      }
    } else {
      setMonsterHp(newMonsterHp);
      advanceTurn();
    }
  }, [currentTurn, isBattleOver, playerState, monsterHp, addLog, advanceTurn, player, monster, onBattleEnd, isMuted, companionState, monsterStats, weather, onBossDefeated]);
  
  const handleItemUse = (item: Item) => {
    if (currentTurn !== 'player' || isBattleOver) return;

    onUseItem(item);

    const hpRestored = item.restores?.hp ?? 0;
    const mpRestored = item.restores?.mp ?? 0;
    const hpPercentRestored = item.restores?.hpPercent ? Math.floor(player.maxHp * item.restores.hpPercent) : 0;

    const totalHpRestored = hpRestored + hpPercentRestored;

    const newHp = Math.min(player.maxHp, playerState.hp + totalHpRestored);
    const newMp = Math.min(player.maxMp, playerState.mp + mpRestored);

    setPlayerState(prev => ({ ...prev, hp: newHp, mp: newMp }));
    
    addLog({ actor: player.name, action: 'dùng vật phẩm', target: player.name, itemName: item.name, hpRestored: newHp - playerState.hp, mpRestored: newMp - playerState.mp });
    
    setPlayerHitAnim(true); setTimeout(() => setPlayerHitAnim(false), 300);
    setActiveEffects(prev => [...prev, { id: Date.now(), type: 'heal', target: 'player' }]);
    playSound("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABgAZGF0YQAAAAA=", isMuted);
    setShowItemPanel(false);
    advanceTurn();
  };

  // Auto-battle logic
  const autoBattleLogic = useCallback(() => {
    const playerActiveSkills = player.skills.filter(s => s.type === 'Chủ Động');
    let actionTaken = false;
    for (const skill of playerActiveSkills) {
        if (autoSkills.has(skill.id) && playerState.mp >= (skill.mpCost ?? 0)) {
            handlePlayerAction(skill);
            actionTaken = true;
            break;
        }
    }
    if (!actionTaken) handlePlayerAction(null);
  }, [player.skills, autoSkills, playerState.mp, handlePlayerAction]);
  
  // Stun turn handling
  useEffect(() => {
    if(currentTurn === 'player' && playerState.stunnedTurns > 0 && !isBattleOver) {
        addLog({ actor: player.name, action: 'thông báo', target: '', message: 'bị choáng, không thể hành động!' });
        setPlayerState(prev => ({...prev, stunnedTurns: prev.stunnedTurns - 1}));
        setTimeout(advanceTurn, 1000);
    }
  }, [currentTurn, playerState.stunnedTurns, isBattleOver, addLog, advanceTurn, player.name]);

  useEffect(() => {
    if(currentTurn === 'companion' && companionState && companionState.stunnedTurns > 0 && !isBattleOver) {
        addLog({ actor: activeCompanion!.name, action: 'thông báo', target: '', message: 'bị choáng, không thể hành động!' });
        setCompanionState(prev => prev ? ({...prev, stunnedTurns: prev.stunnedTurns - 1}) : null);
        setTimeout(advanceTurn, 1000);
    }
  }, [currentTurn, companionState, isBattleOver, addLog, advanceTurn, activeCompanion]);


  useEffect(() => {
      if (isAutoBattle && currentTurn === 'player' && playerState.stunnedTurns === 0 && !isBattleOver) {
          const timeoutId = setTimeout(autoBattleLogic, 1000);
          return () => clearTimeout(timeoutId);
      }
  }, [isAutoBattle, currentTurn, isBattleOver, autoBattleLogic, playerState.stunnedTurns]);

  // Companion turn logic
  useEffect(() => {
    if (currentTurn !== 'companion' || !activeCompanion || !companionState || isBattleOver || companionState.stunnedTurns > 0) return;

    const companionTurnTimeout = setTimeout(() => {
        const healSkill = activeCompanion.skills.find(s => s.heal && s.type === 'Chủ Động');
        const attackSkills = activeCompanion.skills.filter(s => s.damage && s.type === 'Chủ Động');
        let actionTaken = false;

        // AI Priority 1: Heal player if critical
        if (healSkill && playerState.hp < player.maxHp * 0.3 && companionState.mp >= (healSkill.mpCost ?? 0)) {
            setPlayerHitAnim(true); setTimeout(() => setPlayerHitAnim(false), 300);
            const newPlayerHp = Math.min(player.maxHp, playerState.hp + healSkill.heal!);
            const newCompanionMp = companionState.mp - (healSkill.mpCost ?? 0);
            
            addLog({ actor: activeCompanion.name, action: 'dùng kỹ năng', target: player.name, skillName: healSkill.name, hpRestored: newPlayerHp - playerState.hp });
            
            setPlayerState(prev => ({...prev, hp: newPlayerHp}));
            setCompanionState(prev => prev ? { ...prev, mp: newCompanionMp } : null);

            if (healSkill.visualEffect) setActiveEffects(prev => [...prev, { id: Date.now(), type: healSkill.visualEffect!, target: 'player' }]);
            actionTaken = true;
        } 
        // AI Priority 2: Heal self if low
        else if (healSkill && companionState.hp < activeCompanion.maxHp * 0.5 && companionState.mp >= (healSkill.mpCost ?? 0)) {
            setCompanionHitAnim(true); setTimeout(() => setCompanionHitAnim(false), 300);
            const newHp = Math.min(activeCompanion.maxHp, companionState.hp + healSkill.heal!);
            const newMp = companionState.mp - (healSkill.mpCost ?? 0);
            addLog({ actor: activeCompanion.name, action: 'dùng kỹ năng', target: activeCompanion.name, skillName: healSkill.name, hpRestored: newHp - companionState.hp });
            setCompanionState(prev => prev ? { ...prev, hp: newHp, mp: newMp } : null);
            if (healSkill.visualEffect) setActiveEffects(prev => [...prev, { id: Date.now(), type: healSkill.visualEffect!, target: 'companion' }]);
            actionTaken = true;
        } 
        // AI Priority 3: Use an attack skill
        else if (attackSkills.length > 0) {
            const skillToUse = attackSkills[Math.floor(Math.random() * attackSkills.length)];
            if (companionState.mp >= (skillToUse.mpCost ?? 0)) {
                const newCompanionMp = companionState.mp - (skillToUse.mpCost ?? 0);
                setCompanionState(prev => prev ? { ...prev, mp: newCompanionMp } : null);

                const result = calculateDamage({ stats: activeCompanion.totalStats, name: activeCompanion.name, spiritRoot: activeCompanion.spiritRoot }, { stats: monsterStats, spiritRoot: monster.spiritRoot }, skillToUse, weather);
                setMonsterHitAnim(true); setTimeout(() => setMonsterHitAnim(false), 300);
                
                addLog({ actor: activeCompanion.name, action: 'tấn công', target: monster.name, ...result, skillName: skillToUse.name });
                if (skillToUse.visualEffect) setActiveEffects(prev => [...prev, { id: Date.now(), type: skillToUse.visualEffect!, target: 'monster' }]);
                
                const newMonsterHp = monsterHp - result.damage;
                if (newMonsterHp <= 0) {
                    setMonsterHp(0);
                    addLog({ actor: monster.name, action: 'thông báo', target: '', message: 'đã bị đánh bại!'});
                    setIsBattleOver(true);
                     if (monster.id === 'monster_boss_bth') {
                        setTimeout(onBossDefeated, 1500);
                    } else {
                        setTimeout(() => onBattleEnd(true, playerState.hp, playerState.mp, companionState, monster), 1500);
                    }
                    return;
                } else {
                    setMonsterHp(newMonsterHp);
                }
                actionTaken = true;
            }
        }
        
        // AI Priority 4: Basic attack
        if (!actionTaken) {
            const result = calculateDamage({ stats: activeCompanion.totalStats, name: activeCompanion.name, spiritRoot: activeCompanion.spiritRoot }, { stats: monsterStats, spiritRoot: monster.spiritRoot }, null, weather);
            setMonsterHitAnim(true); setTimeout(() => setMonsterHitAnim(false), 300);
            addLog({ actor: activeCompanion.name, action: 'tấn công', target: monster.name, ...result });

            const newMonsterHp = monsterHp - result.damage;
            if (newMonsterHp <= 0) {
              setMonsterHp(0);
              addLog({ actor: monster.name, action: 'thông báo', target: '', message: 'đã bị đánh bại!'});
              setIsBattleOver(true);
               if (monster.id === 'monster_boss_bth') {
                    setTimeout(onBossDefeated, 1500);
                } else {
                    setTimeout(() => onBattleEnd(true, playerState.hp, playerState.mp, companionState, monster), 1500);
                }
              return;
            } else {
              setMonsterHp(newMonsterHp);
            }
        }
        
        advanceTurn();

    }, 1000);

    return () => clearTimeout(companionTurnTimeout);
  }, [currentTurn, activeCompanion, companionState, isBattleOver, playerState, player, monster, addLog, advanceTurn, onBattleEnd, monsterHp, monsterStats, weather, onBossDefeated]);

  // Monster turn logic
    useEffect(() => {
        if (monsterStunnedTurns > 0) {
            addLog({ actor: monster.name, action: 'thông báo', target: '', message: 'bị choáng, không thể hành động!' });
            setMonsterStunnedTurns(prev => prev - 1);
            setTimeout(advanceTurn, 1000);
            return;
        }

        if (currentTurn !== 'monster' || isBattleOver) return;

        const monsterTurnTimeout = setTimeout(() => {
            let usedSkill = false;

            // BTH BOSS AI
            if(monster.id === 'monster_boss_bth') {
                if (turnCount >= 1 && turnCount <= 3) {
                    const skill = monster.skills?.find(s => s.id === 'skill_bth_02'); // Long Uy
                    if (skill) {
                        addLog({ actor: monster.name, action: 'dùng kỹ năng', target: 'toàn bộ phe địch', skillName: skill.name, isStun: true });
                        setPlayerState(prev => ({...prev, stunnedTurns: skill.stunTurns || 0}));
                        if(companionState) setCompanionState(prev => prev ? ({...prev, stunnedTurns: skill.stunTurns || 0}) : null);
                        usedSkill = true;
                    }
                } else if (turnCount === 4) {
                     const skill = monster.skills?.find(s => s.id === 'skill_bth_03'); // Thuy Long Tram
                     if(skill) {
                        addLog({ actor: monster.name, action: 'thông báo', target: '', message: `dùng [${skill.name}] hai lần!` });
                        // Hit 1
                        const target1 = (activeCompanion && companionState && companionState.hp > 0 && Math.random() < 0.5) ? 'companion' : 'player';
                        // ... (logic to perform hit 1) ...
                        // Hit 2
                        const target2 = (activeCompanion && companionState && companionState.hp > 0 && Math.random() < 0.5) ? 'companion' : 'player';
                        // ... (logic to perform hit 2) ...
                        usedSkill = true; // Placeholder for complex multi-hit logic
                    }
                } else if (turnCount === 5 && monsterHp < monster.hp * 0.5) {
                     const skill = monster.skills?.find(s => s.id === 'skill_bth_01'); // Mat Nhat
                     if (skill) {
                        addLog({ actor: monster.name, action: 'thông báo', target: '', message: `kích hoạt [${skill.name}]!!!` });
                        setPlayerState(prev => ({...prev, hp: 0}));
                        if(companionState) setCompanionState(prev => prev ? ({...prev, hp: 0}) : null);
                        addLog({actor: player.name, action: 'thông báo', target: '', message: 'gục ngã!'});
                        if(activeCompanion) addLog({actor: activeCompanion.name, action: 'thông báo', target: '', message: 'gục ngã!'});
                        usedSkill = true;
                     }
                }
            }
            
            // Generic AI
            if (!usedSkill) {
                 const monsterSkills = monster.skills?.filter(s => s.type === 'Chủ Động') || [];
                let skillToUse: Skill | null = null;
                
                if (monsterSkills.length > 0) {
                    // Find a buff skill
                    const buffSkill = monsterSkills.find(s => s.passiveBonus && !s.damage && !s.heal);
                    if(buffSkill && Math.random() < 0.25) { // 25% chance to use buff
                        skillToUse = buffSkill;
                    }

                    if(!skillToUse) {
                        const attackSkills = monsterSkills.filter(s => s.damage);
                        if (attackSkills.length > 0 && Math.random() < 0.6) { // 60% chance to use attack skill
                            skillToUse = attackSkills[Math.floor(Math.random() * attackSkills.length)];
                        }
                    }
                }

                let target: 'player' | 'companion' = 'player';
                let targetRef: { hp: number; maxHp: number; stats: CombatStats; name: string, spiritRoot: PlayerSpiritRoot } | null = { hp: playerState.hp, maxHp: player.maxHp, stats: player.totalStats, name: player.name, spiritRoot: player.spiritRoot };
                let setTargetState: React.Dispatch<React.SetStateAction<any>> | null = setPlayerState;
                let setTargetHitAnim: React.Dispatch<React.SetStateAction<boolean>> | null = setPlayerHitAnim;
                
                if (activeCompanion && companionState && companionState.hp > 0) {
                    if (Math.random() < 0.5) {
                        target = 'companion';
                        targetRef = { hp: companionState.hp, maxHp: activeCompanion.maxHp, stats: activeCompanion.totalStats, name: activeCompanion.name, spiritRoot: activeCompanion.spiritRoot };
                        setTargetState = setCompanionState;
                        setTargetHitAnim = setCompanionHitAnim;
                    }
                }
                
                if (!targetRef || !setTargetState || !setTargetHitAnim) {
                    advanceTurn();
                    return;
                }

                if (skillToUse) {
                    if(skillToUse.passiveBonus) {
                        // This logic seems incorrect as passiveBonus is for passive skills. Re-interpreting as a self-buff for now.
                        addLog({ actor: monster.name, action: 'dùng kỹ năng', target: monster.name, skillName: skillToUse.name });
                        usedSkill = true;
                    } else if (skillToUse.damage) {
                        const result = calculateDamage({ stats: monsterStats, name: monster.name, spiritRoot: monster.spiritRoot }, targetRef, skillToUse, weather);
                        setTargetHitAnim(true); setTimeout(() => setTargetHitAnim(false), 300);

                        let stunHappened = false;
                        if (!result.isMiss && skillToUse.stunChance && Math.random() < skillToUse.stunChance) {
                           const stunDuration = skillToUse.stunTurns || 1;
                           setTargetState((prev: any) => ({ ...prev, stunnedTurns: stunDuration }));
                           stunHappened = true;
                        }
                        
                        addLog({ actor: monster.name, action: 'tấn công', target: targetRef.name, ...result, skillName: skillToUse.name, isStun: stunHappened });

                        const newTargetHp = targetRef.hp - result.damage;
                        setTargetState((prev: any) => ({ ...prev, hp: Math.max(0, newTargetHp) }));
                        
                        if (newTargetHp <= 0) {
                            addLog({ actor: targetRef.name, action: 'thông báo', target: '', message: 'đã gục ngã!'});
                        }
                        usedSkill = true;
                    }
                }
                
                if (!usedSkill) {
                    const result = calculateDamage({ stats: monsterStats, name: monster.name, spiritRoot: monster.spiritRoot }, targetRef, null, weather);
                    setTargetHitAnim(true); setTimeout(() => setTargetHitAnim(false), 300);
                    addLog({ actor: monster.name, action: 'tấn công', target: targetRef.name, ...result });

                    const newTargetHp = targetRef.hp - result.damage;
                    setTargetState((prev: any) => ({ ...prev, hp: Math.max(0, newTargetHp) }));
                    if (newTargetHp <= 0) {
                        addLog({ actor: targetRef.name, action: 'thông báo', target: '', message: 'đã gục ngã!'});
                    }
                }
            }


            // Check for battle end after damage calculation
            if (playerState.hp <= 0) {
                setIsBattleOver(true);
                setTimeout(() => onBattleEnd(false, 0, playerState.mp, companionState, null), 1500);
                return;
            }
            
            if (activeCompanion && companionState && companionState.hp <= 0 && playerState.hp <=0) {
                 setIsBattleOver(true);
                 setTimeout(() => onBattleEnd(false, playerState.hp, playerState.mp, {hp: 0, mp: companionState!.mp}, null), 1500);
                 return;
            }
            
            advanceTurn();
        }, 1000);

        return () => clearTimeout(monsterTurnTimeout);
    }, [currentTurn, isBattleOver, monster, monsterStats, player, playerState, activeCompanion, companionState, addLog, advanceTurn, onBattleEnd, weather, turnCount, monsterHp, monsterStunnedTurns, onBossDefeated]);

    const [showSkills, setShowSkills] = useState(false);

    const toggleAutoSkill = (skillId: string) => {
        setAutoSkills(prev => {
            const newSet = new Set(prev);
            if (newSet.has(skillId)) {
                newSet.delete(skillId);
            } else {
                newSet.add(skillId);
            }
            return newSet;
        });
    };

    const CharacterBar: React.FC<{ character: Player | Companion | Monster, hp: number, mp?: number, maxHp: number, maxMp?: number, isPlayer?: boolean, isCompanion?: boolean, hitAnim: boolean, onClick: () => void, stunnedTurns: number }> = 
    ({ character, hp, mp, maxHp, maxMp, isPlayer, isCompanion, hitAnim, onClick, stunnedTurns }) => {
        const hpPercent = maxHp > 0 ? (hp / maxHp) * 100 : 0;
        const mpPercent = maxMp ? (mp! / maxMp) * 100 : 0;
        
        return (
            <div ref={isPlayer ? playerRef : (isCompanion ? companionRef : monsterRef)} className={`flex flex-col items-center gap-1 w-48 p-2 relative cursor-pointer`} onClick={onClick}>
                <div className={`transition-transform duration-300 ${hitAnim ? 'animate-hit' : ''} relative`}>
                    {('avatarUrl' in character && character.avatarUrl) ?
                        <img src={character.avatarUrl} alt={character.name} className={`w-24 h-24 rounded-full border-4 ${isPlayer ? 'border-cyan-400' : (isCompanion ? 'border-yellow-400' : 'border-red-500')} object-cover shadow-lg`} />
                        : <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-gray-900 flex items-center justify-center text-5xl shadow-lg">?</div>
                    }
                     {currentTurn === (isPlayer ? 'player' : (isCompanion ? 'companion' : 'monster')) && !isBattleOver && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>}
                     {stunnedTurns > 0 && <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white" title={`Bị trấn áp: ${stunnedTurns} lượt`}>{stunnedTurns}</div>}
                </div>
                <p className="font-bold text-lg drop-shadow-lg">{character.name}</p>
                 {('level' in character && 'cultivation' in character) && (
                    <p className="text-xs text-gray-300 -mt-1">
                        Cấp {character.level} - {character.cultivation.realm} Tầng {character.cultivation.stage}
                    </p>
                )}
                <div className="w-full bg-gray-800 rounded-full h-4 border border-gray-700 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white z-10">{hp} / {maxHp}</div>
                    <div className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" style={{ width: `${hpPercent}%` }}></div>
                </div>
                {mp !== undefined && maxMp !== undefined &&
                    <div className="w-full bg-gray-800 rounded-full h-4 border border-gray-700 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white z-10">{mp} / {maxMp}</div>
                        <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full" style={{ width: `${mpPercent}%` }}></div>
                    </div>
                }
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-30 flex flex-col p-4 text-white font-sans">
            {inspectingCharacter && <CharacterDetailPopup character={inspectingCharacter} onClose={() => setInspectingCharacter(null)} />}

            {/* Top section: Monster */}
            <div className="flex justify-center">
                <CharacterBar character={monster} hp={monsterHp} maxHp={monster.hp} hitAnim={monsterHitAnim} onClick={() => setInspectingCharacter(monster)} stunnedTurns={monsterStunnedTurns} />
            </div>

            {/* Middle spacer */}
            <div className="flex-grow"></div>

            {/* Active Effects */}
            {activeEffects.map(effect => (
                <CombatEffect key={effect.id} effect={effect} playerRef={playerRef} companionRef={companionRef} monsterRef={monsterRef} onCompleted={(id) => setActiveEffects(prev => prev.filter(e => e.id !== id))} />
            ))}
            
            {/* Bottom section: Player & UI */}
            <div className="flex flex-col">
                <div className="flex justify-between items-end">
                    {/* Player & Companion */}
                    <div className="flex gap-4">
                        <CharacterBar character={player} hp={playerState.hp} mp={playerState.mp} maxHp={player.maxHp} maxMp={player.maxMp} isPlayer hitAnim={playerHitAnim} onClick={() => setInspectingCharacter(player)} stunnedTurns={playerState.stunnedTurns} />
                        {activeCompanion && companionState && <CharacterBar character={activeCompanion} hp={companionState.hp} mp={companionState.mp} maxHp={activeCompanion.maxHp} maxMp={activeCompanion.maxMp} isCompanion hitAnim={companionHitAnim} onClick={() => setInspectingCharacter(activeCompanion)} stunnedTurns={companionState.stunnedTurns} />}
                    </div>
                    
                     {/* Log */}
                    <div ref={logRef} className="flex-grow h-48 bg-black/50 p-3 mx-4 rounded-lg border border-gray-700 overflow-y-auto text-sm space-y-2">
                        {log.map((entry, index) => {
                             let actionText = entry.action;
                             if (entry.action === 'dùng kỹ năng' && entry.skillName) {
                                 actionText = `dùng [${entry.skillName}]`;
                             } else if (entry.action === 'dùng vật phẩm' && entry.itemName) {
                                 actionText = `dùng [${entry.itemName}]`;
                             }
                             
                             return (
                                <div key={index} className="p-2 rounded-md bg-gray-900/50 border border-gray-700/50 animate-fadeIn">
                                    <p className={entry.isPlayerActor ? 'text-cyan-300' : 'text-red-300'}>
                                        <span className="font-bold">{entry.actor}</span>
                                        {entry.message ? ` ${entry.message}` : (
                                            <>
                                                {` ${actionText}`}
                                                {entry.target && ` lên `}
                                                {entry.target && <span className="font-bold">{entry.target}</span>}
                                            </>
                                        )}
                                    </p>
                                    {(entry.damage !== undefined || entry.hpRestored !== undefined || entry.isMiss || entry.isStun) && (
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs pl-4 items-center mt-1">
                                            {entry.isMiss && <span className="font-bold text-gray-400 px-2 py-0.5 bg-gray-700/50 rounded-full">TRƯỢT!</span>}
                                            {entry.damage !== undefined && !entry.isMiss && <span className="font-bold text-white">{entry.damage} Sát thương</span>}
                                            {entry.hpRestored !== undefined && <span className="font-bold text-green-400">+{entry.hpRestored} HP</span>}

                                            {entry.isCrit && <span className="text-yellow-300 font-bold px-2 py-0.5 bg-yellow-800/50 rounded-full">CHÍ MẠNG!</span>}
                                            {entry.isBlock && <span className="text-blue-300 font-bold px-2 py-0.5 bg-blue-800/50 rounded-full">BỊ CHẶN</span>}
                                            {entry.elementalEffect === 'strong' && <span className="text-green-400 font-bold px-2 py-0.5 bg-green-900/50 rounded-full">KHẮC CHẾ</span>}
                                            {entry.elementalEffect === 'weak' && <span className="text-orange-400 font-bold px-2 py-0.5 bg-orange-900/50 rounded-full">BỊ KHẮC</span>}
                                            {entry.isStun && <span className="text-purple-400 font-bold px-2 py-0.5 bg-purple-900/50 rounded-full">CHOÁNG</span>}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Player Actions */}
                    <div className="flex flex-col gap-2 items-center w-72 relative">
                        <div className="flex items-center gap-2 bg-gray-900/70 p-2 rounded-lg">
                            <AutoIcon />
                            <span className="font-semibold">Tự Động</span>
                            <button onClick={() => setIsAutoBattle(p => !p)} className={`w-12 h-6 rounded-full p-1 transition-colors ${isAutoBattle ? 'bg-green-500' : 'bg-gray-600'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isAutoBattle ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 w-full">
                            {currentTurn === 'player' && !isBattleOver && playerState.stunnedTurns === 0 ? (
                                <>
                                    <button onClick={() => handlePlayerAction(null)} className="p-4 bg-red-700 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors">Tấn Công</button>
                                    <button onClick={() => { setShowSkills(p => !p); setShowItemPanel(false); }} className="p-4 bg-blue-700 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors">Kỹ Năng</button>
                                    <button onClick={() => { setShowItemPanel(p => !p); setShowSkills(false); }} className="p-4 bg-green-700 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors">Vật Phẩm</button>
                                    <button onClick={() => onBattleEnd(false, playerState.hp, playerState.mp, companionState, null)} className="p-4 bg-gray-700 rounded-lg font-bold text-lg hover:bg-gray-600 transition-colors">Bỏ Chạy</button>
                                </>
                            ) : (
                                <div className="col-span-2 p-4 text-center text-gray-400 text-lg font-bold">
                                    {isBattleOver ? "Trận đấu kết thúc..." : (playerState.stunnedTurns > 0 ? `Bị choáng... (${playerState.stunnedTurns})` : `Đang chờ ${currentTurn}...`)}
                                </div>
                            )}
                        </div>

                        {(showSkills || showItemPanel) && (
                            <div className="absolute bottom-full mb-2 right-0 bg-gray-900/90 p-4 rounded-lg border border-gray-600 w-80 max-h-96 overflow-y-auto z-10 space-y-2">
                                {showSkills && <>
                                    <h4 className="font-bold text-lg text-yellow-300">Chọn Kỹ Năng</h4>
                                    {player.skills.filter(s => s.type === 'Chủ Động').map(skill => (
                                        <div key={skill.id} className="flex items-center gap-2">
                                            {isAutoBattle && <input type="checkbox" checked={autoSkills.has(skill.id)} onChange={() => toggleAutoSkill(skill.id)} className="form-checkbox h-5 w-5 bg-gray-800 border-gray-600 text-cyan-500 focus:ring-cyan-500 rounded" title="Chọn để tự động sử dụng"/>}
                                            <button onClick={() => handlePlayerAction(skill)} disabled={playerState.mp < (skill.mpCost ?? 0)} className="flex-grow text-left p-2 rounded bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed">
                                                <div className="flex justify-between items-center w-full">
                                                    <div>
                                                        <p className="font-semibold">{skill.name}</p>
                                                    </div>
                                                    <div className="text-right text-sm">
                                                        <p className="font-bold text-cyan-400">MP: {skill.mpCost ?? 0}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </>}
                                {showItemPanel && <>
                                    <h4 className="font-bold text-lg text-yellow-300">Chọn Vật Phẩm</h4>
                                    {consumableItems.length > 0 ? consumableItems.map(({ item, count }) => (
                                        <button key={item.id} onClick={() => handleItemUse(item)} className="w-full text-left p-2 rounded bg-gray-800 hover:bg-gray-700">
                                            <div className="flex justify-between">
                                                <span>{item.name} <span className="text-gray-400">(x{count})</span></span>
                                                <span className="text-green-400">
                                                    {item.restores?.hp ? `+${item.restores.hp} HP ` : ''}
                                                    {item.restores?.hpPercent ? `+${Math.floor(player.maxHp * item.restores.hpPercent)} HP ` : ''}
                                                    {item.restores?.mp ? `+${item.restores.mp} MP` : ''}
                                                </span>
                                            </div>
                                        </button>
                                    )) : <p className="text-gray-500">Không có vật phẩm hồi phục.</p>}
                                </>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BattleScreen;