declare global {
    interface Window {
      gtag: (command: string, targetId: string, config?: Record<string>) => void;
    }
  }
  
  export {};
  