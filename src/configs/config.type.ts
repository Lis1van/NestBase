export type ConfigType = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
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
