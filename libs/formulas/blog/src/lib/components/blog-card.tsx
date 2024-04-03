import Image from 'next/image';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import { Button, ButtonProps } from '@/ui/button';
import { Blog } from '@/libs/formulas/utils/types';
const defaultImgUrl =
  'https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export interface BlogCardProps extends Blog {
  props?: { button?: Omit<ButtonProps, 'className' | 'variant'> };
}
export function BlogCard({
  description,
  title,
  coverImgUrl,
  props,
}: Pick<BlogCardProps, 'description' | 'title' | 'coverImgUrl' | 'props'>) {
  return (
    <Card className="h-[340px] w-[300px] rounded-[28px] p-2 relative grow">
      <Image
        src={coverImgUrl || defaultImgUrl}
        blurDataURL={coverImgUrl || defaultImgUrl}
        alt={'cover blog image'}
        width={100}
        height={100}
        objectFit="cover"
        className="h-[200px] w-full object-cover rounded-[23px] rounded-b-[10px] border"
        placeholder="blur"
        unoptimized
      />
      <CardHeader className="p-0 py-2 pb-4">
        <CardTitle className="truncate max-w-[240px] text-[20px]">
          {title}
        </CardTitle>
        <CardDescription className="truncate max-w-[240px]">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end w-full p-0">
        <Button
          variant="outline"
          className="w-full rounded-[20px]"
          {...(props?.button || {})}
        >
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
}
