"use client"

import { RefObject, useEffect } from 'react';

function useEventDelegation<K extends keyof HTMLElementEventMap>(
  ref: RefObject<HTMLElement>,
  eventType: K,
  handler: (event: HTMLElementEventMap[K]) => void
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const eventListener = (event: HTMLElementEventMap[K]) => {
      handler(event);
    };

    element.addEventListener(eventType, eventListener);

    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [ref, eventType, handler]);
}

export default useEventDelegation;
