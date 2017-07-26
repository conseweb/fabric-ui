'use strict';

var _ = require('lodash');

const electron = require('electron');  
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;

var path = require('path');

const menuTemplate = [
    {
      label: 'XWallet',
      submenu: [
        {
          label: 'Hello',
          accelerator: 'Shift+CmdOrCtrl+H',
          click() {
              console.log('Oh, hi from menu!')
          }
        }, {
                label: 'About ...',
                click: () => {
                    console.log('About Clicked');
                }
            }, {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
      ]
    }
  ];

const menu = Menu.buildFromTemplate(menuTemplate)

// ####################################################
// ####################################################

// Report crashes to our server.
crashReporter.start({
  productName: 'xinlian',
  companyName: 'mojing',
  submitURL: 'https://conseweb.com/crashreport',
  autoSubmit: true
})

var mainWindow = null;
var options = {
  "debug": false,
  "version": "1.0.0",
  "views_dir": "app",
  "root_view": "index.html"
};

options = _.extend({
  // ADDITIONAL CUSTOM SETTINGS
  debug: true
}, options);

// ############################################################################################
// ############################################################################################

function createWindow() {
  mainWindow = new BrowserWindow({width: 1100, height: 600});
  // mainWindow.loadURL(path.join('file://', __dirname, options.views_dir, options.root_view));
  mainWindow.loadURL(path.join('file://', __dirname, '/app/index.html'))
  // mainWindow.loadURL("http://localhost:9000")
  // Cleanup when window is closed
  mainWindow.on('closed', () => { 
    mainWindow = null
  })
}

function setMainMenu() {
  Menu.setApplicationMenu(menu);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // if(process.platform !== 'darwin') { app.quit(); }
  app.quit();
});

app.on('ready', () => {
  setMainMenu();
  createWindow()
  if(options.debug) { mainWindow.openDevTools(); }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})



// ############################################################################################
// ############################################################################################
