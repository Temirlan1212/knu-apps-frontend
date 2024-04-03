'use client';
import {
  unsplashService,
  UnsplashImage,
  UnsplashResponseMeta,
  useUnsplashState,
} from '@/libs/formulas/unsplash/src';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { SimplePagination } from '@/ui/simple-pagintation';
import { DebounceSearch } from '@/ui/data-table/debounce-search';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { RecatangleSkeleton } from '@/ui/skeletons/rectangle-skeleton';

export interface UnsplashListProps {
  onSelect?: (imageData: UnsplashImage) => void;
  props?: {
    imageProps?: {
      width: string;
      height: string;
    };
    wrapperProps?: HTMLAttributes<HTMLElement>;
  };
}

export function UnsplashList({ onSelect, props }: UnsplashListProps) {
  const wrapperRef = useRef(null);
  const setState = useUnsplashState((state) => state.set);
  const query = useUnsplashState((state) => state.searchQuery);
  const setQuery = (payload: typeof query) =>
    setState({ searchQuery: payload });

  const [selectedImageData, setSelectedImageData] = useState<UnsplashImage>();
  const [loading, setLoading] = useState<
    'default' | 'prev' | 'next' | 'search' | 'fetch'
  >('default');
  const [results, setResults] = useState<Partial<UnsplashResponseMeta>>();

  const isLastPage = () => results?.total_pages === query.page;
  const isFirsPage = () => query.page === 1;

  const searchImage = async (
    payload: typeof query,
    loadType: typeof loading
  ) => {
    setLoading(loadType);
    const res = await unsplashService.search(payload);
    res?.results && setResults(res);
    setLoading('default');
  };

  const nextPage = async () => {
    const new_query = { ...query, page: query.page + 1 };
    setQuery(new_query);
    searchImage(new_query, 'next');
  };

  const prevPage = async () => {
    const new_query = { ...query, page: query.page - 1 };
    setQuery(new_query);
    searchImage(new_query, 'prev');
  };

  useEffect(() => {
    searchImage(query, 'fetch');
  }, []);

  return (
    <div className="p-5 relative flex flex-col gap-2">
      <DebounceSearch
        loading={loading === 'search'}
        placeholder="Поиск"
        onDebounceChange={(text) => {
          const new_query = { ...query, searchValue: text };
          searchImage(new_query, 'search');
          setQuery(new_query);
        }}
      />
      <div className="border rounded-[3px] py-3">
        <div
          {...(props?.wrapperProps || {})}
          className={twMerge(
            'flex flex-wrap gap-2 px-3 w-full overflow-auto',
            props?.wrapperProps?.className || ''
          )}
          ref={wrapperRef}
        >
          {results?.results?.map((item, index) => (
            <div
              key={item.id}
              className={`group h-[${
                props?.imageProps?.height || '250px'
              }] w-[${
                props?.imageProps?.width || '250px'
              }] grow relative cursor-pointer`}
              onClick={() => {
                onSelect && onSelect(item);
                setSelectedImageData(item);
              }}
            >
              {loading !== 'default' && (
                <RecatangleSkeleton
                  className={`!h-[${
                    props?.imageProps?.height || '250px'
                  }] !w-[${props?.imageProps?.width || '250px'}] `}
                />
              )}
              {loading === 'default' && (
                <Image
                  key={index}
                  src={item.urls.full}
                  blurDataURL={item.urls.full}
                  alt={item.alt_description}
                  width={100}
                  height={100}
                  quality={50}
                  className="h-full w-full rounded-[3px] object-cover bg-no-repeat grow border"
                  placeholder="blur"
                />
              )}
              <div
                className={twMerge(
                  'rounded-[3px] absolute right-0 left-0 top-0 bottom-0 opacity-[0] bg-white group-hover:opacity-[0.5] transition duration-300 ease-in-out',
                  selectedImageData?.id === item.id ? 'opacity-[0.5]' : ''
                )}
              />
            </div>
          ))}

          {results?.total === 0 && (
            <p className="w-full text-center py-[50px] text-sm text-muted-foreground">
              Ничего найдено
            </p>
          )}
        </div>
      </div>

      <SimplePagination
        onNext={nextPage}
        onPrev={prevPage}
        props={{
          nextBtn: {
            disabled: isLastPage() || loading !== 'default',
            loading: loading === 'next',
          },
          prevBtn: {
            disabled: isFirsPage() || loading !== 'default',
            loading: loading === 'prev',
          },
        }}
        slots={{
          leftTitle: (
            <div className="flex gap-2">
              <p>
                {query.page} из {results?.total_pages}
              </p>
            </div>
          ),
        }}
      />
    </div>
  );
}
