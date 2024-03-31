import { cookieService } from '@/libs/core/http/src/index';
import { UserCookieData, UserData } from '@/libs/formulas/utils/types';

export const cookieUserService = () => {
  return {
    getItem(): UserCookieData {
      function escape(s: string) {
        return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
      }
      var match = document.cookie.match(
        RegExp('(?:^|;\\s*)' + escape('user') + '=([^;]*)')
      );
      if (Array.isArray(match) && match.length >= 1) {
        const { token, data }: { token: string; data: UserData } = JSON.parse(
          match[1]
        );
        return { status: 'authenticated', data, token };
      }

      return {
        status: 'unauthenticated',
        data: undefined,
        token: undefined,
      };
    },

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
