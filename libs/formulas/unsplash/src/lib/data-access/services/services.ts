const API_CLIENTID = 'uSfFCaHdrawfkb0c21INcNbY6WllBLHfkOA9kP4Su8k';
const API_URL = `https://api.unsplash.com/search/photos`;

export interface UnsplashImage {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  alt_description: string;
  id: string;
}

export interface UnsplashResponseMeta {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

const unsplashServiceFunc = () => {
  return {
    search({
      searchValue,
      per_page,
      page,
    }: {
      searchValue: string;
      page: number;
      per_page: number;
    }): Promise<Partial<UnsplashResponseMeta>> {
      const params = new URLSearchParams();
      params.append('query', String(searchValue || 'nature'));
      params.append('page', String(page || 1));
      params.append('per_page', String(per_page || 30));
      params.append('client_id', String(API_CLIENTID));
      return fetch(`${API_URL}/?${params}`)
        .then((response) => response.json())
        .then((result) => result);
    },
  };
};
export const unsplashService = unsplashServiceFunc();
