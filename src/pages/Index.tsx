import React, { useState } from 'react';
import TimeZoneSearch from '../components/TimeZoneSearch';
import TimeZoneCard from '../components/TimeZoneCard';

interface Location {
  name: string;
  timeZone: string;
}

const Index = () => {
  const [locations, setLocations] = useState<Location[]>([
    { name: 'New York', timeZone: 'America/New_York' },
    { name: 'London', timeZone: 'Europe/London' },
    { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
    { name: 'Manila', timeZone: 'Asia/Manila' }
  ]);

  const handleAddLocation = (location: string) => {
    setLocations([...locations, { name: location, timeZone: 'UTC' }]);
  };

  const handleDeleteLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newLocations = [...locations];
      [newLocations[index - 1], newLocations[index]] = [newLocations[index], newLocations[index - 1]];
      setLocations(newLocations);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < locations.length - 1) {
      const newLocations = [...locations];
      [newLocations[index], newLocations[index + 1]] = [newLocations[index + 1], newLocations[index]];
      setLocations(newLocations);
    }
  };

  return (
    <div className="min-h-screen p-8 pt-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-medium text-center mb-1">WORLD TIME WINDOWS</h1>
        <p className="text-sm text-gray-600 text-center mb-8">made by @pau_wee_</p>
        
        <TimeZoneSearch onAddLocation={handleAddLocation} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <TimeZoneCard
              key={`${location.name}-${index}`}
              location={location.name}
              timeZone={location.timeZone}
              onDelete={() => handleDeleteLocation(index)}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              isFirst={index === 0}
              isLast={index === locations.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;