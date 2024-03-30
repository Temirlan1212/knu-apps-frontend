'use server';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { UserCookieData, UserData } from '@/libs/formulas/utils/types';

export const cookieUserServerService = () => {
  return {
    getItem: function (): UserCookieData {
      const user: RequestCookie | undefined = cookies().get('user');
      if (user?.value) {
        const { token, data }: { token: string; data: UserData } = JSON.parse(
          user.value
        );
        return { status: 'authenticated', data, token };
      }

      return {
        status: 'unauthenticated',
        data: undefined,
        token: undefined,
      };
    },

    removeItem: function () {
      cookies().set({
        name: 'user',
        value: '',
        maxAge: -1,
      });
    },
  };
};
