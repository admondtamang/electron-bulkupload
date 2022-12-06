declare global {
  interface Window {
    electron: {
      core: {
        logs: () => any;
      };
      // electron get and set data - localstorage
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
      dms: {
        bulkupload: (value: boolean, payload: any) => void;
        openScanner: () => void;
        openDms: () => void;
      };
    };
  }
}
export {};
