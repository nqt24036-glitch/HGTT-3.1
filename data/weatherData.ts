import { WeatherType, WeatherEffect, SpiritRootType } from '../types.ts';

export const WEATHER_ICONS: Record<WeatherType, string> = {
  'Trời Quang': '☀️',
  'Nắng Gắt': '🥵',
  'Mưa Rào': '🌧️',
  'Sương Mù': '🌫️',
  'Bão Tố': '⛈️',
};

export const WEATHER_DATA: Record<WeatherType, WeatherEffect> = {
  'Trời Quang': {
    description: "Bầu trời trong xanh, không mây. Điều kiện lý tưởng.",
  },
  'Nắng Gắt': {
    description: "Mặt trời thiêu đốt, không khí nóng như lửa. Gây bất lợi cho sinh vật hệ Băng, trợ lực cho hệ Hỏa.",
    combat: {
      elementalBoost: { type: 'Hỏa', multiplier: 1.2 },
      elementalWeaken: { type: 'Băng', multiplier: 0.8 },
    },
    world: {
      hpDrain: 1, // Drains 1 HP every 10 seconds while not in combat
    }
  },
  'Mưa Rào': {
    description: "Mưa lớn trút xuống, làm dịu đi không khí. Trợ lực cho hệ Thủy, khắc chế hệ Hỏa.",
    combat: {
      elementalBoost: { type: 'Thủy', multiplier: 1.2 },
      elementalWeaken: { type: 'Hỏa', multiplier: 0.8 },
    },
  },
  'Sương Mù': {
    description: "Sương mù dày đặc, tầm nhìn bị hạn chế. Tất cả đòn tấn công đều khó trúng đích hơn.",
    combat: {
      accuracyModifier: -0.15,
    }
  },
  'Bão Tố': {
    description: "Sấm chớp rền vang, gió giật mạnh. Trợ lực cực mạnh cho hệ Lôi, nhưng cũng gây khó khăn cho việc tấn công.",
    combat: {
      elementalBoost: { type: 'Lôi', multiplier: 1.3 },
      accuracyModifier: -0.1,
    }
  }
};