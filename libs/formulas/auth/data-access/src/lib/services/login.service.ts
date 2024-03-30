import { apifetch } from '@/libs/core/http/src';
import { UserData } from '@/libs/formulas/utils/types';

export const loginService = () => {
  return {
    async loginWithCredentials({
      username,
      password,
    }: Pick<UserData, 'username'> & { password: string }) {
      return await apifetch<UserData>('auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
};
