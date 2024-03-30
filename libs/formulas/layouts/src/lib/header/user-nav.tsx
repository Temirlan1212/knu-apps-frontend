'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { UserData } from '@/libs/formulas/utils/types';
import { Logout } from './logout';
import { LogOut } from 'lucide-react';

export function UserNav({ username, role }: UserData) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-[40px] h-[40px] rounded-full"
        >
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              <p className="m-2 text-sm font-semibold truncate max-w-[50px]">
                {username}
              </p>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Профиль
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout>
          <DropdownMenuLabel
            className={
              '!cursor-pointer relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
            }
          >
            Выйти
            <DropdownMenuShortcut>
              <LogOut className="w-[20px]" />
            </DropdownMenuShortcut>
          </DropdownMenuLabel>
        </Logout>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
