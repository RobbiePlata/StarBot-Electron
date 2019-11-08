// 1. Require the installed module
const customTitlebar = require('custom-electron-titlebar');
const path = require('path');
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#000000'),
    icon: '../assets/iconimage.png'
});
// 3. Update Titlebar text
MyTitleBar.updateTitle("StarBot");
MyTitleBar.setHorizontalAlignment('left');
MyTitleBar.updateMenuPosition('bottom');
//# sourceMappingURL=renderer.js.map