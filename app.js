const electron = require('electron');

// Extracts properties needed for desktop app
const { app, BrowserWindow } = electron;

// Main window to be used
let window;

// Wait for app to be ready
app.on('ready', () => {
	// Create the window
	window = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		}
	});

	// Load HTML into window
	window.loadFile('./app/index.html');
});
