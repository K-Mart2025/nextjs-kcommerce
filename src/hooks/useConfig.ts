import { fetchConfig } from "@/services/config";
import { Config } from "@/types/config";
import { useEffect, useState } from "react";

export const useConfig = (): Config | null => {
  const [config, setConfig] = useState<Config | null>(null);
  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      try {
        const data = await fetchConfig();
        if (isMounted) setConfig(data.config);
      } catch (error) {
        console.error(error);
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    }
  }, []);

  return config;
};
