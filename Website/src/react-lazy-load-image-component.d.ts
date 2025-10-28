declare module 'react-lazy-load-image-component' {
  import * as React from 'react';

  export interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    effect?: 'blur' | 'black-and-white' | 'opacity';
    placeholderSrc?: string;
    wrapperClassName?: string;
    visibleByDefault?: boolean;
    beforeLoad?: () => void;
    afterLoad?: () => void;
    delayMethod?: 'debounce' | 'throttle';
    delayTime?: number;
    threshold?: number;
    useIntersectionObserver?: boolean;
  }

  export const LazyLoadImage: React.FC<LazyLoadImageProps>;
}
