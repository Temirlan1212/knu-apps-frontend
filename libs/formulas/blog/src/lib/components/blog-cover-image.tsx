'use client';
import Image from 'next/image';
import {
  UnsplashDialogList,
  UnsplashListProps,
} from '@/libs/formulas/unsplash/src';
import { useState } from 'react';

export function BlogCoverImage(props: UnsplashListProps) {
  const [url, setUrl] = useState(
    'https://plus.unsplash.com/premium_photo-1667239301911-bf995dffd979?q=80&w=3112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
        className="w-full h-[350px] object-cover rounded-[10px]"
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
