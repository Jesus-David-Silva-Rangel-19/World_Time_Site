import React, { useEffect, useState, useCallback } from 'react';
import { Cloud, Sun, Moon } from 'lucide-react';
import { isNightTime, getSkyGradient, getSunMoonPosition } from '../utils/timeUtils';

interface SkyBackgroundProps {
  timeString: string;
}

const SkyBackground: React.FC<SkyBackgroundProps> = ({ timeString }) => {
  const [cloudPositions, setCloudPositions] = useState(() => {
    const numClouds = Math.floor(Math.random() * 3) + 2; // 2-4 clouds
    return Array(numClouds).fill(null).map(() => ({
      left: `${Math.random() * 120 - 20}%`,
      top: `${Math.random() * 40 + 20}%`,
      speed: (Math.random() * 0.01) + 0.005 // Reduced speed for smoother movement
    }));
  });

  const updateCloudPositions = useCallback(() => {
    setCloudPositions(prevPositions => 
      prevPositions.map(cloud => {
        const currentLeft = parseFloat(cloud.left);
        if (currentLeft < -20) {
          return { ...cloud, left: '120%' };
        }
        return { 
          ...cloud, 
          left: `${currentLeft - cloud.speed}%`
        };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCloudPositions, 16); // Increased animation frame rate for smoothness
    return () => clearInterval(interval);
  }, [updateCloudPositions]);

  return (
    <div className={`relative w-full aspect-square ${getSkyGradient(timeString)} overflow-hidden`}>
      {cloudPositions.map((cloud, i) => (
        <div
          key={i}
          className="absolute transition-all duration-[2000ms] ease-linear opacity-50"
          style={{
            left: cloud.left,
            top: cloud.top,
          }}
        >
          <Cloud className="w-16 h-16 text-white fill-white" />
        </div>
      ))}
      <div 
        className="absolute transform -translate-x-1/2"
        style={{
          left: '50%',
          top: getSunMoonPosition(timeString),
        }}
      >
        {isNightTime(timeString) ? (
          <Moon className="w-12 h-12 text-white fill-white" />
        ) : (
          <Sun className="w-12 h-12 text-yellow-300 fill-yellow-300" />
        )}
      </div>
    </div>
  );
};

export default SkyBackground;