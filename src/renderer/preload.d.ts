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
      // bulkupload start and end
      bulkupload: {
        operation: (value: boolean, payload: any) => void;
      };
    };
  }
}
export {};
