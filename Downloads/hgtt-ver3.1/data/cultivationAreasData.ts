import { LinhDiaRealm } from '../types.ts';

export const LINH_DIA_REALMS: LinhDiaRealm[] = [
  {
    id: 'ld_pham_gioi',
    name: 'Phàm Giới',
    areas: [
      {
        id: 'ld_area_me_anh',
        name: 'Rừng Mê Ảnh',
        description: 'Khu rừng yêu thú cấp thấp, thích hợp cho tu sĩ mới nhập đạo rèn luyện.',
        levelRange: '1-15',
        icon: '🌳',
        monsters: ['Chuột Đói', 'Chó Hoang', 'Nhện Độc'],
        boss: 'Hổ Vương Mê Ảnh',
      },
      {
        id: 'ld_area_linh_thu',
        name: 'Linh Thú Sâm Lâm',
        description: 'Nơi sinh sống của các linh thú sơ khai, có thể tìm thấy một vài linh thảo quý.',
        levelRange: '15-30',
        icon: '🐾',
        realmRequirement: { realm: 'Luyện Khí', stage: 10, comparison: 'below' },
        monsters: ['Yêu Thú Tinh Linh'],
        boss: 'Hộ Vệ Thụ Tinh',
      }
    ]
  },
  {
    id: 'ld_tu_chan_gioi',
    name: 'Tu Chân Giới',
    areas: [
      {
        id: 'ld_area_van_yeu',
        name: 'Vạn Yêu sơn mạch',
        description: 'Dãy núi rộng lớn, nơi hàng vạn yêu thú tụ tập, cực kỳ nguy hiểm.',
        levelRange: '31-60',
        icon: '⛰️',
        realmRequirement: { realm: 'Trúc Cơ', stage: 1, comparison: 'above' },
        monsters: ['Hồ Linh', 'Lang Vương', 'Thủy Xà'],
        boss: 'Vạn Yêu Vương',
      },
      {
        id: 'ld_area_ban_co',
        name: 'Bàn Cổ di tích',
        description: 'Di tích còn sót lại từ thời khai thiên lập địa, ẩn chứa nhiều bí mật và cơ duyên.',
        levelRange: '61-80',
        icon: '🏛️',
        realmRequirement: { realm: 'Nguyên Anh', stage: 1, comparison: 'above' },
        monsters: ['Lôi Linh Nhân'],
        boss: 'Cự Thần Bàn Cổ Tàn Hồn',
      }
    ]
  },
  {
    id: 'ld_tien_gioi',
    name: 'Tiên Giới',
    areas: [
      {
        id: 'ld_area_thien_loi',
        name: 'Thiên Lôi Lĩnh vực',
        description: 'Nơi thiên lôi hội tụ, dùng để rèn luyện thân thể và lĩnh ngộ lôi pháp.',
        levelRange: '81-120',
        icon: '⚡️',
        realmRequirement: { realm: 'Hóa Thần', stage: 1, comparison: 'above' },
        monsters: ['Lôi Điểu', 'Lôi Linh Nhân'],
      },
      {
        id: 'ld_area_than_moc',
        name: 'Viễn cổ Thần Mộc',
        description: 'Cây đại thụ nối liền trời đất, sinh khí dồi dào, là nơi tu luyện của các Mộc tu.',
        levelRange: '121-140',
        icon: '🌿',
        realmRequirement: { realm: 'Hợp Thể', stage: 1, comparison: 'above' },
        monsters: ['Cự Mộc Hộ Vệ'],
      }
    ]
  },
  {
    id: 'ld_ma_gioi',
    name: 'Ma Giới',
    areas: [
      {
        id: 'ld_area_huyet_hai',
        name: 'Huyết Hải',
        description: 'Biển máu vô tận, ma khí và sát khí ngút trời, là nơi ma tu tôi luyện ma công.',
        levelRange: '141-160',
        icon: '🩸',
        realmRequirement: { realm: 'Độ Kiếp', stage: 1, comparison: 'above' },
        monsters: ['Ma Ngư', 'Quỷ Huyết Nô'],
      },
      {
        id: 'ld_area_ma_de',
        name: 'Ma Đế lãnh địa',
        description: 'Trung tâm của Ma Giới, nơi Ma Đế ngự trị, kẻ yếu đặt chân vào sẽ hồn bay phách lạc.',
        levelRange: '161-180',
        icon: '👿',
        realmRequirement: { realm: 'Đại Thừa', stage: 1, comparison: 'above' },
        monsters: ['Ma Thần Bất Tử'],
      }
    ]
  },
  {
    id: 'ld_than_gioi',
    name: 'Thần Giới',
    areas: [
      {
        id: 'ld_area_than_hu',
        name: 'Thần Hư điện',
        description: 'Cung điện lơ lửng giữa hư không, nơi các Thần tu luận đạo và giao dịch thần vật.',
        levelRange: '181-200',
        icon: '✨',
        realmRequirement: { realm: 'Chân Tiên', stage: 1, comparison: 'above' },
        monsters: ['Thiên Cung Vệ Thần'],
      },
      {
        id: 'ld_area_co_than',
        name: 'Chiến trường Cổ Thần',
        description: 'Nơi các vị thần cổ đại tử chiến, dư âm sức mạnh vẫn còn có thể hủy thiên diệt địa.',
        levelRange: '201+',
        icon: '⚔️',
        realmRequirement: { realm: 'Tiên Vương', stage: 1, comparison: 'above' },
        monsters: ['Tâm Ma Dĩ Vãng'],
      }
    ]
  }
];
