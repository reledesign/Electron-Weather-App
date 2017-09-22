const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

process.env.NODE_ENV = 'production';

//pääikkuna johon luodaan pienempi ikkuna ohjelmalle
let mainWindow;
let addWindow;


//Kuuntelee kunnes ohjelma ready

app.on('ready', function(){
  //Luo ikkuna
  mainWindow = new BrowserWindow({});
  //Lataa html ikkunaan
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  //Lopeta kaikki kun lopetat ikkunan
  mainWindow.on('closed', function(){
    app.quit();
  });
  //Rakenna menu teplatesta
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Aseta menu
  Menu.setApplicationMenu(mainMenu);
});

//Käsittele uuden ikkkuna luonti
function createAddWindow(){
  //Luo ikkuna
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add new Location'
  });
  //Lataa html ikkunaan
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Poista roskat
  addWindow.on('close', function(){
    addWindow = null;
  });
}

//Nappaa location:addWindow
ipcMain.on('location:add',function(e, location){
  mainWindow.webContents.send('location:add', location);
  addWindow.close();
});

//Luo valikko

const mainMenuTemplate = [

  {
    label:'File',
    submenu:[
      {
      label: 'Add Location',
      click(){
        createAddWindow();
      }
    },
    {
      label: 'Clear Locations',
      click(){
        mainWindow.webContents.send('location:clear');
      }
    },
    {
      label: 'Quit',
      accelerator: process.platform == 'darwin' ? 'Command+Q' :
      'Ctrl+Q',
      click(){
        app.quit();
      }
    }
    ]
  }
];

//jos mac, lisää tyhjä kohta menuun
if(process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}

//Lisää devtools menuun jos ei valmis ohjelma
if(process.env.NODE_ENV != 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' :
        'Ctrl+I',
        click(item, focusedWindo){
          focusedWindo.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}
