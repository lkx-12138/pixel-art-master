const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1300,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.setMenuBarVisibility(false);

    // --- 修改重点 ---
    // 以前是 path.join(__dirname, 'build', 'index.html')
    // 现在因为这个文件会被打包进 build 文件夹，所以直接找当前目录下的 index.html
    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, 'index.html'));
    } else {
        // 开发环境下（npm start）依然走本地服务（可选，为了稳妥可以保留旧逻辑或者如下）
        // 但因为我们只关心打包，上面那行是最关键的
        mainWindow.loadFile(path.join(__dirname, 'index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});