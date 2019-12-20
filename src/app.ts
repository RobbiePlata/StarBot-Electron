import * as path from 'path';
import openAboutWindow, { AboutWindowInfo } from 'electron-about-window';
import { app, BrowserWindow, Menu, Notification, Tray } from "electron";
import SettingsHolder from './SettingsHolder';
//import starbot from './starbot/Main';

//let bot: any;
let settings: SettingsHolder;
let mainWindow: BrowserWindow, winrateWindow: BrowserWindow, replaypackWindow: BrowserWindow, settingsWindow: BrowserWindow;
let apptray: Tray;

app.on('ready', () => {
  //bot = new starbot();
  settings = new SettingsHolder();
  ActivateAppTray();
  CreateMainWindow();
  let myNotification = new Notification({title: "StarBot", body: "Running", icon: path.join(__dirname + '/assets/iconimage.png')});
  myNotification.show();
});

function ActivateAppTray(){
  apptray = new Tray(path.join(__dirname + '/assets/iconimage.png'))
  apptray.setToolTip("StarBot");
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Close', 
      type: 'normal', 
      click(){
        app.quit();
      }
    },
  ])
  apptray.setContextMenu(contextMenu)
}

function CreateMainWindow() { 
  if(!settings.DarkMode){

    mainWindow = new BrowserWindow({
      title: "StarBot",
      frame: false,
      webPreferences: {
        preload: 'prerender.js',
        nodeIntegration: true,
        nodeIntegrationInWorker: false,
        webviewTag: true
      },
      icon: path.join(__dirname + '/assets/iconimage.png'),
      height: 960,
      width: 540
    });
  }
  
  const menu = Menu.buildFromTemplate(MainTemplate);
  Menu.setApplicationMenu(menu);
  mainWindow.loadURL((__dirname + '/forms/index.html'));
  
  //mainWindow.webContents.openDevTools();
}

function SetupPage(){
  winrateWindow = new BrowserWindow({
    frame: false,
    title: "WinRate",
    icon: path.join(__dirname + '/assets/iconimage.png'),
    height: 300,
    width: 400,
  });
  winrateWindow.removeMenu();
  winrateWindow.loadURL('file://' + __dirname + '/setup.html');
}

function CreateWinRateWindow(){
  winrateWindow = new BrowserWindow({
    title: "WinRate",
    icon: path.join(__dirname + '/assets/iconimage.png'),
    height: 300,
    width: 400,
  });
  winrateWindow.loadURL('file://' + __dirname + '/forms/winrates.html');
  winrateWindow.removeMenu();
}

function CreateReplayPackWindow(){
  replaypackWindow = new BrowserWindow({
    title: "Create Replay Pack",
    icon: path.join(__dirname + '/assets/iconimage.png'),
    height: 300,
    width: 400,
  });
  replaypackWindow.removeMenu();
}

function CreateSettingsWindow(){
  settingsWindow = new BrowserWindow({
    title: "Settings",
    icon: path.join(__dirname + '/assets/iconimage.png'),
    height: 600,
    width: 800,
  });
  settingsWindow.removeMenu();
}

const MainTemplate: Electron.MenuItemConstructorOptions[] = [
  { 
    label: 'Chat', 
    submenu: [
      {
        label: "StarBot On",
          click(){
            //bot.StartBot();
          }
      },
      {
        label: "StarBot On",
          click(){
            //bot.StopBot();
          }
      },
      {
        label: "Commands",
          click(){

          }
      },
      {
        label: "Messages",
          click(){
          }
      },
      {
        label: "Subscriber Greetings",
          click(){
          }
      },
      {
        label: "Host Messages",
          click(){
          }
      },
      {
        label: "Ban Responses",
          click(){
          }
      },
      
    ]
  },
  { 
    label: 'StarCraft', 
    submenu: [
      {
        label: "Record Stats On",
        click(){
          CreateWinRateWindow();
          
        }
      },
      {
        label: "Record Stats Off",
        click(){
          CreateWinRateWindow();
          
        }
      },
      {
        label: "WinRates",
        click(){
          CreateWinRateWindow();
          
        }
      },
      {
        label: "Create Replay Pack",
        click(){
          CreateReplayPackWindow();
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Light Mode',
        click() {
          settings.SetDarkMode(false);
        }
      },
      {
        label: 'Dark Mode',
        click() {
          settings.SetDarkMode(true);
        }
      },
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Options',
    submenu: [
      { 
        label: 'Settings',
        click() {
          CreateSettingsWindow();
        }
      },
      { 
        label: 'Defaults',
        click() {

        }
      },
      {
        label: 'About',
        click() {
          openAboutWindow({
            icon_path: path.join(__dirname + '/assets/iconimage.png'),
            bug_report_url: "mailto:norbertedguy@gmail.com"
          });
        }
      },
    ]
  }
];