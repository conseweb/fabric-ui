'use strict';

var _ = require('lodash');

const electron = require('electron');  
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;

var path = require('path');

// ####################################################
// ####################################################

// Report crashes to our server.
crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
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
}, options);

// ############################################################################################
// ############################################################################################

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // if(process.platform !== 'darwin') { app.quit(); }
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1100, height: 600});
  // mainWindow.loadURL(path.join('file://', __dirname, options.views_dir, options.root_view));
  mainWindow.loadURL("http://localhost:9000")
  if(options.debug) { mainWindow.openDevTools(); }
  // Cleanup when window is closed
  mainWindow.on('closed', function() { 
    mainWindow = null; 
  });
});

// ############################################################################################
// ############################################################################################
