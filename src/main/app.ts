import { BrowserWindow, ipcMain, app } from 'electron';
import Store from 'electron-store';
import path from 'path';
import { exit } from 'process';
import constants from './constants';
import { Multiple_bulkupload } from './dms-bulkupload/main';
import { setStore } from './util';
const cp = require('child_process');

const store = new Store();
// IPC listener
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

ipcMain.handle(constants.OPEN_SCANNER, async (event) => {
  cp.exec(`C:\\gentech\\tools\\naps2\\NAPS2.Portable.exe`);
});

ipcMain.handle(constants.LAUNCH_DMS, async (event) => {
  const dmsWindow = new BrowserWindow({
    show: false,
    modal: true,
    title: 'PaperBank',
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  dmsWindow.loadURL('http://localhost:3000');

  dmsWindow.on('ready-to-show', () => {
    dmsWindow.show();
  });
});

ipcMain.handle(
  constants.OPERATION_BULKUPLOAD,
  async (event, operation, data) => {
    setStore('global', data);

    if (operation) await Multiple_bulkupload();
    else exit(0);
  }
);
