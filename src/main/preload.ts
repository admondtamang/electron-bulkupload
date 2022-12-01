import CONSTANTS from './constants';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  core: {
    logs() {
      return ipcRenderer.sendSync(CONSTANTS.ELECTRON_LOGS);
    },
  },
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: string, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  bulkupload: {
    operation(data: boolean, val: any) {
      return ipcRenderer.sendSync(CONSTANTS.OPERATION_BULKUPLOAD, data, val);
    },
  },
  // Any other methods you want to expose in the window object.
});
