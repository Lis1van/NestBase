export type ConfigType = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  sentry: SentryConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type AwsConfig = {
  accessKey: string;
  secretKey: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
