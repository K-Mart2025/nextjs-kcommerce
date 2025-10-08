import { apiUrl } from "@/data/config";

export async function trackVisit(page: string, deviceType: string) {
  try {
    await fetch(`${apiUrl}/api/client/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        deviceType,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Error al registrar visita', error);
  }
}

export const detectDeviceType = (userAgent: string): string => {
  if (/mobile/i.test(userAgent)) return 'Mobile';
  if (/tablet|ipad/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
}