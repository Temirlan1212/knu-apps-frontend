'use client';
import Image from 'next/image';
import {
  UnsplashDialogList,
  UnsplashListProps,
} from '@/libs/formulas/unsplash/src';
import { useEffect, useState } from 'react';

export function BlogCoverImage(
  props: UnsplashListProps & { defaultImageUrl: string }
) {
  const [url, setUrl] = useState(props.defaultImageUrl);

  useEffect(() => {
    if (!!props.defaultImageUrl) setUrl(props.defaultImageUrl);
  }, [props.defaultImageUrl]);

  return (
    <div className="relative">
      <Image
        src={url}
        blurDataURL={url}
        alt={'cover blog image'}
        width={100}
        height={100}
        objectFit="cover"
        className="w-full h-[400px] object-cover rounded-[10px]"
        placeholder="blur"
        unoptimized
      />

      <UnsplashDialogList
        {...props}
        onSelect={(imageData) => {
          setUrl(imageData.urls.full);
          props.onSelect && props.onSelect(imageData);
        }}
      />
    </div>
  );
}
