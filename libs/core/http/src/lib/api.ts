'use server';
const API_URL = process.env.API_URL;
const VERCEL_COOKIE = process.env.VERCEL_COOKIE;

type ApiResponse<T> = {
  ok: boolean;
  statusCode: string;
  path?: string;
  message: string | { property: string; message: string }[];
  result: T;
};

export async function apifetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  if (!API_URL) throw new Error('Provide API_URL');
  let response: ApiResponse<T> | null = null;

  try {
    const res = await fetch(API_URL + '/' + input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        ...(VERCEL_COOKIE ? { Cookie: VERCEL_COOKIE } : {}),
      },
    });
    response = await res.json();
  } catch (error: any) {
    response = {
      ok: false,
      statusCode: error?.statusCode || 400,
      message: error?.message || '',
      result: error,
    };
  }

  return response as ApiResponse<T>;
}
