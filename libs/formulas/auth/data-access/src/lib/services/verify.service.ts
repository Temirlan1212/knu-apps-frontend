import { apifetch } from '@/libs/core/http/src';
import { cookieUserService } from './cookie-user.service';

export const verifyService = () => {
  return {
    async verifyTokenValidity() {
      const { token } = cookieUserService().getItem();
      return await apifetch<any>('auth/verify-token', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
};
