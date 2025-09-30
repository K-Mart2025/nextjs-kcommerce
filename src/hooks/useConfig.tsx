import { fetchConfig } from "@/services/config";
import { ConfigResponse } from "@/types/config";
import { useEffect, useState } from "react";

export const useConfig = (): ConfigResponse | null => {
  const [config, setConfig] = useState<ConfigResponse | null>(null);

  useEffect(() => {
    let isMounted = true; // to avoid setting state on unmounted component

    fetchConfig()
      .then((data) => {
        if (isMounted) setConfig(data);
      })
      .catch((error) => {
        console.error("Failed to fetch config:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return config;
};
