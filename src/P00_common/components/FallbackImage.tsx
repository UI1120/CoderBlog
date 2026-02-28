import { useState } from 'react';
import { cn } from '@/P00_common/ui/utils';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText: string;
    fallbackClassName?: string;
}

export function FallbackImage({ src, alt, fallbackText, fallbackClassName, className, ...props }: FallbackImageProps) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className={cn("bg-gray-100 flex items-center justify-center", fallbackClassName, className)}>
                <span className="font-bold text-gray-400">{fallbackText}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
            {...props}
        />
    );
}
