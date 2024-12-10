declare global {
    interface Window {
      gtag: (command: string, targetId: string, config?: Record<string>) => void;
      fbq: (command: string, ...args: unknown[]) => void;
    }
  }
  
  export {};
  