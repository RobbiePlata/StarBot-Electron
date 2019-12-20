// 1. Require the installed module
const customTitlebar = require('custom-electron-titlebar');

let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#FFFFFF'),
    icon: '../assets/iconimage.png'
});

// 3. Update Titlebar text
MyTitleBar.updateTitle("StarBot");
MyTitleBar.setHorizontalAlignment('left');
MyTitleBar.updateMenuPosition('bottom');