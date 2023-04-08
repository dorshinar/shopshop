declare global {
  namespace NodeJS {
    interface ProcessEnv {
      deployment: string;
    }
  }
}
export {};
