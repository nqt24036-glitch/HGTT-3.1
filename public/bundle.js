/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ReactDOM from "react-dom/client";
const TITLES = [
  {
    id: "Kiếm Khách Vô Danh",
    name: "Kiếm Khách Vô Danh",
    rarity: "Phổ thông",
    description: "Đã nhận được sự công nhận từ một tàn hồn kiếm khách.",
    bonuses: { attack: 45 }
  },
  {
    id: "Nguoi_Thu_Gom_Linh_Thao",
    name: "Người Thu Gôm Linh Thảo",
    rarity: "Phổ thông",
    description: "Thu thập đủ 100 loại linh thảo khác nhau.",
    bonuses: { hp: 25 }
  },
  {
    id: "Ke_Diet_Chuot",
    name: "Kẻ Diệt Chuột",
    rarity: "Phổ thông",
    description: "Tiêu diệt 50 con Chuột Đói, góp phần bảo vệ mùa màng.",
    bonuses: { attack: 15 }
  },
  {
    id: "Nha_Gia_Kim_Tap_Su",
    name: "Nhà Giả Kim Tập Sự",
    rarity: "Phổ thông",
    description: "Luyện chế thành công 10 viên đan dược.",
    bonuses: { mp: 20 }
  },
  {
    id: "Hộ Hoa Sứ Giả",
    name: "Hộ Hoa Sứ Giả",
    rarity: "Quý",
    description: "Ra tay nghĩa hiệp, giúp đỡ người yếu đuối.",
    bonuses: { defense: 70, hp: 80 }
  },
  {
    id: "Thần Nông Trợ Thủ",
    name: "Thần Nông Trợ Thủ",
    rarity: "Quý",
    description: "Bạn đã giúp đỡ một vị Dược Vương, cho thấy lòng nhân ái.",
    bonuses: { magicDefense: 80, luck: 15 }
  },
  {
    id: "Tho_San_Me_Anh",
    name: "Thợ Săn Mê Ảnh",
    rarity: "Quý",
    description: "Tiêu diệt Hổ Vương Mê Ảnh tại Rừng Mê Ảnh.",
    bonuses: { attack: 50, speed: 25 }
  },
  {
    id: "Nhan_Tu_Hao_Hiep",
    name: "Nhân Sĩ Hảo Hiệp",
    rarity: "Quý",
    description: "Hoàn thành 20 nhiệm vụ phụ, giúp đỡ dân lành.",
    bonuses: { defense: 60, hp: 100 }
  },
  {
    id: "Nha_Tham_Hiem_May_Man",
    name: "Nhà Thám Hiểm May Mắn",
    rarity: "Quý",
    description: "Tìm thấy 3 cơ duyên ẩn giấu trên bản đồ thế giới.",
    bonuses: { luck: 25, evasion: 0.02 }
  },
  {
    id: "Bac_Thay_Cuong_Hoa",
    name: "Bậc Thầy Cường Hóa",
    rarity: "Quý",
    description: "Cường hóa thành công một trang bị lên +5.",
    bonuses: { attack: 30, defense: 30 }
  },
  {
    id: "Thợ Săn Tập Sự",
    name: "Thợ Săn Tập Sự",
    rarity: "Hiếm",
    description: "Chứng tỏ kỹ năng săn bắn bằng cách hạ gục yêu thú đáng gờm.",
    bonuses: { speed: 150, critDamage: 0.15, evasion: 0.1 }
  },
  {
    id: "Kẻ Kế Thừa Mặt Trời",
    name: "Kẻ Kế Thừa Mặt Trời",
    rarity: "Hiếm",
    description: "Hấp thụ năng lượng cổ xưa từ di tích sa mạc.",
    bonuses: { magicAttack: 250, mp: 100, critRate: 0.1 }
  },
  {
    id: "Ke_Khai_Mo_Linh_Mach",
    name: "Kẻ Khai Mở Linh Mạch",
    rarity: "Hiếm",
    description: "Tu luyện lần đầu tại một Linh Địa Tu Luyện.",
    bonuses: { mp: 250, magicAttack: 200 }
  },
  {
    id: "Ban_Huu_Cua_Linh_Thu",
    name: "Bạn Hữu Của Linh Thú",
    rarity: "Hiếm",
    description: "Sở hữu 3 đồng hành khác nhau.",
    bonuses: { hp: 300, defense: 80, magicDefense: 80 }
  },
  {
    id: "Dan_Su_So_Cap",
    name: "Đan Sư Sơ Cấp",
    rarity: "Hiếm",
    description: "Đạt đến cấp bậc Sơ cấp luyện đan sư.",
    bonuses: { magicDefense: 200, mentalDemonResistance: 0.05, mp: 150 }
  },
  {
    id: "Chien_Binh_Thanh_Van",
    name: "Chiến Binh Thanh Vân",
    rarity: "Hiếm",
    description: "Hoàn thành chuỗi nhiệm vụ chính tuyến tại Tông môn Thanh Vân.",
    bonuses: { attack: 180, speed: 100, accuracy: 0.05 }
  },
  {
    id: "Phá Thiên",
    name: "Phá Thiên",
    rarity: "Truyền Kỳ",
    description: "Danh hiệu cho kẻ dám thách thức Thiên Đạo.",
    bonuses: { attack: 2500, critRate: 0.35, armorPen: 0.5, speed: 1e3 }
  },
  {
    id: "Nghich_Thien_Hanh_Gia",
    name: "Nghịch Thiên Hành Giả",
    rarity: "Truyền Kỳ",
    description: "Sống sót qua Lôi Kiếp và đột phá tới Tiên Giới.",
    bonuses: { hp: 3e3, defense: 1500, magicDefense: 1500, blockRate: 0.1 }
  },
  {
    id: "Tru_Ma_Dao_Ton",
    name: "Trừ Ma Đạo Tôn",
    rarity: "Truyền Kỳ",
    description: "Tiêu diệt Ma Soái Hắc Ám tại Thành Ma Vực.",
    bonuses: { attack: 4e3, armorPen: 0.2, critRate: 0.1 }
  },
  {
    id: "Nguoi_Thua_Ke_Ban_Co",
    name: "Người Thừa Kế Bàn Cổ",
    rarity: "Truyền Kỳ",
    description: "Đánh bại Cự Thần Bàn Cổ Tàn Hồn và nhận được truyền thừa.",
    bonuses: { attack: 2e3, defense: 2e3, hp: 5e3, speed: 500 }
  },
  {
    id: "Gia Tộc Bất Diệt",
    name: "Gia Tộc Bất Diệt",
    rarity: "Thần thoại",
    description: "Biểu tượng cho sự hồi sinh và vinh quang của dòng tộc.",
    bonuses: { hp: 25e4, defense: 15e4, magicDefense: 15e4, blockRate: 0.7, mentalDemonResistance: 0.3 }
  },
  {
    id: "Thien_Dao_Sat_Than",
    name: "Thiên Đạo Sát Thần",
    rarity: "Thần thoại",
    description: "Đánh bại phân thân của Thiên Tôn, kẻ nắm giữ Thiên Đạo.",
    bonuses: { attack: 1e4, critRate: 0.2, critDamage: 0.5, armorPen: 0.3, hp: 15e3 }
  }
];
const UPGRADE_MULTIPLIERS = [
  0.2,
  0.4,
  0.6,
  0.8,
  1.2,
  1.6,
  2,
  2.4,
  2.8,
  3.6,
  4.4,
  5.2,
  6.4,
  7.6,
  8.8,
  11.8,
  16.8,
  26.8,
  56.8,
  156.8
];
const UPGRADE_SUCCESS_RATES = [
  1,
  1,
  1,
  1,
  0.9,
  0.85,
  0.8,
  0.7,
  0.6,
  0.5,
  0.4,
  0.3,
  0.3,
  0.2,
  0.2,
  0.1,
  0.1,
  0.05,
  0.02,
  0.01
];
const UPGRADE_COSTS = [
  // level: the level you are upgrading TO
  { level: 1, linhThach: 100, materials: [{ itemId: "upgrade_stone_1", count: 1 }] },
  { level: 2, linhThach: 200, materials: [{ itemId: "upgrade_stone_1", count: 2 }] },
  { level: 3, linhThach: 400, materials: [{ itemId: "upgrade_stone_1", count: 3 }] },
  { level: 4, linhThach: 800, materials: [{ itemId: "upgrade_stone_1", count: 5 }] },
  { level: 5, linhThach: 1500, materials: [{ itemId: "upgrade_stone_2", count: 2 }] },
  { level: 6, linhThach: 2500, materials: [{ itemId: "upgrade_stone_2", count: 3 }] },
  { level: 7, linhThach: 4e3, materials: [{ itemId: "upgrade_stone_2", count: 4 }] },
  { level: 8, linhThach: 6e3, materials: [{ itemId: "upgrade_stone_2", count: 5 }] },
  { level: 9, linhThach: 8500, materials: [{ itemId: "upgrade_stone_2", count: 6 }] },
  { level: 10, linhThach: 12e3, materials: [{ itemId: "upgrade_stone_3", count: 3 }] },
  { level: 11, linhThach: 18e3, materials: [{ itemId: "upgrade_stone_3", count: 4 }] },
  { level: 12, linhThach: 25e3, materials: [{ itemId: "upgrade_stone_3", count: 5 }] },
  { level: 13, linhThach: 35e3, materials: [{ itemId: "upgrade_stone_3", count: 7 }] },
  { level: 14, linhThach: 5e4, materials: [{ itemId: "upgrade_stone_3", count: 9 }] },
  { level: 15, linhThach: 7e4, materials: [{ itemId: "upgrade_stone_3", count: 12 }] },
  { level: 16, linhThach: 1e5, materials: [{ itemId: "upgrade_stone_4", count: 5 }] },
  { level: 17, linhThach: 15e4, materials: [{ itemId: "upgrade_stone_4", count: 8 }] },
  { level: 18, linhThach: 25e4, materials: [{ itemId: "upgrade_stone_4", count: 12 }] },
  { level: 19, linhThach: 5e5, materials: [{ itemId: "upgrade_stone_4", count: 20 }] },
  { level: 20, linhThach: 1e6, materials: [{ itemId: "upgrade_stone_4", count: 30 }] }
];
const SUMMON_COST_SINGLE = 1e3;
const SUMMON_COST_TEN = 9e3;
const SUMMON_RATES = {
  "Thần Thoại": 0.005,
  "Truyền Kỳ": 0.095,
  "Hiếm": 0.3,
  "Quý": 0.6,
  "Phổ thông": 0,
  "Tối Thượng": 0
};
const CULTIVATION_METHODS_LIST = [
  {
    id: "cm_001",
    name: "Thanh Tâm Quyết",
    description: "Công pháp cơ bản, giúp tĩnh tâm, loại bỏ tạp niệm, tập trung vào việc hấp thụ linh khí. Tăng nhẹ tốc độ tu luyện.",
    realmRequirement: "Luyện Khí",
    bonuses: {
      cultivationSpeedBonus: 0.15
    }
  },
  {
    id: "cm_002",
    name: "Kim Cang Quyết",
    description: "Công pháp luyện thể, dùng linh khí để tôi luyện thân thể, khiến nó trở nên cứng rắn như kim cương. Tăng mạnh phòng ngự và sinh lực.",
    realmRequirement: "Trúc Cơ",
    bonuses: {
      hp: 100,
      defense: 50,
      cultivationSpeedBonus: 0.05
    }
  },
  {
    id: "cm_003",
    name: "Liệt Hỏa Kinh",
    description: "Công pháp bá đạo, chuyển hóa linh khí thành chân hỏa, thiêu đốt kinh mạch để tăng cường sức mạnh bộc phát. Tăng mạnh công kích.",
    realmRequirement: "Kim Đan",
    bonuses: {
      attack: 50,
      magicAttack: 50,
      critRate: 0.05,
      cultivationSpeedBonus: 0.05
    }
  },
  {
    id: "cm_004",
    name: "Trường Xuân Công",
    description: "Công pháp ôn hòa, dùng linh khí để nuôi dưỡng sinh cơ, giúp kéo dài tuổi thọ và tăng cường toàn diện. Các thuộc tính được tăng trưởng cân bằng.",
    realmRequirement: "Nguyên Anh",
    bonuses: {
      hp: 50,
      mp: 50,
      attack: 20,
      defense: 20,
      magicAttack: 20,
      magicDefense: 20,
      cultivationSpeedBonus: 0.1
    }
  },
  {
    id: "cm_005",
    name: "Vạn Pháp Quy Nhất",
    description: "Công pháp cao thâm, dung hợp vạn pháp, giúp tu sĩ tăng trưởng toàn diện các thuộc tính chiến đấu và phòng ngự.",
    realmRequirement: "Hóa Thần",
    bonuses: {
      hp: 150,
      mp: 100,
      attack: 70,
      defense: 70,
      magicAttack: 70,
      magicDefense: 70,
      evasion: 0.05,
      accuracy: 0.05
    }
  },
  {
    id: "cm_006",
    name: "Thái Thượng Vong Tình Lục",
    description: "Ghi chép về cảnh giới vô tình của đại đạo, người tu luyện sẽ gạt bỏ thất tình lục dục, tốc độ hấp thụ linh khí tăng đến mức khó tin.",
    realmRequirement: "Luyện Hư",
    bonuses: {
      cultivationSpeedBonus: 0.5,
      mentalDemonResistance: 0.15
    }
  },
  {
    id: "cm_007",
    name: "Sát Lục Ma Điển",
    description: "Ma điển thượng cổ, càng chiến đấu càng mạnh, lấy sát khí để tôi luyện bản thân, sức tấn công vô cùng bá đạo.",
    realmRequirement: "Hợp Thể",
    bonuses: {
      attack: 200,
      magicAttack: 200,
      critRate: 0.15,
      critDamage: 0.5,
      armorPen: 0.2
    }
  },
  {
    id: "cm_008",
    name: "Bất Diệt Thánh Thể",
    description: "Công pháp luyện thể chí cao, tôi luyện thân thể thành thánh thể bất diệt, vạn kiếp khó tổn, là nền tảng để vượt qua thiên kiếp.",
    realmRequirement: "Độ Kiếp",
    bonuses: {
      hp: 1e3,
      defense: 300,
      magicDefense: 300,
      blockRate: 0.1
    }
  }
];
const STORY_ITEMS = [
  { id: "item_story_001", name: "Kiếm Gãy Gia Tộc", type: "Nhiệm vụ", rarity: "Truyền Kỳ", icon: "💔", description: "Một thanh kiếm gãy, trên thân khắc một ký hiệu huyết mạch cổ xưa. Dù đã hỏng nhưng vẫn tỏa ra một luồng khí bất phàm.", story: "Đây là di vật duy nhất cha để lại cho bạn.", value: 0 },
  { id: "item_story_002", name: "Huyết Tinh Thú", type: "Nhiệm vụ", rarity: "Hiếm", icon: "🩸", description: "Tinh hoa huyết khí của yêu thú, dùng để làm chất dẫn cho các nghi lễ và rèn đúc đặc biệt.", value: 0 },
  { id: "item_story_003", name: "Bình Linh Khí", type: "Tiêu hao", rarity: "Quý", icon: "🏺", description: "Một chiếc bình nhỏ chứa đựng linh khí tinh thuần, có thể hấp thụ trực tiếp.", expGain: 500, effect: "Tăng 500 Linh Lực", value: 200 },
  { id: "item_story_004", name: "Kiếm Dựng Hồn", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "✨", stats: { attack: 5e3, critRate: 10, speed: 1e3 }, description: "Thanh kiếm gia truyền sau khi được rèn lại. Linh hồn của thanh kiếm dường như đã thức tỉnh, có thể cộng hưởng với huyết mạch của chủ nhân.", story: "Sức mạnh thực sự của nó vẫn chưa được khai mở hoàn toàn.", value: 1e3 },
  { id: "item_story_005", name: "Vé Thông Hành", type: "Nhiệm vụ", rarity: "Quý", icon: "🎟️", description: "Giấy thông hành để tham gia kỳ thi nhập môn của Tông môn Thanh Vân.", value: 0 },
  { id: "item_story_006", name: "Khí Vận Tông Môn", type: "Nhiệm vụ", rarity: "Hiếm", icon: "🏵️", description: "Một vật phẩm tượng trưng, cho thấy bạn là một phần của tông môn và được khí vận của tông môn che chở.", value: 0 },
  { id: "item_story_007", name: "Bình Tẩy Ma", type: "Nhiệm vụ", rarity: "Hiếm", icon: "⚱️", description: "Chiếc bình có khả năng thanh tẩy ma khí, là vật phẩm quan trọng để đối phó với ma tu.", value: 0 },
  { id: "item_story_008", name: "Linh Huyết Bàn Cổ", type: "Nhiệm vụ", rarity: "Truyền Kỳ", icon: "💧", description: "Một giọt máu tinh túy được cho là của Bàn Cổ khai thiên lập địa, chứa đựng sức mạnh nguyên thủy.", value: 0 },
  { id: "item_story_009", name: "Lôi Tâm Giới Thể", type: "Tiêu hao", rarity: "Truyền Kỳ", icon: "⚡", description: "Dùng để tôi luyện cơ thể sau khi vượt qua Lôi Kiếp, giúp thích nghi với linh khí của Tiên Giới và tăng mạnh các thuộc tính.", effect: "Tăng vĩnh viễn tất cả các chỉ số tiềm năng.", value: 5e3 },
  { id: "item_story_010", name: "Thiên Mệnh Phù", type: "Pháp bảo", rarity: "Thần Thoại", slot: "pháp bảo", icon: "📜", stats: { attack: 5e4, defense: 5e4, hp: 1e5 }, description: "Lá bùa được cho là có thể thay đổi vận mệnh, chống lại sự sắp đặt của Thiên Đạo.", story: "Vận mệnh của ta, do ta không do trời.", value: 1e4 },
  { id: "item_story_011", name: "Ấn Gia Tộc Phục Sinh", type: "Nhiệm vụ", rarity: "Thần Thoại", icon: "⚜️", description: "Chiếc ấn tập hợp linh hồn của các vị tổ tiên, là chìa khóa để thực hiện nghi lễ phục sinh gia tộc.", value: 0 },
  { id: "item_story_012", name: "Thần Huyết Bất Diệt", type: "Tiêu hao", rarity: "Thần Thoại", icon: "💖", description: "Dòng máu thần thánh sau khi được hồi sinh hoàn toàn, mang lại sức mạnh bất diệt.", effect: "Tăng vĩnh viễn một lượng lớn tất cả các chỉ số.", value: 2e4 },
  { id: "item_story_013", name: "La Bàn Huyễn Cảnh", type: "Nhiệm vụ", rarity: "Thần Thoại", icon: "🧭", description: "Một chiếc la bàn cổ xưa có thể chỉ đường vào Huyễn Cảnh Luân Hồi, nơi cất giữ những bí mật của Thiên Đạo.", value: 0 }
];
const THEMATIC_ITEMS = [
  // --- Phổ Thông (Common) ---
  { id: "item_com_01", name: "Áo Vải Thanh Thủy", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 13 }, requirement: "Cấp 1", description: "Một chiếc áo vải đơn sơ nhưng chắc chắn, được các thợ may trong Thôn Thanh Thủy làm ra.", story: "Mỗi đường kim mũi chỉ đều chứa đựng hy vọng về một cuộc sống bình yên.", value: 10 },
  { id: "item_com_02", name: "Kiếm Sắt Luyện Tập", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 9 }, requirement: "Cấp 2", description: "Vũ khí tiêu chuẩn cho các tu sĩ mới nhập môn, dùng để rèn luyện thân thể.", story: 'Trên thân kiếm còn khắc chữ "Cần cù".', value: 12 },
  { id: "item_com_03", name: "Giáp Da Chuột Rừng", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 19 }, requirement: "Cấp 3", description: "Được làm từ da của những con chuột lớn sống trong rừng, có khả năng chống đỡ các vết cào nhỏ.", story: "Vẫn còn thoang thoảng mùi của rừng xanh.", value: 15 },
  { id: "item_com_04", name: "Đao Tuần Tra", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 13 }, requirement: "Cấp 4", description: "Vũ khí trang bị cho lính gác của Thành Vân Lâm.", story: "Một vũ khí đáng tin cậy cho những đêm dài canh gác.", value: 18 },
  { id: "item_com_05", name: "Giáp Trúc Vân Lâm", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 25 }, requirement: "Cấp 5", description: "Loại giáp nhẹ làm từ những đốt trúc cứng cáp trong rừng trúc phía nam thành.", story: "Nhẹ nhàng và linh hoạt, được các lãng khách ưa chuộng.", value: 20 },
  { id: "item_com_06", name: "Thương Sắt Nhọn", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 17 }, requirement: "Cấp 6", description: "Một cây thương đơn giản nhưng hiệu quả, dễ dàng chế tạo.", story: "Đầu thương được mài sắc bén, có thể xuyên qua lớp da dày.", value: 22 },
  { id: "item_com_07", name: "Áo Choàng Bụi Bặm", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 31 }, requirement: "Cấp 7", description: "Chiếc áo choàng của một người lữ hành, đã bạc màu vì sương gió.", story: "Nó đã chứng kiến nhiều câu chuyện hơn bạn có thể tưởng tượng.", value: 25 },
  { id: "item_com_08", name: "Song Thủ Luyện Công", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 21 }, requirement: "Cấp 8", description: "Một cặp dao găm cơ bản để luyện tập song thủ.", story: "Sự cân bằng là chìa khóa để sử dụng chúng hiệu quả.", value: 28 },
  { id: "item_com_09", name: "Giáp Da Sói", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 37 }, requirement: "Cấp 9", description: "Được làm từ da của những con chó hoang hung dữ.", story: "Mang trên mình sức mạnh của loài dã thú.", value: 30 },
  { id: "item_com_10", name: "Trường Đao Mê Ảnh", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 25 }, requirement: "Cấp 10", description: "Vũ khí thường được tìm thấy trong Rừng Mê Ảnh, lưỡi đao phản chiếu ánh sáng kỳ lạ.", story: "Người ta nói rằng nó có thể chém vào cả những ảo ảnh.", value: 32 },
  { id: "item_com_11", name: "Giáp Mộc", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 43 }, requirement: "Cấp 11", description: "Giáp làm từ vỏ cây cổ thụ, cứng hơn tưởng tượng.", story: "Hấp thụ linh khí của đất trời, mang lại cảm giác vững chãi.", value: 35 },
  { id: "item_com_12", name: "Búa Chiến Sơ Cấp", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 29 }, requirement: "Cấp 12", description: "Một cây búa nặng, thích hợp cho những người có sức mạnh.", story: "Một cú vung có thể làm nứt cả đá tảng.", value: 38 },
  { id: "item_com_13", name: "Giáp Thép Non", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 49 }, requirement: "Cấp 13", description: "Một bộ giáp thép được rèn bởi các thợ rèn tập sự.", story: "Dù tay nghề còn non, nhưng nó vẫn đủ để bảo vệ.", value: 40 },
  { id: "item_com_14", name: "Cung Tên Thợ Săn", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 33 }, requirement: "Cấp 14", description: "Cây cung đáng tin cậy của những người sống bằng nghề săn bắn.", story: "Mỗi mũi tên đều mang theo hy vọng về một bữa ăn no.", value: 42 },
  { id: "item_com_15", name: "Giáp Vảy Nhện", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 55 }, requirement: "Cấp 15", description: "Được dệt từ tơ của Nhện Độc, nhẹ và bền.", story: "Có khả năng chống lại các loại độc tố nhẹ.", value: 45 },
  { id: "item_com_16", name: "Dao Găm Độc", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 37 }, requirement: "Cấp 16", description: "Lưỡi dao được tẩm nọc của Nhện Độc.", story: "Một vết xước nhỏ cũng đủ để gây ra phiền toái.", value: 48 },
  { id: "item_com_17", name: "Giáp Da Hổ", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 61 }, requirement: "Cấp 17", description: "Được làm từ da của Hổ Vằn Lửa Rừng, mang uy thế của chúa sơn lâm.", story: "Những vết sẹo trên tấm da kể về những trận chiến khốc liệt.", value: 50 },
  { id: "item_com_18", name: "Vuốt Hổ", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 41 }, requirement: "Cấp 18", description: "Một cặp vũ khí được chế tác từ móng vuốt của Hổ Vằn Lửa Rừng.", story: "Sắc bén và chết chóc, mô phỏng sự hung hãn của loài hổ.", value: 52 },
  { id: "item_com_19", name: "Giáp Hang Động", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 67 }, requirement: "Cấp 19", description: "Bộ giáp được tìm thấy trong các hang động tối tăm, phủ đầy rêu và bụi.", story: "Ai là chủ nhân trước đây của nó? Không ai biết.", value: 55 },
  { id: "item_com_20", name: "Côn Nhị Khúc", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 45 }, requirement: "Cấp 20", description: "Vũ khí linh hoạt, khó sử dụng nhưng uy lực.", story: "Vũ khí yêu thích của các tán tu thích sự tự do.", value: 58 },
  { id: "item_com_21", name: "Giáp Đá Tinh Thạch", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 73 }, requirement: "Cấp 21", description: "Được ghép từ những mảnh đá chứa linh khí yếu.", story: "Phát ra ánh sáng mờ ảo trong bóng tối.", value: 60 },
  { id: "item_com_22", name: "Giáo Luyện Khí", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 49 }, requirement: "Cấp 22", description: "Một cây giáo đơn giản, thường được dùng bởi các tu sĩ Luyện Khí Kỳ.", story: "Vũ khí phổ biến trong các cuộc giao tranh nhỏ.", value: 62 },
  { id: "item_com_23", name: "Giáp Tinh Anh", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 79 }, requirement: "Cấp 23", description: "Bộ giáp tiêu chuẩn của các đệ tử ưu tú trong tông môn.", story: "Là biểu tượng của sự nỗ lực và tài năng.", value: 65 },
  { id: "item_com_24", name: "Kiếm Đệ Tử", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 53 }, requirement: "Cấp 24", description: "Kiếm được tông môn cấp phát cho các đệ tử chính thức.", story: "Trên vỏ kiếm khắc tên của tông môn.", value: 68 },
  { id: "item_com_25", name: "Giáp Hộ Vệ", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 85 }, requirement: "Cấp 25", description: "Bộ giáp nặng, dành cho những người đứng ở tuyến đầu.", story: "Tấm lưng vững chãi là chỗ dựa cho đồng đội.", value: 70 },
  { id: "item_com_26", name: "Đại Đao Hộ Vệ", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 57 }, requirement: "Cấp 26", description: "Thanh đại đao nặng trịch, chỉ những người có sức mạnh phi thường mới có thể sử dụng.", story: "Một nhát chém có thể quét sạch mọi chướng ngại.", value: 72 },
  { id: "item_com_27", name: "Áo Choàng Tịch Dương", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 91 }, requirement: "Cấp 27", description: "Chiếc áo choàng được nhuộm màu của hoàng hôn trên Đỉnh Tịch Dương.", story: "Mang trong mình sự ấm áp của những tia nắng cuối cùng.", value: 75 },
  { id: "item_com_28", name: "Pháp Trượng Tịch Dương", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 61 }, requirement: "Cấp 28", description: "Cây trượng gỗ được hấp thụ linh khí trên Đỉnh Tịch Dương.", story: "Đầu trượng khảm một viên đá phát ra ánh sáng dịu nhẹ.", value: 78 },
  { id: "item_com_29", name: "Giáp Trúc Cơ Sơ Nhập", type: "Áo giáp", rarity: "Phổ thông", slot: "áo giáp", icon: "👕", stats: { defense: 97 }, requirement: "Cấp 29", description: "Bộ giáp đơn giản dành cho các tu sĩ vừa đột phá Trúc Cơ.", story: "Là bước khởi đầu trên con đường tu tiên thực sự.", value: 80 },
  { id: "item_com_30", name: "Kiếm Trúc Cơ", type: "Vũ khí", rarity: "Phổ thông", slot: "vũ khí", icon: "🗡️", stats: { attack: 65 }, requirement: "Cấp 30", description: "Thanh kiếm được gia trì một ít linh lực, sắc bén hơn kiếm phàm.", story: "Có thể chém đứt sắt thép một cách dễ dàng.", value: 82 },
  // --- Quý (Rare) -> Bây giờ là Quý (Uncommon) để phân biệt ---
  { id: "item_tv_01", name: "Thanh Vân Đệ Tử Lệnh", type: "Nhiệm vụ", rarity: "Quý", icon: "令牌", description: "Lệnh bài của đệ tử Thanh Vân Tông, cho phép tự do ra vào sơn môn.", value: 0 },
  { id: "item_rar_01", name: "Huyết Lang Nha Kiếm", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 23, critRate: 0.03 }, requirement: "Cấp 16", description: "Được rèn từ nanh của một con sói yêu, lưỡi kiếm ánh lên màu đỏ của máu.", story: "Nghe đồn nó vẫn còn giữ lại sự hung hãn của yêu thú.", value: 150 },
  { id: "item_rar_02", name: "Hộ Phù Bình An", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 70 }, requirement: "Cấp 17", description: "Lá bùa được các đạo sĩ cao tay khai quang, mang lại sự bình an.", story: "Chứa đựng một chút linh lực bảo vệ, có thể giúp chủ nhân tránh được tai ương nhỏ.", value: 160 },
  { id: "item_rar_03", name: "Lân Giáp Đao", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 29, critRate: 0.03 }, requirement: "Cấp 18", description: "Thân đao được khảm vảy của một loài cá yêu, vừa đẹp vừa chắc chắn.", story: "Khi vung lên, nó tạo ra âm thanh như sóng vỗ.", value: 170 },
  { id: "item_rar_04", name: "Trâm Gỗ Linh Tê", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 90 }, requirement: "Cấp 19", description: "Được làm từ gỗ của cây Linh Tê, giúp tĩnh tâm an thần.", story: "Đeo nó bên người có thể giúp chống lại tâm ma xâm nhập.", value: 180 },
  { id: "item_rar_05", name: "Kiếm Thanh Phong", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 35, critRate: 0.03 }, requirement: "Cấp 20", description: "Một thanh kiếm nhẹ và nhanh, khi múa lên tựa như gió thoảng.", story: "Lựa chọn của những tu sĩ theo đuổi tốc độ.", value: 190 },
  { id: "item_rar_06", name: "Ngọc Bội Tụ Linh", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 110 }, requirement: "Cấp 21", description: "Miếng ngọc bội có khả năng thu hút linh khí xung quanh.", story: "Giúp người đeo cảm thấy tinh thần sảng khoái, tu luyện nhanh hơn một chút.", value: 200 },
  { id: "item_rar_07", name: "Chiến Chuỳ Thiết Đầu", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 41, critRate: 0.03 }, requirement: "Cấp 22", description: "Cây chuỳ sắt nặng, có sức công phá đáng kể.", story: "Được các thể tu ưa dùng để rèn luyện cơ bắp.", value: 210 },
  { id: "item_rar_08", name: "Túi Thơm An Thần", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 130 }, requirement: "Cấp 23", description: "Bên trong chứa các loại linh thảo giúp an thần, tĩnh tâm.", story: "Mùi hương của nó có thể xua đuổi các loài yêu thú cấp thấp.", value: 220 },
  { id: "item_rar_09", name: "Cung Linh Mộc", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 47, critRate: 0.03 }, requirement: "Cấp 24", description: "Được làm từ cành của cây linh mộc, có tính đàn hồi tốt.", story: "Mũi tên bắn ra được gia trì bởi linh khí của mộc.", value: 230 },
  { id: "item_rar_10", name: "Gương Hộ Tâm", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 150 }, requirement: "Cấp 25", description: "Một chiếc gương đồng nhỏ, có thể phản lại các đòn tấn công tinh thần.", story: "Người ta nói rằng nó có thể chiếu rọi cả những ý nghĩ xấu xa.", value: 240 },
  { id: "item_rar_11", name: "Pháp Trượng Tinh Thạch", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 53, critRate: 0.03 }, requirement: "Cấp 26", description: "Đầu trượng khảm một viên tinh thạch, giúp khuếch đại pháp thuật.", story: "Là công cụ không thể thiếu của các pháp tu.", value: 250 },
  { id: "item_rar_12", name: "Chuỗi Hạt Định Tâm", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 170 }, requirement: "Cấp 27", description: "Chuỗi hạt làm từ gỗ đàn hương, giúp người đeo tập trung khi tu luyện.", story: "Mỗi hạt đều được khắc một câu chú nhỏ.", value: 260 },
  { id: "item_rar_13", name: "Bão Kiếm", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 59, critRate: 0.03 }, requirement: "Cấp 28", description: "Thanh kiếm rộng bản, khi vung lên tạo ra tiếng gió rít.", story: "Sức mạnh của nó như một cơn bão nhỏ.", value: 270 },
  { id: "item_rar_14", name: "Ấn Trấn Hồn", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 190 }, requirement: "Cấp 29", description: "Một chiếc ấn nhỏ, có khả năng trấn áp các loại tà ma, yêu quỷ.", story: "Thường được các đạo sĩ dùng trong các chuyến đi hàng yêu diệt ma.", value: 280 },
  { id: "item_rar_15", name: "Lôi Tinh Song Đao", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 65, critRate: 0.03 }, requirement: "Cấp 30", description: "Cặp đao được rèn trong đêm mưa bão, hấp thụ một tia sét.", story: "Khi chém vào nhau, chúng phát ra tia lửa điện nhỏ.", value: 290 },
  { id: "item_rar_16", name: "Kim Cang Bội", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 210 }, requirement: "Cấp 31", description: "Miếng ngọc bội khắc hình thần Kim Cang, tăng cường sự cứng cáp.", story: "Mang lại cho người đeo một ý chí sắt đá, không dễ bị khuất phục.", value: 300 },
  { id: "item_rar_17", name: "Băng Tinh Kiếm", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 71, critRate: 0.03 }, requirement: "Cấp 32", description: "Thanh kiếm được làm từ băng vĩnh cửu, tỏa ra hàn khí.", story: "Có thể làm chậm kẻ địch khi gây ra vết thương.", value: 310 },
  { id: "item_rar_18", name: "Hỏa Vân Châu", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 230 }, requirement: "Cấp 33", description: "Viên ngọc chứa đựng linh lực của hỏa, ấm áp khi chạm vào.", story: "Trong đêm tối, nó tỏa ra ánh sáng như một đám mây lửa nhỏ.", value: 320 },
  { id: "item_rar_19", name: "Âm Phong Đao", type: "Vũ khí", rarity: "Quý", slot: "vũ khí", icon: "🗡️", stats: { attack: 77, critRate: 0.03 }, requirement: "Cấp 34", description: "Lưỡi đao mỏng như cánh ve, được rèn trong nơi âm khí nặng nề.", story: "Tiếng vung đao như tiếng gió rít qua khe cửa địa ngục.", value: 330 },
  { id: "item_rar_20", name: "Linh Quy Giáp", type: "Pháp bảo", rarity: "Quý", slot: "pháp bảo", icon: "💍", stats: { hp: 250 }, requirement: "Cấp 35", description: "Một chiếc mai rùa nhỏ, được khắc đầy phù văn phòng ngự.", story: "Là bùa hộ mệnh của những người hay đi xa.", value: 340 },
  // --- Hiếm (Epic) -> bây giờ là Hiếm (Rare) ---
  { id: "item_epi_01", name: "Giáp Trảm Phong", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 900, evasion: 1 }, requirement: "Luyện Khí Tầng 1", description: "Bộ giáp được thiết kế để giảm tối đa sức cản của gió, tăng sự linh hoạt.", story: "Mặc nó vào, cảm giác như có thể cưỡi gió mà đi.", value: 400, effect: "Khiến di chuyển nhẹ nhàng hơn, tăng nhẹ tốc độ ngoài chiến đấu." },
  { id: "item_epi_02", name: "Hắc Thạch Hộ Thuẫn", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 1480, magicDefense: 400 }, requirement: "Luyện Khí Tầng 2", description: "Một tấm khiên nhỏ làm từ Hắc Thạch, cực kỳ cứng rắn.", story: "Nó đã từng chặn một đòn toàn lực của một yêu thú Trúc Cơ Kỳ.", value: 420, effect: "Có tỉ lệ nhỏ chặn hoàn toàn một đòn tấn công vật lý yếu." },
  { id: "item_epi_03", name: "Lam Diệp Sam", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 1100, evasion: 1 }, requirement: "Luyện Khí Tầng 3", description: "Chiếc áo được dệt từ tơ của một loài linh tằm, có màu xanh như lá biếc.", story: "Mặc vào cảm thấy mát mẻ, tinh thần tỉnh táo.", value: 440, effect: "Giúp tinh thần minh mẫn, giảm nhẹ khả năng bị ảnh hưởng bởi hiệu ứng xấu." },
  { id: "item_epi_04", name: "Vòng Kim Cô", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 1760, magicDefense: 500 }, requirement: "Luyện Khí Tầng 4", description: "Một chiếc vòng vàng, khi được truyền linh lực sẽ trở nên vô cùng cứng rắn.", story: "Không phải là cái vòng trên đầu của Tề Thiên Đại Thánh đâu.", value: 460 },
  { id: "item_epi_05", name: "Bách Hoa Y", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 1300, evasion: 1 }, requirement: "Luyện Khí Tầng 5", description: "Chiếc áo được thêu hình trăm loài hoa, tỏa ra hương thơm dịu nhẹ.", story: "Là tác phẩm của một tiên tử yêu hoa cỏ.", value: 480 },
  { id: "item_epi_06", name: "Chuông Lạc Hồn", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 2040, magicDefense: 600 }, requirement: "Luyện Khí Tầng 6", description: "Tiếng chuông có thể làm nhiễu loạn thần trí của đối phương.", story: "Hãy cẩn thận, chính bạn cũng có thể bị ảnh hưởng nếu không tập trung.", value: 500, effect: "Tiếng chuông có tỉ lệ nhỏ làm đối phương hoang mang, giảm chính xác trong 1 lượt." },
  { id: "item_epi_07", name: "Huyết Sắc Chiến Giáp", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 1500, evasion: 1 }, requirement: "Luyện Khí Tầng 7", description: "Bộ giáp được nhuộm màu đỏ của máu, mang sát khí nồng đậm.", story: "Càng chiến đấu, bộ giáp càng trở nên sáng rực.", value: 520 },
  { id: "item_epi_08", name: "Phiên Thiên Ấn", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 2320, magicDefense: 700 }, requirement: "Luyện Khí Tầng 8", description: "Một chiếc ấn có thể phóng to, đập xuống với sức mạnh ngàn cân.", story: "Là một pháp bảo mô phỏng theo một món cổ vật thần thoại.", value: 540 },
  { id: "item_epi_09", name: "Minh Quang Giáp", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 1700, evasion: 1 }, requirement: "Luyện Khí Tầng 9", description: "Bộ giáp được đánh bóng loáng, có thể phản chiếu ánh sáng gây chói mắt kẻ địch.", story: "Vừa là phòng ngự, vừa là một công cụ chiến thuật.", value: 560, effect: "Khi bị tấn công, có tỉ lệ phản chiếu ánh sáng, làm giảm chính xác của kẻ địch." },
  { id: "item_epi_10", name: "Hồ Lô Hút Linh", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 2600, magicDefense: 800 }, requirement: "Luyện Khí Tầng 10", description: "Một quả hồ lô nhỏ, có thể hút linh khí từ kẻ địch.", story: "Bên trong là một không gian nhỏ, dùng để chứa đựng linh khí.", value: 580 },
  { id: "item_epi_11", name: "Giáp Gai Phản Thương", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 1900, evasion: 1 }, requirement: "Luyện Khí Tầng 11", description: "Bề mặt bộ giáp đầy những chiếc gai nhọn, làm bị thương kẻ tấn công.", story: "Cách phòng ngự tốt nhất là tấn công.", value: 600 },
  { id: "item_epi_12", name: "Cờ Lệnh Ngũ Hành", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 2880, magicDefense: 900 }, requirement: "Luyện Khí Tầng 12", description: "Lá cờ nhỏ thêu hình Ngũ hành, có thể tăng cường pháp thuật tương ứng.", story: "Là vật bất ly thân của các trận pháp sư.", value: 620 },
  { id: "item_epi_13", name: "Ngân Long Giáp", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 2100, evasion: 1 }, requirement: "Luyện Khí Tầng 13", description: "Bộ giáp được chế tác phỏng theo vảy của rồng bạc.", story: "Mang lại cho người mặc sự uy nghiêm của loài rồng.", value: 640 },
  { id: "item_epi_14", name: "Đèn Dẫn Hồn", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 3160, magicDefense: 1e3 }, requirement: "Luyện Khí Tầng 14", description: "Chiếc đèn lồng có thể soi rọi đường đi trong cõi âm.", story: "Cũng có thể dùng để triệu hồi các oan hồn yếu ớt để chiến đấu.", value: 660 },
  { id: "item_epi_15", name: "Giáp Trọng Lực", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 2300, evasion: 1 }, requirement: "Luyện Khí Tầng 15", description: "Bộ giáp được khắc trọng lực trận, cực kỳ nặng.", story: "Mặc nó để tu luyện có thể làm ít công to.", value: 680 },
  { id: "item_epi_16", name: "La Bàn Tầm Bảo", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 3440, magicDefense: 1100 }, requirement: "Luyện Khí Tầng 16", description: "Chiếc la bàn có thể chỉ đến nơi có bảo vật hoặc linh khí mạnh.", story: "Đôi khi nó cũng chỉ đến những nơi cực kỳ nguy hiểm.", value: 700 },
  { id: "item_epi_17", name: "Linh Vũ Giáp", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 2500, evasion: 1 }, requirement: "Luyện Khí Tầng 17", description: "Bộ giáp được làm từ lông vũ của một loài linh điểu.", story: "Giúp người mặc di chuyển nhẹ nhàng và nhanh nhẹn hơn.", value: 720 },
  { id: "item_epi_18", name: "Sơn Hà Xã Tắc Đồ", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 3720, magicDefense: 1200 }, requirement: "Luyện Khí Tầng 18", description: "Một bức tranh cuộn, có thể nhốt kẻ địch vào trong đó.", story: "Bên trong là một thế giới nhỏ có núi sông, cây cỏ.", value: 740 },
  { id: "item_epi_19", name: "Vô Ảnh Giáp", type: "Áo giáp", rarity: "Hiếm", slot: "áo giáp", icon: "👕", stats: { attack: 2700, evasion: 1 }, requirement: "Luyện Khí Tầng 19", description: "Bộ giáp có thể tàng hình trong một thời gian ngắn.", story: "Công cụ hoàn hảo cho việc ám sát và do thám.", value: 760 },
  { id: "item_epi_20", name: "Tháp Trấn Yêu", type: "Pháp bảo", rarity: "Hiếm", slot: "pháp bảo", icon: "🛡️", stats: { defense: 4e3, magicDefense: 1300 }, requirement: "Luyện Khí Tầng 20", description: "Một tòa tháp nhỏ, có khả năng trấn áp và làm suy yếu yêu khí.", story: "Là khắc tinh của nhiều loại yêu thú.", value: 780 },
  // --- Truyền Kỳ (Legendary) ---
  { id: "item_leg_01", name: "Lưu Quang Chiến Giáp", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 11e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 1", description: "Bộ giáp phát ra ánh sáng bảy màu, được rèn từ một loại khoáng thạch hiếm thấy.", story: "Truyền thuyết kể rằng nó được rèn dưới ánh trăng trong 49 ngày.", value: 1500, effect: "Ánh sáng của chiến giáp gây nhiễu loạn, tăng nhẹ khả năng né tránh các đòn tấn công pháp thuật." },
  { id: "item_leg_02", name: "Phi Sương Kiếm", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🗡️", stats: { defense: 14400, magicDefense: 5e3 }, requirement: "Trúc Cơ Tầng 2", description: "Thân kiếm lạnh như băng, khi vung lên tạo ra một lớp sương mỏng.", story: "Là thanh kiếm của một vị kiếm tiên đã ẩn thế từ lâu.", value: 1550, effect: "Đòn đánh mang theo hàn khí, có tỉ lệ làm chậm tốc độ của đối phương." },
  { id: "item_leg_03", name: "Bất Động Minh Vương Giáp", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 13e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 3", description: "Bộ giáp nặng, mang lại khả năng phòng ngự gần như tuyệt đối.", story: "Khi mặc vào, người ta có cảm giác vững chãi như một ngọn núi.", value: 1600 },
  { id: "item_leg_04", name: "Truy Hồn Thương", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🗡️", stats: { defense: 16800, magicDefense: 6e3 }, requirement: "Trúc Cơ Tầng 4", description: "Mũi thương có khả năng khóa chặt linh hồn của đối phương.", story: "Một khi đã bị nó nhắm đến, không ai có thể thoát khỏi.", value: 1650, effect: "Các đòn tấn công bỏ qua một phần khả năng né tránh của mục tiêu." },
  { id: "item_leg_05", name: "Thiên Cơ Bào", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 15e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 5", description: "Chiếc áo bào có thể suy diễn thiên cơ, giúp người mặc né tránh nguy hiểm.", story: "Trên áo thêu đầy những biểu tượng kỳ lạ, dường như là một loại trận đồ.", value: 1700, effect: "Tăng nhẹ tỉ lệ né tránh các đòn tấn công chí mạng." },
  { id: "item_leg_06", name: "Thất Tinh Kiếm", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🗡️", stats: { defense: 19200, magicDefense: 7e3 }, requirement: "Trúc Cơ Tầng 6", description: "Thanh kiếm được rèn từ bảy loại thiên thạch, tương ứng với bảy ngôi sao Bắc Đẩu.", story: "Khi có ánh sao, sức mạnh của nó sẽ được tăng lên bội phần.", value: 1750 },
  { id: "item_leg_07", name: "Cửu U Ma Giáp", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 17e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 7", description: "Bộ giáp được rèn từ sắt dưới Cửu U, mang ma khí nặng nề.", story: "Nó có thể hấp thụ oán khí để tự sửa chữa.", value: 1800 },
  { id: "item_leg_08", name: "Diệt Thần Cung", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🗡️", stats: { defense: 21600, magicDefense: 8e3 }, requirement: "Trúc Cơ Tầng 8", description: "Cây cung huyền thoại, nghe đồn có thể bắn hạ cả thần tiên.", story: "Cần có sức mạnh to lớn mới có thể kéo được dây cung của nó.", value: 1850 },
  { id: "item_leg_09", name: "Vạn Tượng Bào", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 19e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 9", description: "Chiếc áo bào có thể biến ảo thành mọi hình dạng, giúp ngụy trang hoàn hảo.", story: "Là bảo vật của một tông môn chuyên về ám sát đã bị diệt vong.", value: 1900 },
  { id: "item_leg_10", name: "Tu La Đao", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🗡️", stats: { defense: 24e3, magicDefense: 9e3 }, requirement: "Trúc Cơ Tầng 10", description: "Thanh đao mang sát khí của chiến trường Tu La.", story: "Càng chém giết nhiều, nó càng trở nên mạnh mẽ.", value: 1950 },
  { id: "item_leg_11", name: "Thánh Linh Giáp", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 21e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 11", description: "Bộ giáp được ban phước bởi thánh quang, có khả năng thanh tẩy tà ma.", story: "Chỉ những người có trái tim thuần khiết mới có thể mặc nó.", value: 2e3 },
  { id: "item_leg_12", name: "Phá Thiên Kích", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🗡️", stats: { defense: 26400, magicDefense: 1e4 }, requirement: "Trúc Cơ Tầng 12", description: "Cây kích có sức mạnh có thể chọc thủng cả bầu trời.", story: "Vũ khí của một vị chiến thần cổ đại.", value: 2050 },
  { id: "item_leg_13", name: "Huyễn Ảnh Y", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 23e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 13", description: "Chiếc áo mỏng như sương, có thể tạo ra ảo ảnh để đánh lừa đối phương.", story: "Người mặc nó di chuyển như một bóng ma.", value: 2100 },
  { id: "item_leg_14", name: "Càn Khôn Quyển", type: "Pháp bảo", rarity: "Truyền Kỳ", slot: "pháp bảo", icon: "📜", stats: { hp: 5e4, mp: 2e4 }, requirement: "Trúc Cơ Tầng 14", description: "Một bức tranh cuộn chứa đựng sức mạnh của càn khôn, có thể công thủ toàn diện.", story: "Bên trong là cả một thế giới nhỏ.", value: 2150, effect: "Giảm 5% tiêu hao MP cho tất cả kỹ năng." },
  { id: "item_leg_15", name: "Phần Thiên Giáp", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 25e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 15", description: "Bộ giáp được rèn trong lửa địa tâm, nóng rực như muốn thiêu đốt cả bầu trời.", story: "Chỉ những người có linh căn hỏa mạnh mẽ mới có thể chịu được sức nóng của nó.", value: 2200 },
  { id: "item_leg_16", name: "Bích Lạc Hoàng Tuyền Kiếm", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🗡️", stats: { defense: 28800, magicDefense: 11e3 }, requirement: "Trúc Cơ Tầng 16", description: "Thanh kiếm mang ý cảnh của trời xanh và suối vàng, một kiếm có thể quyết định sinh tử.", story: "Nắm giữ nó là nắm giữ ranh giới giữa sự sống và cái chết.", value: 2250 },
  { id: "item_leg_17", name: "Tử Kim Bào", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 27e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 17", description: "Chiếc áo bào màu tím vàng, biểu tượng của sự cao quý và quyền lực.", story: "Chỉ có các vị tông chủ hoặc trưởng lão mới có tư cách mặc.", value: 2300 },
  { id: "item_leg_18", name: "Long Hồn Ngọc", type: "Pháp bảo", rarity: "Truyền Kỳ", slot: "pháp bảo", icon: "🐉", stats: { hp: 6e4, attack: 5e3 }, requirement: "Trúc Cơ Tầng 18", description: "Viên ngọc chứa đựng một tia linh hồn của rồng thật, mang lại sức mạnh và sự uy nghiêm.", story: "Thỉnh thoảng có thể nghe thấy tiếng rồng gầm từ bên trong.", value: 2350 },
  { id: "item_leg_19", name: "Thái Hư Giáp", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "👕", stats: { attack: 29e3, critRate: 10 }, requirement: "Trúc Cơ Tầng 19", description: "Bộ giáp được làm từ vật liệu của không gian hư vô, có thể làm chệch hướng các đòn tấn công.", story: "Nó không tồn tại hoàn toàn trong thế giới này.", value: 2400 },
  { id: "item_leg_20", name: "Hỗn Độn Chung", type: "Pháp bảo", rarity: "Truyền Kỳ", slot: "pháp bảo", icon: "🔔", stats: { defense: 3e4, magicDefense: 12e3 }, requirement: "Trúc Cơ Tầng 20", description: "Một chiếc chuông nhỏ có thể tạo ra sóng âm hỗn loạn, trấn áp vạn vật.", story: "Là một trong những pháp bảo phòng ngự mạnh nhất thời cổ đại.", value: 2450 },
  { id: "item_leg_21", name: "Ma Long Phệ Hồn Giáp", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "🐲", stats: { defense: 15e5, magicDefense: 12e5, hp: 2e6 }, requirement: "Kim Đan Kỳ", description: "Bộ giáp được rèn từ vảy ngược của một con Ma Long cổ đại. Nó có khả năng hấp thụ một phần linh hồn của kẻ địch bị đánh bại để tự hồi phục.", story: "Tiếng gầm của Ma Long vẫn còn văng vẳng bên tai người mặc nó.", value: 25e3 },
  { id: "item_leg_22", name: "Chu Tước Diệm Vũ Phiến", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🪭", stats: { magicAttack: 2e6, critRate: 15, critDamage: 50 }, requirement: "Kim Đan Kỳ", description: "Chiếc quạt làm từ lông vũ của Chu Tước thần điểu. Mỗi cú vẫy quạt tạo ra một biển lửa thiêu đốt vạn vật, đặc biệt hiệu quả với kẻ địch hệ Mộc.", story: "Ngọn lửa của Chu Tước có thể thiêu đốt cả linh hồn.", value: 26e3, effect: "Các đòn tấn công có hiệu ứng thiêu đốt, gây thêm sát thương hệ Hỏa mỗi lượt." },
  { id: "item_leg_23", name: "Vô Cực Tinh Thần Bào", type: "Áo giáp", rarity: "Truyền Kỳ", slot: "áo giáp", icon: "✨", stats: { mp: 15e5, evasion: 15, speed: 1e6 }, requirement: "Kim Đan Kỳ", description: "Áo bào được dệt từ ánh sao của Cửu Thiên Ngân Hà. Người mặc nó có thể di chuyển như sao đổi ngôi, né tránh các đòn tấn công một cách thần kỳ.", story: "Người ta nói rằng nó chứa đựng sức mạnh của cả một bầu trời sao.", value: 25500, effect: "Tăng 2% tốc độ di chuyển ngoài chiến đấu." },
  { id: "item_leg_24", name: "Phá Giới Hư Không Đao", type: "Vũ khí", rarity: "Truyền Kỳ", slot: "vũ khí", icon: "🌀", stats: { attack: 25e5, armorPen: 50 }, requirement: "Kim Đan Kỳ", description: "Thanh đao được rèn từ mảnh vỡ của không gian. Lưỡi đao của nó sắc bén đến mức có thể cắt xuyên qua cả pháp tắc phòng ngự, bỏ qua một phần lớn giáp của kẻ địch.", story: "Mỗi nhát chém đều để lại một vết nứt không gian nhỏ.", value: 27e3 }
];
const MYTHIC_ITEMS = [
  { id: "item_myt_01", name: "Hỗn Độn Giáp", type: "Áo giáp", rarity: "Thần Thoại", slot: "áo giáp", icon: "🌌", stats: { defense: 25e4, magicDefense: 25e4, hp: 5e5 }, requirement: "Kim Đan Kỳ", description: "Bộ giáp được sinh ra từ khí hỗn độn sơ khai, vạn pháp bất xâm.", story: "Mặc nó vào, bạn có thể cảm nhận được sự vận hành của đại đạo.", value: 1e4, effect: "Hấp thụ một phần nhỏ sát thương nhận vào và chuyển hóa thành MP." },
  { id: "item_myt_02", name: "Khai Thiên Phủ", type: "Vũ khí", rarity: "Thần Thoại", slot: "vũ khí", icon: "🪓", stats: { attack: 25e4, armorPen: 150, critDamage: 250 }, requirement: "Kim Đan Kỳ", description: "Chiếc rìu mô phỏng theo thần khí của Bàn Cổ, một búa có thể khai thiên lập địa.", story: "Sức mạnh của nó đủ để phá vỡ các quy tắc của thế giới.", value: 1e4, effect: "Đòn tấn công có tỉ lệ nhỏ gây hiệu ứng 'Phá Giáp', giảm mạnh phòng ngự của mục tiêu trong 2 lượt." },
  { id: "item_myt_03", name: "Tạo Hóa Ngọc Điệp", type: "Pháp bảo", rarity: "Thần Thoại", slot: "pháp bảo", icon: "📖", stats: { hp: 25e4, mp: 25e4, attack: 5e4, defense: 5e4 }, requirement: "Kim Đan Kỳ", description: "Ghi lại 3000 đại đạo, người sở hữu nó có thể thông hiểu vạn pháp, tu vi tăng nhanh.", story: "Bí mật của cả vũ trụ dường như nằm trong trang sách này.", value: 1e4, effect: "Tăng 10% lượng kinh nghiệm và linh lực nhận được từ mọi nguồn." },
  { id: "item_myt_04", name: "Tru Tiên Kiếm", type: "Vũ khí", rarity: "Thần Thoại", slot: "vũ khí", icon: "🗡️", stats: { attack: 3e5, critRate: 75, speed: 25e3 }, requirement: "Nguyên Anh Kỳ", description: "Thanh kiếm đứng đầu trong Tru Tiên Tứ Kiếm, sát khí ngút trời, chuyên tru diệt tiên nhân.", story: "Dưới Tru Tiên Kiếm, vạn tiên đều là tro bụi.", value: 2e4, effect: "Gây thêm 20% sát thương lên các mục tiêu có cảnh giới tu vi cao hơn người sử dụng." }
];
const ULTIMATE_ITEMS = [
  {
    id: "item_ult_001",
    name: "Lôi Diệt Thiên Quân Kiếm",
    type: "Vũ khí",
    rarity: "Tối Thượng",
    slot: "vũ khí",
    icon: "https://i.postimg.cc/VsxN6MXJ/t-i-xu-ng-2.jpg",
    stats: {
      attack: 45e5,
      defense: 12e5,
      speed: 3e5,
      critRate: 1,
      // 1 = 100%
      critDamage: 2001,
      // +200,000%
      mentalDemonResistance: 300
      // Miễn nhiễm
    },
    requirement: "Tiên Đế",
    description: "Thanh kiếm không còn thuộc về thế giới phàm tục — khi giáng xuống, cả giới tu chân run rẩy. Thần lôi ngưng tụ qua hàng vạn kiếp, mỗi lần nó được rút ra, thiên đạo phải đổi lại một tia sinh khí để cân bằng.",
    story: "“Một nhát chém – vạn giới tịch diệt.” Kỹ năng đặc biệt: Lôi Thần Trảm, Thiên Diệt Lôi Vực, Vĩnh Diệt Lôi Tâm.",
    value: 999999
  }
];
const CONSUMABLE_ITEMS = [
  { id: "item_001", name: "Hồi Lực Đan", type: "Tiêu hao", rarity: "Phổ thông", icon: "💊", effect: "Hồi 50 HP", restores: { hp: 50 }, description: "Đan dược cấp thấp giúp hồi phục một ít sinh lực.", value: 10 },
  { id: "item_002", name: "Hồi Khí Tán", type: "Tiêu hao", rarity: "Phổ thông", icon: "🌿", effect: "Hồi 30 MP", restores: { mp: 30 }, description: "Tán dược giúp hồi phục một ít linh lực.", value: 10 },
  { id: "item_006", name: "Luyện Khí Tán", type: "Tiêu hao", rarity: "Quý", icon: "🌿", effect: "Tăng 200 Linh Lực", expGain: 200, description: "Tán dược giúp tu sĩ Luyện Khí Kỳ tăng tu vi.", value: 50 },
  { id: "item_019", name: "Trúc Cơ Đan", type: "Tiêu hao", rarity: "Hiếm", icon: "💊", effect: "Tăng 1000 Linh Lực", expGain: 1e3, description: "Đan dược cần thiết để Trúc Cơ kỳ tu sĩ củng cố tu vi.", value: 200 }
];
const ALCHEMY_MATERIALS = [
  { id: "mat_dan_phe", name: "Đan Phế", type: "Nguyên liệu", rarity: "Phổ thông", icon: "⚫", description: "Sản phẩm thất bại của quá trình luyện đan. Không có tác dụng gì, nhưng có thể dùng để nghiên cứu công thức.", value: 1 },
  { id: "mat_linh_chi", name: "Linh Chi", type: "Nguyên liệu", rarity: "Phổ thông", icon: "🍄", description: "Một loại nấm linh thiêng, chứa đựng linh khí của đất trời, nguyên liệu chính cho Đan Tụ Linh.", value: 20 },
  { id: "mat_ngoc_dich", name: "Ngọc Dịch", type: "Nguyên liệu", rarity: "Phổ thông", icon: "💧", description: "Tinh túy của sương sớm, dùng làm dung môi trong luyện đan.", value: 15 },
  { id: "mat_huyet_thao", name: "Huyết Thảo", type: "Nguyên liệu", rarity: "Phổ thông", icon: "🌿", description: "Loại cỏ có màu đỏ như máu, có tác dụng bổ huyết, hồi phục sinh lực.", value: 25 },
  { id: "mat_linh_tuyen", name: "Linh Tuyền", type: "Nguyên liệu", rarity: "Quý", icon: "💧", description: "Nước suối từ nơi có linh mạch, trong sạch và chứa nhiều linh khí.", value: 40 },
  { id: "mat_kim_lien", name: "Kim Liên", type: "Nguyên liệu", rarity: "Quý", icon: "🌸", description: "Hoa sen vàng, có tác dụng cường hóa thân thể, tăng cường phòng ngự.", value: 80 },
  { id: "mat_xich_thao", name: "Xích Thảo", type: "Nguyên liệu", rarity: "Quý", icon: "🌿", description: "Loại cỏ có màu đỏ rực, giúp tăng cường khí huyết.", value: 70 },
  { id: "mat_tu_hoa_qua", name: "Tử Hỏa Quả", type: "Nguyên liệu", rarity: "Quý", icon: "🍓", description: "Loại quả mọc gần nơi có địa hỏa, chứa đựng năng lượng bùng nổ.", value: 100 },
  { id: "mat_thiet_diep", name: "Thiết Diệp", type: "Nguyên liệu", rarity: "Quý", icon: "🍃", description: "Lá cây cứng như sắt, dùng để trung hòa các loại dược liệu có tính hỏa mạnh.", value: 60 },
  { id: "mat_hoa_lien_tu", name: "Hỏa Liên Tử", type: "Nguyên liệu", rarity: "Hiếm", icon: "🔥", description: "Hạt của hoa sen lửa, chứa đựng hỏa độc tinh thuần.", value: 150 },
  { id: "mat_long_tam_co", name: "Long Tâm Cỏ", type: "Nguyên liệu", rarity: "Hiếm", icon: "🍀", description: "Loại cỏ mọc nơi có long khí, giúp tăng cường uy lực công pháp.", value: 160 },
  { id: "mat_thien_lo_dich", name: "Thiên Lộ Dịch", type: "Nguyên liệu", rarity: "Hiếm", icon: "💧", description: "Sương của trời, cực kỳ tinh khiết, dùng trong các loại đan dược cao cấp.", value: 200 }
];
const ALCHEMY_PILLS = [
  { id: "pill_tu_linh", name: "Đan Tụ Linh", type: "Đan Dược", rarity: "Phổ thông", icon: "💊", effect: "Tăng 10% tốc độ tu luyện trong 30 phút.", description: "Đan dược cơ bản giúp tu sĩ Luyện Khí Kỳ đẩy nhanh tốc độ hấp thụ linh khí.", value: 100, buffs: { statModifiers: { cultivationSpeedBonus: 0.1 }, duration: 1800, cancellable: true } },
  { id: "pill_tri_thuong", name: "Đan Trị Thương", type: "Đan Dược", rarity: "Phổ thông", icon: "💊", effect: "Phục hồi 25% HP tối đa.", restores: { hpPercent: 0.25 }, description: "Đan dược chữa thương phổ biến, nhanh chóng hồi phục một lượng lớn sinh lực.", value: 80 },
  { id: "pill_cuong_the", name: "Đan Cường Thể", type: "Đan Dược", rarity: "Quý", icon: "💊", effect: "Tăng 10% DEF và 5% HP tối đa trong 10 lượt chiến đấu.", description: "Tạm thời cường hóa thân thể, giúp chống chịu tốt hơn trong giao tranh.", value: 250, buffs: { statModifiers: { defense: 0.1, hp: 0.05 }, duration: 10, cancellable: true } },
  { id: "pill_bao_khi", name: "Đan Bạo Khí", type: "Đan Dược", rarity: "Quý", icon: "💊", effect: "Tăng 15% ATK trong 5 lượt chiến đấu.", description: "Kích phát tiềm năng, giúp tăng mạnh sức tấn công trong một thời gian ngắn.", value: 220, buffs: { statModifiers: { attack: 0.15 }, duration: 5, cancellable: true } },
  { id: "pill_tam_hoa", name: "Đan Tâm Hỏa", type: "Đan Dược", rarity: "Hiếm", icon: "💊", effect: "Tăng mạnh sát thương kỹ năng hệ Hỏa trong 10 lượt.", description: "Đan dược chuyên dụng cho các tu sĩ hệ Hỏa, giúp họ phát huy tối đa sức mạnh.", value: 500, buffs: { statModifiers: { magicAttack: 0.2 }, duration: 10, cancellable: true } },
  // Simplified effect
  { id: "pill_ngu_linh", name: "Đan Ngự Linh", type: "Đan Dược", rarity: "Hiếm", icon: "💊", effect: "Tăng tốc độ triệu hồi linh thú.", description: "Giúp rút ngắn thời gian gọi ra linh thú hoặc đồng hành trong chiến đấu.", value: 450 },
  // Effect to be implemented
  { id: "pill_truc_co", name: "Đan Trúc Cơ", type: "Đan Dược", rarity: "Hiếm", icon: "💊", effect: "Hỗ trợ đột phá cảnh giới Trúc Cơ.", expGain: 5e3, description: "Đan dược quan trọng giúp tu sĩ Luyện Khí đỉnh phong có cơ hội đột phá.", value: 1e3 }
];
const UPGRADE_MATERIALS = [
  { id: "upgrade_stone_1", name: "Huyền Thiết Sơ Cấp", type: "Nguyên liệu", rarity: "Phổ thông", icon: "🪨", description: "Đá cường hóa cơ bản, dùng cho trang bị cấp thấp.", value: 20 },
  { id: "upgrade_stone_2", name: "Huyền Thiết Trung Cấp", type: "Nguyên liệu", rarity: "Quý", icon: "🪨", description: "Đá cường hóa phổ biến, dùng cho trang bị tầm trung.", value: 100 },
  { id: "upgrade_stone_3", name: "Huyền Thiết Cao Cấp", type: "Nguyên liệu", rarity: "Hiếm", icon: "💎", description: "Đá cường hóa hiếm, dùng cho trang bị cao cấp.", value: 500 },
  { id: "upgrade_stone_4", name: "Huyền Thiết Cực Phẩm", type: "Nguyên liệu", rarity: "Truyền Kỳ", icon: "💎", description: "Đá cường hóa cực hiếm, dùng cho các trang bị huyền thoại.", value: 2e3 }
];
const MISC_ITEMS = [
  { id: "item_004", name: "Cỏ Linh Tinh", type: "Nguyên liệu", rarity: "Phổ thông", icon: "🌿", description: "Loại cỏ dại chứa một ít linh khí, là nguyên liệu cơ bản nhất trong luyện đan.", value: 5 },
  { id: "item_005", name: "Da Sói", type: "Nguyên liệu", rarity: "Phổ thông", icon: "🐺", description: "Da của Dã Lang, có thể dùng để chế tạo giáp nhẹ.", value: 8 },
  { id: "mat_tay_linh_thach", name: "Tẩy Linh Thạch", type: "Tiêu hao", rarity: "Truyền Kỳ", icon: "💎", description: "Viên đá chứa đựng sức mạnh hỗn độn, có khả năng tẩy rửa và tái tạo lại linh căn của một tu sĩ.", effect: "Tẩy luyện lại Linh Căn", value: 1e4 },
  { id: "cauldron_01", name: "Đan Lô Sơ Cấp", type: "Đan Lô", rarity: "Phổ thông", icon: "🏺", description: "Một chiếc lò luyện đan cơ bản, có thể dùng để luyện các loại đan dược cấp 1.", value: 500 },
  { id: "item_bth_01", name: "Long Linh Thánh Y", type: "Áo giáp", slot: "áo giáp", rarity: "Thần Thoại", icon: "🛡️", description: "Áo giáp được dệt từ vảy mềm của Thánh Long, miễn nhiễm với hầu hết các loại pháp thuật.", stats: { defense: 5e4, magicDefense: 8e4, hp: 1e5 }, value: 5e4 },
  { id: "item_bth_02", name: "Long Tinh Sơ Thủy", type: "Nguyên liệu", rarity: "Thần Thoại", icon: "💧", description: "Tinh hoa của Sơ Thủy Thánh Long, chứa đựng sức mạnh sáng tạo nguyên thủy.", value: 1e5 },
  { id: "item_bth_03", name: "Long Vũ Lưu Quang", type: "Pháp bảo", slot: "pháp bảo", rarity: "Thần Thoại", icon: "✨", description: "Một chiếc lông vũ của Thánh Long, chứa đựng sức mạnh không gian, tăng mạnh tốc độ.", stats: { speed: 5e3, evasion: 0.2 }, value: 5e4 }
];
const ITEM_LIST = [
  ...STORY_ITEMS,
  ...THEMATIC_ITEMS,
  ...MYTHIC_ITEMS,
  ...ULTIMATE_ITEMS,
  ...CONSUMABLE_ITEMS,
  ...ALCHEMY_MATERIALS,
  ...ALCHEMY_PILLS,
  ...UPGRADE_MATERIALS,
  ...MISC_ITEMS
];
const SKILLS = [
  { id: "skill_001", name: "Nhất Kiếm Trảm", origin: "Môn phái cơ bản", type: "Chủ Động", damage: 20, mpCost: 10, description: "Một đường kiếm cơ bản nhưng nhanh và mạnh.", visualEffect: "slash", soundEffectUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_28d7a126a2.mp3?filename=sword-hit-7160.mp3" },
  { id: "skill_002", name: "Hồi Xuân Thuật", origin: "Y thuật", type: "Chủ Động", heal: 50, mpCost: 15, description: "Sử dụng linh lực để chữa lành vết thương.", visualEffect: "heal" },
  { id: "skill_003", name: "Kim Cang Hộ Thể", origin: "Luyện thể", type: "Bị Động", passiveBonus: { defense: 20 }, description: "Linh lực tự động bảo vệ cơ thể, tăng phòng ngự." },
  { id: "skill_004", name: "Liệt Hỏa Chưởng", origin: "Hỏa tu", type: "Chủ Động", damage: 40, mpCost: 20, description: "Một chưởng mang theo nhiệt hỏa, gây sát thương thiêu đốt.", spiritRoot: "Hỏa" },
  { id: "skill_bth_01", name: "Mạt Nhật", origin: "Bạch Thiên Huyên", type: "Tuyệt Kỹ", turnTrigger: 5, damage: 999999, ignoreDefense: true, description: "Một đòn tấn công hủy diệt không thể chống đỡ, chỉ kích hoạt khi HP của boss dưới 50%." },
  { id: "skill_bth_02", name: "Long Uy", origin: "Bạch Thiên Huyên", type: "Chủ Động", stunTurns: 1, stunChance: 1, description: "Giải phóng uy áp của rồng thần, làm tất cả kẻ địch choáng váng 1 lượt." },
  { id: "skill_bth_03", name: "Thủy Long Trảm", origin: "Bạch Thiên Huyên", type: "Chủ Động", damage: 15e3, hits: 2, description: "Tạo ra hai con rồng nước tấn công kẻ địch, cực kỳ hiệu quả với hệ Hỏa.", spiritRoot: "Thủy" },
  {
    id: "skill_005",
    name: "Phong Sát Kiếm Trận",
    origin: "Phong tu",
    type: "Chủ Động",
    damage: 15,
    hits: 3,
    mpCost: 25,
    description: "Tạo ra một trận kiếm khí sắc bén như gió, tấn công kẻ địch nhiều lần liên tiếp.",
    spiritRoot: "Phong",
    visualEffect: "whirlwind"
  },
  {
    id: "skill_006",
    name: "Dưỡng Linh Quyết",
    origin: "Tán tu",
    type: "Bị Động",
    description: "Một phương pháp dưỡng sinh, giúp tăng tốc độ hấp thụ linh lực và củng cố căn cơ.",
    passiveBonus: { cultivationSpeedBonus: 0.1, hp: 50 }
  },
  {
    id: "skill_007",
    name: "Vạn Kiếm Quy Tông",
    origin: "Thượng Cổ Kiếm Tông",
    type: "Tuyệt Kỹ",
    damage: 200,
    mpCost: 80,
    ignoreDefense: true,
    description: "Tuyệt kỹ tối thượng của kiếm tu, triệu hồi vạn thanh kiếm ảo ảnh tấn công mục tiêu, gây ra sát thương cực lớn.",
    spiritRoot: "Kim",
    visualEffect: "slash"
  }
];
const MONSTERS = [
  { id: "monster_001", name: "Cọc gỗ", level: 1, cultivation: { realm: "Luyện Khí", stage: 1, lp: 0, lpToNext: 0 }, hp: 30, stats: { attack: 0, defense: 5, speed: 1, magicAttack: 0, magicDefense: 0, critRate: 0, critDamage: 1.5, accuracy: 1, evasion: 0, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "ngu", attributes: ["Mộc"], multiplier: 1 }, rewards: { characterExp: 5, cultivationExp: 2, linhThach: 0, items: [] } },
  { id: "monster_002", name: "Chuột Đói", level: 3, cultivation: { realm: "Luyện Khí", stage: 3, lp: 0, lpToNext: 0 }, hp: 60, stats: { attack: 11, defense: 6, speed: 12, magicAttack: 0, magicDefense: 1, critRate: 0.05, critDamage: 1.5, accuracy: 0.85, evasion: 0.03, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "ngu", attributes: ["Thổ"], multiplier: 1 }, rewards: { characterExp: 25, cultivationExp: 15, linhThach: 5, items: [] } },
  { id: "monster_003", name: "Chó Hoang", level: 5, cultivation: { realm: "Luyện Khí", stage: 5, lp: 0, lpToNext: 0 }, hp: 90, stats: { attack: 18, defense: 10, speed: 15, magicAttack: 0, magicDefense: 3, critRate: 0.1, critDamage: 1.5, accuracy: 0.9, evasion: 0.04, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "ngu", attributes: ["Thổ"], multiplier: 1 }, rewards: { characterExp: 40, cultivationExp: 25, linhThach: 8, items: [{ itemId: "item_005", chance: 0.2 }] } },
  { id: "monster_004", name: "Nhện Độc", level: 12, cultivation: { realm: "Luyện Khí", stage: 10, lp: 0, lpToNext: 0 }, hp: 180, stats: { attack: 30, defense: 18, speed: 10, magicAttack: 5, magicDefense: 8, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.05, armorPen: 0.05, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "tu", attributes: ["Mộc", "Thổ"], multiplier: 1.2 }, rewards: { characterExp: 100, cultivationExp: 70, linhThach: 20, items: [] } },
  { id: "monster_005", name: "Hổ Vằn Lửa Rừng", level: 18, cultivation: { realm: "Trúc Cơ", stage: 1, lp: 0, lpToNext: 0 }, hp: 430, stats: { attack: 81, defense: 50, speed: 20, magicAttack: 10, magicDefense: 12, critRate: 0.15, critDamage: 1.8, accuracy: 0.95, evasion: 0.06, armorPen: 0.1, blockRate: 0.05, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "thien", attributes: ["Hỏa"], multiplier: 1.7 }, rewards: { characterExp: 170, cultivationExp: 120, linhThach: 40, items: [] } },
  { id: "monster_006", name: "Linh Thạch Nhân", level: 22, cultivation: { realm: "Trúc Cơ", stage: 4, lp: 0, lpToNext: 0 }, hp: 2350, stats: { attack: 395, defense: 405, speed: 40, magicAttack: 0, magicDefense: 150, critRate: 0.05, critDamage: 1.5, accuracy: 0.85, evasion: 0.01, armorPen: 0, blockRate: 0.2, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["Thổ"], multiplier: 1.7 }, rewards: { characterExp: 200, cultivationExp: 150, linhThach: 50, items: [] } },
  // NEW MONSTERS from World Map
  { id: "monster_boss_me_anh", name: "Hổ Vương Mê Ảnh", level: 20, cultivation: { realm: "Trúc Cơ", stage: 2, lp: 0, lpToNext: 0 }, hp: 3e3, stats: { attack: 450, defense: 300, speed: 125, magicAttack: 100, magicDefense: 100, critRate: 0.2, critDamage: 1.8, accuracy: 1, evasion: 0.08, armorPen: 0.15, blockRate: 0.1, mentalDemonResistance: 0.05 }, spiritRoot: { classificationId: "thien", attributes: ["Hỏa"], multiplier: 1.7 }, rewards: { characterExp: 250, cultivationExp: 180, linhThach: 80, items: [{ itemId: "item_epi_01", chance: 0.1 }] } },
  { id: "monster_007", name: "Dơi Máu", level: 21, cultivation: { realm: "Trúc Cơ", stage: 3, lp: 0, lpToNext: 0 }, hp: 1750, stats: { attack: 375, defense: 200, speed: 175, magicAttack: 0, magicDefense: 50, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.1, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "song", attributes: ["Phong", "Kim"], multiplier: 1.5 }, rewards: { characterExp: 180, cultivationExp: 130, linhThach: 45, items: [] } },
  { id: "monster_boss_hang_da", name: "Vua Dơi Hút Máu", level: 25, cultivation: { realm: "Trúc Cơ", stage: 5, lp: 0, lpToNext: 0 }, hp: 4500, stats: { attack: 550, defense: 300, speed: 200, magicAttack: 150, magicDefense: 150, critRate: 0.15, critDamage: 1.7, accuracy: 0.95, evasion: 0.13, armorPen: 0.1, blockRate: 0.1, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "song", attributes: ["Phong", "Kim"], multiplier: 1.5 }, rewards: { characterExp: 300, cultivationExp: 220, linhThach: 120, items: [{ itemId: "item_epi_02", chance: 0.15 }] } },
  { id: "monster_008", name: "Yêu Thú Tinh Linh", level: 28, cultivation: { realm: "Trúc Cơ", stage: 8, lp: 0, lpToNext: 0 }, hp: 2500, stats: { attack: 400, defense: 350, speed: 150, magicAttack: 500, magicDefense: 450, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.08, armorPen: 0, blockRate: 0.1, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["Mộc"], multiplier: 1.7 }, rewards: { characterExp: 220, cultivationExp: 160, linhThach: 60, items: [] } },
  { id: "monster_boss_linh_thu_sam_lam", name: "Hộ Vệ Thụ Tinh", level: 40, cultivation: { realm: "Kim Đan", stage: 1, lp: 0, lpToNext: 0 }, hp: 12500, stats: { attack: 750, defense: 1e3, speed: 75, magicAttack: 600, magicDefense: 900, critRate: 0.1, critDamage: 1.8, accuracy: 1, evasion: 0.03, armorPen: 0.1, blockRate: 0.3, mentalDemonResistance: 0.2 }, spiritRoot: { classificationId: "thien", attributes: ["Mộc"], multiplier: 1.7 }, rewards: { characterExp: 600, cultivationExp: 450, linhThach: 250, items: [{ itemId: "item_leg_01", chance: 0.05 }] } },
  { id: "monster_boss_thanh_van", name: "Hộ Sơn Kỳ Lân", level: 50, cultivation: { realm: "Kim Đan", stage: 5, lp: 0, lpToNext: 0 }, hp: 4e4, stats: { attack: 2500, defense: 2200, speed: 500, magicAttack: 2800, magicDefense: 2200, critRate: 0.2, critDamage: 2, accuracy: 1.1, evasion: 0.1, armorPen: 0.2, blockRate: 0.15, mentalDemonResistance: 0.3 }, spiritRoot: { classificationId: "song", attributes: ["Hỏa", "Thổ"], multiplier: 1.5 }, rewards: { characterExp: 1e3, cultivationExp: 700, linhThach: 500, items: [{ itemId: "item_leg_02", chance: 0.05 }] } },
  { id: "monster_009", name: "Hồ Linh", level: 42, cultivation: { realm: "Kim Đan", stage: 2, lp: 0, lpToNext: 0 }, hp: 12e3, stats: { attack: 1300, defense: 1e3, speed: 600, magicAttack: 1800, magicDefense: 1500, critRate: 0.15, critDamage: 1.7, accuracy: 0.95, evasion: 0.13, armorPen: 0.1, blockRate: 0.1, mentalDemonResistance: 0.15 }, spiritRoot: { classificationId: "thien", attributes: ["Hỏa"], multiplier: 1.7 }, rewards: { characterExp: 450, cultivationExp: 300, linhThach: 150, items: [] } },
  { id: "monster_010", name: "Lang Vương", level: 45, cultivation: { realm: "Kim Đan", stage: 3, lp: 0, lpToNext: 0 }, hp: 15e3, stats: { attack: 2200, defense: 1200, speed: 550, magicAttack: 500, magicDefense: 800, critRate: 0.25, critDamage: 1.9, accuracy: 1, evasion: 0.1, armorPen: 0.2, blockRate: 0.1, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["Kim"], multiplier: 1.7 }, rewards: { characterExp: 500, cultivationExp: 350, linhThach: 180, items: [] } },
  { id: "monster_011", name: "Thủy Xà", level: 48, cultivation: { realm: "Kim Đan", stage: 4, lp: 0, lpToNext: 0 }, hp: 18e3, stats: { attack: 1800, defense: 1500, speed: 400, magicAttack: 2e3, magicDefense: 1600, critRate: 0.1, critDamage: 1.7, accuracy: 0.9, evasion: 0.08, armorPen: 0.1, blockRate: 0.15, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["Thủy"], multiplier: 1.7 }, rewards: { characterExp: 550, cultivationExp: 400, linhThach: 200, items: [] } },
  { id: "monster_boss_van_yeu_son", name: "Vạn Yêu Vương", level: 60, cultivation: { realm: "Nguyên Anh", stage: 1, lp: 0, lpToNext: 0 }, hp: 6e4, stats: { attack: 4e3, defense: 3e3, speed: 600, magicAttack: 4e3, magicDefense: 3e3, critRate: 0.25, critDamage: 2.2, accuracy: 1.2, evasion: 0.1, armorPen: 0.3, blockRate: 0.2, mentalDemonResistance: 0.4 }, spiritRoot: { classificationId: "ngu", attributes: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"], multiplier: 1 }, rewards: { characterExp: 2e3, cultivationExp: 1500, linhThach: 1e3, items: [{ itemId: "item_myt_01", chance: 0.01 }] } },
  { id: "monster_012", name: "Tinh Linh Thủy Nữ", level: 55, cultivation: { realm: "Kim Đan", stage: 8, lp: 0, lpToNext: 0 }, hp: 25e3, stats: { attack: 1500, defense: 1800, speed: 500, magicAttack: 3500, magicDefense: 3e3, critRate: 0.1, critDamage: 1.8, accuracy: 1, evasion: 0.13, armorPen: 0, blockRate: 0.1, mentalDemonResistance: 0.2 }, spiritRoot: { classificationId: "thien", attributes: ["Thủy"], multiplier: 1.7 }, rewards: { characterExp: 700, cultivationExp: 500, linhThach: 300, items: [] } },
  { id: "monster_boss_linh_tri", name: "Thủy Mẫu Thánh Nữ", level: 70, cultivation: { realm: "Nguyên Anh", stage: 5, lp: 0, lpToNext: 0 }, hp: 16e4, stats: { attack: 6e3, defense: 8e3, speed: 1200, magicAttack: 12e3, magicDefense: 1e4, critRate: 0.15, critDamage: 2, accuracy: 1.1, evasion: 0.15, armorPen: 0.1, blockRate: 0.2, mentalDemonResistance: 0.5 }, spiritRoot: { classificationId: "song", attributes: ["Thủy", "Băng"], multiplier: 1.5 }, rewards: { characterExp: 3e3, cultivationExp: 2e3, linhThach: 1500, items: [{ itemId: "item_myt_02", chance: 0.01 }] } },
  { id: "monster_boss_ma_vuc", name: "Ma Soái Hắc Ám", level: 80, cultivation: { realm: "Hóa Thần", stage: 1, lp: 0, lpToNext: 0 }, hp: 24e4, stats: { attack: 16e3, defense: 1e4, speed: 1400, magicAttack: 14e3, magicDefense: 8e3, critRate: 0.3, critDamage: 2.5, accuracy: 1.2, evasion: 0.1, armorPen: 0.4, blockRate: 0.2, mentalDemonResistance: 0.6 }, spiritRoot: { classificationId: "song", attributes: ["Hỏa", "Kim"], multiplier: 1.5 }, rewards: { characterExp: 5e3, cultivationExp: 3500, linhThach: 2500, items: [{ itemId: "item_myt_03", chance: 0.01 }] } },
  { id: "monster_013", name: "Lôi Linh Nhân", level: 75, cultivation: { realm: "Nguyên Anh", stage: 8, lp: 0, lpToNext: 0 }, hp: 8e4, stats: { attack: 8e3, defense: 6e3, speed: 1800, magicAttack: 11e3, magicDefense: 7e3, critRate: 0.2, critDamage: 2, accuracy: 1.1, evasion: 0.13, armorPen: 0.2, blockRate: 0.1, mentalDemonResistance: 0.3 }, spiritRoot: { classificationId: "thien", attributes: ["Lôi"], multiplier: 1.7 }, rewards: { characterExp: 1500, cultivationExp: 1e3, linhThach: 800, items: [] } },
  { id: "monster_boss_ban_co", name: "Cự Thần Bàn Cổ Tàn Hồn", level: 90, cultivation: { realm: "Hóa Thần", stage: 5, lp: 0, lpToNext: 0 }, hp: 4e5, stats: { attack: 24e3, defense: 2e4, speed: 1e3, magicAttack: 2e4, magicDefense: 2e4, critRate: 0.2, critDamage: 2, accuracy: 1.3, evasion: 0.05, armorPen: 0.5, blockRate: 0.5, mentalDemonResistance: 0.7 }, spiritRoot: { classificationId: "ngu", attributes: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"], multiplier: 1 }, rewards: { characterExp: 1e4, cultivationExp: 7e3, linhThach: 5e3, items: [{ itemId: "item_myt_04", chance: 0.01 }] } },
  { id: "monster_014", name: "Lôi Điểu", level: 105, cultivation: { realm: "Luyện Hư", stage: 2, lp: 0, lpToNext: 0 }, hp: 32e4, stats: { attack: 32e3, defense: 24e3, speed: 4800, magicAttack: 4e4, magicDefense: 28e3, critRate: 0.25, critDamage: 2.1, accuracy: 1.1, evasion: 0.15, armorPen: 0.3, blockRate: 0.1, mentalDemonResistance: 0.4 }, spiritRoot: { classificationId: "thien", attributes: ["Lôi"], multiplier: 1.7 }, rewards: { characterExp: 3e3, cultivationExp: 2e3, linhThach: 1500, items: [] } },
  { id: "monster_015", name: "Linh Hầu Cổ", level: 115, cultivation: { realm: "Luyện Hư", stage: 8, lp: 0, lpToNext: 0 }, hp: 6e5, stats: { attack: 6e4, defense: 48e3, speed: 3200, magicAttack: 2e4, magicDefense: 4e4, critRate: 0.3, critDamage: 2.3, accuracy: 1.2, evasion: 0.1, armorPen: 0.4, blockRate: 0.3, mentalDemonResistance: 0.5 }, spiritRoot: { classificationId: "thien", attributes: ["Thổ"], multiplier: 1.7 }, rewards: { characterExp: 4e3, cultivationExp: 2800, linhThach: 2e3, items: [] } },
  // FIX: Fix truncated monster data by completing the definition and correcting the `cultivation` property.
  { id: "monster_016", name: "Cự Mộc Hộ Vệ", level: 135, cultivation: { realm: "Hợp Thể", stage: 5, lp: 0, lpToNext: 0 }, hp: 8e5, stats: { attack: 8e4, defense: 1e5, speed: 1e3, magicAttack: 6e4, magicDefense: 9e4, critRate: 0.1, critDamage: 2, accuracy: 1.1, evasion: 0.05, armorPen: 0.2, blockRate: 0.4, mentalDemonResistance: 0.6 }, spiritRoot: { classificationId: "thien", attributes: ["Mộc"], multiplier: 1.7 }, rewards: { characterExp: 6e3, cultivationExp: 4e3, linhThach: 2500, items: [] } }
];
const TRAN_PHAP_LIST = [
  {
    id: "tp_001",
    name: "Tụ Linh Trận",
    description: "Trận pháp cơ bản nhất, giúp tăng tốc độ hấp thụ linh khí.",
    cultivationBonus: 0.1
  },
  {
    id: "tp_002",
    name: "Kim Quang Trận",
    description: "Tăng cường sức tấn công trong chiến đấu.",
    cultivationBonus: 0,
    combatBonus: { attack: 20 }
  }
];
const COMPANION_LIST = [
  {
    id: "companion_001",
    name: "Tiểu Hồ Ly",
    description: "Một con hồ ly nhỏ tinh nghịch nhưng trung thành.",
    avatarUrl: "https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg",
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    hp: 80,
    maxHp: 80,
    mp: 30,
    maxMp: 30,
    baseStats: { attack: 8, magicAttack: 3, defense: 4, magicDefense: 4, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.08, speed: 12, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 },
    totalStats: { attack: 8, magicAttack: 3, defense: 4, magicDefense: 4, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.08, speed: 12, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 },
    skills: SKILLS.filter((s) => s.id === "skill_001"),
    equippedItems: {},
    spiritRoot: { classificationId: "thien", attributes: ["Hỏa"], multiplier: 1.7 },
    rarity: "Quý"
  },
  {
    id: "companion_bth",
    name: "Bạch Thiên Huyên",
    description: "Sơ Thủy Thánh Long, Chúng Long Chi Chủ.",
    avatarUrl: "https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg",
    level: 100,
    exp: 0,
    expToNextLevel: 1e5,
    hp: 5e4,
    maxHp: 5e4,
    mp: 2e4,
    maxMp: 2e4,
    baseStats: { attack: 5e3, magicAttack: 7e3, defense: 4e3, magicDefense: 6e3, critRate: 0.3, critDamage: 2.5, accuracy: 1.2, evasion: 0.2, speed: 800, armorPen: 0.3, blockRate: 0.2, mentalDemonResistance: 0.5 },
    totalStats: { attack: 5e3, magicAttack: 7e3, defense: 4e3, magicDefense: 6e3, critRate: 0.3, critDamage: 2.5, accuracy: 1.2, evasion: 0.2, speed: 800, armorPen: 0.3, blockRate: 0.2, mentalDemonResistance: 0.5 },
    skills: SKILLS.filter((s) => s.id === "skill_bth_03"),
    equippedItems: {},
    spiritRoot: { classificationId: "bien_di", attributes: ["Thủy", "Băng"], multiplier: 20 },
    rarity: "Thần Thoại",
    passiveSkills: [{ name: "Long Hồn", description: "Tăng toàn bộ thuộc tính cho chủ nhân.", statBonuses: { attack: 1e3, defense: 1e3, hp: 5e3 } }]
  }
];
const NPC_LIST = [
  { id: "npc_001", name: "Trưởng thôn", level: 10, cultivation: { realm: "Luyện Khí", stage: 8, lp: 0, lpToNext: 0 }, description: "Người đứng đầu Thôn Thanh Thủy, luôn lo lắng cho dân làng.", avatarUrl: "https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg", baseStats: { attack: 10, defense: 10, speed: 10, magicAttack: 0, magicDefense: 5, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, totalStats: { attack: 10, defense: 10, speed: 10, magicAttack: 0, magicDefense: 5, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, equippedItems: {}, spiritRoot: { classificationId: "ngu", attributes: ["Mộc", "Thổ"], multiplier: 1 }, currentAreaId: "area_thanh_thuy" },
  { id: "npc_002", name: "Thợ rèn", level: 15, cultivation: { realm: "Luyện Khí", stage: 10, lp: 0, lpToNext: 0 }, description: "Một thợ rèn cục cằn nhưng có tay nghề cao.", avatarUrl: "https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg", baseStats: { attack: 15, defense: 15, speed: 8, magicAttack: 0, magicDefense: 8, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, totalStats: { attack: 15, defense: 15, speed: 8, magicAttack: 0, magicDefense: 8, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, equippedItems: {}, spiritRoot: { classificationId: "thien", attributes: ["Kim"], multiplier: 1.7 }, currentAreaId: "area_thanh_thuy" },
  { id: "npc_003", name: "Yến Tử Nguyệt", level: 30, cultivation: { realm: "Trúc Cơ", stage: 5, lp: 0, lpToNext: 0 }, description: "Giám Linh Sư bí ẩn tại Thành Vân Lâm, có khả năng nhìn thấu linh căn của người khác.", avatarUrl: "https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg", baseStats: { attack: 20, defense: 20, speed: 20, magicAttack: 50, magicDefense: 50, critRate: 0.1, critDamage: 1.6, accuracy: 1, evasion: 0.1, armorPen: 0, blockRate: 0, mentalDemonResistance: 0.2 }, totalStats: { attack: 20, defense: 20, speed: 20, magicAttack: 50, magicDefense: 50, critRate: 0.1, critDamage: 1.6, accuracy: 1, evasion: 0.1, armorPen: 0, blockRate: 0, mentalDemonResistance: 0.2 }, equippedItems: {}, spiritRoot: { classificationId: "song", attributes: ["Thủy", "Băng"], multiplier: 5 }, currentAreaId: "area_van_lam" }
];
const ALCHEMY_EXP_TABLE = Array.from({ length: 50 }, (_, i) => Math.floor(100 * (i + 1) * Math.pow(1.2, i)));
const ALCHEMY_RECIPES = [
  { id: "recipe_001", name: "Đan Tụ Linh", inputs: [{ itemId: "mat_linh_chi", count: 2 }, { itemId: "mat_ngoc_dich", count: 1 }], outputId: "pill_tu_linh", requiredLevel: 1, expGain: 10, successChance: 0.8, level: 1, requiredCauldronLevel: 1 },
  { id: "recipe_002", name: "Đan Trị Thương", inputs: [{ itemId: "mat_huyet_thao", count: 2 }, { itemId: "item_004", count: 1 }], outputId: "pill_tri_thuong", requiredLevel: 3, expGain: 15, successChance: 0.75, level: 1, requiredCauldronLevel: 1 }
];
const STORE_INVENTORY = [
  { itemId: "item_001", price: 20 },
  { itemId: "item_002", price: 20 },
  { itemId: "item_004", price: 10 }
];
const BLACKSMITH_INVENTORY = [
  { itemId: "item_com_02", price: 50 },
  { itemId: "item_com_01", price: 45 },
  { itemId: "upgrade_stone_1", price: 100 }
];
const CRAFTING_RECIPES = [
  { inputs: ["item_005", "item_005"], output: "item_rar_01" }
];
const ITEM_RARITY_COLORS = {
  "Phổ thông": "border-gray-400",
  // Trắng
  "Quý": "border-green-500",
  // Xanh lục
  "Hiếm": "border-blue-500",
  // Xanh lam
  "Truyền Kỳ": "border-orange-500",
  // Cam
  "Thần Thoại": "border-red-600",
  // Đỏ
  "Tối Thượng": "border-purple-500 animate-pulse"
  // Tím nhấp nháy
};
const ITEM_RARITY_TEXT_COLORS = {
  "Phổ thông": "text-white",
  "Quý": "text-green-400",
  "Hiếm": "text-blue-400",
  "Truyền Kỳ": "text-orange-400",
  "Thần Thoại": "text-red-500",
  "Tối Thượng": "text-purple-400"
};
const COMBAT_STAT_LABELS = {
  attack: "Công Kích",
  magicAttack: "Pháp Công",
  defense: "Phòng Ngự",
  magicDefense: "Kháng Phép",
  critRate: "Tỉ Lệ Chí Mạng",
  critDamage: "S.Thương Chí Mạng",
  accuracy: "Chính Xác",
  evasion: "Né Tránh",
  speed: "Tốc Độ",
  armorPen: "Xuyên Giáp",
  blockRate: "Tỉ Lệ Chặn",
  mentalDemonResistance: "Kháng Tâm Ma",
  luck: "May Mắn"
};
const CULTIVATION_REALMS = ["Luyện Khí", "Trúc Cơ", "Kim Đan", "Nguyên Anh", "Hóa Thần", "Luyện Hư", "Hợp Thể", "Độ Kiếp", "Đại Thừa", "Chân Tiên", "Thiên Tiên", "Tiên Vương", "Tiên Đế", "Hậu Thánh Vị"];
const REALM_BREAKTHROUGH_FLAT_BONUS = [10, 50, 100, 200, 300, 400, 600, 800, 1e3, 5e3, 8e3, 1e4, 12e3, 15e3];
const REALM_BREAKTHROUGH_PERCENT_BONUS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5];
const STAGE_PERCENT_BONUS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5];
const MAIN_STORY_QUESTS = [
  {
    id: "sq_01",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (1)",
    description: "Bạn cảm nhận được một sức mạnh tiềm ẩn trong người, dường như có liên quan đến một di vật gia truyền. Hãy bắt đầu hành trình, tìm hiểu về nó và rèn luyện bản thân bằng cách tiêu diệt yêu thú.",
    progress: 0,
    target: 10,
    objective: { type: "kill", targetName: "Yêu thú bất kỳ tại Rừng Mê Ảnh", targetId: "area_me_anh_any_monster" },
    reward: "200 EXP, 50 Linh Thạch",
    rewardObject: { characterExp: 200, linhThach: 50, itemId: "item_story_001" },
    nextQuestId: "sq_02"
  },
  {
    id: "sq_02",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (2)",
    description: "Thanh kiếm gãy mà bạn nhận được dường như có liên kết với huyết mạch của bạn. Để tìm hiểu thêm, bạn cần thu thập một số vật liệu đặc biệt để giải mã bí ẩn.",
    progress: 0,
    target: 3,
    objective: { type: "collect", targetName: "Huyết Tinh Thú", itemId: "item_story_002" },
    reward: "500 EXP, 1x Bình Linh Khí",
    rewardObject: { characterExp: 500, itemId: "item_story_003" },
    turnInItems: [{ itemId: "item_story_002", count: 3 }],
    nextQuestId: "sq_03"
  },
  {
    id: "sq_03",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (3)",
    description: "Bạn đã có đủ nguyên liệu. Hãy mang thanh kiếm gãy và Huyết Tinh Thú đến lò rèn tại Thôn Thanh Thủy để rèn lại vũ khí gia truyền.",
    progress: 0,
    target: 1,
    objective: { type: "craft", targetName: "Kiếm Dựng Hồn", targetId: "item_story_004" },
    reward: "800 EXP",
    rewardObject: { characterExp: 800 },
    nextQuestId: "sq_04"
  },
  {
    id: "sq_04",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (4)",
    description: "Một đạo sĩ lang thang tại Thành Vân Lâm nói rằng ông ta có tin tức về cha của bạn. Ông ta nói bạn phải chứng minh thực lực bằng cách đánh bại Hắc Lang Vương đang hoành hành gần đó.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Hắc Lang Vương", targetId: "monster_story_001" },
    reward: "1200 EXP, 1x Vé Thông Hành",
    rewardObject: { characterExp: 1200, itemId: "item_story_005" },
    nextQuestId: "sq_05"
  },
  {
    id: "sq_05",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (5)",
    description: "Với vé thông hành, bạn có thể tham gia kỳ thi nhập môn của Tông môn Thanh Vân. Hãy vượt qua thử thách để bước chân vào con đường tu tiên thực sự.",
    progress: 0,
    target: 3,
    objective: { type: "kill", targetName: "Đệ Tử Đối Thủ", targetId: "monster_story_002" },
    reward: "1500 EXP, 1x Khí Vận Tông Môn",
    rewardObject: { characterExp: 1500, itemId: "item_story_006" },
    nextQuestId: "sq_06"
  },
  {
    id: "sq_06",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (6)",
    description: "Trưởng lão giao cho bạn nhiệm vụ điều tra ma khí bất thường tại Vực Linh Trì. Dường như có một thực thể hắc ám đang ẩn náu ở đó.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Ma Ảnh Linh Hồn", targetId: "monster_story_003" },
    reward: "2500 EXP, 1x Bình Tẩy Ma",
    rewardObject: { characterExp: 2500, itemId: "item_story_007" },
    nextQuestId: "sq_07"
  },
  {
    id: "sq_07",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (7)",
    description: "Bạn phát hiện ra một mối liên hệ giữa ma khí và huyết mạch của mình. Hãy đến Di tích Bàn Cổ để tìm kiếm Linh Huyết Bàn Cổ, hy vọng nó có thể giúp bạn thức tỉnh sức mạnh thực sự.",
    progress: 0,
    target: 1,
    objective: { type: "collect", targetName: "Linh Huyết Bàn Cổ", itemId: "item_story_008" },
    reward: "4000 EXP, Thức Tỉnh Huyết Mạch",
    rewardObject: { characterExp: 4e3 },
    storyTriggers: { type: "AWAKEN_BLOODLINE" },
    turnInItems: [{ itemId: "item_story_008", count: 1 }],
    nextQuestId: "sq_08"
  },
  {
    id: "sq_08",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (8)",
    description: "Sau khi thức tỉnh huyết mạch, bạn gặp một người tự xưng là bạn cũ của cha. Người này đưa cho bạn hai con đường: theo đuổi chính đạo để bảo vệ thế gian, hoặc nhập ma đạo để có sức mạnh vô song. Vận mệnh nằm trong tay bạn.",
    progress: 0,
    target: 1,
    objective: { type: "event", targetName: "Đưa ra lựa chọn Chính - Ma" },
    reward: "Nhánh truyện Chính Đạo / Ma Đạo",
    storyTriggers: { type: "CHOOSE_PATH" },
    nextQuestId: "sq_09"
  },
  {
    id: "sq_09",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (9)",
    description: "Con đường bạn chọn đòi hỏi sức mạnh lớn hơn. Để đột phá cảnh giới và bước vào Tiên Giới, bạn phải đối mặt với Lôi Kiếp của Thiên Đạo. Hãy chuẩn bị và sống sót.",
    progress: 0,
    target: 3,
    objective: { type: "kill", targetName: "Lôi Kiếp", targetId: "monster_story_006" },
    reward: "8000 EXP, Lôi Tâm Giới Thể",
    rewardObject: { characterExp: 8e3, itemId: "item_story_009" },
    nextQuestId: "sq_10"
  },
  {
    id: "sq_10",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (10)",
    description: "Khi bước vào Tiên Giới, bạn phát hiện ra Lôi Kiếp không phải là thử thách tự nhiên, mà là một âm mưu của Thiên Đạo nhằm ngăn chặn những kẻ có huyết mạch như bạn. Hãy tìm và đánh bại phân thân của Thiên Tôn để vạch trần sự thật.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Thiên Tôn Phân Thân", targetId: "monster_story_004" },
    reward: "10000 EXP, Thiên Mệnh Phù",
    rewardObject: { characterExp: 1e4, itemId: "item_story_010" },
    nextQuestId: "sq_11"
  },
  {
    id: "sq_11",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (11)",
    description: "Thiên Đạo là kẻ thù chung. Bạn phải thuyết phục các thế lực trong Tiên Giới và Ma Giới để lập nên một liên minh chống lại sự cai trị độc đoán này. Sẽ có kẻ chống đối, hãy dùng thực lực để khiến chúng quy phục.",
    progress: 0,
    target: 1,
    objective: { type: "event", targetName: "Hoàn thành đàm phán liên minh" },
    reward: "15000 EXP, Danh hiệu [Phá Thiên]",
    rewardObject: { characterExp: 15e3 },
    storyTriggers: { type: "GAIN_TITLE", value: "Phá Thiên" },
    nextQuestId: "sq_12"
  },
  {
    id: "sq_12",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (12)",
    description: 'Liên minh đã được thành lập, nhưng để thực sự đối đầu với Thiên Đạo, bạn cần tìm ra điểm yếu của chúng. Bạch Y Tiên Tử tại Thiên Cung tiết lộ về "La Bàn Huyễn Cảnh", chìa khóa để vào nơi cất giữ bí mật, nhưng nó đang được một "Thiên Cung Vệ Thần" canh giữ.',
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Thiên Cung Vệ Thần", targetId: "monster_story_007" },
    reward: "30000 EXP, 1x La Bàn Huyễn Cảnh",
    rewardObject: { characterExp: 3e4, itemId: "item_story_013" },
    nextQuestId: "sq_13"
  },
  {
    id: "sq_13",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (13)",
    description: "Với La Bàn Huyễn Cảnh trong tay, bạn có thể tiến vào Huyễn Cảnh Luân Hồi để tìm lại linh hồn tổ tiên. Nhưng để làm vậy, bạn phải đối mặt với Tâm Ma Dĩ Vãng của chính mình, thứ được sinh ra từ những hối tiếc và mất mát.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Tâm Ma Dĩ Vãng", targetId: "monster_story_005" },
    reward: "20000 EXP, Ấn Gia Tộc Phục Sinh",
    rewardObject: { characterExp: 2e4, itemId: "item_story_011" },
    turnInItems: [{ itemId: "item_story_013", count: 1 }],
    nextQuestId: "sq_14"
  },
  {
    id: "sq_14",
    isStoryQuest: true,
    title: "Hồi Sinh Dòng Huyết Mạch (14)",
    description: "Với Ấn Gia Tộc trong tay, bạn đã có thể thực hiện nghi lễ cuối cùng để hồi sinh hoàn toàn sức mạnh của dòng huyết mạch, khôi phục lại vinh quang cho gia tộc. Đây là bước cuối cùng trên con đường của bạn.",
    progress: 0,
    target: 1,
    objective: { type: "event", targetName: "Thực hiện nghi lễ phục sinh" },
    reward: "Thần Huyết Bất Diệt, Danh hiệu [Gia Tộc Bất Diệt]",
    rewardObject: { itemId: "item_story_012" },
    storyTriggers: { type: "GAIN_TITLE", value: "Gia Tộc Bất Diệt" },
    turnInItems: [{ itemId: "item_story_011", count: 1 }],
    nextQuestId: "sq_15"
  },
  {
    id: "sq_15",
    isStoryQuest: true,
    title: "Thần Long Chi Vấn",
    description: "Sức mạnh của bạn đã kinh động đến cả những tồn tại cổ xưa nhất. Một lời mời từ Long Điện ở trung tâm Thần Giới đã được gửi đến. Hãy đến diện kiến Chúng Long Chi Chủ, Bạch Thiên Huyên, để chứng tỏ thực lực của bạn và tìm hiểu bí mật cuối cùng của thế giới này.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Bạch Thiên Huyên", targetId: "monster_boss_bth" },
    reward: "Truyền thừa Sơ Thủy Thánh Long",
    rewardObject: { characterExp: 1e5, cultivationExp: 1e5 },
    nextQuestId: null
  }
];
const WORLD_MAP_DATA = [
  {
    id: "realm_pham_gioi",
    name: "Phàm Giới",
    description: "Là nơi khởi đầu, sinh sống của người thường, ít linh khí, tài nguyên nghèo nàn nhưng có nhiều câu chuyện mở đầu.",
    levelRange: "1-40",
    areas: [
      {
        id: "area_thanh_thuy",
        name: "Thôn Thanh Thủy",
        description: "Làng khởi đầu – nơi nhân vật chính lớn lên. Giao diện cơ bản, nhiệm vụ hướng dẫn.",
        levelRange: "1-5",
        npcs: ["Trưởng thôn", "Thầy thuốc", "Thợ rèn"],
        monsters: ["Cọc gỗ", "Chuột Đói", "Chó Hoang"],
        boss: "Chuột Tinh Biến Dị",
        rewards: ["Nguyên liệu cơ bản", "Trang bị phàm nhân", "Đan dược cấp thấp"],
        possibleWeather: ["Trời Quang", "Mưa Rào"]
      },
      {
        id: "area_van_lam",
        name: "Thành Vân Lâm",
        description: "Thành lớn, trung tâm giao thương. Có nhiều NPC, nơi nhận nhiệm vụ, luyện đan, giao dịch.",
        levelRange: "5-15",
        npcs: ["Thương nhân", "Quan binh", "Đạo sĩ lang thang", "Yến Tử Nguyệt"],
        monsters: ["Không có (thành an toàn)"],
        rewards: ["Vật phẩm giao dịch", "Bí kíp sơ cấp", "Bản đồ khu vực"],
        possibleWeather: ["Trời Quang"]
      },
      {
        id: "area_me_anh",
        name: "Rừng Mê Ảnh",
        description: "Khu rừng nguy hiểm đầu tiên – có yêu thú, kỳ thảo, phụ bản cấp thấp.",
        levelRange: "10-20",
        npcs: ["Tiều phu lạc đường", "Yêu linh nhỏ"],
        monsters: ["Nhện Độc", "Hổ Vằn Lửa Rừng"],
        boss: "Hổ Vương Mê Ảnh",
        rewards: ["Linh thảo cấp thấp", "Da thú", "Pháp bảo sơ cấp"],
        possibleWeather: ["Trời Quang", "Sương Mù", "Mưa Rào"]
      },
      {
        id: "area_hang_da",
        name: "Hang Đá Tối",
        description: "Bí cảnh ẩn dưới núi – luyện khí nhân tạo, có boss đầu tiên.",
        levelRange: "20-25",
        npcs: ["Ẩn sĩ"],
        monsters: ["Dơi Máu", "Linh Thạch Nhân"],
        boss: "Vua Dơi Hút Máu",
        rewards: ["Trang bị lam", "Công pháp nhập môn", "Thú cưỡi cấp thấp"]
      },
      {
        id: "area_tich_duong",
        name: "Đỉnh Tịch Dương",
        description: "Nơi ngắm hoàng hôn – có NPC bí ẩn, lần đầu tiên nhắc đến 'tu tiên'.",
        levelRange: "25-30",
        npcs: ["Tiên giả bí ẩn"],
        monsters: [],
        rewards: ["Cơ duyên hiếm: ngộ tính +1", "Pháp khí đầu tiên"],
        possibleWeather: ["Trời Quang", "Nắng Gắt"]
      },
      {
        id: "area_linh_thu_sam_lam",
        name: "Linh Thú Sâm Lâm",
        description: "Nơi ẩn náu của các Linh Thú cổ đại.",
        levelRange: "25-40",
        npcs: ["Thần Thú Lão giả"],
        monsters: ["Yêu Thú Tinh Linh"],
        boss: "Hộ Vệ Thụ Tinh",
        rewards: ["Linh hồn thú", "Nội đan yêu thú"],
        possibleWeather: ["Trời Quang", "Sương Mù", "Mưa Rào"]
      }
    ]
  },
  {
    id: "realm_tu_chan_gioi",
    name: "Tu Chân Giới",
    description: "Nơi các tu sĩ hoạt động, linh khí dày đặc, có nhiều tông môn, yêu thú, di tích cổ xưa. Nơi bắt đầu con đường tu tiên thực sự.",
    levelRange: "30-80",
    areas: [
      { id: "area_thanh_van", name: "Tông môn Thanh Vân", description: "Chính phái lớn – có thể gia nhập, học pháp thuật, nhận nhiệm vụ tông môn.", levelRange: "30-50", boss: "Hộ Sơn Kỳ Lân", possibleWeather: ["Trời Quang", "Mưa Rào"] },
      { id: "area_van_yeu_son", name: "Vạn Yêu Sơn", description: "Núi yêu thú cư ngụ – bắt linh thú, thu phục, huấn luyện.", levelRange: "40-60", monsters: ["Hồ Linh", "Lang Vương", "Thủy Xà"], boss: "Vạn Yêu Vương", possibleWeather: ["Trời Quang", "Sương Mù"] },
      { id: "area_linh_tri", name: "Vực Linh Trì", description: "Hồ chứa linh khí – tăng tốc tu luyện, có boss canh giữ.", levelRange: "50-70", monsters: ["Tinh Linh Thủy Nữ"], boss: "Thủy Mẫu Thánh Nữ" },
      { id: "area_ma_vuc", name: "Thành Ma Vực", description: "Nơi ma tu tụ tập – PvP tự do, kịch bản phản diện mạnh.", levelRange: "60-80", boss: "Ma Soái Hắc Ám", possibleWeather: ["Trời Quang", "Nắng Gắt"] },
      { id: "area_ban_co", name: "Di tích Bàn Cổ", description: "Di tích cổ – xuất hiện kỳ ngộ, bảo vật, ẩn chứa nguy hiểm cực lớn.", levelRange: "70+", monsters: ["Lôi Linh Nhân"], boss: "Cự Thần Bàn Cổ Tàn Hồn", possibleWeather: ["Trời Quang", "Bão Tố"] }
    ]
  },
  {
    id: "realm_tien_gioi",
    name: "Tiên Giới",
    description: "Chỉ người vượt Độ Kiếp mới có thể đặt chân tới. Thế giới thần thánh, mỗi khu vực đều có thiên đạo giám sát.",
    levelRange: "80-150",
    areas: [
      { id: "area_thien_cung", name: "Thiên Cung", description: "Trung tâm của Tiên giới – NPC thiên tướng, bảng xếp hạng tiên đồ.", levelRange: "80-100", npcs: ["Thiên tướng", "Bạch Y Tiên Tử"], possibleWeather: ["Trời Quang"] },
      { id: "area_ngoc_hu", name: "Ngọc Hư Cảnh", description: "Cảnh giới tu luyện cực nhanh – cần điều kiện cao để vào.", levelRange: "90+" },
      { id: "area_thien_loi", name: "Thiên Lôi Vực", description: "Nơi rèn luyện độ kiếp – boss Lôi Thần, yêu cầu đội nhóm mạnh.", levelRange: "100+", monsters: ["Lôi Điểu"], possibleWeather: ["Bão Tố"] },
      { id: "area_linh_dien", name: "Linh Điện Cửu Trọng", description: "9 tầng tháp thử thách – vượt càng cao phần thưởng càng lớn.", levelRange: "110+", monsters: ["Linh Hầu Cổ"] },
      { id: "area_van_mong", name: "Đảo Vân Mộng", description: "Khu vực thư giãn, câu cá, hẹn hò đạo lữ, mở khóa kỹ năng đôi.", levelRange: "120+", possibleWeather: ["Trời Quang", "Mưa Rào"] },
      { id: "area_than_moc", name: "Thần Mộc Viễn Cổ", description: "Đại thụ cổ – chứa đựng truyền thừa Tiên Nhân thất lạc.", levelRange: "130+", monsters: ["Cự Mộc Hộ Vệ"] }
    ]
  },
  {
    id: "realm_ma_gioi",
    name: "Ma Giới",
    description: "Có thể song song tồn tại với Tiên giới. Bị thiên đạo khinh thường, nhưng lại chứa sức mạnh cấm kỵ.",
    levelRange: "120+",
    areas: [
      { id: "area_hac_phong", name: "Hắc Phong Trì", description: "Linh khí âm tà – luyện ma công, chế tạo pháp bảo tàn độc.", levelRange: "120+", monsters: ["Quỷ Huyết Nô"] },
      { id: "area_huyet_hai", name: "Huyết Hải Vô Biên", description: "Biển máu – mỗi lần chết ở đây sẽ tăng 'sát khí', mở khóa kỹ năng ma đạo.", levelRange: "130+", monsters: ["Ma Ngư"] },
      { id: "area_phong_an", name: "Phong Ấn Cổ Tông", description: "Di tích ma tông – bị phong ấn, cần phá giải để nhận truyền thừa.", levelRange: "140+", monsters: ["U Linh Quân"] },
      { id: "area_co_mo", name: "Cổ Mộ U Linh", description: "Khu mộ của ma thần – boss mạnh, tỷ lệ rớt đồ truyền thuyết cao.", levelRange: "150+", monsters: ["Ma Thần Bất Tử"] },
      { id: "area_ma_de", name: "Lãnh Địa Ma Đế", description: "Thành trì cuối cùng – nơi đặt tổng hành dinh của Ma giới.", levelRange: "160+" }
    ]
  },
  {
    id: "realm_than_gioi",
    name: "Thần Giới",
    description: "Thế giới của những kẻ vượt khỏi thiên đạo, siêu việt, ít người từng đạt tới.",
    levelRange: "150+",
    areas: [
      { id: "area_hu_khong_mon", name: "Hư Không Chi Môn", description: 'Cổng vào – yêu cầu "Phá Thiên Lệnh" để mở.', levelRange: "160+" },
      { id: "area_dien_than_hu", name: "Điện Thần Hư", description: "Nơi các “Thần tu” tu luyện – yêu cầu tinh thông cả ma & tiên pháp.", levelRange: "170+" },
      { id: "area_huyen_canh", name: "Huyễn Cảnh Luân Hồi", description: "Cảnh giới ảo tưởng – cho phép quay lại quá khứ, thay đổi quyết định.", levelRange: "180+", monsters: ["Ảnh Thân", "Huyễn Thú"] },
      { id: "area_canh_tan_than", name: "Cảnh Tàn Thần", description: "Chiến trường thần giới – PvP cấp cao, tranh đoạt bảo vật thần thánh.", levelRange: "190+" },
      { id: "area_long_dien", name: "Long Điện", description: "Trung tâm Thần Giới, tọa lạc giữa Biển Vĩnh Thủy, nơi Chúng Long Chi Chủ ngự trị.", levelRange: "150+", npcs: [], monsters: [], boss: "Bạch Thiên Huyên", possibleWeather: ["Trời Quang", "Mưa Rào"] }
    ]
  }
];
const WEATHER_DATA = {
  "Trời Quang": {
    description: "Bầu trời trong xanh, không mây. Điều kiện lý tưởng."
  },
  "Nắng Gắt": {
    description: "Mặt trời thiêu đốt, không khí nóng như lửa. Gây bất lợi cho sinh vật hệ Băng, trợ lực cho hệ Hỏa.",
    combat: {
      elementalBoost: { type: "Hỏa", multiplier: 1.2 },
      elementalWeaken: { type: "Băng", multiplier: 0.8 }
    },
    world: {
      hpDrain: 1
      // Drains 1 HP every 10 seconds while not in combat
    }
  },
  "Mưa Rào": {
    description: "Mưa lớn trút xuống, làm dịu đi không khí. Trợ lực cho hệ Thủy, khắc chế hệ Hỏa.",
    combat: {
      elementalBoost: { type: "Thủy", multiplier: 1.2 },
      elementalWeaken: { type: "Hỏa", multiplier: 0.8 }
    }
  },
  "Sương Mù": {
    description: "Sương mù dày đặc, tầm nhìn bị hạn chế. Tất cả đòn tấn công đều khó trúng đích hơn.",
    combat: {
      accuracyModifier: -0.15
    }
  },
  "Bão Tố": {
    description: "Sấm chớp rền vang, gió giật mạnh. Trợ lực cực mạnh cho hệ Lôi, nhưng cũng gây khó khăn cho việc tấn công.",
    combat: {
      elementalBoost: { type: "Lôi", multiplier: 1.3 },
      accuracyModifier: -0.1
    }
  }
};
const getAlchemyRankInfo = (level) => {
  if (level >= 51)
    return { name: "Chí Tôn Luyện Đan Sư", successBonus: 0.35, materialSaveChance: 0.25, perk: "Có thể tạo đan mang linh trí" };
  if (level >= 41)
    return { name: "Đại tông sư luyện đan", successBonus: 0.3, materialSaveChance: 0.2, perk: "Có thể luyện đan biến dị" };
  if (level >= 31)
    return { name: "Tông sư luyện đan", successBonus: 0.25, materialSaveChance: 0.15, perk: "Có thể truyền công thức" };
  if (level >= 21)
    return { name: "Cao cấp luyện đan sĩ", successBonus: 0.2, materialSaveChance: 0.1, perk: "Nhận thêm phẩm chất đan ngẫu nhiên" };
  if (level >= 11)
    return { name: "Trung cấp luyện đan sư", successBonus: 0.15, materialSaveChance: 0.05, perk: "Có thể luyện đan hỗ trợ chiến đấu" };
  if (level >= 1)
    return { name: "Sơ cấp luyện đan sư", successBonus: 0.1, materialSaveChance: 0, perk: "Tăng nhẹ tỉ lệ thành công" };
  return { name: "Học đồ luyện đan", successBonus: 0, materialSaveChance: 0, perk: "Có thể luyện đan cơ bản" };
};
const SPIRIT_ROOT_CLASSIFICATIONS = [
  {
    id: "ngu",
    name: "Ngũ Linh Căn",
    description: "Có cả 5 hệ (Kim, Mộc, Thủy, Hỏa, Thổ)",
    cultivationSpeed: "Rất chậm",
    expMultiplier: 1,
    note: "Không bị khắc chế, cân bằng, khó đột phá."
  },
  {
    id: "tu",
    name: "Tứ Linh Căn",
    description: "4 hệ (mất 1 hệ)",
    cultivationSpeed: "Trung bình",
    expMultiplier: 2,
    note: "Cân bằng tốt, dễ học nhiều kỹ năng."
  },
  {
    id: "tam",
    name: "Tam Linh Căn",
    description: "3 hệ",
    cultivationSpeed: "Khá Nhanh",
    expMultiplier: 3,
    note: "Cân đối giữa công và thủ, phổ biến ở tu sĩ."
  },
  {
    id: "song",
    name: "Song Linh Căn",
    description: "2 hệ",
    cultivationSpeed: "Nhanh",
    expMultiplier: 5,
    note: "Dễ định hướng phát triển chuyên biệt."
  },
  {
    id: "thien",
    name: "Thiên Linh Căn",
    description: "1 hệ thuần túy (Kim, Mộc, v.v...)",
    cultivationSpeed: "Rất nhanh",
    expMultiplier: 10,
    note: "Hiếm gặp, tốc độ tu luyện cực cao."
  },
  {
    id: "bien_di",
    name: "Biến Dị Thiên Linh Căn",
    description: "Phong / Lôi / Băng",
    cultivationSpeed: "Nhanh nhất",
    expMultiplier: 20,
    note: "Cực hiếm, gần như thiên tài trong tu tiên giới."
  }
];
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
const generateRandomSpiritRoot = () => {
  const rand = Math.random() * 100;
  let classificationId;
  if (rand < 1) {
    classificationId = "bien_di";
  } else if (rand < 6) {
    classificationId = "thien";
  } else if (rand < 26) {
    classificationId = "song";
  } else if (rand < 56) {
    classificationId = "tam";
  } else if (rand < 81) {
    classificationId = "tu";
  } else {
    classificationId = "ngu";
  }
  const classification = SPIRIT_ROOT_CLASSIFICATIONS.find((c) => c.id === classificationId);
  let attributes = [];
  const NORMAL_ATTRIBUTES = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
  const MUTATED_ATTRIBUTES = ["Phong", "Lôi", "Băng"];
  switch (classificationId) {
    case "ngu":
      attributes = NORMAL_ATTRIBUTES;
      break;
    case "tu":
      attributes = shuffleArray(NORMAL_ATTRIBUTES).slice(0, 4);
      break;
    case "tam":
      attributes = shuffleArray(NORMAL_ATTRIBUTES).slice(0, 3);
      break;
    case "song":
      attributes = shuffleArray(NORMAL_ATTRIBUTES).slice(0, 2);
      break;
    case "thien":
      attributes = [NORMAL_ATTRIBUTES[Math.floor(Math.random() * NORMAL_ATTRIBUTES.length)]];
      break;
    case "bien_di":
      const subRand = Math.random() * 100;
      if (subRand < 5) {
        attributes = shuffleArray(MUTATED_ATTRIBUTES).slice(0, 2);
      } else if (subRand < 30) {
        attributes.push(MUTATED_ATTRIBUTES[Math.floor(Math.random() * MUTATED_ATTRIBUTES.length)]);
        attributes.push(NORMAL_ATTRIBUTES[Math.floor(Math.random() * NORMAL_ATTRIBUTES.length)]);
      } else {
        attributes.push(MUTATED_ATTRIBUTES[Math.floor(Math.random() * MUTATED_ATTRIBUTES.length)]);
      }
      break;
  }
  return {
    classificationId: classification.id,
    attributes: attributes.filter((value, index, self) => self.indexOf(value) === index),
    // Ensure unique
    multiplier: classification.expMultiplier
  };
};
async function callGeminiProxy(payload) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "API call failed");
  }
  return response.json();
}
const generateQuest = async (npc, area, player, allNpcs) => {
  const questSchema = {
    type: "OBJECT",
    // Using strings since we don't have the `Type` enum
    properties: {
      id: { type: "STRING" },
      title: { type: "STRING" },
      description: { type: "STRING" },
      progress: { type: "INTEGER" },
      target: { type: "INTEGER" },
      reward: { type: "STRING" },
      rewardObject: {
        type: "OBJECT",
        properties: { characterExp: { type: "INTEGER" }, cultivationExp: { type: "INTEGER" }, linhThach: { type: "INTEGER" }, itemId: { type: "STRING" } }
      },
      objective: {
        type: "OBJECT",
        properties: { type: { type: "STRING" }, targetName: { type: "STRING" }, itemId: { type: "STRING" } },
        required: ["type", "targetName"]
      }
    },
    required: ["id", "title", "description", "progress", "target", "reward", "objective", "rewardObject"]
  };
  const availableMonsters = area.monsters?.filter((m) => m !== "Không có (thành an toàn)") || [];
  const monsterList = availableMonsters.length > 0 ? availableMonsters.join(", ") : "không có yêu thú nào";
  const otherNpcsInArea = allNpcs.filter((n) => n.currentAreaId === area.id && n.name !== npc);
  const otherNpcs = otherNpcsInArea.length > 0 ? otherNpcsInArea.map((n) => n.name).join(", ") : "không có ai khác";
  const availableCollectibles = ITEM_LIST.filter((i) => i.type === "Nguyên liệu");
  const collectableItems = availableCollectibles.length > 0 ? availableCollectibles.map((i) => `${i.name} (id: ${i.id})`).join("; ") : "không có vật phẩm nào";
  const rewardableItems = ITEM_LIST.filter((i) => ["Nguyên liệu", "Tiêu hao", "Sách Kỹ Năng"].includes(i.type)).map((i) => `${i.name} (id: ${i.id})`).join("; ");
  const possibleQuestTypes = [];
  if (availableMonsters.length > 0)
    possibleQuestTypes.push("'kill'");
  if (availableCollectibles.length > 0)
    possibleQuestTypes.push("'collect'");
  if (otherNpcsInArea.length > 0)
    possibleQuestTypes.push("'talk'");
  if (possibleQuestTypes.length === 0) {
    console.warn(`No possible quest types for NPC ${npc} in area ${area.name}.`);
    return null;
  }
  const questTypesString = possibleQuestTypes.join(", ");
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
    return data;
  } catch (error) {
    console.error("Error generating quest via proxy:", error);
    return null;
  }
};
const generateNpcDialogue = async (npc, area, player) => {
  const dialogueSchema = {
    type: "OBJECT",
    properties: {
      greeting: { type: "STRING" },
      options: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            text: { type: "STRING" },
            response: { type: "STRING" }
          },
          required: ["id", "text"]
        }
      }
    },
    required: ["greeting", "options"]
  };
  const isMerchant = npc.name.includes("Thợ rèn") || npc.name.includes("Thương nhân");
  const tradeOptionInstruction = isMerchant ? "Bao gồm một lựa chọn 'trade' với text 'Giao dịch / Xem hàng'." : "Không bao gồm lựa chọn 'trade'.";
  const isAppraiser = npc.name.includes("Yến Tử Nguyệt");
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
    const dialogue = await callGeminiProxy({ prompt, schema: dialogueSchema });
    if (!dialogue.options.some((opt) => opt.id === "leave")) {
      dialogue.options.push({ id: "leave", text: "Tạm biệt." });
    }
    return dialogue;
  } catch (error) {
    console.error("Error generating NPC dialogue via proxy:", error);
    return null;
  }
};
const generateAdventureStorylet = async () => {
  const adventureStoryletSchema = {
    type: "OBJECT",
    properties: {
      title: { type: "STRING" },
      startStepId: { type: "STRING" },
      steps: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            description: { type: "STRING" },
            choices: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  text: { type: "STRING" },
                  outcome: {
                    type: "OBJECT",
                    properties: {
                      type: { type: "STRING" },
                      nextStepId: { type: "STRING" },
                      monsterName: { type: "STRING" },
                      rewardDescription: { type: "STRING" },
                      rewardExp: { type: "INTEGER" },
                      rewardLinhThach: { type: "INTEGER" },
                      rewardItemId: { type: "STRING" },
                      rewardTitle: { type: "STRING" }
                    },
                    required: ["type"]
                  }
                },
                required: ["text", "outcome"]
              }
            }
          },
          required: ["id", "description", "choices"]
        }
      }
    },
    required: ["title", "startStepId", "steps"]
  };
  const availableMonsters = ["Chuột Đói", "Chó Hoang", "Nhện Độc", "Hổ Vằn Lửa Rừng", "Linh Thạch Nhân", "Ma Ảnh Linh Hồn"].join(", ");
  const availableItems = ITEM_LIST.filter((i) => ["Nguyên liệu", "Tiêu hao"].includes(i.type)).map((i) => `${i.name} (id: ${i.id})`).slice(0, 10).join("; ");
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
    return data;
  } catch (error) {
    console.error("Error generating adventure storylet via proxy:", error);
    return null;
  }
};
const LoginOrRegisterScreen = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Tên đăng nhập và mật khẩu không được để trống.");
      return;
    }
    setError("");
    let success = false;
    if (isLogin) {
      success = onLogin(username, password);
      if (!success)
        setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    } else {
      success = onRegister(username, password);
      if (!success)
        setError("Tên đăng nhập đã tồn tại.");
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "h-screen w-screen flex items-center justify-center p-4 font-sans text-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md bg-black bg-opacity-70 border border-gray-700 rounded-lg p-8 shadow-2xl shadow-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl font-serif text-center text-yellow-300 mb-6 animate-lightning-glow" }, "Huyền Giới Tu Tiên"), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold text-center text-gray-300 mb-6" }, isLogin ? "Đăng Nhập" : "Đăng Ký"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-bold text-gray-400 mb-2" }, "Tài Khoản"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      className: "w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-bold text-gray-400 mb-2" }, "Mật Khẩu"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      className: "w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
    }
  )), error && /* @__PURE__ */ React.createElement("p", { className: "text-red-500 text-sm text-center" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "w-full bg-green-600 text-white text-lg font-bold py-3 rounded-lg border-2 border-green-400 hover:bg-green-500 transition-all duration-300" }, isLogin ? "Tiến Vào" : "Tạo Tài Khoản")), /* @__PURE__ */ React.createElement("p", { className: "text-center mt-6" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setIsLogin(!isLogin);
    setError("");
  }, className: "text-cyan-400 hover:text-cyan-300" }, isLogin ? "Chưa có tài khoản? Đăng ký ngay" : "Đã có tài khoản? Đăng nhập"))));
};
const CharacterCreationScreen = ({ onCharacterCreate }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Nam");
  const [error, setError] = useState("");
  const handleCreate = () => {
    if (!name.trim()) {
      setError("Vui lòng nhập danh xưng của bạn.");
      return;
    }
    setError("");
    onCharacterCreate({ name, gender });
  };
  const avatarUrl = gender === "Nữ" ? "https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg" : "https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg";
  const AvatarDisplay = ({ avatarUrl: avatarUrl2, alt, className }) => {
    const isVideo = avatarUrl2.startsWith("data:video") || avatarUrl2.endsWith(".mp4");
    if (isVideo) {
      return /* @__PURE__ */ React.createElement("video", { src: avatarUrl2, className, autoPlay: true, loop: true, muted: true, playsInline: true, "aria-label": alt });
    }
    return /* @__PURE__ */ React.createElement("img", { src: avatarUrl2, alt, className });
  };
  return /* @__PURE__ */ React.createElement("div", { className: "h-screen w-screen flex items-center justify-center p-4 font-sans text-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-4xl bg-black bg-opacity-60 border border-gray-700 rounded-lg p-6 md:p-8 shadow-2xl shadow-black/50 flex flex-col md:flex-row gap-8 overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "w-full md:w-2/3 flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl md:text-4xl font-serif text-center text-yellow-300 mb-2" }, "Sáng Tạo Nhân Vật"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-lg font-semibold text-yellow-400 font-serif mb-1" }, "Danh Xưng"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "Nhập tên nhân vật...",
      className: "w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-lg font-semibold text-yellow-400 font-serif mb-1" }, "Giới Tính"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, ["Nam", "Nữ"].map(
    (g) => /* @__PURE__ */ React.createElement("button", { key: g, onClick: () => setGender(g), className: `px-4 py-2 rounded border-2 transition-colors w-full ${gender === g ? "bg-yellow-500 text-black border-yellow-400" : "bg-transparent border-gray-600 hover:bg-gray-700"}` }, g)
  ))), /* @__PURE__ */ React.createElement("div", { className: "pt-4 flex-grow flex flex-col justify-center items-center bg-gray-900/50 border border-gray-700 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-cyan-300 font-serif mb-3" }, "Số Mệnh Tiền Định"), /* @__PURE__ */ React.createElement("p", { className: "text-center text-gray-400" }, "Linh căn ban đầu sẽ là 'Chưa biết'.", /* @__PURE__ */ React.createElement("br", null), "Sau khi đạt Cấp 5, hãy đến gặp Giám Linh Sư Yến Tử Nguyệt tại Thành Vân Lâm để giám định. Linh căn có thể được tẩy luyện lại bằng Tẩy Linh Thạch."), error && /* @__PURE__ */ React.createElement("p", { className: "text-red-500 text-sm mt-2" }, error)), /* @__PURE__ */ React.createElement("div", { className: "pt-4" }, /* @__PURE__ */ React.createElement("button", { onClick: handleCreate, disabled: !name.trim(), className: "w-full bg-green-600 text-white text-xl font-bold py-3 rounded-lg border-2 border-green-400 hover:bg-green-500 transition-all duration-300 shadow-lg shadow-green-500/30 disabled:bg-gray-600 disabled:cursor-not-allowed" }, "Tiến Vào Huyền Giới"))), /* @__PURE__ */ React.createElement("div", { className: "w-full md:w-1/3 flex flex-col items-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-serif text-yellow-300 mb-4" }, "Hình Dáng"), /* @__PURE__ */ React.createElement("div", { className: "w-48 h-48 rounded-full overflow-hidden border-2 border-yellow-600 mb-4 flex-shrink-0" }, /* @__PURE__ */ React.createElement(AvatarDisplay, { avatarUrl, alt: "Avatar Preview", className: "w-full h-full object-cover bg-gray-800" })), /* @__PURE__ */ React.createElement("div", { className: "text-center text-gray-400 italic" }, /* @__PURE__ */ React.createElement("p", null, '"Nhất Mộng Tiên Duyên, Phàm Nhân Tu Đạo"'), /* @__PURE__ */ React.createElement("p", { className: "mt-2" }, "Mỗi lựa chọn hôm nay, sẽ tạo nên truyền kỳ ngàn năm sau.")))));
};
const App = () => {
  return /* @__PURE__ */ React.createElement("div", null, "Hello from App");
};
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(App, null))
);
