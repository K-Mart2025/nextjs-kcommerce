import { apiUrl } from "@/data/config";

export const fetchConfig = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/config/`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error al obtener el número de teléfono:", error);
  }
  return Error
};
