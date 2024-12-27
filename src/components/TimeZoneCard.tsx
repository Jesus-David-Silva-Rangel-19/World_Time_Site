import React, { useEffect, useState } from 'react';
import SkyBackground from './SkyBackground';
import TimeDisplay from './TimeDisplay';
import { 
  getTimeInZone, 
  getDateInZone, 
  getDayProgress 
} from '../utils/timeUtils';

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

  const timeString = getTimeInZone(currentTime, timeZone);
  const dateString = getDateInZone(currentTime, timeZone);
  const progress = getDayProgress(timeString);

  return (
    <div className="w-full max-w-xs bg-white">
      <SkyBackground timeString={timeString} />
      <TimeDisplay
        timeString={timeString}
        dateString={dateString}
        location={location}
        dayProgress={progress}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        isFirst={isFirst}
        isLast={isLast}
      />
    </div>
  );
};

export default TimeZoneCard;