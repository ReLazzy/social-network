import { useEffect, useRef } from 'react';

export const useObserver = (
  ref: React.RefObject<HTMLDivElement>,
  isLoading: boolean,
  callback: () => void,
  canLoad: boolean
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    console.log('Зашел');

    if (isLoading) return;

    if (observer.current) observer.current.disconnect();
    const cb = function (entries: any, observer: any) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(cb);
    ref.current && observer.current.observe(ref.current);
  }, [isLoading]);
};
