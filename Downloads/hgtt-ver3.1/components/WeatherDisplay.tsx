import React from 'react';
import { WeatherType } from '../types.ts';
import { WEATHER_DATA, WEATHER_ICONS } from '../data/weatherData.ts';

interface WeatherDisplayProps {
  weather: WeatherType;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const weatherInfo = WEATHER_DATA[weather];
  if (!weatherInfo) return null;

  return (
    <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-lg border border-gray-600 flex items-center gap-2 text-sm z-10 backdrop-blur-sm" title={weatherInfo.description}>
      <span className="text-xl">{WEATHER_ICONS[weather]}</span>
      <span className="font-semibold text-white">{weather}</span>
    </div>
  );
};

export default WeatherDisplay;