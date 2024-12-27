import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface TimeZoneSearchProps {
  onAddLocation: (location: string) => void;
}

// This is a simplified list - in a real app, you'd want a more complete database
const TIMEZONE_SUGGESTIONS = [
  { city: 'New York', timezone: 'America/New_York' },
  { city: 'London', timezone: 'Europe/London' },
  { city: 'Paris', timezone: 'Europe/Paris' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo' },
  { city: 'Sydney', timezone: 'Australia/Sydney' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { city: 'Dubai', timezone: 'Asia/Dubai' },
  { city: 'Singapore', timezone: 'Asia/Singapore' },
];

const TimeZoneSearch: React.FC<TimeZoneSearchProps> = ({ onAddLocation }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState(TIMEZONE_SUGGESTIONS);

  useEffect(() => {
    if (search) {
      const filtered = TIMEZONE_SUGGESTIONS.filter(item =>
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.timezone.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(TIMEZONE_SUGGESTIONS);
    }
  }, [search]);

  const handleSelect = (value: string) => {
    onAddLocation(value);
    setSearch('');
    setOpen(false);
  };

  return (
    <div className="flex gap-2 max-w-md mx-auto mb-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder="Search for a city or timezone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-mono"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {suggestions.map((item) => (
                  <CommandItem
                    key={item.timezone}
                    onSelect={() => handleSelect(item.city)}
                    className="flex justify-between"
                  >
                    <span>{item.city}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date().toLocaleTimeString('en-US', { timeZone: item.timezone, hour12: false })}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button type="submit" variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TimeZoneSearch;