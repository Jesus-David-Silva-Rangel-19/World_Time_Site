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

const TIMEZONE_SUGGESTIONS = [
  { city: 'New York', timezone: 'America/New_York' },
  { city: 'London', timezone: 'Europe/London' },
  { city: 'Paris', timezone: 'Europe/Paris' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo' },
  { city: 'Sydney', timezone: 'Australia/Sydney' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { city: 'Dubai', timezone: 'Asia/Dubai' },
  { city: 'Singapore', timezone: 'Asia/Singapore' },
  { city: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
  { city: 'Shanghai', timezone: 'Asia/Shanghai' },
  { city: 'Seoul', timezone: 'Asia/Seoul' },
  { city: 'Mumbai', timezone: 'Asia/Kolkata' },
  { city: 'Delhi', timezone: 'Asia/Kolkata' },
  { city: 'Bangkok', timezone: 'Asia/Bangkok' },
  { city: 'Jakarta', timezone: 'Asia/Jakarta' },
  { city: 'Manila', timezone: 'Asia/Manila' },
  { city: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur' },
  { city: 'Beijing', timezone: 'Asia/Shanghai' },
  { city: 'Moscow', timezone: 'Europe/Moscow' },
  { city: 'Berlin', timezone: 'Europe/Berlin' },
  { city: 'Rome', timezone: 'Europe/Rome' },
  { city: 'Madrid', timezone: 'Europe/Madrid' },
  { city: 'Amsterdam', timezone: 'Europe/Amsterdam' },
  { city: 'Vienna', timezone: 'Europe/Vienna' },
  { city: 'Brussels', timezone: 'Europe/Brussels' },
  { city: 'Stockholm', timezone: 'Europe/Stockholm' },
  { city: 'Oslo', timezone: 'Europe/Oslo' },
  { city: 'Copenhagen', timezone: 'Europe/Copenhagen' },
  { city: 'Helsinki', timezone: 'Europe/Helsinki' },
  { city: 'Warsaw', timezone: 'Europe/Warsaw' },
  { city: 'Prague', timezone: 'Europe/Prague' },
  { city: 'Athens', timezone: 'Europe/Athens' },
  { city: 'Istanbul', timezone: 'Europe/Istanbul' },
  { city: 'Cairo', timezone: 'Africa/Cairo' },
  { city: 'Cape Town', timezone: 'Africa/Johannesburg' },
  { city: 'Johannesburg', timezone: 'Africa/Johannesburg' },
  { city: 'Lagos', timezone: 'Africa/Lagos' },
  { city: 'Nairobi', timezone: 'Africa/Nairobi' },
  { city: 'Chicago', timezone: 'America/Chicago' },
  { city: 'Toronto', timezone: 'America/Toronto' },
  { city: 'Vancouver', timezone: 'America/Vancouver' },
  { city: 'Mexico City', timezone: 'America/Mexico_City' },
  { city: 'São Paulo', timezone: 'America/Sao_Paulo' },
  { city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
  { city: 'Santiago', timezone: 'America/Santiago' },
  { city: 'Lima', timezone: 'America/Lima' },
  { city: 'Bogota', timezone: 'America/Bogota' },
  { city: 'Rio de Janeiro', timezone: 'America/Sao_Paulo' },
  { city: 'Auckland', timezone: 'Pacific/Auckland' },
  { city: 'Wellington', timezone: 'Pacific/Auckland' },
  { city: 'Fiji', timezone: 'Pacific/Fiji' },
  { city: 'Hawaii', timezone: 'Pacific/Honolulu' },
  { city: 'Perth', timezone: 'Australia/Perth' },
  { city: 'Brisbane', timezone: 'Australia/Brisbane' },
  { city: 'Melbourne', timezone: 'Australia/Melbourne' }
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