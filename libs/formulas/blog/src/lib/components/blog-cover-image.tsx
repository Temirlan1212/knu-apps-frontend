'use client';
import Image from 'next/image';
import {
  UnsplashDialogList,
  UnsplashListProps,
} from '@/libs/formulas/unsplash/src';
import { useState } from 'react';

export function BlogCoverImage(props: UnsplashListProps) {
  const [url, setUrl] = useState(
    'https://source.unsplash.com/random?theme,math,physics,backround'
  );
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