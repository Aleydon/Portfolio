import Image from 'next/image';

import { getImageLoader } from '@/lib/image';

interface BlurImageProps {
  src: string;
  alt: string;
  fill: boolean;
  sizes: string;
  className?: string;
  priority?: boolean;
  blurred?: boolean;
}

function BlurImage({
  src,
  alt,
  fill,
  sizes,
  className,
  priority,
  blurred
}: BlurImageProps) {
  return (
    <Image
      loader={getImageLoader(src)}
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      aria-hidden={blurred || undefined}
    />
  );
}

interface ImageWithBlurProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  blurSizes?: string;
  blurClassName?: string;
  imageClassName?: string;
  containerClassName?: string;
  overlayClassName?: string;
}

export default function ImageWithBlur({
  src,
  alt,
  sizes,
  priority,
  blurSizes = '10px',
  blurClassName = 'scale-110 object-cover opacity-20 blur-2xl transition-transform duration-1000',
  imageClassName = 'relative z-10 object-contain transition-transform duration-1000 hover:scale-110',
  containerClassName = '',
  overlayClassName
}: ImageWithBlurProps) {
  return (
    <div className={`relative h-full w-full ${containerClassName}`}>
      <BlurImage
        src={src}
        alt=""
        fill
        sizes={blurSizes}
        className={blurClassName}
        blurred
      />
      <BlurImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={imageClassName}
        priority={priority}
      />
      {overlayClassName && (
        <div
          className={`absolute inset-0 z-20 ${overlayClassName}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
