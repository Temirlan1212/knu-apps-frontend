'use client';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/ui/sheet';
import { PanelRightClose } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ActiveLink from '@/ui/active-link';
import { routes } from '@/libs/formulas/utils/routes/dashboard-routes';

export const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navigate = (href: string) => {
    setOpen(false);
    router.push(`/${href}`);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="mt-5 flex md:hidden container md:p-[0px]">
          <div className="flex flex-1">{<CustomHeader />}</div>
          <SheetTrigger>
            <PanelRightClose size={24} />
          </SheetTrigger>
        </div>
        <SheetContent side="right">
          {routes.map(({ path, title }, index) => (
            <ActiveLink
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(path);
              }}
              key={index}
              className={{
                active: 'bg-accent',
                default:
                  '!w-full flex text-md hover:bg-accent px-[8px] py-[5px] rounded-[10px]',
              }}
              href={`/${path}`}
            >
              <SheetClose>{title}</SheetClose>
            </ActiveLink>
          ))}
        </SheetContent>
      </Sheet>
      {children}
    </>
  );
};

const CustomHeader = () => {
  return (
    <div className="flex">
      <span className="text-2xl font-extrabold">Главная</span>
    </div>
  );
};
