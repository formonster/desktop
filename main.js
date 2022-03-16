const { app, BrowserWindow, Menu, Tray } = require('electron')

let tray = null
app.whenReady().then(() => {
  tray = new Tray('./icon_16x16.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})

function createWindow() {
  const { screen } = require('electron')

  // Create a window that fills the screen's available work area.
  // getPrimaryDisplay 获取主屏多信息
  // const primaryDisplay = screen.getPrimaryDisplay()
  // const { width, height } = primaryDisplay.workAreaSize

  // 获取所有屏幕的信息
  const displays = screen.getAllDisplays()

  displays.forEach(({ bounds }) => {
    const { x, y, width, height } = bounds;
    const win = new BrowserWindow({
      x,
      y,
      width,
      height,
      // 去掉边框
      frame: false,
      // 将窗口置于桌面背景级别
      type: "desktop",
      transparent: true,
      icon: "./logo.ico",
      roundedCorners: false,
      webPreferences: {
        nodeIntegration: true,
      }
    })

    win.loadFile('desktop.html')
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
