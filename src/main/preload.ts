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
  dms: {
    bulkupload(data: boolean, val: any) {
      return ipcRenderer.invoke(CONSTANTS.OPERATION_BULKUPLOAD, data, val);
    },
    openScanner() {
      return ipcRenderer.invoke(CONSTANTS.OPEN_SCANNER);
    },
    openDms() {
      return ipcRenderer.invoke(CONSTANTS.LAUNCH_DMS);
    },
  },
  // Any other methods you want to expose in the window object.
});
