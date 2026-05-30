import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface PostSkeletonProps extends ComponentProps<"div"> {
    className?: string;
}
export default function PostSkeleton({className, ...props}: PostSkeletonProps) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-primary/10 animate-pulse rounded-md w-80 h-64 md:w-100 lg:w-200", className)}
            {...props}
        />
    );
}
