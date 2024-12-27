import React, { useState } from 'react';
import TimeZoneSearch from '../components/TimeZoneSearch';
import TimeZoneCard from '../components/TimeZoneCard';

const Index = () => {
  const [locations, setLocations] = useState([
    { name: 'New York', timeZone: 'America/New_York' },
    { name: 'London', timeZone: 'Europe/London' },
    { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
  ]);

  const handleAddLocation = (location: string) => {
    // In a real app, we would validate and lookup the timezone
    setLocations([...locations, { name: location, timeZone: 'UTC' }]);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">World Time</h1>
        
        <TimeZoneSearch onAddLocation={handleAddLocation} />
        
        <div className="space-y-4">
          {locations.map((location, index) => (
            <TimeZoneCard
              key={index}
              location={location.name}
              timeZone={location.timeZone}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;