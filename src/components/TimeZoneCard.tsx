import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Sun, Moon } from 'lucide-react';

interface TimeZoneCardProps {
  location: string;
  timeZone: string;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ location, timeZone }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeInZone = () => {
    return currentTime.toLocaleTimeString('en-US', { timeZone, hour12: false });
  };

  const getDateInZone = () => {
    return currentTime.toLocaleDateString('en-US', { 
      timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDayProgress = () => {
    const hours = parseInt(getTimeInZone().split(':')[0]);
    const minutes = parseInt(getTimeInZone().split(':')[1]);
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  };

  const isNightTime = () => {
    const hours = parseInt(getTimeInZone().split(':')[0]);
    return hours < 6 || hours >= 18;
  };

  const getSunMoonPosition = () => {
    const hours = parseInt(getTimeInZone().split(':')[0]);
    const minutes = parseInt(getTimeInZone().split(':')[1]);
    const totalMinutes = hours * 60 + minutes;
    const percentage = (totalMinutes / (24 * 60)) * 100;
    return `${Math.min(Math.max(percentage, 10), 90)}%`;
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className={`relative w-16 h-16 rounded-lg ${
        isNightTime() 
          ? 'bg-gradient-to-r from-[#243949] to-[#517fa4]' 
          : 'bg-gradient-to-r from-[#dfeaf7] to-[#f4f8fc]'
      }`}>
        <div 
          className="absolute transform -translate-x-1/2"
          style={{
            left: '50%',
            top: getSunMoonPosition(),
          }}
        >
          {isNightTime() ? (
            <Moon className="w-4 h-4 text-white" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-500" />
          )}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-medium">{location}</h2>
        <div className="text-sm text-gray-600">{getDateInZone()}</div>
        <div className="text-2xl">{getTimeInZone()}</div>
        <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
            style={{ width: `${getDayProgress()}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeZoneCard;