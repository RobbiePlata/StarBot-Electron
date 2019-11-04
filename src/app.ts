import * as path from 'path';
import openAboutWindow, { AboutWindowInfo } from 'electron-about-window';
import { app, BrowserWindow, Menu, Notification, Tray } from "electron";
import { spawn, exec } from 'child_process';
import Settings from './Settings';

let settings = new Settings();
let mainWindow: BrowserWindow, winrateWindow: BrowserWindow, replaypackWindow: BrowserWindow, settingsWindow: BrowserWindow;
let apptray: Tray;

app.on('ready', () => {
  // if credentials exist then ->
  settings.InitializeSettings();
  ActivateAppTray();
  CreateMainWindow();

  if(settings.RecordStats){
    spawn('python',[__dirname + '/Stats.py']);
  }

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
  mainWindow = new BrowserWindow({
    title: "StarBot",
    icon: path.join(__dirname + '/assets/iconimage.png'),
    height: 960,
    width: 540,
  });

  const menu = Menu.buildFromTemplate(MainTemplate);
  Menu.setApplicationMenu(menu);

  if(settings.DarkMode){
    mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?darkpopout')
  }
  else{
    mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?popout')
  }
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
          darkmode = false;
          mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?popout')
        }
      },
      {
        label: 'Dark Mode',
        click() {
          darkmode = true;
          mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?darkpopout')
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