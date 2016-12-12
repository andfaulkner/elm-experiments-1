'use strict';
var electron = require('electron');
const chokidar = require('chokidar');

const config = require('../config/config');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', createWindow);

// ports.js', 'app/index.html', 'app/elm.js']
chokidar.watch(config.build.watchPaths)
    .on('change', () => {
        if (mainWindow) {
            // console.log('mainWindow', mainWindow);
            setTimeout(() => mainWindow.reload(), config.build.rebuildDelayOnChange);
        }
    })

function createWindow() {
    mainWindow = new BrowserWindow(config.app.defaultWindowDimensions);
    mainWindow.loadURL(`file://${__dirname}/${config.app.entryFile}`);
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Mac-specific

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit(); }
});

app.on('activate', () => {
    if (mainWindow === null) { createWindow(); }
});