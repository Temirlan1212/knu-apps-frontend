import { useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/libs/core/ui/src/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

const OPTIONS = [
  {
    value: 'profile',
    label: 'Профиль',
  },
];

export function ProfileCombox() {
  const [value, setValue] = useState('');
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Поиск модели..." className="h-9" />
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          <CommandGroup>
            {OPTIONS.map((model) => (
              <CommandItem
                key={model.value}
                value={model.value}
                onSelect={(currentValue: string) => {}}
              >
                {model.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === model.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}

            <CommandItem value="logout" className="!text-red-700">
              Выйти
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
