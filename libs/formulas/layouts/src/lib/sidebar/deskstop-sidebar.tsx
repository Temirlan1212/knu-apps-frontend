import ActiveLink from '@/ui/active-link';
import { routes } from '@/libs/formulas/utils/routes/dashboard-routes';

export const DesktopSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-screen w-full shrink-0 border-r md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <div>
            <CustomHeader />
            <div className="mt-6 flex flex-col gap-[5px]">
              {routes.map(({ path, title, activeRoutes }, index) => (
                <ActiveLink
                  key={index}
                  className={{
                    active: 'bg-accent',
                    default:
                      '!w-full flex text-md hover:bg-accent px-[8px] py-[5px] rounded-[10px]',
                  }}
                  href={`/${path}`}
                  activeRoutes={activeRoutes}
                >
                  {title}
                </ActiveLink>
              ))}
            </div>
          </div>
        </div>
      </aside>
      {children}
    </div>
  );
};

const CustomHeader = () => {
  return (
    <div className="flex">
      <span className="text-2xl font-extrabold">Админ панель</span>
    </div>
  );
};
