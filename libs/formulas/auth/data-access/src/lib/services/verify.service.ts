import { apifetch } from '@/libs/core/http/src';
import { cookieUserServerService } from './cookie-user-server.service';

export const verifyService = () => {
  return {
    async verifyTokenValidity() {
      const { token } = cookieUserServerService().getItem();
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
