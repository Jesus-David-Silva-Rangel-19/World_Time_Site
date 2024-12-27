import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Sun, Moon, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

interface TimeZoneCardProps {
  location: string;
  timeZone: string;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ 
  location, 
  timeZone,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) => {
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
    <div className="w-full max-w-xs bg-white rounded-lg shadow-sm overflow-hidden">
      <div className={`relative w-full aspect-square ${
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
            <Moon className="w-6 h-6 text-white" />
          ) : (
            <Sun className="w-6 h-6 text-yellow-500" />
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-medium">{getTimeInZone()}</h2>
            <div className="text-lg text-warmblack">{location}</div>
          </div>
          <div className="flex gap-1">
            {!isFirst && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMoveUp}
                className="h-8 w-8"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
            {!isLast && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMoveDown}
                className="h-8 w-8"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onDelete}
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-600">{getDateInZone()}</div>
        
        <div className="w-full h-1 bg-gray-100 rounded-full">
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