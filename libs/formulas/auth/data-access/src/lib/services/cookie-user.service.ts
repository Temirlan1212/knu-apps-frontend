import { cookieService } from '@/libs/core/http/src/index';
import { UserData } from '@/libs/formulas/utils/types';

export const cookieUserService = () => {
  return {
    setItem(data: UserData) {
      cookieService.setCookie({
        cookieName: 'user',
        cookieValue: JSON.stringify(data),
        cookieLifespan: 1,
      });
    },

    removeItem() {
      cookieService.clearCookie({ cookieName: 'user' });
    },
  };
};
