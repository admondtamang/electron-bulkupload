import { ipcMain } from 'electron';
import Store from 'electron-store';
import { exit } from 'process';
import constants from './constants';
import { Multiple_bulkupload } from './dms-bulkupload/main';
import { setStore } from './util';

const store = new Store();
// IPC listener
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

ipcMain.on(constants.OPERATION_BULKUPLOAD, async (event, operation, data) => {
  setStore('global', data);

  if (operation) await Multiple_bulkupload();
  else exit(0);
});
