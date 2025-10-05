
interface ConfigResponse {
  config: Config
}

interface Config {
  orderPhone?: string;
  supportPhone?: string;
  supportEmail?: string;
  blogUrl?: string;
  commerceUrl?: string;
}

export type { Config, ConfigResponse };

