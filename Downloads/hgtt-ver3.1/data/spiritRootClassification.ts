import { SpiritRootClassificationId } from '../types.ts';

export interface SpiritRootClassificationInfo {
    id: SpiritRootClassificationId;
    name: string;
    description: string;
    cultivationSpeed: string;
    expMultiplier: number;
    note: string;
}

export const SPIRIT_ROOT_CLASSIFICATIONS: SpiritRootClassificationInfo[] = [
    {
        id: 'ngu',
        name: 'Ngũ Linh Căn',
        description: 'Có cả 5 hệ (Kim, Mộc, Thủy, Hỏa, Thổ)',
        cultivationSpeed: 'Rất chậm',
        expMultiplier: 1.0,
        note: 'Không bị khắc chế, cân bằng, khó đột phá.'
    },
    {
        id: 'tu',
        name: 'Tứ Linh Căn',
        description: '4 hệ (mất 1 hệ)',
        cultivationSpeed: 'Trung bình',
        expMultiplier: 2.0,
        note: 'Cân bằng tốt, dễ học nhiều kỹ năng.'
    },
    {
        id: 'tam',
        name: 'Tam Linh Căn',
        description: '3 hệ',
        cultivationSpeed: 'Khá Nhanh',
        expMultiplier: 3.0,
        note: 'Cân đối giữa công và thủ, phổ biến ở tu sĩ.'
    },
    {
        id: 'song',
        name: 'Song Linh Căn',
        description: '2 hệ',
        cultivationSpeed: 'Nhanh',
        expMultiplier: 5.0,
        note: 'Dễ định hướng phát triển chuyên biệt.'
    },
    {
        id: 'thien',
        name: 'Thiên Linh Căn',
        description: '1 hệ thuần túy (Kim, Mộc, v.v...)',
        cultivationSpeed: 'Rất nhanh',
        expMultiplier: 10.0,
        note: 'Hiếm gặp, tốc độ tu luyện cực cao.'
    },
    {
        id: 'bien_di',
        name: 'Biến Dị Thiên Linh Căn',
        description: 'Phong / Lôi / Băng',
        cultivationSpeed: 'Nhanh nhất',
        expMultiplier: 20.0,
        note: 'Cực hiếm, gần như thiên tài trong tu tiên giới.'
    }
];