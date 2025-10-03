
interface ConfigResponse {
  config: Config
}

interface Config {
  orderPhone?: string;
  supportPhone?: string;
  supportEmail?: string;
  blogurl?: string;
}

export type { Config, ConfigResponse };

