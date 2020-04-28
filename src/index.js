//  ENG: Include electron module
//  ES: Se incluye el módulo electron
const { app, BrowserWindow, Menu } = require('electron');

const url = require('url');
const path = require('path');

//  ENG: Automatic reload during development
//  ES: Refresco automático mientras se está en desarrollo
if (process.env.NODE_ENV != 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

let mainWindow;
let newBFWindow;
let newPSRWindow;
let newReferencesWindow;

//  ENG: Create a desktop window when app starts
//  ES: Se crea una ventana de escritorio cuando la aplicacion se inicia
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));

    //  ENG: Create a menu
    //  ES: Se crea un menu
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    });
});

function createNewBFWindow() {
    newBFWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Algoritmo Primero el Mejor'
    });
    newBFWindow.setMenu(null);
    newBFWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/bfa.html'),
        protocol: 'file',
        slashes: true
    }));

    newBFWindow.on('closed', () => {
        newBFWindow = null;
    });
}

function createNewPSRWindow() {
    newPSRWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Problema con Satisfacción de Restricciones (PSR)'
    });
    newPSRWindow.setMenu(null);
    newPSRWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/psr.html'),
        protocol: 'file',
        slashes: true
    }));

    newPSRWindow.on('closed', () => {
        newPSRWindow = null;
    });
}

function createNewReferencesWindow() {
    newReferencesWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Referencias'
    });
    newReferencesWindow.setMenu(null);
    newReferencesWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/referencias.html'),
        protocol: 'file',
        slashes: true
    }));

    newReferencesWindow.on('closed', () => {
        newReferencesWindow = null;
    });
}

//  ENG: Create a navigable menu with Electron.Menu
//  ES: Se crea un menu de navegación con Electron.Menu
const templateMenu = [{
        label: 'Algoritmos de búsqueda',
        submenu: [{
                label: 'Primero el Mejor',
                accelerator: process.platform === 'darwin' ? 'command+B' : 'Ctrl+B',
                click() {
                    createNewBFWindow();
                }
            },
            {
                label: 'Problema con Satisfacción de Restricciones',
                accelerator: process.platform === 'darwin' ? 'command+P' : 'Ctrl+P',
                click() {
                    createNewPSRWindow();
                }
            }
        ]
    }

];

//  ENG: Check if we are on MacOS: if we are, our menu label is added at the beginning
//  ES: Se verifica si estamos en MacOS: si lo estamos, se agrega nuestro label del menu al inicio 
if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    });
}