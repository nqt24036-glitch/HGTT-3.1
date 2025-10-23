var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// fake-react-shim.js
var require_fake_react_shim = __commonJS({
  "fake-react-shim.js"(exports, module) {
    "use strict";
    var react2 = require("react");
    var import_react_dom = require("react-dom/client");
    var App = () => {
      return /* @__PURE__ */ react2.createElement("div", null, "Hello World");
    };
    var rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Could not find root element to mount to");
    }
    var root = (0, import_react_dom.createRoot)(rootElement);
    root.render(/* @__PURE__ */ react2.createElement(App, null));
  }
});

// index.tsx
var index_tsx_exports = {};
__export(index_tsx_exports, {
  default: () => App_default
});
var import_react20 = __toESM(require("react"));
var import_react_dom = __toESM(require("react-dom/client"));

// App.tsx
var import_react19 = __toESM(require("react"));

// data/gameData.ts
var TITLES = [
  {
    id: "Ki\u1EBFm Kh\xE1ch V\xF4 Danh",
    name: "Ki\u1EBFm Kh\xE1ch V\xF4 Danh",
    rarity: "Ph\u1ED5 th\xF4ng",
    description: "\u0110\xE3 nh\u1EADn \u0111\u01B0\u1EE3c s\u1EF1 c\xF4ng nh\u1EADn t\u1EEB m\u1ED9t t\xE0n h\u1ED3n ki\u1EBFm kh\xE1ch.",
    bonuses: { attack: 45 }
  },
  {
    id: "Nguoi_Thu_Gom_Linh_Thao",
    name: "Ng\u01B0\u1EDDi Thu G\xF4m Linh Th\u1EA3o",
    rarity: "Ph\u1ED5 th\xF4ng",
    description: "Thu th\u1EADp \u0111\u1EE7 100 lo\u1EA1i linh th\u1EA3o kh\xE1c nhau.",
    bonuses: { hp: 25 }
  },
  {
    id: "Ke_Diet_Chuot",
    name: "K\u1EBB Di\u1EC7t Chu\u1ED9t",
    rarity: "Ph\u1ED5 th\xF4ng",
    description: "Ti\xEAu di\u1EC7t 50 con Chu\u1ED9t \u0110\xF3i, g\xF3p ph\u1EA7n b\u1EA3o v\u1EC7 m\xF9a m\xE0ng.",
    bonuses: { attack: 15 }
  },
  {
    id: "Nha_Gia_Kim_Tap_Su",
    name: "Nh\xE0 Gi\u1EA3 Kim T\u1EADp S\u1EF1",
    rarity: "Ph\u1ED5 th\xF4ng",
    description: "Luy\u1EC7n ch\u1EBF th\xE0nh c\xF4ng 10 vi\xEAn \u0111an d\u01B0\u1EE3c.",
    bonuses: { mp: 20 }
  },
  {
    id: "H\u1ED9 Hoa S\u1EE9 Gi\u1EA3",
    name: "H\u1ED9 Hoa S\u1EE9 Gi\u1EA3",
    rarity: "Qu\xFD",
    description: "Ra tay ngh\u0129a hi\u1EC7p, gi\xFAp \u0111\u1EE1 ng\u01B0\u1EDDi y\u1EBFu \u0111u\u1ED1i.",
    bonuses: { defense: 70, hp: 80 }
  },
  {
    id: "Th\u1EA7n N\xF4ng Tr\u1EE3 Th\u1EE7",
    name: "Th\u1EA7n N\xF4ng Tr\u1EE3 Th\u1EE7",
    rarity: "Qu\xFD",
    description: "B\u1EA1n \u0111\xE3 gi\xFAp \u0111\u1EE1 m\u1ED9t v\u1ECB D\u01B0\u1EE3c V\u01B0\u01A1ng, cho th\u1EA5y l\xF2ng nh\xE2n \xE1i.",
    bonuses: { magicDefense: 80, luck: 15 }
  },
  {
    id: "Tho_San_Me_Anh",
    name: "Th\u1EE3 S\u0103n M\xEA \u1EA2nh",
    rarity: "Qu\xFD",
    description: "Ti\xEAu di\u1EC7t H\u1ED5 V\u01B0\u01A1ng M\xEA \u1EA2nh t\u1EA1i R\u1EEBng M\xEA \u1EA2nh.",
    bonuses: { attack: 50, speed: 25 }
  },
  {
    id: "Nhan_Tu_Hao_Hiep",
    name: "Nh\xE2n S\u0129 H\u1EA3o Hi\u1EC7p",
    rarity: "Qu\xFD",
    description: "Ho\xE0n th\xE0nh 20 nhi\u1EC7m v\u1EE5 ph\u1EE5, gi\xFAp \u0111\u1EE1 d\xE2n l\xE0nh.",
    bonuses: { defense: 60, hp: 100 }
  },
  {
    id: "Nha_Tham_Hiem_May_Man",
    name: "Nh\xE0 Th\xE1m Hi\u1EC3m May M\u1EAFn",
    rarity: "Qu\xFD",
    description: "T\xECm th\u1EA5y 3 c\u01A1 duy\xEAn \u1EA9n gi\u1EA5u tr\xEAn b\u1EA3n \u0111\u1ED3 th\u1EBF gi\u1EDBi.",
    bonuses: { luck: 25, evasion: 0.02 }
  },
  {
    id: "Bac_Thay_Cuong_Hoa",
    name: "B\u1EADc Th\u1EA7y C\u01B0\u1EDDng H\xF3a",
    rarity: "Qu\xFD",
    description: "C\u01B0\u1EDDng h\xF3a th\xE0nh c\xF4ng m\u1ED9t trang b\u1ECB l\xEAn +5.",
    bonuses: { attack: 30, defense: 30 }
  },
  {
    id: "Th\u1EE3 S\u0103n T\u1EADp S\u1EF1",
    name: "Th\u1EE3 S\u0103n T\u1EADp S\u1EF1",
    rarity: "Hi\u1EBFm",
    description: "Ch\u1EE9ng t\u1ECF k\u1EF9 n\u0103ng s\u0103n b\u1EAFn b\u1EB1ng c\xE1ch h\u1EA1 g\u1EE5c y\xEAu th\xFA \u0111\xE1ng g\u1EDDm.",
    bonuses: { speed: 150, critDamage: 0.15, evasion: 0.1 }
  },
  {
    id: "K\u1EBB K\u1EBF Th\u1EEBa M\u1EB7t Tr\u1EDDi",
    name: "K\u1EBB K\u1EBF Th\u1EEBa M\u1EB7t Tr\u1EDDi",
    rarity: "Hi\u1EBFm",
    description: "H\u1EA5p th\u1EE5 n\u0103ng l\u01B0\u1EE3ng c\u1ED5 x\u01B0a t\u1EEB di t\xEDch sa m\u1EA1c.",
    bonuses: { magicAttack: 250, mp: 100, critRate: 0.1 }
  },
  {
    id: "Ke_Khai_Mo_Linh_Mach",
    name: "K\u1EBB Khai M\u1EDF Linh M\u1EA1ch",
    rarity: "Hi\u1EBFm",
    description: "Tu luy\u1EC7n l\u1EA7n \u0111\u1EA7u t\u1EA1i m\u1ED9t Linh \u0110\u1ECBa Tu Luy\u1EC7n.",
    bonuses: { mp: 250, magicAttack: 200 }
  },
  {
    id: "Ban_Huu_Cua_Linh_Thu",
    name: "B\u1EA1n H\u1EEFu C\u1EE7a Linh Th\xFA",
    rarity: "Hi\u1EBFm",
    description: "S\u1EDF h\u1EEFu 3 \u0111\u1ED3ng h\xE0nh kh\xE1c nhau.",
    bonuses: { hp: 300, defense: 80, magicDefense: 80 }
  },
  {
    id: "Dan_Su_So_Cap",
    name: "\u0110an S\u01B0 S\u01A1 C\u1EA5p",
    rarity: "Hi\u1EBFm",
    description: "\u0110\u1EA1t \u0111\u1EBFn c\u1EA5p b\u1EADc S\u01A1 c\u1EA5p luy\u1EC7n \u0111an s\u01B0.",
    bonuses: { magicDefense: 200, mentalDemonResistance: 0.05, mp: 150 }
  },
  {
    id: "Chien_Binh_Thanh_Van",
    name: "Chi\u1EBFn Binh Thanh V\xE2n",
    rarity: "Hi\u1EBFm",
    description: "Ho\xE0n th\xE0nh chu\u1ED7i nhi\u1EC7m v\u1EE5 ch\xEDnh tuy\u1EBFn t\u1EA1i T\xF4ng m\xF4n Thanh V\xE2n.",
    bonuses: { attack: 180, speed: 100, accuracy: 0.05 }
  },
  {
    id: "Ph\xE1 Thi\xEAn",
    name: "Ph\xE1 Thi\xEAn",
    rarity: "Truy\u1EC1n K\u1EF3",
    description: "Danh hi\u1EC7u cho k\u1EBB d\xE1m th\xE1ch th\u1EE9c Thi\xEAn \u0110\u1EA1o.",
    bonuses: { attack: 2500, critRate: 0.35, armorPen: 0.5, speed: 1e3 }
  },
  {
    id: "Nghich_Thien_Hanh_Gia",
    name: "Ngh\u1ECBch Thi\xEAn H\xE0nh Gi\u1EA3",
    rarity: "Truy\u1EC1n K\u1EF3",
    description: "S\u1ED1ng s\xF3t qua L\xF4i Ki\u1EBFp v\xE0 \u0111\u1ED9t ph\xE1 t\u1EDBi Ti\xEAn Gi\u1EDBi.",
    bonuses: { hp: 3e3, defense: 1500, magicDefense: 1500, blockRate: 0.1 }
  },
  {
    id: "Tru_Ma_Dao_Ton",
    name: "Tr\u1EEB Ma \u0110\u1EA1o T\xF4n",
    rarity: "Truy\u1EC1n K\u1EF3",
    description: "Ti\xEAu di\u1EC7t Ma So\xE1i H\u1EAFc \xC1m t\u1EA1i Th\xE0nh Ma V\u1EF1c.",
    bonuses: { attack: 4e3, armorPen: 0.2, critRate: 0.1 }
  },
  {
    id: "Nguoi_Thua_Ke_Ban_Co",
    name: "Ng\u01B0\u1EDDi Th\u1EEBa K\u1EBF B\xE0n C\u1ED5",
    rarity: "Truy\u1EC1n K\u1EF3",
    description: "\u0110\xE1nh b\u1EA1i C\u1EF1 Th\u1EA7n B\xE0n C\u1ED5 T\xE0n H\u1ED3n v\xE0 nh\u1EADn \u0111\u01B0\u1EE3c truy\u1EC1n th\u1EEBa.",
    bonuses: { attack: 2e3, defense: 2e3, hp: 5e3, speed: 500 }
  },
  {
    id: "Gia T\u1ED9c B\u1EA5t Di\u1EC7t",
    name: "Gia T\u1ED9c B\u1EA5t Di\u1EC7t",
    rarity: "Th\u1EA7n tho\u1EA1i",
    description: "Bi\u1EC3u t\u01B0\u1EE3ng cho s\u1EF1 h\u1ED3i sinh v\xE0 vinh quang c\u1EE7a d\xF2ng t\u1ED9c.",
    bonuses: { hp: 25e4, defense: 15e4, magicDefense: 15e4, blockRate: 0.7, mentalDemonResistance: 0.3 }
  },
  {
    id: "Thien_Dao_Sat_Than",
    name: "Thi\xEAn \u0110\u1EA1o S\xE1t Th\u1EA7n",
    rarity: "Th\u1EA7n tho\u1EA1i",
    description: "\u0110\xE1nh b\u1EA1i ph\xE2n th\xE2n c\u1EE7a Thi\xEAn T\xF4n, k\u1EBB n\u1EAFm gi\u1EEF Thi\xEAn \u0110\u1EA1o.",
    bonuses: { attack: 1e4, critRate: 0.2, critDamage: 0.5, armorPen: 0.3, hp: 15e3 }
  }
];
var UPGRADE_MULTIPLIERS = [
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
var UPGRADE_SUCCESS_RATES = [
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
var UPGRADE_COSTS = [
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
var SUMMON_COST_SINGLE = 1e3;
var SUMMON_COST_TEN = 9e3;
var SUMMON_RATES = {
  "Th\u1EA7n Tho\u1EA1i": 0.005,
  "Truy\u1EC1n K\u1EF3": 0.095,
  "Hi\u1EBFm": 0.3,
  "Qu\xFD": 0.6,
  "Ph\u1ED5 th\xF4ng": 0,
  "T\u1ED1i Th\u01B0\u1EE3ng": 0
};
var CULTIVATION_METHODS_LIST = [
  {
    id: "cm_001",
    name: "Thanh T\xE2m Quy\u1EBFt",
    description: "C\xF4ng ph\xE1p c\u01A1 b\u1EA3n, gi\xFAp t\u0129nh t\xE2m, lo\u1EA1i b\u1ECF t\u1EA1p ni\u1EC7m, t\u1EADp trung v\xE0o vi\u1EC7c h\u1EA5p th\u1EE5 linh kh\xED. T\u0103ng nh\u1EB9 t\u1ED1c \u0111\u1ED9 tu luy\u1EC7n.",
    realmRequirement: "Luy\u1EC7n Kh\xED",
    bonuses: {
      cultivationSpeedBonus: 0.15
    }
  },
  {
    id: "cm_002",
    name: "Kim Cang Quy\u1EBFt",
    description: "C\xF4ng ph\xE1p luy\u1EC7n th\u1EC3, d\xF9ng linh kh\xED \u0111\u1EC3 t\xF4i luy\u1EC7n th\xE2n th\u1EC3, khi\u1EBFn n\xF3 tr\u1EDF n\xEAn c\u1EE9ng r\u1EAFn nh\u01B0 kim c\u01B0\u01A1ng. T\u0103ng m\u1EA1nh ph\xF2ng ng\u1EF1 v\xE0 sinh l\u1EF1c.",
    realmRequirement: "Tr\xFAc C\u01A1",
    bonuses: {
      hp: 100,
      defense: 50,
      cultivationSpeedBonus: 0.05
    }
  },
  {
    id: "cm_003",
    name: "Li\u1EC7t H\u1ECFa Kinh",
    description: "C\xF4ng ph\xE1p b\xE1 \u0111\u1EA1o, chuy\u1EC3n h\xF3a linh kh\xED th\xE0nh ch\xE2n h\u1ECFa, thi\xEAu \u0111\u1ED1t kinh m\u1EA1ch \u0111\u1EC3 t\u0103ng c\u01B0\u1EDDng s\u1EE9c m\u1EA1nh b\u1ED9c ph\xE1t. T\u0103ng m\u1EA1nh c\xF4ng k\xEDch.",
    realmRequirement: "Kim \u0110an",
    bonuses: {
      attack: 50,
      magicAttack: 50,
      critRate: 0.05,
      cultivationSpeedBonus: 0.05
    }
  },
  {
    id: "cm_004",
    name: "Tr\u01B0\u1EDDng Xu\xE2n C\xF4ng",
    description: "C\xF4ng ph\xE1p \xF4n h\xF2a, d\xF9ng linh kh\xED \u0111\u1EC3 nu\xF4i d\u01B0\u1EE1ng sinh c\u01A1, gi\xFAp k\xE9o d\xE0i tu\u1ED5i th\u1ECD v\xE0 t\u0103ng c\u01B0\u1EDDng to\xE0n di\u1EC7n. C\xE1c thu\u1ED9c t\xEDnh \u0111\u01B0\u1EE3c t\u0103ng tr\u01B0\u1EDFng c\xE2n b\u1EB1ng.",
    realmRequirement: "Nguy\xEAn Anh",
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
    name: "V\u1EA1n Ph\xE1p Quy Nh\u1EA5t",
    description: "C\xF4ng ph\xE1p cao th\xE2m, dung h\u1EE3p v\u1EA1n ph\xE1p, gi\xFAp tu s\u0129 t\u0103ng tr\u01B0\u1EDFng to\xE0n di\u1EC7n c\xE1c thu\u1ED9c t\xEDnh chi\u1EBFn \u0111\u1EA5u v\xE0 ph\xF2ng ng\u1EF1.",
    realmRequirement: "H\xF3a Th\u1EA7n",
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
    name: "Th\xE1i Th\u01B0\u1EE3ng Vong T\xECnh L\u1EE5c",
    description: "Ghi ch\xE9p v\u1EC1 c\u1EA3nh gi\u1EDBi v\xF4 t\xECnh c\u1EE7a \u0111\u1EA1i \u0111\u1EA1o, ng\u01B0\u1EDDi tu luy\u1EC7n s\u1EBD g\u1EA1t b\u1ECF th\u1EA5t t\xECnh l\u1EE5c d\u1EE5c, t\u1ED1c \u0111\u1ED9 h\u1EA5p th\u1EE5 linh kh\xED t\u0103ng \u0111\u1EBFn m\u1EE9c kh\xF3 tin.",
    realmRequirement: "Luy\u1EC7n H\u01B0",
    bonuses: {
      cultivationSpeedBonus: 0.5,
      mentalDemonResistance: 0.15
    }
  },
  {
    id: "cm_007",
    name: "S\xE1t L\u1EE5c Ma \u0110i\u1EC3n",
    description: "Ma \u0111i\u1EC3n th\u01B0\u1EE3ng c\u1ED5, c\xE0ng chi\u1EBFn \u0111\u1EA5u c\xE0ng m\u1EA1nh, l\u1EA5y s\xE1t kh\xED \u0111\u1EC3 t\xF4i luy\u1EC7n b\u1EA3n th\xE2n, s\u1EE9c t\u1EA5n c\xF4ng v\xF4 c\xF9ng b\xE1 \u0111\u1EA1o.",
    realmRequirement: "H\u1EE3p Th\u1EC3",
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
    name: "B\u1EA5t Di\u1EC7t Th\xE1nh Th\u1EC3",
    description: "C\xF4ng ph\xE1p luy\u1EC7n th\u1EC3 ch\xED cao, t\xF4i luy\u1EC7n th\xE2n th\u1EC3 th\xE0nh th\xE1nh th\u1EC3 b\u1EA5t di\u1EC7t, v\u1EA1n ki\u1EBFp kh\xF3 t\u1ED5n, l\xE0 n\u1EC1n t\u1EA3ng \u0111\u1EC3 v\u01B0\u1EE3t qua thi\xEAn ki\u1EBFp.",
    realmRequirement: "\u0110\u1ED9 Ki\u1EBFp",
    bonuses: {
      hp: 1e3,
      defense: 300,
      magicDefense: 300,
      blockRate: 0.1
    }
  }
];
var STORY_ITEMS = [
  { id: "item_story_001", name: "Ki\u1EBFm G\xE3y Gia T\u1ED9c", type: "Nhi\u1EC7m v\u1EE5", rarity: "Truy\u1EC1n K\u1EF3", icon: "\uD83D\uDC94", description: "M\u1ED9t thanh ki\u1EBFm g\xE3y, tr\xEAn th\xE2n kh\u1EAFc m\u1ED9t k\xFD hi\u1EC7u huy\u1EBFt m\u1EA1ch c\u1ED5 x\u01B0a. D\xF9 \u0111\xE3 h\u1ECFng nh\u01B0ng v\u1EABn t\u1ECFa ra m\u1ED9t lu\u1ED3ng kh\xED b\u1EA5t ph\xE0m.", story: "\u0110\xE2y l\xE0 di v\u1EADt duy nh\u1EA5t cha \u0111\u1EC3 l\u1EA1i cho b\u1EA1n.", value: 0 },
  { id: "item_story_002", name: "Huy\u1EBFt Tinh Th\xFA", type: "Nhi\u1EC7m v\u1EE5", rarity: "Hi\u1EBFm", icon: "\uD83E\uDE78", description: "Tinh hoa huy\u1EBFt kh\xED c\u1EE7a y\xEAu th\xFA, d\xF9ng \u0111\u1EC3 l\xE0m ch\u1EA5t d\u1EABn cho c\xE1c nghi l\u1EC5 v\xE0 r\xE8n \u0111\xFAc \u0111\u1EB7c bi\u1EC7t.", value: 0 },
  { id: "item_story_003", name: "B\xECnh Linh Kh\xED", type: "Ti\xEAu hao", rarity: "Qu\xFD", icon: "\uD83C\uDFFA", description: "M\u1ED9t chi\u1EBFc b\xECnh nh\u1ECF ch\u1EE9a \u0111\u1EF1ng linh kh\xED tinh thu\u1EA7n, c\xF3 th\u1EC3 h\u1EA5p th\u1EE5 tr\u1EF1c ti\u1EBFp.", expGain: 500, effect: "T\u0103ng 500 Linh L\u1EF1c", value: 200 },
  { id: "item_story_004", name: "Ki\u1EBFm D\u1EF1ng H\u1ED3n", type: "V\u0169 kh\xED", rarity: "Truy\u1EC1n K\u1EF3", slot: "v\u0169 kh\xED", icon: "\u2728", stats: { attack: 5e3, critRate: 10, speed: 1e3 }, description: "Thanh ki\u1EBFm gia truy\u1EC1n sau khi \u0111\u01B0\u1EE3c r\xE8n l\u1EA1i. Linh h\u1ED3n c\u1EE7a thanh ki\u1EBFm d\u01B0\u1EDDng nh\u01B0 \u0111\xE3 th\u1EE9c t\u1EC9nh, c\xF3 th\u1EC3 c\u1ED9ng h\u01B0\u1EDFng v\u1EDBi huy\u1EBFt m\u1EA1ch c\u1EE7a ch\u1EE7 nh\xE2n.", story: "S\u1EE9c m\u1EA1nh th\u1EF1c s\u1EF1 c\u1EE7a n\xF3 v\u1EABn ch\u01B0a \u0111\u01B0\u1EE3c khai m\u1EDF ho\xE0n to\xE0n.", value: 1e3 },
  { id: "item_story_005", name: "V\xE9 Th\xF4ng H\xE0nh", type: "Nhi\u1EC7m v\u1EE5", rarity: "Qu\xFD", icon: "\uD83C\uDFAB", description: "Gi\u1EA5y th\xF4ng h\xE0nh \u0111\u1EC3 tham gia k\u1EF3 thi nh\u1EADp m\xF4n c\u1EE7a T\xF4ng m\xF4n Thanh V\xE2n.", value: 0 },
  { id: "item_story_006", name: "Kh\xED V\u1EADn T\xF4ng M\xF4n", type: "Nhi\u1EC7m v\u1EE5", rarity: "Hi\u1EBFm", icon: "\uD83C\uDF96\uFE0F", description: "M\u1ED9t v\u1EADt ph\u1EA9m t\u01B0\u1EE3ng tr\u01B0ng, cho th\u1EA5y b\u1EA1n l\xE0 m\u1ED9t ph\u1EA7n c\u1EE7a t\xF4ng m\xF4n v\xE0 \u0111\u01B0\u1EE3c kh\xED v\u1EADn c\u1EE7a t\xF4ng m\xF4n che ch\u1EDF.", value: 0 },
  { id: "item_story_007", name: "B\xECnh T\u1EA9y Ma", type: "Nhi\u1EC7m v\u1EE5", rarity: "Hi\u1EBFm", icon: "\u26B1\uFE0F", description: "Chi\u1EBFc b\xECnh c\xF3 kh\u1EA3 n\u0103ng thanh t\u1EA9y ma kh\xED, l\xE0 v\u1EADt ph\u1EA9m quan tr\u1ECDng \u0111\u1EC3 \u0111\u1ED1i ph\xF3 v\u1EDBi ma tu.", value: 0 },
  { id: "item_story_008", name: "Linh Huy\u1EBFt B\xE0n C\u1ED5", type: "Nhi\u1EC7m v\u1EE5", rarity: "Truy\u1EC1n K\u1EF3", icon: "\uD83D\uDCA7", description: "M\u1ED9t gi\u1ECDt m\xE1u tinh t\xFAy \u0111\u01B0\u1EE3c cho l\xE0 c\u1EE7a B\xE0n C\u1ED5 khai thi\xEAn l\u1EADp \u0111\u1ECBa, ch\u1EE9a \u0111\u1EF1ng s\u1EE9c m\u1EA1nh nguy\xEAn th\u1EE7y.", value: 0 },
  { id: "item_story_009", name: "L\xF4i T\xE2m Gi\u1EDBi Th\u1EC3", type: "Ti\xEAu hao", rarity: "Truy\u1EC1n K\u1EF3", icon: "\u26A1", description: "D\xF9ng \u0111\u1EC3 t\xF4i luy\u1EC7n c\u01A1 th\u1EC3 sau khi v\u01B0\u1EE3t qua L\xF4i Ki\u1EBFp, gi\xFAp th\xEDch nghi v\u1EDBi linh kh\xED c\u1EE7a Ti\xEAn Gi\u1EDBi v\xE0 t\u0103ng m\u1EA1nh c\xE1c thu\u1ED9c t\xEDnh.", effect: "T\u0103ng v\u0129nh vi\u1EC5n t\u1EA5t c\u1EA3 c\xE1c ch\u1EC9 s\u1ED1 ti\u1EC1m n\u0103ng.", value: 5e3 },
  { id: "item_story_010", name: "Thi\xEAn M\u1EC7nh Ph\xF9", type: "Ph\xE1p b\u1EA3o", rarity: "Th\u1EA7n Tho\u1EA1i", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDCDC", stats: { attack: 5e4, defense: 5e4, hp: 1e5 }, description: "L\xE1 b\xF9a \u0111\u01B0\u1EE3c cho l\xE0 c\xF3 th\u1EC3 thay \u0111\u1ED5i v\u1EADn m\u1EC7nh, ch\u1ED1ng l\u1EA1i s\u1EF1 s\u1EAFp \u0111\u1EB7t c\u1EE7a Thi\xEAn \u0110\u1EA1o.", story: "V\u1EADn m\u1EC7nh c\u1EE7a ta, do ta kh\xF4ng do tr\u1EDDi.", value: 1e4 },
  { id: "item_story_011", name: "\u1EA4n Gia T\u1ED9c Ph\u1EE5c Sinh", type: "Nhi\u1EC7m v\u1EE5", rarity: "Th\u1EA7n Tho\u1EA1i", icon: "\u269C\uFE0F", description: "Chi\u1EBFc \u1EA5n t\u1EADp h\u1EE3p linh h\u1ED3n c\u1EE7a c\xE1c v\u1ECB t\u1ED5 ti\xEAn, l\xE0 ch\xECa kh\xF3a \u0111\u1EC3 th\u1EF1c hi\u1EC7n nghi l\u1EC5 ph\u1EE5c sinh gia t\u1ED9c.", value: 0 },
  { id: "item_story_012", name: "Th\u1EA7n Huy\u1EBFt B\u1EA5t Di\u1EC7t", type: "Ti\xEAu hao", rarity: "Th\u1EA7n Tho\u1EA1i", icon: "\uD83D\uDC96", description: "D\xF2ng m\xE1u th\u1EA7n th\xE1nh sau khi \u0111\u01B0\u1EE3c h\u1ED3i sinh ho\xE0n to\xE0n, mang l\u1EA1i s\u1EE9c m\u1EA1nh b\u1EA5t di\u1EC7t.", effect: "T\u0103ng v\u0129nh vi\u1EC5n m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn t\u1EA5t c\u1EA3 c\xE1c ch\u1EC9 s\u1ED1.", value: 2e4 },
  { id: "item_story_013", name: "La B\xE0n Huy\u1EC5n C\u1EA3nh", type: "Nhi\u1EC7m v\u1EE5", rarity: "Th\u1EA7n Tho\u1EA1i", icon: "\uD83E\uDDED", description: "M\u1ED9t chi\u1EBFc la b\xE0n c\u1ED5 x\u01B0a c\xF3 th\u1EC3 ch\u1EC9 \u0111\u01B0\u1EDDng v\xE0o Huy\u1EC5n C\u1EA3nh Lu\xE2n H\u1ED3i, n\u01A1i c\u1EA5t gi\u1EEF nh\u1EEFng b\xED m\u1EADt c\u1EE7a Thi\xEAn \u0110\u1EA1o.", value: 0 }
];
var THEMATIC_ITEMS = [
  { id: "item_com_01", name: "\xC1o V\u1EA3i Thanh Th\u1EE7y", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 13 }, requirement: "C\u1EA5p 1", description: "M\u1ED9t chi\u1EBFc \xE1o v\u1EA3i \u0111\u01A0n s\u01A1 nh\u01B0ng ch\u1EAFc ch\u1EAFn, \u0111\u01B0\u1EE3c c\xE1c th\u1EE3 may trong Th\xF4n Thanh Th\u1EE7y l\xE0m ra.", story: "M\u1ED7i \u0111\u01B0\u1EDDng kim m\u0169i ch\u1EC9 \u0111\u1EC1u ch\u1EE9a \u0111\u1EF1ng hy v\u1ECDng v\u1EC1 m\u1ED9t cu\u1ED9c s\u1ED1ng b\xECnh y\xEAn.", value: 10 },
  { id: "item_com_02", name: "Ki\u1EBFm S\u1EAFt Luy\u1EC7n T\u1EADp", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 9 }, requirement: "C\u1EA5p 2", description: "V\u0169 kh\xED ti\xEAu chu\u1EA9n cho c\xE1c tu s\u0129 m\u1EDBi nh\u1EADp m\xF4n, d\xF9ng \u0111\u1EC3 r\xE8n luy\u1EC7n th\xE2n th\u1EC3.", story: "Tr\xEAn th\xE2n ki\u1EBFm c\xF2n kh\u1EAFc ch\u1EEF 'C\u1EA7n c\xF9'.", value: 12 },
  { id: "item_com_03", name: "Gi\xE1p Da Chu\u1ED9t R\u1EEBng", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 19 }, requirement: "C\u1EA5p 3", description: "\u0110\u01B0\u1EE3c l\xE0m t\u1EEB da c\u1EE7a nh\u1EEFng con chu\u1ED9t l\u1EDBn s\u1ED1ng trong r\u1EEBng, c\xF3 kh\u1EA3 n\u0103ng ch\u1ED1ng \u0111\u1EE1 c\xE1c v\u1EBFt c\xE0o nh\u1ECF.", story: "V\u1EABn c\xF2n thoang tho\u1EA3ng m\xF9i c\u1EE7a r\u1EEBng xanh.", value: 15 },
  { id: "item_com_04", name: "\u0110ao Tu\u1EA7n Tra", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 13 }, requirement: "C\u1EA5p 4", description: "V\u0169 kh\xED trang b\u1ECB cho l\xEDnh g\xE1c c\u1EE7a Th\xE0nh V\xE2n L\xE2m.", story: "M\u1ED9t v\u0169 kh\xED \u0111\xE1ng tin c\u1EADy cho nh\u1EEFng \u0111\xEAm d\xE0i canh g\xE1c.", value: 18 },
  { id: "item_com_05", name: "Gi\xE1p Tr\xFAc V\xE2n L\xE2m", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 25 }, requirement: "C\u1EA5p 5", description: "Lo\u1EA1i gi\xE1p nh\u1EB9 l\xE0m t\u1EEB nh\u1EEFng \u0111\u1ED1t tr\xFAc c\u1EE9ng c\xE1p trong r\u1EEBng tr\xFAc ph\xEDa nam th\xE0nh.", story: "Nh\u1EB9 nh\xE0ng v\xE0 linh ho\u1EA1t, \u0111\u01B0\u1EE3c c\xE1c l\xE3ng kh\xE1ch \u01B0a chu\u1ED9ng.", value: 20 },
  { id: "item_com_06", name: "Th\u01B0\u01A1ng S\u1EAFt Nh\u1ECDn", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 17 }, requirement: "C\u1EA5p 6", description: "M\u1ED9t c\xE2y th\u01B0\u01A1ng \u0111\u01A1n gi\u1EA3n nh\u01B0ng hi\u1EC7u qu\u1EA3, d\u1EC5 d\xE0ng ch\u1EBF t\u1EA1o.", story: "\u0110\u1EA7u th\u01B0\u01A1ng \u0111\u01B0\u1EE3c m\xE0i s\u1EAFc b\xE9n, c\xF3 th\u1EC3 xuy\xEAn qua l\u1EDBp da d\xE0y.", value: 22 },
  { id: "item_com_07", name: "\xC1o Cho\xE0ng B\u1EE5i B\u1EB7m", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 31 }, requirement: "C\u1EA5p 7", description: "Chi\u1EBFc \xE1o cho\xE0ng c\u1EE7a m\u1ED9t ng\u01B0\u1EDDi l\u1EEF h\xE0nh, \u0111\xE3 b\u1EA1c m\xE0u v\xEC s\u01B0\u01A1ng gi\xF3.", story: "N\xF3 \u0111\xE3 ch\u1EE9ng ki\u1EBFn nhi\u1EC1u c\xE2u chuy\u1EC7n h\u01A1n b\u1EA1n c\xF3 th\u1EC3 t\u01B0\u1EDFng t\u01B0\u1EE3ng.", value: 25 },
  { id: "item_com_08", name: "Song Th\u1EE7 Luy\u1EC7n C\xF4ng", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 21 }, requirement: "C\u1EA5p 8", description: "M\u1ED9t c\u1EB7p dao g\u0103m c\u01A1 b\u1EA3n \u0111\u1EC3 luy\u1EC7n t\u1EADp song th\u1EE7.", story: "S\u1EF1 c\xE2n b\u1EB1ng l\xE0 ch\xECa kh\xF3a \u0111\u1EC3 s\u1EED d\u1EE5ng ch\xFAng hi\u1EC7u qu\u1EA3.", value: 28 },
  { id: "item_com_09", name: "Gi\xE1p Da S\xF3i", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 37 }, requirement: "C\u1EA5p 9", description: "\u0110\u01B0\u1EE3c l\xE0m t\u1EEB da c\u1EE7a nh\u1EEFng con ch\xF3 hoang hung d\u1EEF.", story: "Mang tr\xEAn m\xECnh s\u1EE9c m\u1EA1nh c\u1EE7a lo\xE0i d\xE3 th\xFA.", value: 30 },
  { id: "item_com_10", name: "Tr\u01B0\u1EDDng \u0110ao M\xEA \u1EA2nh", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 25 }, requirement: "C\u1EA5p 10", description: "V\u0169 kh\xED th\u01B0\u1EDDng \u0111\u01B0\u1EE3c t\xECm th\u1EA5y trong R\u1EEBng M\xEA \u1EA2nh, l\u01B0\u1EE1i \u0111ao ph\u1EA3n chi\u1EBFu \xE1nh s\xE1ng k\u1EF3 l\u1EA1.", story: "Ng\u01B0\u1EDDi ta n\xF3i r\u1EB1ng n\xF3 c\xF3 th\u1EC3 ch\xE9m v\xE0o c\u1EA3 nh\u1EEFng \u1EA3o \u1EA3nh.", value: 32 },
  { id: "item_com_11", name: "Gi\xE1p M\u1ED9c", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 43 }, requirement: "C\u1EA5p 11", description: "Gi\xE1p l\xE0m t\u1EEB v\u1ECF c\xE2y c\u1ED5 th\u1EE5, c\u1EE9ng h\u01A1n t\u01B0\u1EDFng t\u01B0\u1EE3ng.", story: "H\u1EA5p th\u1EE5 linh kh\xED c\u1EE7a \u0111\u1EA5t tr\u1EDDi, mang l\u1EA1i c\u1EA3m gi\xE1c v\u1EEFng ch\xE3i.", value: 35 },
  { id: "item_com_12", name: "B\xFAa Chi\u1EBFn S\u01A1 C\u1EA5p", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 29 }, requirement: "C\u1EA5p 12", description: "M\u1ED9t c\xE2y b\xFAa n\u1EB7ng, th\xEDch h\u1EE3p cho nh\u1EEFng ng\u01B0\u1EDDi c\xF3 s\u1EE9c m\u1EA1nh.", story: "M\u1ED9t c\xFA vung c\xF3 th\u1EC3 l\xE0m n\u1EE9t c\u1EA3 \u0111\xE1 t\u1EA3ng.", value: 38 },
  { id: "item_com_13", name: "Gi\xE1p Th\xE9p Non", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 49 }, requirement: "C\u1EA5p 13", description: "M\u1ED9t b\u1ED9 gi\xE1p th\xE9p \u0111\u01B0\u1EE3c r\xE8n b\u1EDFi c\xE1c th\u1EE3 r\xE8n t\u1EADp s\u1EF1.", story: "D\xF9 tay ngh\u1EC1 c\xF2n non, nh\u01B0ng n\xF3 v\u1EABn \u0111\u1EE7 \u0111\u1EC3 b\u1EA3o v\u1EC7.", value: 40 },
  { id: "item_com_14", name: "Cung T\xEAn Th\u1EE3 S\u0103n", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 33 }, requirement: "C\u1EA5p 14", description: "C\xE2y cung \u0111\xE1ng tin c\u1EADy c\u1EE7a nh\u1EEFng ng\u01B0\u1EDDi s\u1ED1ng b\u1EB1ng ngh\u1EC1 s\u0103n b\u1EAFn.", story: "M\u1ED7i m\u0169i t\xEAn \u0111\u1EC1u mang theo hy v\u1ECDng v\u1EC1 m\u1ED9t b\u1EEFa \u0103n no.", value: 42 },
  { id: "item_com_15", name: "Gi\xE1p V\u1EA3y Nh\u1EC7n", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 55 }, requirement: "C\u1EA5p 15", description: "\u0110\u01B0\u1EE3c d\u1EC7t t\u1EEB t\u01A1 c\u1EE7a Nh\u1EC7n \u0110\u1ED9c, nh\u1EB9 v\xE0 b\u1EC1n.", story: "C\xF3 kh\u1EA3 n\u0103ng ch\u1ED1ng l\u1EA1i c\xE1c lo\u1EA1i \u0111\u1ED9c t\u1ED1 nh\u1EB9.", value: 45 },
  { id: "item_com_16", name: "Dao G\u0103m \u0110\u1ED9c", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 37 }, requirement: "C\u1EA5p 16", description: "L\u01B0\u1EE1i dao \u0111\u01B0\u1EE3c t\u1EA9m n\u1ECDc c\u1EE7a Nh\u1EC7n \u0110\u1ED9c.", story: "M\u1ED9t v\u1EBFt x\u01B0\u1EDBc nh\u1ECF c\u0169ng \u0111\u1EE7 \u0111\u1EC3 g\xE2y ra phi\u1EC1n to\xE1i.", value: 48 },
  { id: "item_com_17", name: "Gi\xE1p Da H\u1ED5", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 61 }, requirement: "C\u1EA5p 17", description: "\u0110\u01B0\u1EE3c l\xE0m t\u1EEB da c\u1EE7a H\u1ED5 V\u1EB1n L\u1EEDa R\u1EEBng, mang uy th\u1EBF c\u1EE7a ch\xFAa s\u01A1n l\xE2m.", story: "Nh\u1EEFng v\u1EBFt s\u1EB9o tr\xEAn t\u1EA5m da k\u1EC3 v\u1EC1 nh\u1EEFng tr\u1EADn chi\u1EBFn kh\u1ED1c li\u1EC7t.", value: 50 },
  { id: "item_com_18", name: "Vu\u1ED1t H\u1ED5", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 41 }, requirement: "C\u1EA5p 18", description: "M\u1ED9t c\u1EB7p v\u0169 kh\xED \u0111\u01B0\u1EE3c ch\u1EBF t\xE1c t\u1EEB m\xF3ng vu\u1ED1t c\u1EE7a H\u1ED5 V\u1EB1n L\u1EEDa R\u1EEBng.", story: "S\u1EAFc b\xE9n v\xE0 ch\u1EBFt ch\xF3c, m\xF4 ph\u1ECFng s\u1EF1 hung h\xE3n c\u1EE7a lo\xE0i h\u1ED5.", value: 52 },
  { id: "item_com_19", name: "Gi\xE1p Hang \u0110\u1ED9ng", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 67 }, requirement: "C\u1EA5p 19", description: "B\u1ED9 gi\xE1p \u0111\u01B0\u1EE3c t\xECm th\u1EA5y trong c\xE1c hang \u0111\u1ED9ng t\u1ED1i t\u0103m, ph\u1EE7 \u0111\u1EA7y r\xEAu v\xE0 b\u1EE5i.", story: "Ai l\xE0 ch\u1EE7 nh\xE2n tr\u01B0\u1EDBc \u0111\xE2y c\u1EE7a n\xF3? Kh\xF4ng ai bi\u1EBFt.", value: 55 },
  { id: "item_com_20", name: "C\xF4n Nh\u1ECB Kh\xFAc", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 45 }, requirement: "C\u1EA5p 20", description: "V\u0169 kh\xED linh ho\u1EA1t, kh\xF3 s\u1EED d\u1EE5ng nh\u01B0ng uy l\u1EF1c.", story: "V\u0169 kh\xED y\xEAu th\xEDch c\u1EE7a c\xE1c t\xE1n tu th\xEDch s\u1EF1 t\u1EF1 do.", value: 58 },
  { id: "item_com_21", name: "Gi\xE1p \u0110\xE1 Tinh Th\u1EA1ch", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 73 }, requirement: "C\u1EA5p 21", description: "\u0110\u01B0\u1EE3c gh\xE9p t\u1EEB nh\u1EEFng m\u1EA3nh \u0111\xE1 ch\u1EE9a linh kh\xED y\u1EBFu.", story: "Ph\xE1t ra \xE1nh s\xE1ng m\u1EDD \u1EA3o trong b\xF3ng t\u1ED1i.", value: 60 },
  { id: "item_com_22", name: "Gi\xE1o Luy\u1EC7n Kh\xED", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 49 }, requirement: "C\u1EA5p 22", description: "M\u1ED9t c\xE2y gi\xE1o \u0111\u01A1n gi\u1EA3n, th\u01B0\u1EDDng \u0111\u01B0\u1EE3c d\xF9ng b\u1EDFi c\xE1c tu s\u0129 Luy\u1EC7n Kh\xED K\u1EF3.", story: "V\u0169 kh\xED ph\u1ED5 bi\u1EBFn trong c\xE1c cu\u1ED9c giao tranh nh\u1ECF.", value: 62 },
  { id: "item_com_23", name: "Gi\xE1p Tinh Anh", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 79 }, requirement: "C\u1EA5p 23", description: "B\u1ED9 gi\xE1p ti\xEAu chu\u1EA9n c\u1EE7a c\xE1c \u0111\u1EC7 t\u1EED \u01B0u t\xFA trong t\xF4ng m\xF4n.", story: "L\xE0 bi\u1EC3u t\u01B0\u1EE3ng c\u1EE7a s\u1EF1 n\u1ED7 l\u1EF1c v\xE0 t\xE0i n\u0103ng.", value: 65 },
  { id: "item_com_24", name: "Ki\u1EBFm \u0110\u1EC7 T\u1EED", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 53 }, requirement: "C\u1EA5p 24", description: "Ki\u1EBFm \u0111\u01B0\u1EE3c t\xF4ng m\xF4n c\u1EA5p ph\xE1t cho c\xE1c \u0111\u1EC7 t\u1EED ch\xEDnh th\u1EE9c.", story: "Tr\xEAn v\u1ECF ki\u1EBFm kh\u1EAFc t\xEAn c\u1EE7a t\xF4ng m\xF4n.", value: 68 },
  { id: "item_com_25", name: "Gi\xE1p H\u1ED9 V\u1EC7", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 85 }, requirement: "C\u1EA5p 25", description: "B\u1ED9 gi\xE1p n\u1EB7ng, d\xE0nh cho nh\u1EEFng ng\u01B0\u1EDDi \u0111\u1EE9ng \u1EDF tuy\u1EBFn \u0111\u1EA7u.", story: "T\u1EA5m l\u01B0ng v\u1EEFng ch\xE3i l\xE0 ch\u1ED7 d\u1EF1a cho \u0111\u1ED3ng \u0111\u1ED9i.", value: 70 },
  { id: "item_com_26", name: "\u0110\u1EA1i \u0110ao H\u1ED9 V\u1EC7", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 57 }, requirement: "C\u1EA5p 26", description: "Thanh \u0111\u1EA1i \u0111ao n\u1EB7ng tr\u1ECBch, ch\u1EC9 nh\u1EEFng ng\u01B0\u1EDDi c\xF3 s\u1EE9c m\u1EA1nh phi th\u01B0\u1EDDng m\u1EDBi c\xF3 th\u1EC3 s\u1EED d\u1EE5ng.", story: "M\u1ED9t nh\xE1t ch\xE9m c\xF3 th\u1EC3 qu\xE9t s\u1EA1ch m\u1ECDi ch\u01B0\u1EDBng ng\u1EA1i.", value: 72 },
  { id: "item_com_27", name: "\xC1o Cho\xE0ng T\u1ECBch D\u01B0\u01A1ng", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 91 }, requirement: "C\u1EA5p 27", description: "Chi\u1EBFc \xE1o cho\xE0ng \u0111\u01B0\u1EE3c nhu\u1ED9m m\xE0u c\u1EE7a ho\xE0ng h\xF4n tr\xEAn \u0110\u1EC9nh T\u1ECBch D\u01B0\u01A1ng.", story: "Mang trong m\xECnh s\u1EF1 \u1EA5m \xE1p c\u1EE7a nh\u1EEFng tia n\u1EAFng cu\u1ED1i c\xF9ng.", value: 75 },
  { id: "item_com_28", name: "Ph\xE1p Tr\u01B0\u1EE3ng T\u1ECBch D\u01B0\u01A1ng", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 61 }, requirement: "C\u1EA5p 28", description: "C\xE2y tr\u01B0\u1EE3ng g\u1ED7 \u0111\u01B0\u1EE3c h\u1EA5p th\u1EE5 linh kh\xED tr\xEAn \u0110\u1EC9nh T\u1ECBch D\u01B0\u01A1ng.", story: "\u0110\u1EA7u tr\u01B0\u1EE3ng kh\u1EA3m m\u1ED9t vi\xEAn \u0111\xE1 ph\xE1t ra \xE1nh s\xE1ng d\u1ECBu nh\u1EB9.", value: 78 },
  { id: "item_com_29", name: "Gi\xE1p Tr\xFAc C\u01A1 S\u01A1 Nh\u1EADp", type: "\xC1o gi\xE1p", rarity: "Ph\u1ED5 th\xF4ng", slot: "\xE1o gi\xE1p", icon: "\uD83D\uDC55", stats: { defense: 97 }, requirement: "C\u1EA5p 29", description: "B\u1ED9 gi\xE1p \u0111\u01A1n gi\u1EA3n d\xE0nh cho c\xE1c tu s\u0129 v\u1EEBa \u0111\u1ED9t ph\xE1 Tr\xFAc C\u01A1.", story: "L\xE0 b\u01B0\u1EDBc kh\u1EDFi \u0111\u1EA7u tr\xEAn con \u0111\u01B0\u1EDDng tu ti\xEAn th\u1EF1c s\u1EF1.", value: 80 },
  { id: "item_com_30", name: "Ki\u1EBFm Tr\xFAc C\u01A1", type: "V\u0169 kh\xED", rarity: "Ph\u1ED5 th\xF4ng", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 65 }, requirement: "C\u1EA5p 30", description: "Thanh ki\u1EBFm \u0111\u01B0\u1EE3c gia tr\xEC m\u1ED9t \xEDt linh l\u1EF1c, s\u1EAFc b\xE9n h\u01A1n ki\u1EBFm ph\xE0m.", story: "C\xF3 th\u1EC3 ch\xE9m \u0111\u1EE9t s\u1EAFt th\xE9p m\u1ED9t c\xE1ch d\u1EC5 d\xE0ng.", value: 82 },
  { id: "item_tv_01", name: "Thanh V\xE2n \u0110\u1EC7 T\u1EED L\u1EC7nh", type: "Nhi\u1EC7m v\u1EE5", rarity: "Qu\xFD", icon: "\u4EE4\u724C", description: "L\u1EC7nh b\xE0i c\u1EE7a \u0111\u1EC7 t\u1EED Thanh V\xE2n T\xF4ng, cho ph\xE9p t\u1EF1 do ra v\xE0o s\u01A1n m\xF4n.", value: 0 },
  { id: "item_rar_01", name: "Huy\u1EBFt Lang Nha Ki\u1EBFm", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 23, critRate: 0.03 }, requirement: "C\u1EA5p 16", description: "\u0110\u01B0\u1EE3c r\xE8n t\u1EEB nanh c\u1EE7a m\u1ED9t con s\xF3i y\xEAu, l\u01B0\u1EE1i ki\u1EBFm \xE1nh l\xEAn m\xE0u \u0111\u1ECF c\u1EE7a m\xE1u.", story: "Nghe \u0111\u1ED3n n\xF3 v\u1EABn c\xF2n gi\u1EEF l\u1EA1i s\u1EF1 hung h\xE3n c\u1EE7a y\xEAu th\xFA.", value: 150 },
  { id: "item_rar_02", name: "H\u1ED9 Ph\xF9 B\xECnh An", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 70 }, requirement: "C\u1EA5p 17", description: "L\xE1 b\xF9a \u0111\u01B0\u1EE3c c\xE1c \u0111\u1EA1o s\u0129 cao tay khai quang, mang l\u1EA1i s\u1EF1 b\xECnh an.", story: "Ch\u1EE9a \u0111\u1EF1ng m\u1ED9t ch\xFAt linh l\u1EF1c b\u1EA3o v\u1EC7, c\xF3 th\u1EC3 gi\xFAp ch\u1EE7 nh\xE2n tr\xE1nh \u0111\u01B0\u1EE3c tai \u01B0\u01A1ng nh\u1ECF.", value: 160 },
  { id: "item_rar_03", name: "L\xE2n Gi\xE1p \u0110ao", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 29, critRate: 0.03 }, requirement: "C\u1EA5p 18", description: "Th\xE2n \u0111ao \u0111\u01B0\u1EE3c kh\u1EA3m v\u1EA3y c\u1EE7a m\u1ED9t lo\xE0i c\xE1 y\xEAu, v\u1EEBa \u0111\u1EB9p v\u1EEBa ch\u1EAFc ch\u1EAFn.", story: "Khi vung l\xEAn, n\xF3 t\u1EA1o ra \xE2m thanh nh\u01B0 s\xF3ng v\u1ED7.", value: 170 },
  { id: "item_rar_04", name: "Tr\xE2m G\u1ED7 Linh T\xEA", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 90 }, requirement: "C\u1EA5p 19", description: "\u0110\u01B0\u1EE3c l\xE0m t\u1EEB g\u1ED7 c\u1EE7a c\xE2y Linh T\xEA, gi\xFAp t\u0129nh t\xE2m an th\u1EA7n.", story: "\u0110eo n\xF3 b\xEAn ng\u01B0\u1EDDi c\xF3 th\u1EC3 gi\xFAp ch\u1ED1ng l\u1EA1i t\xE2m ma x\xE2m nh\u1EADp.", value: 180 },
  { id: "item_rar_05", name: "Ki\u1EBFm Thanh Phong", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 35, critRate: 0.03 }, requirement: "C\u1EA5p 20", description: "M\u1ED9t thanh ki\u1EBFm nh\u1EB9 v\xE0 nhanh, khi m\xFAa l\xEAn t\u1EF1a nh\u01B0 gi\xF3 tho\u1EA3ng.", story: "L\u1EF1a ch\u1ECDn c\u1EE7a nh\u1EEFng tu s\u0129 theo \u0111u\u1ED5i t\u1ED1c \u0111\u1ED9.", value: 190 },
  { id: "item_rar_06", name: "Ng\u1ECDc B\u1ED9i T\u1EE5 Linh", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 110 }, requirement: "C\u1EA5p 21", description: "Mi\u1EBFng ng\u1ECDc b\u1ED9i c\xF3 kh\u1EA3 n\u0103ng thu h\xFAt linh kh\xED xung quanh.", story: "Gi\xFAp ng\u01B0\u1EDDi \u0111eo c\u1EA3m th\u1EA5y tinh th\u1EA7n s\u1EA3ng kho\xE1i, tu luy\u1EC7n nhanh h\u01A1n m\u1ED9t ch\xFAt.", value: 200 },
  { id: "item_rar_07", name: "Chi\u1EBFn Chu\u1EF3 Thi\u1EBFt \u0110\u1EA7u", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 41, critRate: 0.03 }, requirement: "C\u1EA5p 22", description: "C\xE2y chu\u1EF3 s\u1EAFt n\u1EB7ng, c\xF3 s\u1EE9c c\xF4ng ph\xE1 \u0111\xE1ng k\u1EC3.", story: "\u0110\u01B0\u1EE3c c\xE1c th\u1EC3 tu \u01B0a d\xF9ng \u0111\u1EC3 r\xE8n luy\u1EC7n c\u01A1 b\u1EAFp.", value: 210 },
  { id: "item_rar_08", name: "T\xFAi Th\u01A1m An Th\u1EA7n", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 130 }, requirement: "C\u1EA5p 23", description: "B\xEAn trong ch\u1EE9a c\xE1c lo\u1EA1i linh th\u1EA3o gi\xFAp an th\u1EA7n, t\u0129nh t\xE2m.", story: "M\xF9i h\u01B0\u01A1ng c\u1EE7a n\xF3 c\xF3 th\u1EC3 xua \u0111u\u1ED5i c\xE1c lo\xE0i y\xEAu th\xFA c\u1EA5p th\u1EA5p.", value: 220 },
  { id: "item_rar_09", name: "Cung Linh M\u1ED9c", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 47, critRate: 0.03 }, requirement: "C\u1EA5p 24", description: "\u0110\u01B0\u1EE3c l\xE0m t\u1EEB c\xE0nh c\u1EE7a c\xE2y linh m\u1ED9c, c\xF3 t\xEDnh \u0111\xE0n h\u1ED3i t\u1ED1t.", story: "M\u0169i t\xEAn b\u1EAFn ra \u0111\u01B0\u1EE3c gia tr\xEC b\u1EDFi linh kh\xED c\u1EE7a m\u1ED9c.", value: 230 },
  { id: "item_rar_10", name: "G\u01B0\u01A1ng H\u1ED9 T\xE2m", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 150 }, requirement: "C\u1EA5p 25", description: "M\u1ED9t chi\u1EBFc g\u01B0\u01A1ng \u0111\u1ED3ng nh\u1ECF, c\xF3 th\u1EC3 ph\u1EA3n l\u1EA1i c\xE1c \u0111\xF2n t\u1EA5n c\xF4ng tinh th\u1EA7n.", story: "Ng\u01B0\u1EDDi ta n\xF3i r\u1EB1ng n\xF3 c\xF3 th\u1EC3 chi\u1EBFu r\u1ECDi c\u1EA3 nh\u1EEFng \xFD ngh\u0129 x\u1EA5u xa.", value: 240 },
  { id: "item_rar_11", name: "Ph\xE1p Tr\u01B0\u1EE3ng Tinh Th\u1EA1ch", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 53, critRate: 0.03 }, requirement: "C\u1EA5p 26", description: "\u0110\u1EA7u tr\u01B0\u1EE3ng kh\u1EA3m m\u1ED9t vi\xEAn tinh th\u1EA1ch, gi\xFAp khu\u1EBFch \u0111\u1EA1i ph\xE1p thu\u1EADt.", story: "L\xE0 c\xF4ng c\u1EE5 kh\xF4ng th\u1EC3 thi\u1EBFu c\u1EE7a c\xE1c ph\xE1p tu.", value: 250 },
  { id: "item_rar_12", name: "Chu\u1ED7i H\u1EA1t \u0110\u1ECBnh T\xE2m", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 170 }, requirement: "C\u1EA5p 27", description: "Chu\u1ED7i h\u1EA1t l\xE0m t\u1EEB g\u1ED7 \u0111\xE0n h\u01B0\u01A1ng, gi\xFAp ng\u01B0\u1EDDi \u0111eo t\u1EADp trung khi tu luy\u1EC7n.", story: "M\u1ED7i h\u1EA1t \u0111\u1EC1u \u0111\u01B0\u1EE3c kh\u1EAFc m\u1ED9t c\xE2u ch\xFA nh\u1ECF.", value: 260 },
  { id: "item_rar_13", name: "B\xE3o Ki\u1EBFm", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 59, critRate: 0.03 }, requirement: "C\u1EA5p 28", description: "Thanh ki\u1EBFm r\u1ED9ng b\u1EA3n, khi vung l\xEAn t\u1EA1o ra ti\u1EBFng gi\xF3 r\xEDt.", story: "S\u1EE9c m\u1EA1nh c\u1EE7a n\xF3 nh\u01B0 m\u1ED9t c\u01A1n b\xE3o nh\u1ECF.", value: 270 },
  { id: "item_rar_14", name: "\u1EA4n Tr\u1EA5n H\u1ED3n", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 190 }, requirement: "C\u1EA5p 29", description: "M\u1ED9t chi\u1EBFc \u1EA5n nh\u1ECF, c\xF3 kh\u1EA3 n\u0103ng tr\u1EA5n \xE1p c\xE1c lo\u1EA1i t\xE0 ma, y\xEAu qu\u1EF7.", story: "Th\u01B0\u1EDDng \u0111\u01B0\u1EE3c c\xE1c \u0111\u1EA1o s\u0129 d\xF9ng trong c\xE1c chuy\u1EBFn \u0111i h\xE0ng y\xEAu di\u1EC7t ma.", value: 280 },
  { id: "item_rar_15", name: "L\xF4i Tinh Song \u0110ao", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 65, critRate: 0.03 }, requirement: "C\u1EA5p 30", description: "C\u1EB7p \u0111ao \u0111\u01B0\u1EE3c r\xE8n trong \u0111\xEAm m\u01B0a b\xE3o, h\u1EA5p th\u1EE5 m\u1ED9t tia s\xE9t.", story: "Khi ch\xE9m v\xE0o nhau, ch\xFAng ph\xE1t ra tia l\u1EEDa \u0111i\u1EC7n nh\u1ECF.", value: 290 },
  { id: "item_rar_16", name: "Kim Cang B\u1ED9i", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 210 }, requirement: "C\u1EA5p 31", description: "Mi\u1EBFng ng\u1ECDc b\u1ED9i kh\u1EAFc h\xECnh th\u1EA7n Kim Cang, t\u0103ng c\u01B0\u1EDDng s\u1EF1 c\u1EE9ng c\xE1p.", story: "Mang l\u1EA1i cho ng\u01B0\u1EDDi \u0111eo m\u1ED9t \xFD ch\xED s\u1EAFt \u0111\xE1, kh\xF4ng d\u1EC5 b\u1ECB khu\u1EA5t ph\u1EE5c.", value: 300 },
  { id: "item_rar_17", name: "B\u0103ng Tinh Ki\u1EBFm", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 71, critRate: 0.03 }, requirement: "C\u1EA5p 32", description: "Thanh ki\u1EBFm \u0111\u01B0\u1EE3c l\xE0m t\u1EEB b\u0103ng v\u0129nh c\u1EEDu, t\u1ECFa ra h\xE0n kh\xED.", story: "C\xF3 th\u1EC3 l\xE0m ch\u1EADm k\u1EBB \u0111\u1ECBch khi g\xE2y ra v\u1EBFt th\u01B0\u01A1ng.", value: 310 },
  { id: "item_rar_18", name: "H\u1ECFa V\xE2n Ch\xE2u", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 230 }, requirement: "C\u1EA5p 33", description: "Vi\xEAn ng\u1ECDc ch\u1EE9a \u0111\u1EF1ng linh l\u1EF1c c\u1EE7a h\u1ECFa, \u1EA5m \xE1p khi ch\u1EA1m v\xE0o.", story: "Trong \u0111\xEAm t\u1ED1i, n\xF3 t\u1ECFa ra \xE1nh s\xE1ng nh\u01B0 m\u1ED9t \u0111\xE1m m\xE2y l\u1EEDa nh\u1ECF.", value: 320 },
  { id: "item_rar_19", name: "\xC2m Phong \u0110ao", type: "V\u0169 kh\xED", rarity: "Qu\xFD", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 77, critRate: 0.03 }, requirement: "C\u1EA5p 34", description: "L\u01B0\u1EE1i \u0111ao m\u1ECFng nh\u01B0 c\xE1nh ve, \u0111\u01B0\u1EE3c r\xE8n trong n\u01A1i \xE2m kh\xED n\u1EB7ng n\u1EC1.", story: "Ti\u1EBFng vung \u0111ao nh\u01B0 ti\u1EBFng gi\xF3 r\xEDt qua khe c\u1EEDa \u0111\u1ECBa ng\u1EE5c.", value: 330 },
  { id: "item_rar_20", name: "Linh Quy Gi\xE1p", type: "Ph\xE1p b\u1EA3o", rarity: "Qu\xFD", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDC8D", stats: { hp: 250 }, requirement: "C\u1EA5p 35", description: "M\u1ED9t chi\u1EBFc mai r\xF9a nh\u1ECF, \u0111\u01B0\u1EE3c kh\u1EAFc \u0111\u1EA7y ph\xF9 v\u0103n ph\xF2ng ng\u1EF1.", story: "L\xE0 b\xF9a h\u1ED9 m\u1EC7nh c\u1EE7a nh\u1EEFng ng\u01B0\u1EDDi hay \u0111i xa.", value: 340 }
];
var MYTHIC_ITEMS = [
  { id: "item_myt_01", name: "H\u1ED7n \u0110\u1ED9n Gi\xE1p", type: "\xC1o gi\xE1p", rarity: "Th\u1EA7n Tho\u1EA1i", slot: "\xE1o gi\xE1p", icon: "\uD83C\uDF0C", stats: { defense: 25e4, magicDefense: 25e4, hp: 5e5 }, requirement: "Kim \u0110an K\u1EF3", description: "B\u1ED9 gi\xE1p \u0111\u01B0\u1EE3c sinh ra t\u1EEB kh\xED h\u1ED7n \u0111\u1ED9n s\u01A1 khai, v\u1EA1n ph\xE1p b\u1EA5t x\xE2m.", story: "M\u1EB7c n\xF3 v\xE0o, b\u1EA1n c\xF3 th\u1EC3 c\u1EA3m nh\u1EADn \u0111\u01B0\u1EE3c s\u1EF1 v\u1EADn h\xE0nh c\u1EE7a \u0111\u1EA1i \u0111\u1EA1o.", value: 1e4, effect: "H\u1EA5p th\u1EE5 m\u1ED9t ph\u1EA7n nh\u1ECF s\xE1t th\u01B0\u01A1ng nh\u1EADn v\xE0o v\xE0 chuy\u1EC3n h\xF3a th\xE0nh MP." },
  { id: "item_myt_02", name: "Khai Thi\xEAn Ph\u1EE7", type: "V\u0169 kh\xED", rarity: "Th\u1EA7n Tho\u1EA1i", slot: "v\u0169 kh\xED", icon: "\uD83E\uDE93", stats: { attack: 25e4, armorPen: 150, critDamage: 250 }, requirement: "Kim \u0110an K\u1EF3", description: "Chi\u1EBFc r\xECu m\xF4 ph\u1ECFng theo th\u1EA7n kh\xED c\u1EE7a B\xE0n C\u1ED5, m\u1ED9t b\xFAa c\xF3 th\u1EC3 khai thi\xEAn l\u1EADp \u0111\u1ECBa.", story: "S\u1EE9c m\u1EA1nh c\u1EE7a n\xF3 \u0111\u1EE7 \u0111\u1EC3 ph\xE1 v\u1EE1 c\xE1c quy t\u1EAFc c\u1EE7a th\u1EBF gi\u1EDBi.", value: 1e4, effect: "C\xF3 t\u1EC9 l\u1EC7 nh\u1ECF g\xE2y hi\u1EC7u \u1EE9ng 'Ph\xE1 Gi\xE1p', gi\u1EA3m m\u1EA1nh ph\xF2ng ng\u1EF1 c\u1EE7a m\u1EE5c ti\xEAu trong 2 l\u01B0\u1EE3t." },
  { id: "item_myt_03", name: "T\u1EA1o H\xF3a Ng\u1ECDc \u0110i\u1EC7p", type: "Ph\xE1p b\u1EA3o", rarity: "Th\u1EA7n Tho\u1EA1i", slot: "ph\xE1p b\u1EA3o", icon: "\uD83D\uDCD6", stats: { hp: 25e4, mp: 25e4, attack: 5e4, defense: 5e4 }, requirement: "Kim \u0110an K\u1EF3", description: "Ghi l\u1EA1i 3000 \u0111\u1EA1i \u0111\u1EA1o, ng\u01B0\u1EDDi s\u1EDF h\u1EEFu n\xF3 c\xF3 th\u1EC3 th\xF4ng hi\u1EC3u v\u1EA1n ph\xE1p, tu vi t\u0103ng nhanh.", story: "B\xED m\u1EADt c\u1EE7a c\u1EA3 v\u0169 tr\u1EE5 d\u01B0\u1EDDng nh\u01B0 n\u1EB1m trong trang s\xE1ch n\xE0y.", value: 1e4, effect: "T\u0103ng 10% l\u01B0\u1EE3ng kinh nghi\u1EC7m v\xE0 linh l\u1EF1c nh\u1EADn \u0111\u01B0\u1EE3c t\u1EEB m\u1ECDi ngu\u1ED3n." },
  { id: "item_myt_04", name: "Tru Ti\xEAn Ki\u1EBFm", type: "V\u0169 kh\xED", rarity: "Th\u1EA7n Tho\u1EA1i", slot: "v\u0169 kh\xED", icon: "\uD83D\uDDE1\uFE0F", stats: { attack: 3e5, critRate: 75, speed: 25e3 }, requirement: "Nguy\xEAn Anh K\u1EF3", description: "Thanh ki\u1EBFm \u0111\u1EE9ng \u0111\u1EA7u trong Tru Ti\xEAn T\u1EE9 Ki\u1EBFm, s\xE1t kh\xED ng\xFAt tr\u1EDDi, chuy\xEAn tru di\u1EC7t ti\xEAn nh\xE2n.", story: "D\u01B0\u1EDBi Tru Ti\xEAn Ki\u1EBFm, v\u1EA1n ti\xEAn \u0111\u1EC1u l\xE0 tro b\u1EE5i.", value: 2e4, effect: "G\xE2y th\xEAm 20% s\xE1t th\u01B0\u01A1ng l\xEAn c\xE1c m\u1EE5c ti\xEAu c\xF3 c\u1EA3nh gi\u1EDBi tu vi cao h\u01A1n ng\u01B0\u1EDDi s\u1EED d\u1EE5ng." }
];
var ULTIMATE_ITEMS = [
  {
    id: "item_ult_001",
    name: "L\xF4i Di\u1EC7t Thi\xEAn Qu\xE2n Ki\u1EBFm",
    type: "V\u0169 kh\xED",
    rarity: "T\u1ED1i Th\u01B0\u1EE3ng",
    slot: "v\u0169 kh\xED",
    icon: "https://i.postimg.cc/VsxN6MXJ/t-i-xu-ng-2.jpg",
    stats: {
      attack: 45e5,
      defense: 12e5,
      speed: 3e5,
      critRate: 1,
      critDamage: 2001,
      mentalDemonResistance: 300
    },
    requirement: "Ti\xEAn \u0110\u1EBF",
    description: "Thanh ki\u1EBFm kh\xF4ng c\xF2n thu\u1ED9c v\u1EC1 th\u1EBF gi\u1EDBi ph\xE0m t\u1EE5c \u2014 khi gi\xE1ng xu\u1ED1ng, c\u1EA3 gi\u1EDBi tu ch\xE2n run r\u1EA9y. Th\u1EA7n l\xF4i ng\u01B0ng t\u1EE5 qua h\xE0ng v\u1EA1n ki\u1EBFp, m\u1ED7i l\u1EA7n n\xF3 \u0111\u01B0\u1EE3c r\xFAt ra, thi\xEAn \u0111\u1EA1o ph\u1EA3i \u0111\u1ED5i l\u1EA1i m\u1ED9t tia sinh kh\xED \u0111\u1EC3 c\xE2n b\u1EB1ng.",
    story: "\u201CM\u1ED9t nh\xE1t ch\xE9m \u2013 v\u1EA1n gi\u1EDBi t\u1ECBch di\u1EC7t.\u201D K\u1EF9 n\u0103ng \u0111\u1EB7c bi\u1EC7t: L\xF4i Th\u1EA7n Tr\u1EA3m, Thi\xEAn Di\u1EC7t L\xF4i V\u1EF1c, V\u0129nh Di\u1EC7t L\xF4i T\xE2m.",
    value: 999999
  }
];
var CONSUMABLE_ITEMS = [
  { id: "item_001", name: "H\u1ED3i L\u1EF1c \u0110an", type: "Ti\xEAu hao", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83D\uDC8A", effect: "H\u1ED3i 50 HP", restores: { hp: 50 }, description: "\u0110an d\u01B0\u1EE3c c\u1EA5p th\u1EA5p gi\xFAp h\u1ED3i ph\u1EE5c m\u1ED9t \xEDt sinh l\u1EF1c.", value: 10 },
  { id: "item_002", name: "H\u1ED3i Kh\xED T\xE1n", type: "Ti\xEAu hao", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83C\uDF3F", effect: "H\u1ED3i 30 MP", restores: { mp: 30 }, description: "T\xE1n d\u01B0\u1EE3c gi\xFAp h\u1ED3i ph\u1EE5c m\u1ED9t \xEDt linh l\u1EF1c.", value: 10 },
  { id: "item_006", name: "Luy\u1EC7n Kh\xED T\xE1n", type: "Ti\xEAu hao", rarity: "Qu\xFD", icon: "\uD83C\uDF3F", effect: "T\u0103ng 200 Linh L\u1EF1c", expGain: 200, description: "T\xE1n d\u01B0\u1EE3c gi\xFAp tu s\u0129 Luy\u1EC7n Kh\xED K\u1EF3 t\u0103ng tu vi.", value: 50 },
  { id: "item_019", name: "Tr\xFAc C\u01A1 \u0110an", type: "Ti\xEAu hao", rarity: "Hi\u1EBFm", icon: "\uD83D\uDC8A", effect: "T\u0103ng 1000 Linh L\u1EF1c", expGain: 1e3, description: "\u0110an d\u01B0\u1EE3c c\u1EA7n thi\u1EBFt \u0111\u1EC3 Tr\xFAc C\u01A1 k\u1EF3 tu s\u0129 c\u1EE7ng c\u1ED1 tu vi.", value: 200 }
];
var ALCHEMY_MATERIALS = [
  { id: "mat_dan_phe", name: "\u0110an Ph\u1EBF", type: "Nguy\xEAn li\u1EC7u", rarity: "Ph\u1ED5 th\xF4ng", icon: "\u26AB", description: "S\u1EA3n ph\u1EA9m th\u1EA5t b\u1EA1i c\u1EE7a qu\xE1 tr\xECnh luy\u1EC7n \u0111an. Kh\xF4ng c\xF3 t\xE1c d\u1EE5ng g\xEC, nh\u01B0ng c\xF3 th\u1EC3 d\xF9ng \u0111\u1EC3 nghi\xEAn c\u1EE9u c\xF4ng th\u1EE9c.", value: 1 },
  { id: "mat_linh_chi", name: "Linh Chi", type: "Nguy\xEAn li\u1EC7u", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83C\uDF44", description: "M\u1ED9t lo\u1EA1i n\u1EA5m linh thi\xEAng, ch\u1EE9a \u0111\u1EF1ng linh kh\xED c\u1EE7a \u0111\u1EA5t tr\u1EDDi, nguy\xEAn li\u1EC7u ch\xEDnh cho \u0110an T\u1EE5 Linh.", value: 20 },
  { id: "mat_ngoc_dich", name: "Ng\u1ECDc D\u1ECBch", type: "Nguy\xEAn li\u1EC7u", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83D\uDCA7", description: "Tinh t\xFAy c\u1EE7a s\u01B0\u01A1ng s\u1EDBm, d\xF9ng l\xE0m dung m\xF4i trong luy\u1EC7n \u0111an.", value: 15 },
  { id: "mat_huyet_thao", name: "Huy\u1EBFt Th\u1EA3o", type: "Nguy\xEAn li\u1EC7u", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83C\uDF3F", description: "Lo\u1EA1i c\u1ECF c\xF3 m\xE0u \u0111\u1ECF nh\u01B0 m\xE1u, c\xF3 t\xE1c d\u1EE5ng b\u1ED5 huy\u1EBFt, h\u1ED3i ph\u1EE5c sinh l\u1EF1c.", value: 25 },
  { id: "mat_linh_tuyen", name: "Linh Tuy\u1EC1n", type: "Nguy\xEAn li\u1EC7u", rarity: "Qu\xFD", icon: "\uD83D\uDCA7", description: "N\u01B0\u1EDBc su\u1ED1i t\u1EEB n\u01A1i c\xF3 linh m\u1EA1ch, trong s\u1EA1ch v\xE0 ch\u1EE9a nhi\u1EC1u linh kh\xED.", value: 40 },
  { id: "mat_kim_lien", name: "Kim Li\xEAn", type: "Nguy\xEAn li\u1EC7u", rarity: "Qu\xFD", icon: "\uD83C\uDF38", description: "Hoa sen v\xE0ng, c\xF3 t\xE1c d\u1EE5ng c\u01B0\u1EDDng h\xF3a th\xE2n th\u1EC3, t\u0103ng c\u01B0\u1EDDng ph\xF2ng ng\u1EF1.", value: 80 },
  { id: "mat_xich_thao", name: "X\xEDch Th\u1EA3o", type: "Nguy\xEAn li\u1EC7u", rarity: "Qu\xFD", icon: "\uD83C\uDF3F", description: "Lo\u1EA1i c\u1ECF c\xF3 m\xE0u \u0111\u1ECF r\u1EF1c, gi\xFAp t\u0103ng c\u01B0\u1EDDng kh\xED huy\u1EBFt.", value: 70 },
  { id: "mat_tu_hoa_qua", name: "T\u1EED H\u1ECFa Qu\u1EA3", type: "Nguy\xEAn li\u1EC7u", rarity: "Qu\xFD", icon: "\uD83C\uDF53", description: "Lo\u1EA1i qu\u1EA3 m\u1ECDc g\u1EA7n n\u01A1i c\xF3 \u0111\u1ECBa h\u1ECFa, ch\u1EE9a \u0111\u1EF1ng n\u0103ng l\u01B0\u1EE3ng b\xF9ng n\u1ED5.", value: 100 },
  { id: "mat_thiet_diep", name: "Thi\u1EBFt Di\u1EC7p", type: "Nguy\xEAn li\u1EC7u", rarity: "Qu\xFD", icon: "\uD83C\uDF43", description: "L\xE1 c\xE2y c\u1EE9ng nh\u01B0 s\u1EAFt, d\xF9ng \u0111\u1EC3 trung h\xF2a c\xE1c lo\u1EA1i d\u01B0\u1EE3c li\u1EC7u c\xF3 t\xEDnh h\u1ECFa m\u1EA1nh.", value: 60 },
  { id: "mat_hoa_lien_tu", name: "H\u1ECFa Li\xEAn T\u1EED", type: "Nguy\xEAn li\u1EC7u", rarity: "Hi\u1EBFm", icon: "\uD83D\uDD25", description: "H\u1EA1t c\u1EE7a hoa sen l\u1EEDa, ch\u1EE9a \u0111\u1EF1ng h\u1ECFa \u0111\u1ED9c tinh thu\u1EA7n.", value: 150 },
  { id: "mat_long_tam_co", name: "Long T\xE2m C\u1ECF", type: "Nguy\xEAn li\u1EC7u", rarity: "Hi\u1EBFm", icon: "\uD83C\uDF40", description: "Lo\u1EA1i c\u1ECF m\u1ECDc n\u01A1i c\xF3 long kh\xED, gi\xFAp t\u0103ng c\u01B0\u1EDDng uy l\u1EF1c c\xF4ng ph\xE1p.", value: 160 },
  { id: "mat_thien_lo_dich", name: "Thi\xEAn L\u1ED9 D\u1ECBch", type: "Nguy\xEAn li\u1EC7u", rarity: "Hi\u1EBFm", icon: "\uD83D\uDCA7", description: "S\u01B0\u01A1ng c\u1EE7a tr\u1EDDi, c\u1EF1c k\u1EF3 tinh khi\u1EBFt, d\xF9ng trong c\xE1c lo\u1EA1i \u0111an d\u01B0\u1EE3c cao c\u1EA5p.", value: 200 }
];
var ALCHEMY_PILLS = [
  { id: "pill_tu_linh", name: "\u0110an T\u1EE5 Linh", type: "\u0110an D\u01B0\u1EE3c", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83D\uDC8A", effect: "T\u0103ng 10% t\u1ED1c \u0111\u1ED9 tu luy\u1EC7n trong 30 ph\xFAt.", description: "\u0110an d\u01B0\u1EE3c c\u01A1 b\u1EA3n gi\xFAp tu s\u0129 Luy\u1EC7n Kh\xED K\u1EF3 \u0111\u1EA9y nhanh t\u1ED1c \u0111\u1ED9 h\u1EA5p th\u1EE5 linh kh\xED.", value: 100, buffs: { statModifiers: { cultivationSpeedBonus: 0.1 }, duration: 1800, cancellable: true } },
  { id: "pill_tri_thuong", name: "\u0110an Tr\u1ECB Th\u01B0\u01A1ng", type: "\u0110an D\u01B0\u1EE3c", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83D\uDC8A", effect: "Ph\u1EE5c h\u1ED3i 25% HP t\u1ED1i \u0111a.", restores: { hpPercent: 0.25 }, description: "\u0110an d\u01B0\u1EE3c ch\u1EEFa th\u01B0\u01A1ng ph\u1ED5 bi\u1EBFn, nhanh ch\xF3ng h\u1ED3i ph\u1EE5c m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn sinh l\u1EF1c.", value: 80 },
  { id: "pill_cuong_the", name: "\u0110an C\u01B0\u1EDDng Th\u1EC3", type: "\u0110an D\u01B0\u1EE3c", rarity: "Qu\xFD", icon: "\uD83D\uDC8A", effect: "T\u0103ng 10% DEF v\xE0 5% HP t\u1ED1i \u0111a trong 10 l\u01B0\u1EE3t chi\u1EBFn \u0111\u1EA5u.", description: "T\u1EA1m th\u1EDDi c\u01B0\u1EDDng h\xF3a th\xE2n th\u1EC3, gi\xFAp ch\u1ED1ng ch\u1ECBu t\u1ED1t h\u01A1n trong giao tranh.", value: 250, buffs: { statModifiers: { defense: 0.1, hp: 0.05 }, duration: 10, cancellable: true } },
  { id: "pill_bao_khi", name: "\u0110an B\u1EA1o Kh\xED", type: "\u0110an D\u01B0\u1EE3c", rarity: "Qu\xFD", icon: "\uD83D\uDC8A", effect: "T\u0103ng 15% ATK trong 5 l\u01B0\u1EE3t chi\u1EBFn \u0111\u1EA5u.", description: "K\xEDch ph\xE1t ti\u1EC1m n\u0103ng, gi\xFAp t\u0103ng m\u1EA1nh s\u1EE9c t\u1EA5n c\xF4ng trong m\u1ED9t th\u1EDDi gian ng\u1EAFn.", value: 220, buffs: { statModifiers: { attack: 0.15 }, duration: 5, cancellable: true } },
  { id: "pill_tam_hoa", name: "\u0110an T\xE2m H\u1ECFa", type: "\u0110an D\u01B0\u1EE3c", rarity: "Hi\u1EBFm", icon: "\uD83D\uDC8A", effect: "T\u0103ng m\u1EA1nh s\xE1t th\u01B0\u01A1ng k\u1EF9 n\u0103ng h\u1EC7 H\u1ECFa trong 10 l\u01B0\u1EE3t.", description: "\u0110an d\u01B0\u1EE3c chuy\xEAn d\u1EE5ng cho c\xE1c tu s\u0129 h\u1EC7 H\u1ECFa, gi\xFAp h\u1ECD ph\xE1t huy t\u1ED1i \u0111a s\u1EE9c m\u1EA1nh.", value: 500, buffs: { statModifiers: { magicAttack: 0.2 }, duration: 10, cancellable: true } },
  { id: "pill_ngu_linh", name: "\u0110an Ng\u1EF1 Linh", type: "\u0110an D\u01B0\u1EE3c", rarity: "Hi\u1EBFm", icon: "\uD83D\uDC8A", effect: "T\u0103ng t\u1ED1c \u0111\u1ED9 tri\u1EC7u h\u1ED3i linh th\xFA.", description: "Gi\xFAp r\xFAt ng\u1EAFn th\u1EDDi gian g\u1ECDi ra linh th\xFA ho\u1EB7c \u0111\u1ED3ng h\xE0nh trong chi\u1EBFn \u0111\u1EA5u.", value: 450 },
  { id: "pill_truc_co", name: "\u0110an Tr\xFAc C\u01A1", type: "\u0110an D\u01B0\u1EE3c", rarity: "Hi\u1EBFm", icon: "\uD83D\uDC8A", effect: "H\u1ED7 tr\u1EE3 \u0111\u1ED9t ph\xE1 c\u1EA3nh gi\u1EDBi Tr\xFAc C\u01A1.", expGain: 5e3, description: "\u0110an d\u01B0\u1EE3c quan tr\u1ECDng gi\xFAp tu s\u0129 Luy\u1EC7n Kh\xED \u0111\u1EC9nh phong c\xF3 c\u01A1 h\u1ED9i \u0111\u1ED9t ph\xE1.", value: 1e3 }
];
var UPGRADE_MATERIALS = [
  { id: "upgrade_stone_1", name: "Huy\u1EC1n Thi\u1EBFt S\u01A1 C\u1EA5p", type: "Nguy\xEAn li\u1EC7u", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83E\uDEA8", description: "\u0110\xE1 c\u01B0\u1EDDng h\xF3a c\u01A1 b\u1EA3n, d\xF9ng cho trang b\u1ECB c\u1EA5p th\u1EA5p.", value: 20 },
  { id: "upgrade_stone_2", name: "Huy\u1EC1n Thi\u1EBFt Trung C\u1EA5p", type: "Nguy\xEAn li\u1EC7u", rarity: "Qu\xFD", icon: "\uD83E\uDEA8", description: "\u0110\xE1 c\u01B0\u1EDDng h\xF3a ph\u1ED5 bi\u1EBFn, d\xF9ng cho trang b\u1ECB t\u1EA7m trung.", value: 100 },
  { id: "upgrade_stone_3", name: "Huy\u1EC1n Thi\u1EBFt Cao C\u1EA5p", type: "Nguy\xEAn li\u1EC7u", rarity: "Hi\u1EBFm", icon: "\uD83D\uDC8E", description: "\u0110\xE1 c\u01B0\u1EDDng h\xF3a hi\u1EBFm, d\xF9ng cho trang b\u1ECB cao c\u1EA5p.", value: 500 },
  { id: "upgrade_stone_4", name: "Huy\u1EC1n Thi\u1EBFt C\u1EF1c Ph\u1EA9m", type: "Nguy\xEAn li\u1EC7u", rarity: "Truy\u1EC1n K\u1EF3", icon: "\uD83D\uDC8E", description: "\u0110\xE1 c\u01B0\u1EDDng h\xF3a c\u1EF1c hi\u1EBFm, d\xF9ng cho c\xE1c trang b\u1ECB huy\u1EC1n tho\u1EA1i.", value: 2e3 }
];
var MISC_ITEMS = [
  { id: "item_004", name: "C\u1ECF Linh Tinh", type: "Nguy\xEAn li\u1EC7u", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83C\uDF3F", description: "Lo\u1EA1i c\u1ECF d\u1EA1i ch\u1EE9a m\u1ED9t \xEDt linh kh\xED, l\xE0 nguy\xEAn li\u1EC7u c\u01A1 b\u1EA3n nh\u1EA5t trong luy\u1EC7n \u0111an.", value: 5 },
  { id: "item_005", name: "Da S\xF3i", type: "Nguy\xEAn li\u1EC7u", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83D\uDC3A", description: "Da c\u1EE7a D\xE3 Lang, c\xF3 th\u1EC3 d\xF9ng \u0111\u1EC3 ch\u1EBF t\u1EA1o gi\xE1p nh\u1EB9.", value: 8 },
  { id: "mat_tay_linh_thach", name: "T\u1EA9y Linh Th\u1EA1ch", type: "Ti\xEAu hao", rarity: "Truy\u1EC1n K\u1EF3", icon: "\uD83D\uDC8E", description: "Vi\xEAn \u0111\xE1 ch\u1EE9a \u0111\u1EF1ng s\u1EE9c m\u1EA1nh h\u1ED7n \u0111\u1ED9n, c\xF3 kh\u1EA3 n\u0103ng t\u1EA9y r\u1EEDa v\xE0 t\xE1i t\u1EA1o l\u1EA1i linh c\u0103n c\u1EE7a m\u1ED9t tu s\u0129.", effect: "T\u1EA9y luy\u1EC7n l\u1EA1i Linh C\u0103n", value: 1e4 },
  { id: "cauldron_01", name: "\u0110an L\xF4 S\u01A1 C\u1EA5p", type: "\u0110an L\xF4", rarity: "Ph\u1ED5 th\xF4ng", icon: "\uD83C\uDFFA", description: "M\u1ED9t chi\u1EBFc l\xF2 luy\u1EC7n \u0111an c\u01A1 b\u1EA3n, c\xF3 th\u1EC3 d\xF9ng \u0111\u1EC3 luy\u1EC7n c\xE1c lo\u1EA1i \u0111an d\u01B0\u1EE3c c\u1EA5p 1.", value: 500 },
  { id: "item_bth_01", name: "Long Linh Th\xE1nh Y", type: "\xC1o gi\xE1p", slot: "\xE1o gi\xE1p", rarity: "Th\u1EA7n Tho\u1EA1i", icon: "\uD83D\uDEE1\uFE0F", description: "\xC1o gi\xE1p \u0111\u01B0\u1EE3c d\u1EC7t t\u1EEB v\u1EA3y m\u1EC1m c\u1EE7a Th\xE1nh Long, mi\u1EC5n nhi\u1EC5m v\u1EDBi h\u1EA7u h\u1EBFt c\xE1c lo\u1EA1i ph\xE1p thu\u1EADt.", stats: { defense: 5e4, magicDefense: 8e4, hp: 1e5 }, value: 5e4 },
  { id: "item_bth_02", name: "Long Tinh S\u01A1 Th\u1EE7y", type: "Nguy\xEAn li\u1EC7u", rarity: "Th\u1EA7n Tho\u1EA1i", icon: "\uD83D\uDCA7", description: "Tinh hoa c\u1EE7a S\u01A1 Th\u1EE7y Th\xE1nh Long, ch\u1EE9a \u0111\u1EF1ng s\u1EE9c m\u1EA1nh s\xE1ng t\u1EA1o nguy\xEAn th\u1EE7y.", value: 1e5 },
  { id: "item_bth_03", name: "Long V\u0169 L\u01B0u Quang", type: "Ph\xE1p b\u1EA3o", slot: "ph\xE1p b\u1EA3o", rarity: "Th\u1EA7n Tho\u1EA1i", icon: "\u2728", description: "M\u1ED9t chi\u1EBFc l\xF4ng v\u0169 c\u1EE7a Th\xE1nh Long, ch\u1EE9a \u0111\u1EF1ng s\u1EE9c m\u1EA1nh kh\xF4ng gian, t\u0103ng m\u1EA1nh t\u1ED1c \u0111\u1ED9.", stats: { speed: 5e3, evasion: 0.2 }, value: 5e4 }
];
var ITEM_LIST = [
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
var SKILLS = [
  { id: "skill_001", name: "Nh\u1EA5t Ki\u1EBFm Tr\u1EA3m", origin: "M\xF4n ph\xE1i c\u01A1 b\u1EA3n", type: "Ch\u1EE7 \u0110\u1ED9ng", damage: 20, mpCost: 10, description: "M\u1ED9t \u0111\u01B0\u1EDDng ki\u1EBFm c\u01A1 b\u1EA3n nh\u01B0ng nhanh v\xE0 m\u1EA1nh.", visualEffect: "slash", soundEffectUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_28d7a126a2.mp3?filename=sword-hit-7160.mp3" },
  { id: "skill_002", name: "H\u1ED3i Xu\xE2n Thu\u1EADt", origin: "Y thu\u1EADt", type: "Ch\u1EE7 \u0110\u1ED9ng", heal: 50, mpCost: 15, description: "S\u1EED d\u1EE5ng linh l\u1EF1c \u0111\u1EC3 ch\u1EEFa l\xE0nh v\u1EBFt th\u01B0\u01A1ng.", visualEffect: "heal" },
  { id: "skill_003", name: "Kim Cang H\u1ED9 Th\u1EC3", origin: "Luy\u1EC7n th\u1EC3", type: "B\u1ECB \u0110\u1ED9ng", passiveBonus: { defense: 20 }, description: "Linh l\u1EF1c t\u1EF1 \u0111\u1ED9ng b\u1EA3o v\u1EC7 c\u01A1 th\u1EC3, t\u0103ng ph\xF2ng ng\u1EF1." },
  { id: "skill_004", name: "Li\u1EC7t H\u1ECFa Ch\u01B0\u1EDFng", origin: "H\u1ECFa tu", type: "Ch\u1EE7 \u0110\u1ED9ng", damage: 40, mpCost: 20, description: "M\u1ED9t ch\u01B0\u1EDFng mang theo nhi\u1EC7t h\u1ECFa, g\xE2y s\xE1t th\u01B0\u01A1ng thi\xEAu \u0111\u1ED1t.", spiritRoot: "H\u1ECFa" },
  { id: "skill_bth_01", name: "M\u1EA1t Nh\u1EADt", origin: "B\u1EA1ch Thi\xEAn Huy\xEAn", type: "Tuy\u1EC7t K\u1EF9", turnTrigger: 5, damage: 999999, ignoreDefense: true, description: "M\u1ED9t \u0111\xF2n t\u1EA5n c\xF4ng h\u1EE7y di\u1EC7t kh\xF4ng th\u1EC3 ch\u1ED1ng \u0111\u1EE1, ch\u1EC9 k\xEDch ho\u1EA1t khi HP c\u1EE7a boss d\u01B0\u1EDBi 50%." },
  { id: "skill_bth_02", name: "Long Uy", origin: "B\u1EA1ch Thi\xEAn Huy\xEAn", type: "Ch\u1EE7 \u0110\u1ED9ng", stunTurns: 1, stunChance: 1, description: "Gi\u1EA3i ph\xF3ng uy \xE1p c\u1EE7a r\u1ED3ng th\u1EA7n, l\xE0m t\u1EA5t c\u1EA3 k\u1EBB \u0111\u1ECBch cho\xE1ng v\xE1ng 1 l\u01B0\u1EE3t." },
  { id: "skill_bth_03", name: "Th\u1EE7y Long Tr\u1EA3m", origin: "B\u1EA1ch Thi\xEAn Huy\xEAn", type: "Ch\u1EE7 \u0110\u1ED9ng", damage: 15e3, hits: 2, description: "T\u1EA1o ra hai con r\u1ED3ng n\u01B0\u1EDBc t\u1EA5n c\xF4ng k\u1EBB \u0111\u1ECBch, c\u1EF1c k\u1EF3 hi\u1EC7u qu\u1EA3 v\u1EDBi h\u1EC7 H\u1ECFa.", spiritRoot: "Th\u1EE7y" },
  {
    id: "skill_005",
    name: "Phong S\xE1t Ki\u1EBFm Tr\u1EADn",
    origin: "Phong tu",
    type: "Ch\u1EE7 \u0110\u1ED9ng",
    damage: 15,
    hits: 3,
    mpCost: 25,
    description: "T\u1EA1o ra m\u1ED9t tr\u1EADn ki\u1EBFm kh\xED s\u1EAFc b\xE9n nh\u01B0 gi\xF3, t\u1EA5n c\xF4ng k\u1EBB \u0111\u1ECBch nhi\u1EC1u l\u1EA7n li\xEAn ti\u1EBFp.",
    spiritRoot: "Phong",
    visualEffect: "whirlwind"
  },
  {
    id: "skill_006",
    name: "D\u01B0\u1EE1ng Linh Quy\u1EBFt",
    origin: "T\xE1n tu",
    type: "B\u1ECB \u0110\u1ED9ng",
    description: "M\u1ED9t ph\u01B0\u01A1ng ph\xE1p d\u01B0\u1EE1ng sinh, gi\xFAp t\u0103ng t\u1ED1c \u0111\u1ED9 h\u1EA5p th\u1EE5 linh l\u1EF1c v\xE0 c\u1EE7ng c\u1ED1 c\u0103n c\u01A1.",
    passiveBonus: { cultivationSpeedBonus: 0.1, hp: 50 }
  },
  {
    id: "skill_007",
    name: "V\u1EA1n Ki\u1EBFm Quy T\xF4ng",
    origin: "Th\u01B0\u1EE3ng C\u1ED5 Ki\u1EBFm T\xF4ng",
    type: "Tuy\u1EC7t K\u1EF9",
    damage: 200,
    mpCost: 80,
    ignoreDefense: true,
    description: "Tuy\u1EC7t k\u1EF9 t\u1ED1i th\u01B0\u1EE3ng c\u1EE7a ki\u1EBFm tu, tri\u1EC7u h\u1ED3i v\u1EA1n thanh ki\u1EBFm \u1EA3o \u1EA3nh t\u1EA5n c\xF4ng m\u1EE5c ti\xEAu, g\xE2y ra s\xE1t th\u01B0\u01A1ng c\u1EF1c l\u1EDBn.",
    spiritRoot: "Kim",
    visualEffect: "slash"
  }
];
var MONSTERS = [
  { id: "monster_001", name: "C\u1ECDc g\u1ED7", level: 1, cultivation: { realm: "Luy\u1EC7n Kh\xED", stage: 1, lp: 0, lpToNext: 0 }, hp: 30, stats: { attack: 0, defense: 5, speed: 1, magicAttack: 0, magicDefense: 0, critRate: 0, critDamage: 1.5, accuracy: 1, evasion: 0, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "ngu", attributes: ["M\u1ED9c"], multiplier: 1 }, rewards: { characterExp: 5, cultivationExp: 2, linhThach: 0, items: [] } },
  { id: "monster_002", name: "Chu\u1ED9t \u0110\xF3i", level: 3, cultivation: { realm: "Luy\u1EC7n Kh\xED", stage: 3, lp: 0, lpToNext: 0 }, hp: 60, stats: { attack: 11, defense: 6, speed: 12, magicAttack: 0, magicDefense: 1, critRate: 0.05, critDamage: 1.5, accuracy: 0.85, evasion: 0.03, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "ngu", attributes: ["Th\u1ED5"], multiplier: 1 }, rewards: { characterExp: 25, cultivationExp: 15, linhThach: 5, items: [] } },
  { id: "monster_003", name: "Ch\xF3 Hoang", level: 5, cultivation: { realm: "Luy\u1EC7n Kh\xED", stage: 5, lp: 0, lpToNext: 0 }, hp: 90, stats: { attack: 18, defense: 10, speed: 15, magicAttack: 0, magicDefense: 3, critRate: 0.1, critDamage: 1.5, accuracy: 0.9, evasion: 0.04, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "ngu", attributes: ["Th\u1ED5"], multiplier: 1 }, rewards: { characterExp: 40, cultivationExp: 25, linhThach: 8, items: [{ itemId: "item_005", chance: 0.2 }] } },
  { id: "monster_004", name: "Nh\u1EC7n \u0110\u1ED9c", level: 12, cultivation: { realm: "Luy\u1EC7n Kh\xED", stage: 10, lp: 0, lpToNext: 0 }, hp: 180, stats: { attack: 30, defense: 18, speed: 10, magicAttack: 5, magicDefense: 8, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.05, armorPen: 0.05, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "tu", attributes: ["M\u1ED9c", "Th\u1ED5"], multiplier: 1.2 }, rewards: { characterExp: 100, cultivationExp: 70, linhThach: 20, items: [] } },
  { id: "monster_005", name: "H\u1ED5 V\u1EB1n L\u1EEDa R\u1EEBng", level: 18, cultivation: { realm: "Tr\xFAc C\u01A1", stage: 1, lp: 0, lpToNext: 0 }, hp: 430, stats: { attack: 81, defense: 50, speed: 20, magicAttack: 10, magicDefense: 12, critRate: 0.15, critDamage: 1.8, accuracy: 0.95, evasion: 0.06, armorPen: 0.1, blockRate: 0.05, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "thien", attributes: ["H\u1ECFa"], multiplier: 1.7 }, rewards: { characterExp: 170, cultivationExp: 120, linhThach: 40, items: [] } },
  { id: "monster_006", name: "Linh Th\u1EA1ch Nh\xE2n", level: 22, cultivation: { realm: "Tr\xFAc C\u01A1", stage: 4, lp: 0, lpToNext: 0 }, hp: 2350, stats: { attack: 395, defense: 405, speed: 40, magicAttack: 0, magicDefense: 150, critRate: 0.05, critDamage: 1.5, accuracy: 0.85, evasion: 0.01, armorPen: 0, blockRate: 0.2, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["Th\u1ED5"], multiplier: 1.7 }, rewards: { characterExp: 200, cultivationExp: 150, linhThach: 50, items: [] } },
  { id: "monster_boss_me_anh", name: "H\u1ED5 V\u01B0\u01A1ng M\xEA \u1EA2nh", level: 20, cultivation: { realm: "Tr\xFAc C\u01A1", stage: 2, lp: 0, lpToNext: 0 }, hp: 3e3, stats: { attack: 450, defense: 300, speed: 125, magicAttack: 100, magicDefense: 100, critRate: 0.2, critDamage: 1.8, accuracy: 1, evasion: 0.08, armorPen: 0.15, blockRate: 0.1, mentalDemonResistance: 0.05 }, spiritRoot: { classificationId: "thien", attributes: ["H\u1ECFa"], multiplier: 1.7 }, rewards: { characterExp: 250, cultivationExp: 180, linhThach: 80, items: [{ itemId: "item_epi_01", chance: 0.1 }] } },
  { id: "monster_007", name: "D\u01A1i M\xE1u", level: 21, cultivation: { realm: "Tr\xFAc C\u01A1", stage: 3, lp: 0, lpToNext: 0 }, hp: 1750, stats: { attack: 375, defense: 200, speed: 175, magicAttack: 0, magicDefense: 50, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.1, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, spiritRoot: { classificationId: "song", attributes: ["Phong", "Kim"], multiplier: 1.5 }, rewards: { characterExp: 180, cultivationExp: 130, linhThach: 45, items: [] } },
  { id: "monster_boss_hang_da", name: "Vua D\u01A1i H\xFAt M\xE1u", level: 25, cultivation: { realm: "Tr\xFAc C\u01A1", stage: 5, lp: 0, lpToNext: 0 }, hp: 4500, stats: { attack: 550, defense: 300, speed: 200, magicAttack: 150, magicDefense: 150, critRate: 0.15, critDamage: 1.7, accuracy: 0.95, evasion: 0.13, armorPen: 0.1, blockRate: 0.1, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "song", attributes: ["Phong", "Kim"], multiplier: 1.5 }, rewards: { characterExp: 300, cultivationExp: 220, linhThach: 120, items: [{ itemId: "item_epi_02", chance: 0.15 }] } },
  { id: "monster_008", name: "Y\xEAu Th\xFA Tinh Linh", level: 28, cultivation: { realm: "Tr\xFAc C\u01A1", stage: 8, lp: 0, lpToNext: 0 }, hp: 2500, stats: { attack: 400, defense: 350, speed: 150, magicAttack: 500, magicDefense: 450, critRate: 0.1, critDamage: 1.6, accuracy: 0.9, evasion: 0.08, armorPen: 0, blockRate: 0.1, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["M\u1ED9c"], multiplier: 1.7 }, rewards: { characterExp: 220, cultivationExp: 160, linhThach: 60, items: [] } },
  { id: "monster_boss_linh_thu_sam_lam", name: "H\u1ED9 V\u1EC7 Th\u1EE5 Tinh", level: 40, cultivation: { realm: "Kim \u0110an", stage: 1, lp: 0, lpToNext: 0 }, hp: 12500, stats: { attack: 750, defense: 1e3, speed: 75, magicAttack: 600, magicDefense: 900, critRate: 0.1, critDamage: 1.8, accuracy: 1, evasion: 0.03, armorPen: 0.1, blockRate: 0.3, mentalDemonResistance: 0.2 }, spiritRoot: { classificationId: "thien", attributes: ["M\u1ED9c"], multiplier: 1.7 }, rewards: { characterExp: 600, cultivationExp: 450, linhThach: 250, items: [{ itemId: "item_leg_01", chance: 0.05 }] } },
  { id: "monster_boss_thanh_van", name: "H\u1ED9 S\u01A1n K\u1EF3 L\xE2n", level: 50, cultivation: { realm: "Kim \u0110an", stage: 5, lp: 0, lpToNext: 0 }, hp: 4e4, stats: { attack: 2500, defense: 2200, speed: 500, magicAttack: 2800, magicDefense: 2200, critRate: 0.2, critDamage: 2, accuracy: 1.1, evasion: 0.1, armorPen: 0.2, blockRate: 0.15, mentalDemonResistance: 0.3 }, spiritRoot: { classificationId: "song", attributes: ["H\u1ECFa", "Th\u1ED5"], multiplier: 1.5 }, rewards: { characterExp: 1e3, cultivationExp: 700, linhThach: 500, items: [{ itemId: "item_leg_02", chance: 0.05 }] } },
  { id: "monster_009", name: "H\u1ED3 Linh", level: 42, cultivation: { realm: "Kim \u0110an", stage: 2, lp: 0, lpToNext: 0 }, hp: 12e3, stats: { attack: 1300, defense: 1e3, speed: 600, magicAttack: 1800, magicDefense: 1500, critRate: 0.15, critDamage: 1.7, accuracy: 0.95, evasion: 0.13, armorPen: 0.1, blockRate: 0.1, mentalDemonResistance: 0.15 }, spiritRoot: { classificationId: "thien", attributes: ["H\u1ECFa"], multiplier: 1.7 }, rewards: { characterExp: 450, cultivationExp: 300, linhThach: 150, items: [] } },
  { id: "monster_010", name: "Lang V\u01B0\u01A1ng", level: 45, cultivation: { realm: "Kim \u0110an", stage: 3, lp: 0, lpToNext: 0 }, hp: 15e3, stats: { attack: 2200, defense: 1200, speed: 550, magicAttack: 500, magicDefense: 800, critRate: 0.25, critDamage: 1.9, accuracy: 1, evasion: 0.1, armorPen: 0.2, blockRate: 0.1, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["Kim"], multiplier: 1.7 }, rewards: { characterExp: 500, cultivationExp: 350, linhThach: 180, items: [] } },
  { id: "monster_011", name: "Th\u1EE7y X\xE0", level: 48, cultivation: { realm: "Kim \u0110an", stage: 4, lp: 0, lpToNext: 0 }, hp: 18e3, stats: { attack: 1800, defense: 1500, speed: 400, magicAttack: 2e3, magicDefense: 1600, critRate: 0.1, critDamage: 1.7, accuracy: 0.9, evasion: 0.08, armorPen: 0.1, blockRate: 0.15, mentalDemonResistance: 0.1 }, spiritRoot: { classificationId: "thien", attributes: ["Th\u1EE7y"], multiplier: 1.7 }, rewards: { characterExp: 550, cultivationExp: 400, linhThach: 200, items: [] } },
  { id: "monster_boss_van_yeu_son", name: "V\u1EA1n Y\xEAu V\u01B0\u01A1ng", level: 60, cultivation: { realm: "Nguy\xEAn Anh", stage: 1, lp: 0, lpToNext: 0 }, hp: 6e4, stats: { attack: 4e3, defense: 3e3, speed: 600, magicAttack: 4e3, magicDefense: 3e3, critRate: 0.25, critDamage: 2.2, accuracy: 1.2, evasion: 0.1, armorPen: 0.3, blockRate: 0.2, mentalDemonResistance: 0.4 }, spiritRoot: { classificationId: "ngu", attributes: ["Kim", "M\u1ED9c", "Th\u1EE7y", "H\u1ECFa", "Th\u1ED5"], multiplier: 1 }, rewards: { characterExp: 2e3, cultivationExp: 1500, linhThach: 1e3, items: [{ itemId: "item_myt_01", chance: 0.01 }] } },
  { id: "monster_012", name: "Tinh Linh Th\u1EE7y N\u1EEF", level: 55, cultivation: { realm: "Kim \u0110an", stage: 8, lp: 0, lpToNext: 0 }, hp: 25e3, stats: { attack: 1500, defense: 1800, speed: 500, magicAttack: 3500, magicDefense: 3e3, critRate: 0.1, critDamage: 1.8, accuracy: 1, evasion: 0.13, armorPen: 0, blockRate: 0.1, mentalDemonResistance: 0.2 }, spiritRoot: { classificationId: "thien", attributes: ["Th\u1EE7y"], multiplier: 1.7 }, rewards: { characterExp: 700, cultivationExp: 500, linhThach: 300, items: [] } },
  { id: "monster_boss_linh_tri", name: "Th\u1EE7y M\u1EABu Th\xE1nh N\u1EEF", level: 70, cultivation: { realm: "Nguy\xEAn Anh", stage: 5, lp: 0, lpToNext: 0 }, hp: 16e4, stats: { attack: 6e3, defense: 8e3, speed: 1200, magicAttack: 12e3, magicDefense: 1e4, critRate: 0.15, critDamage: 2, accuracy: 1.1, evasion: 0.15, armorPen: 0.1, blockRate: 0.2, mentalDemonResistance: 0.5 }, spiritRoot: { classificationId: "song", attributes: ["Th\u1EE7y", "B\u0103ng"], multiplier: 1.5 }, rewards: { characterExp: 3e3, cultivationExp: 2e3, linhThach: 1500, items: [{ itemId: "item_myt_02", chance: 0.01 }] } },
  { id: "monster_boss_ma_vuc", name: "Ma So\xE1i H\u1EAFc \xC1m", level: 80, cultivation: { realm: "H\xF3a Th\u1EA7n", stage: 1, lp: 0, lpToNext: 0 }, hp: 24e4, stats: { attack: 16e3, defense: 1e4, speed: 1400, magicAttack: 14e3, magicDefense: 8e3, critRate: 0.3, critDamage: 2.5, accuracy: 1.2, evasion: 0.1, armorPen: 0.4, blockRate: 0.2, mentalDemonResistance: 0.6 }, spiritRoot: { classificationId: "song", attributes: ["H\u1ECFa", "Kim"], multiplier: 1.5 }, rewards: { characterExp: 5e3, cultivationExp: 3500, linhThach: 2500, items: [{ itemId: "item_myt_03", chance: 0.01 }] } },
  { id: "monster_013", name: "L\xF4i Linh Nh\xE2n", level: 75, cultivation: { realm: "Nguy\xEAn Anh", stage: 8, lp: 0, lpToNext: 0 }, hp: 8e4, stats: { attack: 8e3, defense: 6e3, speed: 1800, magicAttack: 11e3, magicDefense: 7e3, critRate: 0.2, critDamage: 2, accuracy: 1.1, evasion: 0.13, armorPen: 0.2, blockRate: 0.1, mentalDemonResistance: 0.3 }, spiritRoot: { classificationId: "thien", attributes: ["L\xF4i"], multiplier: 1.7 }, rewards: { characterExp: 1500, cultivationExp: 1e3, linhThach: 800, items: [] } },
  { id: "monster_boss_ban_co", name: "C\u1EF1 Th\u1EA7n B\xE0n C\u1ED5 T\xE0n H\u1ED3n", level: 90, cultivation: { realm: "H\xF3a Th\u1EA7n", stage: 5, lp: 0, lpToNext: 0 }, hp: 4e5, stats: { attack: 24e3, defense: 2e4, speed: 1e3, magicAttack: 2e4, magicDefense: 2e4, critRate: 0.2, critDamage: 2, accuracy: 1.3, evasion: 0.05, armorPen: 0.5, blockRate: 0.5, mentalDemonResistance: 0.7 }, spiritRoot: { classificationId: "ngu", attributes: ["Kim", "M\u1ED9c", "Th\u1EE7y", "H\u1ECFa", "Th\u1ED5"], multiplier: 1 }, rewards: { characterExp: 1e4, cultivationExp: 7e3, linhThach: 5e3, items: [{ itemId: "item_myt_04", chance: 0.01 }] } },
  { id: "monster_014", name: "L\xF4i \u0110i\u1EC3u", level: 105, cultivation: { realm: "Luy\u1EC7n H\u01B0", stage: 2, lp: 0, lpToNext: 0 }, hp: 32e4, stats: { attack: 32e3, defense: 24e3, speed: 4800, magicAttack: 4e4, magicDefense: 28e3, critRate: 0.25, critDamage: 2.1, accuracy: 1.1, evasion: 0.15, armorPen: 0.3, blockRate: 0.1, mentalDemonResistance: 0.4 }, spiritRoot: { classificationId: "thien", attributes: ["L\xF4i"], multiplier: 1.7 }, rewards: { characterExp: 3e3, cultivationExp: 2e3, linhThach: 1500, items: [] } },
  { id: "monster_015", name: "Linh H\u1EA7u C\u1ED5", level: 115, cultivation: { realm: "Luy\u1EC7n H\u01B0", stage: 8, lp: 0, lpToNext: 0 }, hp: 6e5, stats: { attack: 6e4, defense: 48e3, speed: 3200, magicAttack: 2e4, magicDefense: 4e4, critRate: 0.3, critDamage: 2.3, accuracy: 1.2, evasion: 0.1, armorPen: 0.4, blockRate: 0.3, mentalDemonResistance: 0.5 }, spiritRoot: { classificationId: "thien", attributes: ["Th\u1ED5"], multiplier: 1.7 }, rewards: { characterExp: 4e3, cultivationExp: 2800, linhThach: 2e3, items: [] } },
  { id: "monster_016", name: "C\u1EF1 M\u1ED9c H\u1ED9 V\u1EC7", level: 135, cultivation: { realm: "H\u1EE3p Th\u1EC3", stage: 5, lp: 0, lpToNext: 0 }, hp: 8e5, stats: { attack: 8e4, defense: 1e5, speed: 1e3, magicAttack: 6e4, magicDefense: 9e4, critRate: 0.1, critDamage: 2, accuracy: 1.1, evasion: 0.05, armorPen: 0.2, blockRate: 0.4, mentalDemonResistance: 0.6 }, spiritRoot: { classificationId: "thien", attributes: ["M\u1ED9c"], multiplier: 1.7 }, rewards: { characterExp: 6e3, cultivationExp: 4e3, linhThach: 2500, items: [] } }
];
var TRAN_PHAP_LIST = [
  {
    id: "tp_001",
    name: "T\u1EE5 Linh Tr\u1EADn",
    description: "Tr\u1EADn ph\xE1p c\u01A1 b\u1EA3n nh\u1EA5t, gi\xFAp t\u0103ng t\u1ED1c \u0111\u1ED9 h\u1EA5p th\u1EE5 linh kh\xED.",
    cultivationBonus: 0.1
  },
  {
    id: "tp_002",
    name: "Kim Quang Tr\u1EADn",
    description: "T\u0103ng c\u01B0\u1EDDng s\u1EE9c t\u1EA5n c\xF4ng trong chi\u1EBFn \u0111\u1EA5u.",
    cultivationBonus: 0,
    combatBonus: { attack: 20 }
  }
];
var COMPANION_LIST = [
  {
    id: "companion_001",
    name: "Ti\u1EC3u H\u1ED3 Ly",
    description: "M\u1ED9t con h\u1ED3 ly nh\u1ECF tinh ngh\u1ECBch nh\u01B0ng trung th\xE0nh.",
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
    spiritRoot: { classificationId: "thien", attributes: ["H\u1ECFa"], multiplier: 1.7 },
    rarity: "Qu\xFD"
  },
  {
    id: "companion_bth",
    name: "B\u1EA1ch Thi\xEAn Huy\xEAn",
    description: "S\u01A1 Th\u1EE7y Th\xE1nh Long, Ch\xFAng Long Chi Ch\u1EE7.",
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
    spiritRoot: { classificationId: "bien_di", attributes: ["Th\u1EE7y", "B\u0103ng"], multiplier: 20 },
    rarity: "Th\u1EA7n Tho\u1EA1i",
    passiveSkills: [{ name: "Long H\u1ED3n", description: "T\u0103ng to\xE0n b\u1ED9 thu\u1ED9c t\xEDnh cho ch\u1EE7 nh\xE2n.", statBonuses: { attack: 1e3, defense: 1e3, hp: 5e3 } }]
  }
];
var NPC_LIST = [
  { id: "npc_001", name: "Tr\u01B0\u1EDFng th\xF4n", level: 10, cultivation: { realm: "Luy\u1EC7n Kh\xED", stage: 8, lp: 0, lpToNext: 0 }, description: "Ng\u01B0\u1EDDi \u0111\u1EE9ng \u0111\u1EA7u Th\xF4n Thanh Th\u1EE7y, lu\xF4n lo l\u1EAFng cho d\xE2n l\xE0ng.", avatarUrl: "https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg", baseStats: { attack: 10, defense: 10, speed: 10, magicAttack: 0, magicDefense: 5, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, totalStats: { attack: 10, defense: 10, speed: 10, magicAttack: 0, magicDefense: 5, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, equippedItems: {}, spiritRoot: { classificationId: "ngu", attributes: ["M\u1ED9c", "Th\u1ED5"], multiplier: 1 }, currentAreaId: "area_thanh_thuy" },
  { id: "npc_002", name: "Th\u1EE3 r\xE8n", level: 15, cultivation: { realm: "Luy\u1EC7n Kh\xED", stage: 10, lp: 0, lpToNext: 0 }, description: "M\u1ED9t th\u1EE3 r\xE8n c\u1EE5c c\u1EB1n nh\u01B0ng c\xF3 tay ngh\u1EC1 cao.", avatarUrl: "https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg", baseStats: { attack: 15, defense: 15, speed: 8, magicAttack: 0, magicDefense: 8, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, totalStats: { attack: 15, defense: 15, speed: 8, magicAttack: 0, magicDefense: 8, critRate: 0.05, critDamage: 1.5, accuracy: 0.9, evasion: 0.05, armorPen: 0, blockRate: 0, mentalDemonResistance: 0 }, equippedItems: {}, spiritRoot: { classificationId: "thien", attributes: ["Kim"], multiplier: 1.7 }, currentAreaId: "area_thanh_thuy" },
  { id: "npc_003", name: "Y\u1EBFn T\u1EED Nguy\u1EC7t", level: 30, cultivation: { realm: "Tr\xFAc C\u01A1", stage: 5, lp: 0, lpToNext: 0 }, description: "Gi\xE1m Linh S\u01B0 b\xED \u1EA9n t\u1EA1i Th\xE0nh V\xE2n L\xE2m, c\xF3 kh\u1EA3 n\u0103ng nh\xECn th\u1EA5u linh c\u0103n c\u1EE7a ng\u01B0\u1EDDi kh\xE1c.", avatarUrl: "https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg", baseStats: { attack: 20, defense: 20, speed: 20, magicAttack: 50, magicDefense: 50, critRate: 0.1, critDamage: 1.6, accuracy: 1, evasion: 0.1, armorPen: 0, blockRate: 0, mentalDemonResistance: 0.2 }, totalStats: { attack: 20, defense: 20, speed: 20, magicAttack: 50, magicDefense: 50, critRate: 0.1, critDamage: 1.6, accuracy: 1, evasion: 0.1, armorPen: 0, blockRate: 0, mentalDemonResistance: 0.2 }, equippedItems: {}, spiritRoot: { classificationId: "song", attributes: ["Th\u1EE7y", "B\u0103ng"], multiplier: 5 }, currentAreaId: "area_van_lam" }
];
var ALCHEMY_EXP_TABLE = Array.from({ length: 50 }, (_, i) => Math.floor(100 * (i + 1) * 1.2 ** i));
var ALCHEMY_RECIPES = [
  { id: "recipe_001", name: "\u0110an T\u1EE5 Linh", inputs: [{ itemId: "mat_linh_chi", count: 2 }, { itemId: "mat_ngoc_dich", count: 1 }], outputId: "pill_tu_linh", requiredLevel: 1, expGain: 10, successChance: 0.8, level: 1, requiredCauldronLevel: 1 },
  { id: "recipe_002", name: "\u0110an Tr\u1ECB Th\u01B0\u01A1ng", inputs: [{ itemId: "mat_huyet_thao", count: 2 }, { itemId: "item_004", count: 1 }], outputId: "pill_tri_thuong", requiredLevel: 3, expGain: 15, successChance: 0.75, level: 1, requiredCauldronLevel: 1 }
];

// constants.ts
var CULTIVATION_REALMS = ["Luy\u1EC7n Kh\xED", "Tr\xFAc C\u01A1", "Kim \u0110an", "Nguy\xEAn Anh", "H\xF3a Th\u1EA7n", "Luy\u1EC7n H\u01B0", "H\u1EE3p Th\u1EC3", "\u0110\u1ED9 Ki\u1EBFp", "\u0110\u1EA1i Th\u1EEBa", "Ch\xE2n Ti\xEAn", "Thi\xEAn Ti\xEAn", "Ti\xEAn V\u01B0\u01A1ng", "Ti\xEAn \u0110\u1EBF", "H\u1EADu Th\xE1nh V\u1ECB"];
var REALM_BREAKTHROUGH_FLAT_BONUS = [10, 50, 100, 200, 300, 400, 600, 800, 1e3, 5e3, 8e3, 1e4, 12e3, 15e3];
var REALM_BREAKTHROUGH_PERCENT_BONUS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5];
var STAGE_PERCENT_BONUS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5];
var ITEM_RARITY_COLORS = {
  "Ph\u1ED5 th\xF4ng": "border-gray-400",
  "Qu\xFD": "border-green-500",
  "Hi\u1EBFm": "border-blue-500",
  "Truy\u1EC1n K\u1EF3": "border-orange-500",
  "Th\u1EA7n Tho\u1EA1i": "border-red-600",
  "T\u1ED1i Th\u01B0\u1EE3ng": "border-purple-500 animate-pulse"
};
var ITEM_RARITY_TEXT_COLORS = {
  "Ph\u1ED5 th\xF4ng": "text-white",
  "Qu\xFD": "text-green-400",
  "Hi\u1EBFm": "text-blue-400",
  "Truy\u1EC1n K\u1EF3": "text-orange-400",
  "Th\u1EA7n Tho\u1EA1i": "text-red-500",
  "T\u1ED1i Th\u01B0\u1EE3ng": "text-purple-400"
};
var COMBAT_STAT_LABELS = {
  attack: "C\xF4ng K\xEDch",
  magicAttack: "Ph\xE1p C\xF4ng",
  defense: "Ph\xF2ng Ng\u1EF1",
  magicDefense: "Kh\xE1ng Ph\xE9p",
  critRate: "T\u1EC9 L\u1EC7 Ch\xED M\u1EA1ng",
  critDamage: "S.Th\u01B0\u01A1ng Ch\xED M\u1EA1ng",
  accuracy: "Ch\xEDnh X\xE1c",
  evasion: "N\xE9 Tr\xE1nh",
  speed: "T\u1ED1c \u0110\u1ED9",
  armorPen: "Xuy\xEAn Gi\xE1p",
  blockRate: "T\u1EC9 L\u1EC7 Ch\u1EB7n",
  mentalDemonResistance: "Kh\xE1ng T\xE2m Ma",
  luck: "May M\u1EAFn"
};

// data/mainStoryQuests.ts
var MAIN_STORY_QUESTS = [
  {
    id: "sq_01",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (1)",
    description: "B\u1EA1n c\u1EA3m nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t s\u1EE9c m\u1EA1nh ti\u1EC1m \u1EA9n trong ng\u01B0\u1EDDi, d\u01B0\u1EDDng nh\u01B0 c\xF3 li\xEAn quan \u0111\u1EBFn m\u1ED9t di v\u1EADt gia truy\u1EC1n. H\xE3y b\u1EAFt \u0111\u1EA7u h\xE0nh tr\xECnh, t\xECm hi\u1EC3u v\u1EC1 n\xF3 v\xE0 r\xE8n luy\u1EC7n b\u1EA3n th\xE2n b\u1EB1ng c\xE1ch ti\xEAu di\u1EC7t y\xEAu th\xFA.",
    progress: 0,
    target: 10,
    objective: { type: "kill", targetName: "Y\xEAu th\xFA b\u1EA5t k\u1EF3 t\u1EA1i R\u1EEBng M\xEA \u1EA2nh", targetId: "area_me_anh_any_monster" },
    reward: "200 EXP, 50 Linh Th\u1EA1ch",
    rewardObject: { characterExp: 200, linhThach: 50, itemId: "item_story_001" },
    nextQuestId: "sq_02"
  },
  {
    id: "sq_02",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (2)",
    description: "Thanh ki\u1EBFm g\xE3y m\xE0 b\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c d\u01B0\u1EDDng nh\u01B0 c\xF3 li\xEAn k\u1EBFt v\u1EDBi huy\u1EBFt m\u1EA1ch c\u1EE7a b\u1EA1n. \u0110\u1EC3 t\xECm hi\u1EC3u th\xEAm, b\u1EA1n c\u1EA7n thu th\u1EADp m\u1ED9t s\u1ED1 v\u1EADt li\u1EC7u \u0111\u1EB7c bi\u1EC7t \u0111\u1EC3 gi\u1EA3i m\xE3 b\xED \u1EA9n.",
    progress: 0,
    target: 3,
    objective: { type: "collect", targetName: "Huy\u1EBFt Tinh Th\xFA", itemId: "item_story_002" },
    reward: "500 EXP, 1x B\xECnh Linh Kh\xED",
    rewardObject: { characterExp: 500, itemId: "item_story_003" },
    turnInItems: [{ itemId: "item_story_002", count: 3 }],
    nextQuestId: "sq_03"
  },
  {
    id: "sq_03",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (3)",
    description: "B\u1EA1n \u0111\xE3 c\xF3 \u0111\u1EE7 nguy\xEAn li\u1EC7u. H\xE3y mang thanh ki\u1EBFm g\xE3y v\xE0 Huy\u1EBFt Tinh Th\xFA \u0111\u1EBFn l\xF2 r\xE8n t\u1EA1i Th\xF4n Thanh Th\u1EE7y \u0111\u1EC3 r\xE8n l\u1EA1i v\u0169 kh\xED gia truy\u1EC1n.",
    progress: 0,
    target: 1,
    objective: { type: "craft", targetName: "Ki\u1EBFm D\u1EF1ng H\u1ED3n", targetId: "item_story_004" },
    reward: "800 EXP",
    rewardObject: { characterExp: 800 },
    nextQuestId: "sq_04"
  },
  {
    id: "sq_04",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (4)",
    description: "M\u1ED9t \u0111\u1EA1o s\u0129 lang thang t\u1EA1i Th\xE0nh V\xE2n L\xE2m n\xF3i r\u1EB1ng \xF4ng ta c\xF3 tin t\u1EE9c v\u1EC1 cha c\u1EE7a b\u1EA1n. \xD4ng ta n\xF3i b\u1EA1n ph\u1EA3i ch\u1EE9ng minh th\u1EF1c l\u1EF1c b\u1EB1ng c\xE1ch \u0111\xE1nh b\u1EA1i H\u1EAFc Lang V\u01B0\u01A1ng \u0111ang ho\xE0nh h\xE0nh g\u1EA7n \u0111\xF3.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "H\u1EAFc Lang V\u01B0\u01A1ng", targetId: "monster_story_001" },
    reward: "1200 EXP, 1x V\xE9 Th\xF4ng H\xE0nh",
    rewardObject: { characterExp: 1200, itemId: "item_story_005" },
    nextQuestId: "sq_05"
  },
  {
    id: "sq_05",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (5)",
    description: "V\u1EDBi v\xE9 th\xF4ng h\xE0nh, b\u1EA1n c\xF3 th\u1EC3 tham gia k\u1EF3 thi nh\u1EADp m\xF4n c\u1EE7a T\xF4ng m\xF4n Thanh V\xE2n. H\xE3y v\u01B0\u1EE3t qua th\u1EED th\xE1ch \u0111\u1EC3 b\u01B0\u1EDBc ch\xE2n v\xE0o con \u0111\u01B0\u1EDDng tu ti\xEAn th\u1EF1c s\u1EF1.",
    progress: 0,
    target: 3,
    objective: { type: "kill", targetName: "\u0110\u1EC7 T\u1EED \u0110\u1ED1i Th\u1EE7", targetId: "monster_story_002" },
    reward: "1500 EXP, 1x Kh\xED V\u1EADn T\xF4ng M\xF4n",
    rewardObject: { characterExp: 1500, itemId: "item_story_006" },
    nextQuestId: "sq_06"
  },
  {
    id: "sq_06",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (6)",
    description: "Tr\u01B0\u1EDFng l\xE3o giao cho b\u1EA1n nhi\u1EC7m v\u1EE5 \u0111i\u1EC1u tra ma kh\xED b\u1EA5t th\u01B0\u1EDDng t\u1EA1i V\u1EF1c Linh Tr\xEC. D\u01B0\u1EDDng nh\u01B0 c\xF3 m\u1ED9t th\u1EF1c th\u1EC3 h\u1EAFc \xE1m \u0111ang \u1EA9n n\u1EA5u \u1EDF \u0111\xF3.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Ma \u1EA2nh Linh H\u1ED3n", targetId: "monster_story_003" },
    reward: "2500 EXP, 1x B\xECnh T\u1EA9y Ma",
    rewardObject: { characterExp: 2500, itemId: "item_story_007" },
    nextQuestId: "sq_07"
  },
  {
    id: "sq_07",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (7)",
    description: "B\u1EA1n ph\xE1t hi\u1EC7n ra m\u1ED9t m\u1ED1i li\xEAn h\u1EC7 gi\u1EEFa ma kh\xED v\xE0 huy\u1EBFt m\u1EA1ch c\u1EE7a m\xECnh. H\xE3y \u0111\u1EBFn Di t\xEDch B\xE0n C\u1ED5 \u0111\u1EC3 t\xECm ki\u1EBFm Linh Huy\u1EBFt B\xE0n C\u1ED5, hy v\u1ECDng n\xF3 c\xF3 th\u1EC3 gi\xFAp b\u1EA1n th\u1EE9c t\u1EC9nh s\u1EE9c m\u1EA1nh th\u1EF1c s\u1EF1.",
    progress: 0,
    target: 1,
    objective: { type: "collect", targetName: "Linh Huy\u1EBFt B\xE0n C\u1ED5", itemId: "item_story_008" },
    reward: "4000 EXP, Th\u1EE9c T\u1EC9nh Huy\u1EBFt M\u1EA1ch",
    rewardObject: { characterExp: 4e3 },
    storyTriggers: { type: "AWAKEN_BLOODLINE" },
    turnInItems: [{ itemId: "item_story_008", count: 1 }],
    nextQuestId: "sq_08"
  },
  {
    id: "sq_08",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (8)",
    description: "Sau khi th\u1EE9c t\u1EC9nh huy\u1EBFt m\u1EA1ch, b\u1EA1n g\u1EB7p m\u1ED9t ng\u01B0\u1EDDi t\u1EF1 x\u01B0ng l\xE0 b\u1EA1n c\u0169 c\u1EE7a cha. Ng\u01B0\u1EDDi n\xE0y \u0111\u01B0a cho b\u1EA1n hai con \u0111\u01B0\u1EDDng: theo \u0111u\u1ED5i ch\xEDnh \u0111\u1EA1o \u0111\u1EC3 b\u1EA3o v\u1EC7 th\u1EBF gian, ho\u1EB7c nh\u1EADp ma \u0111\u1EA1o \u0111\u1EC3 c\xF3 s\u1EE9c m\u1EA1nh v\xF4 song. V\u1EADn m\u1EC7nh n\u1EB1m trong tay b\u1EA1n.",
    progress: 0,
    target: 1,
    objective: { type: "event", targetName: "\u0110\u01B0a ra l\u1EF1a ch\u1ECDn Ch\xEDnh - Ma" },
    reward: "Nh\xE1nh truy\u1EC7n Ch\xEDnh \u0110\u1EA1o / Ma \u0110\u1EA1o",
    storyTriggers: { type: "CHOOSE_PATH" },
    nextQuestId: "sq_09"
  },
  {
    id: "sq_09",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (9)",
    description: "Con \u0111\u01B0\u1EDDng b\u1EA1n ch\u1ECDn \u0111\xF²i h\u1ECFi s\u1EE9c m\u1EA1nh l\u1EDBn h\u01A1n. \u0110\u1EC3 \u0111\u1ED9t ph\xE1 c\u1EA3nh gi\u1EDBi v\xE0 b\u01B0\u1EDBc v\xE0o Ti\xEAn Gi\u1EDBi, b\u1EA1n ph\u1EA3i \u0111\u1ED1i m\u1EB7t v\u1EDBi L\xF4i Ki\u1EBFp c\u1EE7a Thi\xEAn \u0110\u1EA1o. H\xE3y chu\u1EA9n b\u1ECB v\xE0 s\u1ED1ng s\xF3t.",
    progress: 0,
    target: 3,
    objective: { type: "kill", targetName: "L\xF4i Ki\u1EBFp", targetId: "monster_story_006" },
    reward: "8000 EXP, L\xF4i T\xE2m Gi\u1EDBi Th\u1EC3",
    rewardObject: { characterExp: 8e3, itemId: "item_story_009" },
    nextQuestId: "sq_10"
  },
  {
    id: "sq_10",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (10)",
    description: "Khi b\u01B0\u1EDBc v\xE0o Ti\xEAn Gi\u1EDBi, b\u1EA1n ph\xE1t hi\u1EC7n ra L\xF4i Ki\u1EBFp kh\xF4ng ph\u1EA3i l\xE0 th\u1EED th\xE1ch t\u1EF1 nhi\xEAn, m\xE0 l\xE0 m\u1ED9t \xE2m m\u01B0u c\u1EE7a Thi\xEAn \u0110\u1EA1o nh\u1EB1m ng\u0103n ch\u1EB7n nh\u1EEFng k\u1EBB c\xF3 huy\u1EBFt m\u1EA1ch nh\u01B0 b\u1EA1n. H\xE3y t\xECm v\xE0 \u0111\xE1nh b\u1EA1i ph\xE2n th\xE2n c\u1EE7a Thi\xEAn T\xF4n \u0111\u1EC3 v\u1EA1ch tr\u1EA7n s\u1EF1 th\u1EADt.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Thi\xEAn T\xF4n Ph\xE2n Th\xE2n", targetId: "monster_story_004" },
    reward: "10000 EXP, Thi\xEAn M\u1EC7nh Ph\xF9",
    rewardObject: { characterExp: 1e4, itemId: "item_story_010" },
    nextQuestId: "sq_11"
  },
  {
    id: "sq_11",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (11)",
    description: "Thi\xEAn \u0110\u1EA1o l\xE0 k\u1EBB th\xF9 chung. B\u1EA1n ph\u1EA3i thuy\u1EBFt ph\u1EE5c c\xE1c th\u1EBF l\u1EF1c trong Ti\xEAn Gi\u1EDBi v\xE0 Ma Gi\u1EDBi \u0111\u1EC3 l\u1EADp n\xEAn m\u1ED9t li\xEAn minh ch\u1ED1ng l\u1EA1i s\u1EF1 cai tr\u1ECB \u0111\u1ED9c \u0111o\xE1n n\xE0y. S\u1EBD c\xF3 k\u1EBB ch\u1ED1ng \u0111\u1ED1i, h\xE3y d\xF9ng th\u1EF1c l\u1EF1c \u0111\u1EC3 khi\u1EBFn ch\xFAng quy ph\u1EE5c.",
    progress: 0,
    target: 1,
    objective: { type: "event", targetName: "Ho\xE0n th\xE0nh \u0111\xE0m ph\xE1n li\xEAn minh" },
    reward: "15000 EXP, Danh hi\u1EC7u [Ph\xE1 Thi\xEAn]",
    rewardObject: { characterExp: 15e3 },
    storyTriggers: { type: "GAIN_TITLE", value: "Ph\xE1 Thi\xEAn" },
    nextQuestId: "sq_12"
  },
  {
    id: "sq_12",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (12)",
    description: "Li\xEAn minh \u0111\xE3 \u0111\u01B0\u1EE3c th\xE0nh l\u1EADp, nh\u01B0ng \u0111\u1EC3 th\u1EF1c s\u1EF1 \u0111\u1ED1i \u0111\u1EA7u v\u1EDBi Thi\xEAn \u0110\u1EA1o, b\u1EA1n c\u1EA7n t\xECm ra \u0111i\u1EC3m y\u1EBFu c\u1EE7a ch\xFAng. B\u1EA1ch Y Ti\xEAn T\u1EED t\u1EA1i Thi\xEAn Cung ti\u1EBFt l\u1ED9 v\u1EC1 'La B\xE0n Huy\u1EC5n C\u1EA3nh', ch\xECa kh\xF3a \u0111\u1EC3 v\xE0o n\u01A1i c\u1EA5t gi\u1EEF b\xED m\u1EADt, nh\u01B0ng n\xF3 \u0111ang \u0111\u01B0\u1EE3c m\u1ED9t 'Thi\xEAn Cung V\u1EC7 Th\u1EA7n' canh gi\u1EEF.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "Thi\xEAn Cung V\u1EC7 Th\u1EA7n", targetId: "monster_story_007" },
    reward: "30000 EXP, 1x La B\xE0n Huy\u1EC5n C\u1EA3nh",
    rewardObject: { characterExp: 3e4, itemId: "item_story_013" },
    nextQuestId: "sq_13"
  },
  {
    id: "sq_13",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (13)",
    description: "V\u1EDBi La B\xE0n Huy\u1EC5n C\u1EA3nh trong tay, b\u1EA1n c\xF3 th\u1EC3 ti\u1EBFn v\xE0o Huy\u1EC5n C\u1EA3nh Lu\xE2n H\u1ED3i \u0111\u1EC3 t\xECm l\u1EA1i linh h\u1ED3n t\u1ED5 ti\xEAn. Nh\u01B0ng \u0111\u1EC3 l\xE0m v\u1EADy, b\u1EA1n ph\u1EA3i \u0111\u1ED1i m\u1EB7t v\u1EDBi T\xE2m Ma D\u0129 V\xE3ng c\u1EE7a ch\xEDnh m\xECnh, th\u1EE9 \u0111\u01B0\u1EE3c sinh ra t\u1EEB nh\u1EEFng h\u1ED1i ti\u1EBFc v\xE0 m\u1EA5t m\xE1t.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "T\xE2m Ma D\u0129 V\xE3ng", targetId: "monster_story_005" },
    reward: "20000 EXP, \u1EA4n Gia T\u1ED9c Ph\u1EE5c Sinh",
    rewardObject: { characterExp: 2e4, itemId: "item_story_011" },
    turnInItems: [{ itemId: "item_story_013", count: 1 }],
    nextQuestId: "sq_14"
  },
  {
    id: "sq_14",
    isStoryQuest: true,
    title: "H\u1ED3i Sinh D\xF2ng Huy\u1EBFt M\u1EA1ch (14)",
    description: "V\u1EDBi \u1EA4n Gia T\u1ED9c trong tay, b\u1EA1n \u0111\xE3 c\xF3 th\u1EC3 th\u1EF1c hi\u1EC7n nghi l\u1EC5 cu\u1ED1i c\xF9ng \u0111\u1EC3 h\u1ED3i sinh ho\xE0n to\xE0n s\u1EE9c m\u1EA1nh c\u1EE7a d\xF2ng huy\u1EBFt m\u1EA1ch, kh\xF4i ph\u1EE5c l\u1EA1i vinh quang cho gia t\u1ED9c. \u0110\xE2y l\xE0 b\u01B0\u1EDBc cu\u1ED1i c\xF9ng tr\xEAn con \u0111\u01B0\u1EDDng c\u1EE7a b\u1EA1n.",
    progress: 0,
    target: 1,
    objective: { type: "event", targetName: "Th\u1EF1c hi\u1EC7n nghi l\u1EC5 ph\u1EE5c sinh" },
    reward: "Th\u1EA7n Huy\u1EBFt B\u1EA5t Di\u1EC7t, Danh hi\u1EC7u [Gia T\u1ED9c B\u1EA5t Di\u1EC7t]",
    rewardObject: { itemId: "item_story_012" },
    storyTriggers: { type: "GAIN_TITLE", value: "Gia T\u1ED9c B\u1EA5t Di\u1EC7t" },
    turnInItems: [{ itemId: "item_story_011", count: 1 }],
    nextQuestId: "sq_15"
  },
  {
    id: "sq_15",
    isStoryQuest: true,
    title: "Th\u1EA7n Long Chi V\u1EA5n",
    description: "S\u1EE9c m\u1EA1nh c\u1EE7a b\u1EA1n \u0111\xE3 kinh \u0111\u1ED9ng \u0111\u1EBFn c\u1EA3 nh\u1EEFng t\u1ED3n t\u1EA1i c\u1ED5 x\u01B0a nh\u1EA5t. M\u1ED9t l\u1EDDi m\u1EDDi t\u1EEB Long \u0110i\u1EC7n \u1EDF trung t\xE2m Th\u1EA7n Gi\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi \u0111\u1EBFn. H\xE3y \u0111\u1EBFn di\u1EC7n ki\u1EBFn Ch\xFAng Long Chi Ch\u1EE7, B\u1EA1ch Thi\xEAn Huy\xEAn, \u0111\u1EC3 ch\u1EE9ng t\u1ECF th\u1EF1c l\u1EF1c c\u1EE7a b\u1EA1n v\xE0 t\xECm hi\u1EC3u b\xED m\u1EADt cu\u1ED1i c\xF9ng c\u1EE7a th\u1EBF gi\u1EDBi n\xE0y.",
    progress: 0,
    target: 1,
    objective: { type: "kill", targetName: "B\u1EA1ch Thi\xEAn Huy\xEAn", targetId: "monster_boss_bth" },
    reward: "Truy\u1EC1n th\u1EEBa S\u01A1 Th\u1EE7y Th\xE1nh Long",
    rewardObject: { characterExp: 1e5, cultivationExp: 1e5 },
    nextQuestId: null
  }
];

// data/worldMapData.ts
var WORLD_MAP_DATA = [
  {
    id: "realm_pham_gioi",
    name: "Ph\xE0m Gi\u1EDBi",
    description: "L\xE0 n\u01A1i kh\u1EDFi \u0111\u1EA7u, sinh s\u1ED1ng c\u1EE7a ng\u01B0\u1EDDi th\u01B0\u1EDDng, \xEDt linh kh\xED, t\xE0i nguy\xEAn ngh\xE8o n\xE0n nh\u01B0ng c\xF3 nhi\u1EC1u c\xE2u chuy\u1EC7n m\u1EDF \u0111\u1EA7u.",
    levelRange: "1-40",
    areas: [
      {
        id: "area_thanh_thuy",
        name: "Th\xF4n Thanh Th\u1EE7y",
        description: "L\xE0ng kh\u1EDFi \u0111\u1EA7u \u2013 n\u01A1i nh\xE2n v\u1EADt ch\xEDnh l\u1EDBn l\xEAn. Giao di\u1EC7n c\u01A1 b\u1EA3n, nhi\u1EC7m v\u1EE5 h\u01B0\u1EDBng d\u1EABn.",
        levelRange: "1-5",
        npcs: ["Tr\u01B0\u1EDFng th\xF4n", "Th\u1EA7y thu\u1ED1c", "Th\u1EE3 r\xE8n"],
        monsters: ["C\u1ECDc g\u1ED7", "Chu\u1ED9t \u0110\xF3i", "Ch\xF3 Hoang"],
        boss: "Chu\u1ED9t Tinh Bi\u1EBFn D\u1ECB",
        rewards: ["Nguy\xEAn li\u1EC7u c\u01A1 b\u1EA3n", "Trang b\u1ECB ph\xE0m nh\xE2n", "\u0110an d\u01B0\u1EE3c c\u1EA5p th\u1EA5p"],
        possibleWeather: ["Tr\u1EDDi Quang", "M\u01B0a R\xE0o"]
      },
      {
        id: "area_van_lam",
        name: "Th\xE0nh V\xE2n L\xE2m",
        description: "Th\xE0nh l\u1EDBn, trung t\xE2m giao th\u01B0\u01A1ng. C\xF3 nhi\u1EC1u NPC, n\u01A1i nh\u1EADn nhi\u1EC7m v\u1EE5, luy\u1EC7n \u0111an, giao d\u1ECBch.",
        levelRange: "5-15",
        npcs: ["Th\u01B0\u01A1ng nh\xE2n", "Quan binh", "\u0110\u1EA1o s\u0129 lang thang", "Y\u1EBFn T\u1EED Nguy\u1EC7t"],
        monsters: ["Kh\xF4ng c\xF3 (th\xE0nh an to\xE0n)"],
        rewards: ["V\u1EADt ph\u1EA9m giao d\u1ECBch", "B\xED k\xEDp s\u01A1 c\u1EA5p", "B\u1EA3n \u0111\u1ED3 khu v\u1EF1c"],
        possibleWeather: ["Tr\u1EDDi Quang"]
      },
      {
        id: "area_me_anh",
        name: "R\u1EEBng M\xEA \u1EA2nh",
        description: "Khu r\u1EEBng nguy hi\u1EC3m \u0111\u1EA7u ti\xEAn \u2013 c\xF3 y\xEAu th\xFA, k\u1EF3 th\u1EA3o, ph\u1EE5 b\u1EA3n c\u1EA5p th\u1EA5p.",
        levelRange: "10-20",
        npcs: ["Ti\u1EC1u phu l\u1EA1c \u0111\u01B0\u1EDDng", "Y\xEAu linh nh\u1ECF"],
        monsters: ["Nh\u1EC7n \u0110\u1ED9c", "H\u1ED5 V\u1EB1n L\u1EEDa R\u1EEBng"],
        boss: "H\u1ED5 V\u01B0\u01A1ng M\xEA \u1EA2nh",
        rewards: ["Linh th\u1EA3o c\u1EA5p th\u1EA5p", "Da th\xFA", "Ph\xE1p b\u1EA3o s\u01A1 c\u1EA5p"],
        possibleWeather: ["Tr\u1EDDi Quang", "S\u01B0\u01A1ng M\xF9", "M\u01B0a R\xE0o"]
      },
      {
        id: "area_hang_da",
        name: "Hang \u0110\xE1 T\u1ED1i",
        description: "B\xED c\u1EA3nh \u1EA9n d\u01B0\u1EDBi n\xFAi \u2013 luy\u1EC7n kh\xED nh\xE2n t\u1EA1o, c\xF3 boss \u0111\u1EA7u ti\xEAn.",
        levelRange: "20-25",
        npcs: ["\u1EA8n s\u0129"],
        monsters: ["D\u01A1i M\xE1u", "Linh Th\u1EA1ch Nh\xE2n"],
        boss: "Vua D\u01A1i H\xFAt M\xE1u",
        rewards: ["Trang b\u1ECB lam", "C\xF4ng ph\xE1p nh\u1EADp m\xF4n", "Th\xFA c\u01B0\u1EE1i c\u1EA5p th\u1EA5p"]
      },
      {
        id: "area_tich_duong",
        name: "\u0110\u1EC9nh T\u1ECBch D\u01B0\u01A1ng",
        description: "N\u01A1i ng\u1EAFm ho\xE0ng h\xF4n \u2013 c\xF3 NPC b\xED \u1EA9n, l\u1EA7n \u0111\u1EA7u ti\xEAn nh\u1EAFc \u0111\u1EBFn 'tu ti\xEAn'.",
        levelRange: "25-30",
        npcs: ["Ti\xEAn gi\u1EA3 b\xED \u1EA9n"],
        monsters: [],
        rewards: ["C\u01A1 duy\xEAn hi\u1EBFm: ng\u1ED9 t\xEDnh +1", "Ph\xE1p kh\xED \u0111\u1EA7u ti\xEAn"],
        possibleWeather: ["Tr\u1EDDi Quang", "N\u1EAFng G\u1EAFt"]
      },
      {
        id: "area_linh_thu_sam_lam",
        name: "Linh Th\xFA S\xE2m L\xE2m",
        description: "N\u01A1i \u1EA9n n\u1EA5u c\u1EE7a c\xE1c Linh Th\xFA c\u1ED5 \u0111\u1EA1i.",
        levelRange: "25-40",
        npcs: ["Th\u1EA7n Th\xFA L\xE3o gi\u1EA3"],
        monsters: ["Y\xEAu Th\xFA Tinh Linh"],
        boss: "H\u1ED9 V\u1EC7 Th\u1EE5 Tinh",
        rewards: ["Linh h\u1ED3n th\xFA", "N\u1ED9i \u0111an y\xEAu th\xFA"],
        possibleWeather: ["Tr\u1EDDi Quang", "S\u01B0\u01A1ng M\xF9", "M\u01B0a R\xE0o"]
      }
    ]
  },
  {
    id: "realm_tu_chan_gioi",
    name: "Tu Ch\xE2n Gi\u1EDBi",
    description: "N\u01A1i c\xE1c tu s\u0129 ho\u1EA1t \u0111\u1ED9ng, linh kh\xED d\xE0y \u0111\u1EB7c, c\xF3 nhi\u1EC1u t\xF4ng m\xF4n, y\xEAu th\xFA, di t\xEDch c\u1ED5 x\u01B0a. N\u01A1i b\u1EAFt \u0111\u1EA7u con \u0111\u01B0\u1EDDng tu ti\xEAn th\u1EF1c s\u1EF1.",
    levelRange: "30-80",
    areas: [
      { id: "area_thanh_van", name: "T\xF4ng m\xF4n Thanh V\xE2n", description: "Ch\xEDnh ph\xE1i l\u1EDBn \u2013 c\xF3 th\u1EC3 gia nh\u1EADp, h\u1ECDc ph\xE1p thu\u1EADt, nh\u1EADn nhi\u1EC7m v\u1EE5 t\xF4ng m\xF4n.", levelRange: "30-50", boss: "H\u1ED9 S\u01A1n K\u1EF3 L\xE2n", possibleWeather: ["Tr\u1EDDi Quang", "M\u01B0a R\xE0o"] },
      { id: "area_van_yeu_son", name: "V\u1EA1n Y\xEAu S\u01A1n", description: "N\xFAi y\xEAu th\xFA c\u01B0 ng\u1EE5 \u2013 b\u1EAFt linh th\xFA, thu ph\u1EE5c, hu\u1EA5n luy\u1EC7n.", levelRange: "40-60", monsters: ["H\u1ED3 Linh", "Lang V\u01B0\u01A1ng", "Th\u1EE7y X\xE0"], boss: "V\u1EA1n Y\xEAu V\u01B0\u01A1ng", possibleWeather: ["Tr\u1EDDi Quang", "S\u01B0\u01A1ng M\xF9"] },
      { id: "area_linh_tri", name: "V\u1EF1c Linh Tr\xEC", description: "H\u1ED3 ch\u1EE9a linh kh\xED \u2013 t\u0103ng t\u1ED1c tu luy\u1EC7n, c\xF3 boss canh gi\u1EEF.", levelRange: "50-70", monsters: ["Tinh Linh Th\u1EE7y N\u1EEF"], boss: "Th\u1EE7y M\u1EABu Th\xE1nh N\u1EEF" },
      { id: "area_ma_vuc", name: "Th\xE0nh Ma V\u1EF1c", description: "N\u01A1i ma tu t\u1EE5 t\u1EADp \u2013 PvP t\u1EF1 do, k\u1ECBch b\u1EA3n ph\u1EA3n di\u1EC7n m\u1EA1nh.", levelRange: "60-80", boss: "Ma So\xE1i H\u1EAFc \xC1m", possibleWeather: ["Tr\u1EDDi Quang", "N\u1EAFng G\u1EAFt"] },
      { id: "area_ban_co", name: "Di t\xEDch B\xE0n C\u1ED5", description: "Di t\xEDch c\u1ED5 \u2013 xu\u1EA5t hi\u1EC7n k\u1EF3 ng\u1ED9, b\u1EA3o v\u1EADt, \u1EA9n ch\u1EE9a nguy hi\u1EC3m c\u1EF1c l\u1EDBn.", levelRange: "70+", monsters: ["L\xF4i Linh Nh\xE2n"], boss: "C\u1EF1 Th\u1EA7n B\xE0n C\u1ED5 T\xE0n H\u1ED3n", possibleWeather: ["Tr\u1EDDi Quang", "B\xE3o T\u1ED1"] }
    ]
  },
  {
    id: "realm_tien_gioi",
    name: "Ti\xEAn Gi\u1EDBi",
    description: "Ch\u1EC9 ng\u01B0\u1EDDi v\u01B0\u1EE3t \u0110\u1ED9 Ki\u1EBFp m\u1EDBi c\xF3 th\u1EC3 \u0111\u1EB7t ch\xE2n t\u1EDBi. Th\u1EBF gi\u1EDBi th\u1EA7n th\xE1nh, m\u1ED7i khu v\u1EF1c \u0111\u1EC1u c\xF3 thi\xEAn \u0111\u1EA1o gi\xE1m s\xE1t.",
    levelRange: "80-150",
    areas: [
      { id: "area_thien_cung", name: "Thi\xEAn Cung", description: "Trung t\xE2m c\u1EE7a Ti\xEAn gi\u1EDBi \u2013 NPC thi\xEAn t\u01B0\u1EDBng, b\u1EA3ng x\u1EBFp h\u1EA1ng ti\xEAn \u0111\u1ED3.", levelRange: "80-100", npcs: ["Thi\xEAn t\u01B0\u1EDBng", "B\u1EA1ch Y Ti\xEAn T\u1EED"], possibleWeather: ["Tr\u1EDDi Quang"] },
      { id: "area_ngoc_hu", name: "Ng\u1ECDc H\u01B0 C\u1EA3nh", description: "C\u1EA3nh gi\u1EDBi tu luy\u1EC7n c\u1EF1c nhanh \u2013 c\u1EA7n \u0111i\u1EC1u ki\u1EC7n cao \u0111\u1EC3 v\xE0o.", levelRange: "90+" },
      { id: "area_thien_loi", name: "Thi\xEAn L\xF4i V\u1EF1c", description: "N\u01A1i r\xE8n luy\u1EC7n \u0111\u1ED9 ki\u1EBFp \u2013 boss L\xF4i Th\u1EA7n, y\xEAu c\u1EA7u \u0111\u1ED9i nh\xF3m m\u1EA1nh.", levelRange: "100+", monsters: ["L\xF4i \u0110i\u1EC3u"], possibleWeather: ["B\xE3o T\u1ED1"] },
      { id: "area_linh_dien", name: "Linh \u0110i\u1EC7n C\u1EEDu Tr\u1ECDng", description: "9 t\u1EA7ng th\xE1p th\u1EED th\xE1ch \u2013 v\u01B0\u1EE3t c\xE0ng cao ph\u1EA7n th\u01B0\u1EDFng c\xE0ng l\u1EDBn.", levelRange: "110+", monsters: ["Linh H\u1EA7u C\u1ED5"] },
      { id: "area_van_mong", name: "\u0110\u1EA3o V\xE2n M\u1ED9ng", description: "Khu v\u1EF1c th\u01B0 gi\xE3n, c\xE2u c\xE1, h\u1EB9n h\xF2 \u0111\u1EA1o l\u1EEF, m\u1EDF kh\xF3a k\u1EF9 n\u0103ng \u0111\xF4i.", levelRange: "120+", possibleWeather: ["Tr\u1EDDi Quang", "M\u01B0a R\xE0o"] },
      { id: "area_than_moc", name: "Th\u1EA7n M\u1ED9c Vi\u1EC5n C\u1ED5", description: "\u0110\u1EA1i th\u1EE5 c\u1ED5 \u2013 ch\u1EE9a \u0111\u1EF1ng truy\u1EC1n th\u1EEBa Ti\xEAn Nh\xE2n th\u1EA5t l\u1EA1c.", levelRange: "130+", monsters: ["C\u1EF1 M\u1ED9c H\u1ED9 V\u1EC7"] }
    ]
  },
  {
    id: "realm_ma_gioi",
    name: "Ma Gi\u1EDBi",
    description: "C\xF3 th\u1EC3 song song t\u1ED3n t\u1EA1i v\u1EDBi Ti\xEAn gi\u1EDBi. B\u1ECB thi\xEAn \u0111\u1EA1o khinh th\u01B0\u1EDDng, nh\u01B0ng l\u1EA1i ch\u1EE9a s\u1EE9c m\u1EA1nh c\u1EA5m k\u1EF5.",
    levelRange: "120+",
    areas: [
      { id: "area_hac_phong", name: "H\u1EAFc Phong Tr\xEC", description: "Linh kh\xED \xE2m t\xE0 \u2013 luy\u1EC7n ma c\xF4ng, ch\u1EBF t\u1EA1o ph\xE1p b\u1EA3o t\xE0n \u0111\u1ED9c.", levelRange: "120+", monsters: ["Qu\u1EF7 Huy\u1EBFt N\xF4"] },
      { id: "area_huyet_hai", name: "Huy\u1EBFt H\u1EA3i V\xF4 Bi\xEAn", description: "Bi\u1EC3n m\xE1u \u2013 m\u1ED7i l\u1EA7n ch\u1EBFt \u1EDF \u0111\xE2y s\u1EBD t\u0103ng 's\xE1t kh\xED', m\u1EDF kh\xF3a k\u1EF9 n\u0103ng ma \u0111\u1EA1o.", levelRange: "130+", monsters: ["Ma Ng\u01B0"] },
      { id: "area_phong_an", name: "Phong \u1EA4n C\u1ED5 T\xF4ng", description: "Di t\xEDch ma t\xF4ng \u2013 b\u1ECB phong \u1EA5n, c\u1EA7n ph\xE1 gi\u1EA3i \u0111\u1EC3 nh\u1EADn truy\u1EC1n th\u1EEBa.", levelRange: "140+", monsters: ["U Linh Qu\xE2n"] },
      { id: "area_co_mo", name: "C\u1ED5 M\u1ED9 U Linh", description: "Khu m\u1ED9 c\u1EE7a ma th\u1EA7n \u2013 boss m\u1EA1nh, t\u1EF7 l\u1EC7 r\u1EDBt \u0111\u1ED3 truy\u1EC1n thuy\u1EBFt cao.", levelRange: "150+", monsters: ["Ma Th\u1EA7n B\u1EA5t T\u1EED"] },
      { id: "area_ma_de", name: "L\xE3nh \u0110\u1ECBa Ma \u