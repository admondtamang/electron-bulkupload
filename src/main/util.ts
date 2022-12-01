/* eslint import/prefer-default-export: off */
const Store = require('electron-store');
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

const store = new Store();

export function setStore(key: string, data: any) {
  store.set(key, data);
}

export function getStore(key: string) {
  return store.get(key);
}
