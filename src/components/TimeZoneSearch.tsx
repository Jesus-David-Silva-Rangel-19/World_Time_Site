import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

interface TimeZoneSearchProps {
  onAddLocation: (location: string) => void;
}

const TimeZoneSearch: React.FC<TimeZoneSearchProps> = ({ onAddLocation }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      onAddLocation(search.trim());
      setSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto mb-8">
      <Input
        type="text"
        placeholder="Search for a city or timezone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="font-mono"
      />
      <Button type="submit" variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default TimeZoneSearch;