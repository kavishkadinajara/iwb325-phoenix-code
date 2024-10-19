import { useState, useEffect } from 'react';

type UseDebounceParams<T> = {
  value: T;
  delay: number;
};

export function useDebounce<T>({ value, delay }: UseDebounceParams<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}