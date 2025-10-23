import { SpiritRootType } from '../types.ts';

export interface SpiritRootData {
    id: SpiritRootType;
    name: string;
    description: string;
    counters: SpiritRootType;
    counteredBy: SpiritRootType;
    cultivationMultiplier: number;
    damageBonus: number;
    damagePenalty: number;
}

export const SPIRIT_ROOTS_DATA: SpiritRootData[] = [
    {
        id: 'Kim',
        name: 'Kim Linh Căn',
        description: 'Kiên định, cứng rắn, thiên về phòng ngự và những đòn tấn công chính xác, mạnh mẽ.',
        counters: 'Mộc',
        counteredBy: 'Hỏa',
        cultivationMultiplier: 1.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
    {
        id: 'Mộc',
        name: 'Mộc Linh Căn',
        description: 'Linh hoạt, dồi dào sinh khí, có khả năng hồi phục và kiểm soát, am hiểu về thảo dược.',
        counters: 'Thổ',
        counteredBy: 'Kim',
        cultivationMultiplier: 1.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
    {
        id: 'Thủy',
        name: 'Thủy Linh Căn',
        description: 'Trí tuệ, thích ứng, linh hoạt trong chiến đấu, có thể sử dụng các thuật pháp biến hóa đa dạng.',
        counters: 'Hỏa',
        counteredBy: 'Thổ',
        cultivationMultiplier: 1.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
    {
        id: 'Hỏa',
        name: 'Hỏa Linh Căn',
        description: 'Nhiệt huyết, bộc phát, sở hữu sức tấn công và sát thương bùng nổ đáng sợ.',
        counters: 'Kim',
        counteredBy: 'Thủy',
        cultivationMultiplier: 1.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
    {
        id: 'Thổ',
        name: 'Thổ Linh Căn',
        description: 'Phòng thủ, bền bỉ, kiên cố như núi, là một tấm khiên vững chắc trên chiến trường.',
        counters: 'Thủy',
        counteredBy: 'Mộc',
        cultivationMultiplier: 1.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
    {
        id: 'Phong',
        name: 'Phong Linh Căn (Dị Linh Căn)',
        description: 'Nhanh nhẹn, né tránh, tốc độ vô song, khó ai có thể nắm bắt được.',
        counters: 'Lôi',
        counteredBy: 'Băng',
        cultivationMultiplier: 3.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
    {
        id: 'Lôi',
        name: 'Lôi Linh Căn (Dị Linh Căn)',
        description: 'Cường bạo, công phá mạnh mẽ, mỗi đòn đánh đều mang theo sức mạnh của thiên lôi.',
        counters: 'Băng',
        counteredBy: 'Phong',
        cultivationMultiplier: 3.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
    {
        id: 'Băng',
        name: 'Băng Linh Căn (Dị Linh Căn)',
        description: 'Khống chế, băng giá, tĩnh lặng, có thể đóng băng mọi thứ, làm kẻ địch không thể động đậy.',
        counters: 'Phong',
        counteredBy: 'Lôi',
        cultivationMultiplier: 3.0,
        damageBonus: 0.5,
        damagePenalty: 0.5,
    },
];
