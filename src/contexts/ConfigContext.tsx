"use client"

import React, { createContext, useEffect, useState } from "react";
import { fetchConfig } from "../services/config";
import { ConfigContextType, ConfigProviderProps, ConfigResponse } from "../types/config";

export const ConfigContext = createContext<ConfigContextType>({
  config: null,
  setConfig: () => {}, 
});

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ConfigResponse | null>(null);

  useEffect(() => {
    const fetchAndSetConfig = async () => {
      const config = await fetchConfig();
      setConfig(config);
    };
    fetchAndSetConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
