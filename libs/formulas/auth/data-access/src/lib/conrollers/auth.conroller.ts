import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { cookieUserServerService } from '../services/cookie-user-server.service';
import { cookieUserService } from '../services/cookie-user.service';
import { UserData } from '@/libs/formulas/utils/types';
import { verifyService } from '../services/verify.service';

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
    async verifyToken() {
      return await verifyService().verifyTokenValidity();
    },
  };
};

// import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// import { cookieUserServerService } from '../services/cookie-user-server.service';
// import { cookieUserService } from '../services/cookie-user.service';
// import { UserData } from '@/libs/formulas/utils/types';
// import { verifyService } from '../services/verify.service';

// const authConrollerMethods = {
//   getServerSession() {
//     return cookieUserServerService().getItem();
//   },
//   loginWithCookie(data: UserData, router: AppRouterInstance) {
//     cookieUserService().setItem(data);
//     router.push('/');
//     router.refresh();
//   },
//   logout(router: AppRouterInstance) {
//     cookieUserService().removeItem();
//     router.refresh();
//   },
//   async verifyToken() {
//     return await verifyService().verifyTokenValidity();
//   },
// };

// export const authConroller = () => {
//   return {
//     getServerSession: () => authConrollerMethods.getServerSession(),
//     loginWithCookie: (data: UserData, router: AppRouterInstance) =>
//       authConrollerMethods.loginWithCookie(data, router),
//     logout: (router: AppRouterInstance) => authConrollerMethods.logout(router),
//     verifyToken: async (router: AppRouterInstance) => {
//       const { ok } = await authConrollerMethods.verifyToken();
//       if (!ok) authConrollerMethods.logout(router);
//     },
//   };
// };
