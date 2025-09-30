import { apiUrl } from "@/data/config";

export const postVisit = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/client/?visit=`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el número de teléfono:", error);
  }
  return Error;
};
