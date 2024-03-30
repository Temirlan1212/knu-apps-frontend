import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { cookieUserServerService } from '../services/cookie-user-server.service';
import { cookieUserService } from '../services/cookie-user.service';
import { UserData } from '@/libs/formulas/utils/types';

export const authConroller = () => {
  return {
    getServerSession() {
      return cookieUserServerService().getItem();
    },
    loginWithCookie(data: UserData, router: AppRouterInstance) {
      cookieUserService().setItem(data);
      router.push('/');
      router.refresh();
    },
    logout(router: AppRouterInstance) {
      cookieUserService().removeItem();
      router.refresh();
    },
  };
};
