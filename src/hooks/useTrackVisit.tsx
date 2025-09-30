"use client"

import { apiUrl } from '@/data/config';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

interface VisitsData {
  page: string;
  deviceType: string;
  timestamp: string;
}

interface ApiError {
  message?: string;
  statusCode?: number;
}

interface TrackVisitResponse {
  msg: string;
}

async function trackVisit(data: VisitsData): Promise<TrackVisitResponse> {
  const res = await fetch(`${apiUrl}/api/client/visits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await res.json();
}

export function useTrackVisit() {
  const mutation = useMutation<{ msg: string }, ApiError, VisitsData>({
    mutationFn: trackVisit,
  });

  useEffect(() => {
    if (!sessionStorage.getItem('visitTracked')) {
      let deviceType = 'Desktop';
      if (isMobile) deviceType = 'Mobile';
      else if (isTablet) deviceType = 'Tablet';

      const path = window.location.pathname;
      const page = path === '/' ? 'Home' : path;

      mutation.mutate({
        page,
        deviceType,
        timestamp: new Date().toISOString(),
      });

      sessionStorage.setItem('visitTracked', 'true');
    }
  }, [mutation]);
}
