import React, { useEffect, useRef, useState } from 'react';

export const InfiniteScrollProvider = ({
  children,
  onLoadMore,
}: {
  children: React.ReactNode;
  onLoadMore: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading) {
      setIsLoading(true);
      await onLoadMore();
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [handleIntersection]);

  return (
    <div className='h-60 overflow-y-scroll'>
      {children}
      {isLoading && (
        <div className='my-3 border border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin'></div>
      )}
      <div ref={targetRef} style={{ height: '1px' }}></div>
    </div>
  );
};
