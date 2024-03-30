'use client';
import { PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface SectionBuilderWrapperProps {
  title: string;
  slots?: {
    titleRightBlock: React.ReactNode;
  };
}

export function SectionBuilderWrapper({
  title,
  slots,
  children,
}: PropsWithChildren<SectionBuilderWrapperProps>) {
  return (
    <div>
      <div className="flex gap-3 justify-between items-center">
        <h2 className="text-[30px]">{title}</h2>
        {slots?.titleRightBlock && slots.titleRightBlock}
      </div>
      <div className="min-h-[20dvh]">{children}</div>
    </div>
  );
}

export default SectionBuilderWrapper;
