// FIX: Create full content for `types.ts` to define all game-related types.
// Exporting types makes this file a module, fixing import errors.
// MODIFIED: Added PotentialStats, SpiritRoot, and updated Player/CombatStats for the new character panel.
// MODIFIED: Added new fields to WorldMapArea for NPCs, monsters, bosses, and rewards.
// MODIFIED: Added an optional 'skills' array to the Monster interface to support the new combat AI.
// MODIFIED: Overhauled the Spirit Root system to use a classification model instead of a single type.
// MODIFIED: Added support for item buffs and effects, including a new 'luck' stat.
// MODIFIED: Added types for the new Alchemy system.

export type ItemRarity = 'Phổ thông' | 'Quý' | 'Hiếm' | 'Truyền Kỳ' | 'Thần Thoại' | 'Tối Thượng';
export type ItemType = 'Vũ khí' | 'Áo giáp' | 'Pháp bảo' | 'Tiêu hao' | 'Nguyên liệu' | 'Sách Kỹ Năng' | 'Nhiệm vụ' | 'Đan Dược' | 'Đan Lô';
export type EquipmentSlot = 'vũ khí' | 'áo giáp' | 'pháp bảo';

export type SkillType = 'Chủ Động' | 'Bị Động' | 'Tuyệt Kỹ';

export type SpiritRootType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' | 'Phong' | 'Lôi' | 'Băng';
export type SpiritRootClassificationId = 'ngu' | 'tu' | 'tam' | 'song' | 'thien' | 'bien_di';

export type WeatherType = 'Trời Quang' | 'Nắng Gắt' | 'Mưa Rào' | 'Sương Mù' | 'Bão Tố';

export type TitleRarity = 'Phổ thông' | 'Quý' | 'Hiếm' | 'Truyền Kỳ' | 'Thần thoại';

export interface Title {
  id: string;
  name: string;
  description: string;
  rarity: TitleRarity;
  bonuses: Partial<CombatStats & { hp: number; mp: number }>;
}

export interface StoredMedia {
  id: string;
  name: string;
  dataUrl: string;
  mediaType: 'image' | 'video';
}

export interface WeatherEffect {
  description: string;
  combat?: {
    accuracyModifier?: number;
    elementalBoost?: {
      type: SpiritRootType;
      multiplier: number;
    };
    elementalWeaken?: {
      type: SpiritRootType;
      multiplier: number;
    };
  };
  world?: {
    hpDrain?: number;
  };
}

export interface CombatStats {
  attack: number;
  magicAttack: number;
  defense: number;
  magicDefense: number;
  critRate: number; // 0 to 1
  critDamage: number; // multiplier, e.g., 1.5
  accuracy: number; // 0 to 1
  evasion: number; // 0 to 1
  speed: number;
  armorPen: number; // 0 to 1
  blockRate: number; // 0 to 1
  mentalDemonResistance: number; // 0 to 1
  luck?: number; // Optional stat for luck
}

export interface Buff {
  effectId: string;
  source: string;
  // FIX: Expanded statModifiers to include hp, mp, and cultivationSpeedBonus to allow items to grant these buffs.
  statModifiers: Partial<CombatStats & { hp: number; mp: number; cultivationSpeedBonus: number }>;
  duration: number; // in turns
  cancellable?: boolean; // Can the player manually cancel this buff?
}

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: ItemRarity;
  type: ItemType;
  icon: string;
  slot?: EquipmentSlot;
  stats?: Partial<CombatStats & { hp: number; mp: number }>;
  baseStats?: Partial<CombatStats & { hp: number; mp: number }>; // Original stats before upgrades
  upgradeLevel?: number; // Level of upgrade, defaults to 0
  effect?: string; // For consumables description
  effectId?: string; // For triggering logic
  effectDuration?: number; // Duration in seconds for timed effects
  restores?: { hp?: number; mp?: number; hpPercent?: number; }; // For battle consumables
  expGain?: number; // For cultivation items
  skillId?: string; // For skill books
  requirement?: string;
  story?: string;
  value?: number; // Base value for buying/selling
  buffs?: {
    // FIX: Expanded statModifiers to include hp, mp, and cultivationSpeedBonus, matching the Buff type, to resolve type errors for buff-granting items.
    statModifiers: Partial<CombatStats & { hp: number; mp: number; cultivationSpeedBonus: number }>;
    duration: number; // in turns
    cancellable?: boolean;
  };
}

export interface Cultivation {
  realm: string;
  stage: number;
  lp: number; // Linh Lực
  lpToNext: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  origin: string;
  type: SkillType;
  damage?: number;
  ignoreDefense?: boolean;
  stunTurns?: number;
  stunChance?: number;
  hits?: number;
  buffs?: {
    damageReduction?: number;
  };
  heal?: number;
  mpCost?: number;
  passiveBonus?: Partial<CombatStats & { hp: number; mp: number; cultivationSpeedBonus: number }>;
  visualEffect?: 'slash' | 'heal' | 'whirlwind';
  soundEffectUrl?: string;
  spiritRoot?: SpiritRootType;
  turnTrigger?: number; // For boss AI
}

export interface TranPhap {
    id: string;
    name: string;
    description: string;
    cultivationBonus: number;
    combatBonus?: Partial<CombatStats>;
}

export interface PotentialStats {
  theChat: number; // Thể chất
  triLuc: number;  // Trí lực
  linhMan: number; // Linh mẫn
  sucManh: number; // Sức mạnh
  canCo: number;   // Căn cơ
  dinhLuc: number; // Định lực
}

export interface SpiritRoot {
  linhCan: string;
  phamChat: string;
  nguHanh: { [key: string]: number };
  thienPhu: number;
  canCot: number;
  phucDuyen: number;
}

export interface CultivationMethod {
  id: string;
  name: string;
  description: string;
  realmRequirement: string;
  bonuses: Partial<CombatStats & { hp: number; mp: number; cultivationSpeedBonus: number }>;
}

export interface PlayerSpiritRoot {
  classificationId: SpiritRootClassificationId;
  attributes: SpiritRootType[];
  multiplier: number;
}

export interface Alchemy {
  level: number;
  exp: number;
  expToNext: number;
  rank: string;
  consecutiveSuccesses: number;
}

// NEW: Add AlchemyRankInfo type
export interface AlchemyRankInfo {
    name: string;
    successBonus: number;
    materialSaveChance: number;
    perk: string;
}

export interface AlchemyRecipe {
    id: string;
    name: string;
    inputs: { itemId: string; count: number }[];
    outputId: string;
    requiredLevel: number;
    expGain: number;
    successChance: number; // Base success chance from 0 to 1
    level: number; // Cấp đan
    requiredCauldronLevel: number;
}

export interface Player {
  name: string;
  gender: 'Nam' | 'Nữ';
  sect: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  linhThach: number;
  avatarUrl: string;
  
  potentialPoints: number;
  basePotentialStats: PotentialStats;
  potentialStats: PotentialStats;
  
  baseStats: CombatStats;
  totalStats: CombatStats; // Base + equipment + skills + formation + potential
  
  cultivation: Cultivation;
  alchemy: Alchemy;
  inventory: Item[];
  equippedItems: Partial<Record<EquipmentSlot, Item>>;
  skills: Skill[];
  quests: Quest[];
  knownTranPhapIds: string[];
  activeTranPhap: TranPhap | null;

  knownCultivationMethodIds: string[];
  activeCultivationMethod: CultivationMethod | null;

  companions: Companion[];
  activeCompanionId: string | null;
  foundTreasures: string[];

  // Main Story Quest Fields
  activeStoryQuestId: string | null;
  activeStoryQuestProgress: number;
  completedStoryQuestIds: string[];
  bloodlineAwakened: boolean;
  path: 'Chính Đạo' | 'Ma Đạo' | null;
  titles: string[];
  activeTitle: string | null;
  
  spiritRoot: PlayerSpiritRoot;
  spiritRootAppraised: boolean;
  buffs: Buff[];
}

export interface CompanionPassiveSkill {
  name: string;
  description: string;
  statBonuses: Partial<CombatStats & { hp: number; mp: number }>;
}

export interface Companion {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  baseStats: CombatStats;
  totalStats: CombatStats;
  skills: Skill[];
  equippedItems: Partial<Record<EquipmentSlot, Item>>;
  spiritRoot: PlayerSpiritRoot;
  rarity?: ItemRarity;
  passiveSkills?: CompanionPassiveSkill[];
}

export interface Monster {
  id: string;
  name: string;
  level: number;
  cultivation: Cultivation;
  avatarUrl?: string;
  hp: number;
  stats: CombatStats;
  skills?: Skill[];
  spiritRoot: PlayerSpiritRoot;
  rewards: {
    characterExp: number;
    cultivationExp: number;
    linhThach: number;
    items: { itemId: string; chance: number }[];
  };
}

export interface NpcMovement {
  type: 'patrol';
  path: string[];
  interval: number;
  lastMoveTime: number;
  currentPathIndex: number;
}

export interface NPC {
  id: string;
  name: string;
  level: number;
  cultivation: Cultivation;
  description: string;
  avatarUrl: string;
  baseStats: CombatStats;
  totalStats: CombatStats;
  equippedItems: Partial<Record<EquipmentSlot, Item>>;
  spiritRoot: PlayerSpiritRoot;
  currentAreaId: string;
  movement?: NpcMovement;
}

export interface CharacterCreationData {
  name: string;
  gender: 'Nam' | 'Nữ';
}

export interface CombatLogEntry {
  actor: string;
  action: string;
  target: string;
  isPlayerActor: boolean;

  // Primary Action Info
  skillName?: string;
  itemName?: string;
  message?: string;

  // Effects & Results
  damage?: number;
  hpRestored?: number;
  mpRestored?: number;
  isCrit?: boolean;
  isMiss?: boolean;
  isBlock?: boolean;
  isStun?: boolean;
  elementalEffect?: 'strong' | 'weak' | null;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  rewardObject?: {
    characterExp?: number;
    cultivationExp?: number;
    linhThach?: number;
    itemId?: string;
  };
  objective?: {
    type: 'kill' | 'collect' | 'talk' | 'craft' | 'event';
    targetName: string; // Can be monster name, item name, or NPC name
    targetId?: string; // Can be monster ID or item ID
    itemId?: string; // Specifically for 'collect' quests to identify the item
  };
  // Story Quest Fields
  isStoryQuest?: boolean;
  nextQuestId?: string | null;
  storyTriggers?: {
      type: 'AWAKEN_BLOODLINE' | 'CHOOSE_PATH' | 'GAIN_TITLE';
      value?: any;
  };
  turnInItems?: { itemId: string, count: number }[];
}

export interface WorldMapArea {
  id: string;
  name: string;
  description: string;
  levelRange: string;
  npcs?: string[];
  monsters?: string[];
  boss?: string;
  rewards?: string[];
  possibleWeather?: WeatherType[];
}

export interface WorldMapRealm {
  id: string;
  name: string;
  description: string;
  levelRange: string;
  areas: WorldMapArea[];
}

export interface LinhDiaArea extends WorldMapArea {
  icon: string;
  realmRequirement?: {
    realm: string;
    stage: number;
    comparison: 'above' | 'below';
  };
}

export interface LinhDiaRealm {
  id: string;
  name: string;
  areas: LinhDiaArea[];
}

export interface NpcDialogueOption {
  // FIX: Add 'appraise_spirit_root' to the type definition to match its usage in AreaDetailPanel.tsx.
  id: 'quest' | 'about_area' | 'rumors' | 'trade' | 'leave' | 'appraise_spirit_root';
  text: string;
  response?: string;
}

export interface NpcDialogue {
  greeting: string;
  options: NpcDialogueOption[];
}
// FIX: Add Adventure-related types to support the new AdventurePanel feature.
export type AdventureOutcome =
  | { type: 'continue'; nextStepId: string }
  | { type: 'battle'; monsterName: string }
  | {
      type: 'reward';
      rewardDescription?: string;
      rewardExp?: number;
      rewardLinhThach?: number;
      rewardItemId?: string;
      rewardTitle?: string;
    }
  | { type: 'end' };

export interface AdventureChoice {
  text: string;
  outcome: AdventureOutcome;
}

export interface AdventureStep {
  id: string;
  description: string;
  choices: AdventureChoice[];
}

export interface AdventureStorylet {
  title: string;
  startStepId: string;
  steps: AdventureStep[];
}

export interface OnlinePlayer {
  username: string;
  avatarUrl: string;
  areaId: string | null;
}

export interface ChatMessage {
  id: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: number;
  channel: 'Thế Giới' | 'Khu Vực';
  areaId?: string; // Only for 'Khu Vực' channel
}