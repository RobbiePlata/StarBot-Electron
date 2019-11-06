"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const electron_about_window_1 = require("electron-about-window");
const electron_1 = require("electron");
const child_process_1 = require("child_process");
const SettingsHolder_1 = require("./SettingsHolder");
let settings;
let mainWindow, winrateWindow, replaypackWindow, settingsWindow;
let apptray;
electron_1.app.on('ready', () => {
    settings = new SettingsHolder_1.default();
    // if credentials exist then ->
    ActivateAppTray();
    CreateMainWindow();
    if (settings.RecordStats) {
        child_process_1.spawn('python', [__dirname + '/Stats.py']);
    }
    let myNotification = new electron_1.Notification({ title: "StarBot", body: "Running", icon: path.join(__dirname + '/assets/iconimage.png') });
    myNotification.show();
});
function ActivateAppTray() {
    apptray = new electron_1.Tray(path.join(__dirname + '/assets/iconimage.png'));
    apptray.setToolTip("StarBot");
    const contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Close',
            type: 'normal',
            click() {
                electron_1.app.quit();
            }
        },
    ]);
    apptray.setContextMenu(contextMenu);
}
function CreateMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        title: "StarBot",
        icon: path.join(__dirname + '/assets/iconimage.png'),
        height: 960,
        width: 540
    });
    const menu = electron_1.Menu.buildFromTemplate(MainTemplate);
    electron_1.Menu.setApplicationMenu(menu);
    if (settings.DarkMode) {
        mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?darkpopout');
    }
    else {
        mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?popout');
    }
}
function SetupPage() {
    winrateWindow = new electron_1.BrowserWindow({
        frame: false,
        title: "WinRate",
        icon: path.join(__dirname + '/assets/iconimage.png'),
        height: 300,
        width: 400,
    });
    winrateWindow.removeMenu();
    winrateWindow.loadURL('file://' + __dirname + '/setup.html');
}
function CreateWinRateWindow() {
    winrateWindow = new electron_1.BrowserWindow({
        title: "WinRate",
        icon: path.join(__dirname + '/assets/iconimage.png'),
        height: 300,
        width: 400,
    });
    winrateWindow.loadURL('file://' + __dirname + '/forms/winrates.html');
    winrateWindow.removeMenu();
}
function CreateReplayPackWindow() {
    replaypackWindow = new electron_1.BrowserWindow({
        title: "Create Replay Pack",
        icon: path.join(__dirname + '/assets/iconimage.png'),
        height: 300,
        width: 400,
    });
    replaypackWindow.removeMenu();
}
function CreateSettingsWindow() {
    settingsWindow = new electron_1.BrowserWindow({
        title: "Settings",
        icon: path.join(__dirname + '/assets/iconimage.png'),
        height: 600,
        width: 800,
    });
    settingsWindow.removeMenu();
}
const MainTemplate = [
    {
        label: 'Chat',
        submenu: [
            {
                label: "Commands",
                click() {
                }
            },
            {
                label: "Messages",
                click() {
                }
            },
            {
                label: "Subscriber Greetings",
                click() {
                }
            },
            {
                label: "Host Messages",
                click() {
                }
            },
            {
                label: "Ban Responses",
                click() {
                }
            },
        ]
    },
    {
        label: 'StarCraft',
        submenu: [
            {
                label: "WinRates",
                click() {
                    CreateWinRateWindow();
                }
            },
            {
                label: "Create Replay Pack",
                click() {
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
                    mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?popout');
                }
            },
            {
                label: 'Dark Mode',
                click() {
                    settings.SetDarkMode(true);
                    mainWindow.loadURL('https://www.twitch.tv/popout/' + settings.StreamName + '/chat?darkpopout');
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
                    electron_about_window_1.default({
                        icon_path: path.join(__dirname + '/assets/iconimage.png'),
                        bug_report_url: "mailto:norbertedguy@gmail.com"
                    });
                }
            },
        ]
    }
];
//# sourceMappingURL=app.js.map