declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
      AUTH_SECRET: string;
    }
  }
}

export {};
