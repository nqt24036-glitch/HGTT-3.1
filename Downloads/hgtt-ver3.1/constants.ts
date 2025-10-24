// FIX: Create full content for `constants.ts` to define constants.
// FIX: Add .ts extension to import path.
import { ItemRarity, CombatStats } from './types.ts';

export const ITEM_RARITY_COLORS: Record<ItemRarity, string> = {
  'Phổ thông': 'border-gray-400',   // Trắng
  'Quý': 'border-green-500',      // Xanh lục
  'Hiếm': 'border-blue-500',       // Xanh lam
  'Truyền Kỳ': 'border-orange-500', // Cam
  'Thần Thoại': 'border-red-600',   // Đỏ
  'Tối Thượng': 'border-purple-500 animate-pulse', // Tím nhấp nháy
};

export const ITEM_RARITY_TEXT_COLORS: Record<ItemRarity, string> = {
  'Phổ thông': 'text-white',
  'Quý': 'text-green-400',
  'Hiếm': 'text-blue-400',
  'Truyền Kỳ': 'text-orange-400',
  'Thần Thoại': 'text-red-500',
  'Tối Thượng': 'text-purple-400',
};

// Labels for combat stats for UI display
export const COMBAT_STAT_LABELS: Record<keyof CombatStats, string> = {
  attack: 'Công Kích',
  magicAttack: 'Pháp Công',
  defense: 'Phòng Ngự',
  magicDefense: 'Kháng Phép',
  critRate: 'Tỉ Lệ Chí Mạng',
  critDamage: 'S.Thương Chí Mạng',
  accuracy: 'Chính Xác',
  evasion: 'Né Tránh',
  speed: 'Tốc Độ',
  armorPen: 'Xuyên Giáp',
  blockRate: 'Tỉ Lệ Chặn',
  mentalDemonResistance: 'Kháng Tâm Ma',
  luck: 'May Mắn',
};

// Cultivation constants moved from App.tsx
export const CULTIVATION_REALMS = ['Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần', 'Luyện Hư', 'Hợp Thể', 'Độ Kiếp', 'Đại Thừa', 'Chân Tiên', 'Thiên Tiên', 'Tiên Vương', 'Tiên Đế', 'Hậu Thánh Vị'];
export const REALM_BREAKTHROUGH_FLAT_BONUS = [10, 50, 100, 200, 300, 400, 600, 800, 1000, 5000, 8000, 10000, 12000, 15000];
export const REALM_BREAKTHROUGH_PERCENT_BONUS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 2.0, 3.0, 4.0, 5.0];
export const STAGE_PERCENT_BONUS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 2.0, 3.0, 4.0, 5.0];