import { apiUrl } from "@/data/config";
import { ConfigResponse } from "@/types/config";

export const fetchConfig = async (): Promise<ConfigResponse> => {
  const response = await fetch(`${apiUrl}/config/`, {
    next: { revalidate: 3600 }
  });
  if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
  const data = await response.json();
  return data;
};