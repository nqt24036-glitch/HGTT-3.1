// NEW: Create a new file for alchemy rank data
import { AlchemyRankInfo } from '../types.ts';

export const getAlchemyRankInfo = (level: number): AlchemyRankInfo => {
    if (level >= 51) return { name: 'Chí Tôn Luyện Đan Sư', successBonus: 0.35, materialSaveChance: 0.25, perk: 'Có thể tạo đan mang linh trí' };
    if (level >= 41) return { name: 'Đại tông sư luyện đan', successBonus: 0.30, materialSaveChance: 0.20, perk: 'Có thể luyện đan biến dị' };
    if (level >= 31) return { name: 'Tông sư luyện đan', successBonus: 0.25, materialSaveChance: 0.15, perk: 'Có thể truyền công thức' };
    if (level >= 21) return { name: 'Cao cấp luyện đan sĩ', successBonus: 0.20, materialSaveChance: 0.10, perk: 'Nhận thêm phẩm chất đan ngẫu nhiên' };
    if (level >= 11) return { name: 'Trung cấp luyện đan sư', successBonus: 0.15, materialSaveChance: 0.05, perk: 'Có thể luyện đan hỗ trợ chiến đấu' };
    if (level >= 1) return { name: 'Sơ cấp luyện đan sư', successBonus: 0.10, materialSaveChance: 0.0, perk: 'Tăng nhẹ tỉ lệ thành công' };
    return { name: 'Học đồ luyện đan', successBonus: 0, materialSaveChance: 0, perk: 'Có thể luyện đan cơ bản' };
};
