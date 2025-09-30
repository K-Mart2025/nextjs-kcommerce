import { ReactNode } from "react";

interface ConfigProviderProps {
  children: ReactNode;
}
interface ConfigContextType {
  config: ConfigResponse | null;
  setConfig: React.Dispatch<React.SetStateAction<ConfigResponse | null>>;
}

interface ConfigResponse {
  orderPhone?: string;
  supportPhone?: string;
  supportEmail?: string;
  blogurl?: string;
}

export type { ConfigContextType, ConfigProviderProps, ConfigResponse };
