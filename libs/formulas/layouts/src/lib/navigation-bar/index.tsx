import ActiveLink from '@/ui/active-link';
import { routes } from '@/libs/formulas/utils/routes/dashboard-routes';
import { ScrollArea, ScrollBar } from '@/ui/scroll-area';

export const NavigationBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md py-4">
        <div className="flex w-max space-x-2">
          {routes.map(({ path, title, activeRoutes }, index) => (
            <ActiveLink
              key={index}
              className={{
                active: 'bg-accent',
                default:
                  'w-[fit-content] flex text-md hover:bg-accent px-[17px] py-[8px] rounded-[20px] text-primary/80',
              }}
              href={`/${path}`}
              activeRoutes={activeRoutes}
            >
              {title}
            </ActiveLink>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="py-5 border rounded-[15px] px-5">{children}</div>
    </div>
  );
};
