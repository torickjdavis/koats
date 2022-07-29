declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      PORT?: string;
      HOST?: string;
      NODE_ENV?: 'prod' | 'dev';
    }
  }
}

export {};
