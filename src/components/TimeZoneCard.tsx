import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Sun, Cloud, Moon, Trash, ArrowUp, ArrowDown } from 'lucide-react';
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
  const [cloudPositions, setCloudPositions] = useState([
    { left: '-20%' },
    { left: '40%' },
    { left: '100%' }
  ]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const cloudTimer = setInterval(() => {
      setCloudPositions(clouds => 
        clouds.map(cloud => ({
          left: `${parseFloat(cloud.left) - 0.5}%`
        })).map(cloud => ({
          left: parseFloat(cloud.left) < -20 ? '120%' : cloud.left
        }))
      );
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(cloudTimer);
    };
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

  const getDayGradient = () => {
    const hours = parseInt(getTimeInZone().split(':')[0]);
    const minutes = parseInt(getTimeInZone().split(':')[1]);
    const time = hours + minutes / 60;

    if (time < 6) return 'bg-gradient-to-r from-[#243949] to-[#517fa4]';
    if (time < 8) return 'bg-gradient-to-r from-[#F97316] to-[#FEC6A1]';
    if (time < 16) return 'bg-gradient-to-r from-[#D3E4FD] to-[#F2FCE2]';
    if (time < 18) return 'bg-gradient-to-r from-[#FEC6A1] to-[#F97316]';
    return 'bg-gradient-to-r from-[#243949] to-[#517fa4]';
  };

  const getProgressBarColor = () => {
    const hours = parseInt(getTimeInZone().split(':')[0]);
    const minutes = parseInt(getTimeInZone().split(':')[1]);
    const time = hours + minutes / 60;

    if (time < 6) return 'bg-[#517fa4]';
    if (time < 8) return 'bg-[#F97316]';
    if (time < 16) return 'bg-[#D3E4FD]';
    if (time < 18) return 'bg-[#F97316]';
    return 'bg-[#517fa4]';
  };

  return (
    <div className="w-full max-w-xs bg-white">
      <div className={`relative w-full aspect-square ${getDayGradient()} overflow-hidden`}>
        {cloudPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute transition-all duration-50 opacity-50"
            style={{
              left: pos.left,
              top: `${20 + i * 20}%`,
            }}
          >
            <Cloud className="w-16 h-16 text-white fill-white" />
          </div>
        ))}
        <div 
          className="absolute transform -translate-x-1/2"
          style={{
            left: '50%',
            top: getSunMoonPosition(),
          }}
        >
          {isNightTime() ? (
            <Moon className="w-12 h-12 text-white fill-white" />
          ) : (
            <Sun className="w-12 h-12 text-yellow-500 fill-yellow-500" />
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-medium">{getTimeInZone()}</h2>
            <div className="text-lg text-warmblack uppercase">{location}</div>
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
        
        <div className="w-full h-1 bg-gray-100">
          <div 
            className={`h-full transition-all duration-1000 ${getProgressBarColor()}`}
            style={{ width: `${getDayProgress()}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeZoneCard;