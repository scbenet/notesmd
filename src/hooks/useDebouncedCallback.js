import { useRef, useCallback } from 'react';

// Simple debounce hook
export function useDebouncedCallback(callback, delay = 500) {
  const timeoutRef = useRef(null);
  
  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}