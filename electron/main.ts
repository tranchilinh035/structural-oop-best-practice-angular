import {app, BrowserWindow, ipcMain, Menu, screen, session,shell,net} from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";
import * as request from "request";
const rp = require('request-promise');
var AutoLaunch = require('auto-launch');
let win: BrowserWindow;
let productMode = true;

app.commandLine.appendSwitch ("disable-http-cache");
app.commandLine.appendSwitch('ignore-certificate-errors');
app.on("ready", () => {
	if (!win) {
		session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => { // giúp trình duyệt electron có thể login đc google
			details.requestHeaders["User-Agent"] = "Chrome";
			callback({cancel: false, requestHeaders: details.requestHeaders});
		});

		createWindow();
		var autoLaunch = new AutoLaunch({
			name: 'ATP CLASS',
			path: process.execPath
		});
		autoLaunch.isEnabled()
			.then(function (isEnabled) {
				if (isEnabled) {
					return;
				}
				autoLaunch.enable();
			})
			.catch(function (err) {
				// handle error
			});
	}
});

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});

function createWindow() {
	win = new BrowserWindow({webPreferences: {
			enableRemoteModule: true,
			webSecurity: false,
			nodeIntegration: true,
			contextIsolation: false,
		}, minHeight: 720, minWidth: 1280
	});
	win.webContents.on('will-navigate', ev => { // khi bấm vào các thẻ <a href="#"></a> sẽ ko bị chuyển hướng sang trang trắng
		console.log('------------------------------------------------');
		ev.preventDefault()
	});
	win.maximize();
	win.webContents.clearHistory();
	win['productMode'] = productMode;
	win.webContents.session.clearCache();
	win.setResizable(true);
	if (productMode) {
		win.loadURL('http://url-server/index.html');
	} else {
		win.loadURL(
			url.format({
				pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
				protocol: "file:",
				slashes: true
			})
		);
		win.webContents.openDevTools();
	}
	try {
		const {setup: setupPushReceiver} = require('electron-push-receiver');
		setupPushReceiver(win.webContents);
	} catch (e) {
		console.log(e);
	}
	var template: any = [{
		label: "Application",
		submenu: [
			{label: "About Application", selector: "orderFrontStandardAboutPanel:"},
			{type: "separator"},
			{
				label: "Quit", accelerator: "Command+Q", click: function () {
					app.quit();
				}
			}
		]
	}, {
		label: "Edit",
		submenu: [
			{label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
			{label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
			{type: "separator"},
			{label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
			{label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
			{label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
			{label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
		]
	}, {
		label: "View",
		submenu: [
			{
				label: "DevTool", accelerator: "CmdOrCtrl+Shift+I", click: function () {
					win.webContents.openDevTools();
				}
			}
		]
	}, {
		label: "Thao tác",
		submenu: [
			{
				label: "Mở thư mục chứa data", accelerator: "CmdOrCtrl+Shift+D", click: function () {
					let userAppDataPath = app.getPath('userData');
					shell.openPath(userAppDataPath);
				}
			},
			{
				label: "Reload", accelerator: "CmdOrCtrl+Shift+R", click: function () {
					win.loadURL(url.format({
						pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
						protocol: "file:",
						slashes: true
					}));
				}
			}
		]
	}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template))
	win.on("closed", () => {
		win = null;
		app.quit();
	});
	win.on('close', function (e) {
		app.quit();
	});
}

let canQuitApp = false;
ipcMain.on("okToQuitApp", (event, arg) => {
	canQuitApp = true;
	app.quit();
});

ipcMain.on("showMainWindows", (event, arg) => {
	win.show();
});

ipcMain.on("getCookie", (event, arg) => {
	let url = arg.url;
	let idRender = arg.keyRender;


});

ipcMain.on("getRequestTestProxy", (event, arg) => {
	const rp = require('request-promise');
	let proxy = 'http://' + arg.url;
	let headers = arg.headers;
	let idRender = arg.keyRender;
	try {
		const request = rp({
			url: 'https://google.com',
			proxy: proxy,
			simple: false,
			rejectUnauthorized: false,
			requestCert: true,
			timeout: 5000,
		});
		Object.keys(headers).forEach(function (key) {
			request.setHeader(key, headers[key]);
		});
		request.on('error', (error) => {
			try {
				event.sender.send("getRequestResponseProxyError" + idRender, {'response': getError(error)});
			} catch (e) {
				console.log(e);
			}
		});
		request.on('response', (response) => {
			let data = "";
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				try {
					event.sender.send("getRequestResponseProxySuccess" + idRender, {'response': JSON.stringify({data: data})});
				} catch (e) {
					console.log(e);
				}
			})
		});
		request.end();
	} catch (e) {
		event.sender.send("getRequestResponseProxyError" + idRender, {'response': getError(e)});
	}
});

ipcMain.on("getRequest", (event, arg) => {
    let proxy = '';
    if (arg.proxy) {
        proxy = 'http://' + arg.proxy;
    }
	let headers = arg.headers;
	headers['Content-Type'] = 'application/x-www-form-urlencoded';
    let idRender = arg.keyRender;
    let urlRedirect = '';
    try {
        if (proxy.length > 0) {
            const request = rp({
				url: arg.url,
				proxy: proxy,
				simple: false,
				rejectUnauthorized: false,
				requestCert: true
			});
			Object.keys(headers).forEach(function (key) {
				request.setHeader(key, headers[key]);
			});

			let timeout = setTimeout(() => {
				request.abort(); // hủy bỏ request
				event.sender.send("getRequestResponseError" + idRender, 'RequestTimeout');
			}, 30000);

			request.on('error', (error) => {
				clearTimeout(timeout);
				try {
					event.sender.send("getRequestResponseError" + idRender, error !== undefined ? error.message : '');
				} catch (e) {
					console.log(e);
				}
			});
			request.on('response', (response) => {
				let data = "";
				response.on('data', (chunk) => {
					data += chunk;
				});
				response.on('end', () => {
					clearTimeout(timeout);
					try {
						var response2 = JSON.parse(JSON.stringify(response));
                        response2['data'] = data;
						event.sender.send("getRequestResponseSuccess" + idRender, response2);
					} catch (e) {
						console.log(e);
						event.sender.send("getRequestResponseError" + idRender, getError(e));
					}
				})
			});
			request.end();
        } else {
            const request = net.request({url: arg.url, redirect: 'manual'});
            Object.keys(headers).forEach(function (key) {
                request.setHeader(key, headers[key]);
            });

			let timeout = setTimeout(() => {
				request.removeAllListeners();
				event.sender.send("getRequestResponseError" + idRender, 'RequestTimeout');
			}, 30000);

            request.on('error', (error) => {
				clearTimeout(timeout);
                try {
                    event.sender.send("getRequestResponseError" + idRender, error !== undefined ? error.message : '');
                } catch (e) {
                    console.log(e);
                }
            });

            request.on('response', (response) => {
                let data = "";
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
					clearTimeout(timeout);
                    try {
						var response2 = JSON.parse(JSON.stringify(response));
                        response2['data'] = data;
                        event.sender.send("getRequestResponseSuccess" + idRender, response2);
                    } catch (e) {
                        console.log(e);
						event.sender.send("getRequestResponseError" + idRender, getError(e));
                    }
                })
            });

            request.on('redirect', (statusCode, method, redirectURL, responseHeaders) => {
                urlRedirect = redirectURL;
                request.followRedirect();
            });

            request.end();
        }
    } catch (e) {
        event.sender.send("getRequestResponseError" + idRender, e !== undefined ? e.message : '');
    }
});

ipcMain.on("postRequest", (event, arg) => {
    let headers = arg.headers;
	headers['Content-Type'] = 'application/x-www-form-urlencoded';
    let idRender = arg.keyRender;
    let proxy = '';
    if (arg.proxy) {
        proxy = 'http://' + arg.proxy;
    }
    try {
        if (proxy.length > 0) {
            const request = rp({
                proxy: proxy,
                method: 'POST',
                url: arg.url,
                simple: false,
                rejectUnauthorized: false,
                requestCert: true
            });
            var postData = buildQueryString(arg.params);
            Object.keys(headers).forEach(function (key) {
                request.setHeader(key, headers[key]);
            });

			let timeout = setTimeout(() => {
				request.abort(); // hủy bỏ request
				event.sender.send("postRequestResponseError" + idRender, 'RequestTimeout');
			}, 30000);
			
            request.on('error', (error) => {
				clearTimeout(timeout);
                try {
                    event.sender.send("postRequestResponseError" + idRender, error !== undefined ? error.message : '');
                    console.log(error);
                } catch (e) {
                    console.log(e);
                }
            });

            request.on('response', (response) => {
                let data = "";
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
					clearTimeout(timeout);
                    try {
						var response2 = JSON.parse(JSON.stringify(response));
                        response2['data'] = data;
                        event.sender.send("postRequestResponseSuccess" + idRender, response2);
                    } catch (e) {
                        console.log(e);
                        event.sender.send("postRequestResponseError" + idRender, getError(e));
                    }
                })
            });
            request.write(postData);
            request.end();
        } else {
            const request = rp({
                method: 'POST',
                url: arg.url,
                simple: false,
                rejectUnauthorized: false,
                requestCert: true
            });
            let postData = buildQueryString(arg.params);
            Object.keys(headers).forEach(function (key) {
                request.setHeader(key, headers[key]);
            });

			let timeout = setTimeout(() => {
				request.abort(); // hủy bỏ request
				event.sender.send("postRequestResponseError" + idRender, 'RequestTimeout');
			}, 30000);

            request.on('error', (error) => {
				clearTimeout(timeout);
                try {
                    event.sender.send("postRequestResponseError" + idRender, error !== undefined ? error.message : '');
                    console.log(error);
                } catch (e) {
                    console.log(e);
                    event.sender.send("postRequestResponseError" + idRender, getError(e));
                }
            });

            request.on('response', (response) => {
                let data = "";
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
					clearTimeout(timeout);
                    try {
						var response2 = JSON.parse(JSON.stringify(response));
                        response2['data'] = data;
                        event.sender.send("postRequestResponseSuccess" + idRender, response2);
                    } catch (e) {
                        console.log(e);
                        event.sender.send("postRequestResponseError" + idRender, getError(e));
                    }
                })
            });
            request.write(postData);
            request.end();
        }
    } catch (e) {
        event.sender.send("postRequestResponseError" + idRender, e !== undefined ? e.message : '');
    }
});

ipcMain.on("downloadFile", (event, arg) => {
	let headers = arg.headers;
	let idRender = arg.keyRender;
	let url = arg.url;
	let savePath = arg.savePath;
	let timeout = setTimeout(() => {
		event.sender.send("downloadFileResponseError" + idRender, 'RequestTimeout');
		request.abort(); // hủy bỏ request
	}, 30000);
	try {
		var response2 = {};
		request({
			uri: url,
			headers: headers,
			gzip: true
		}, (error, response) => {
			if (error) {
				event.sender.send("downloadFileResponseError" + idRender, getError(error));
			} else {
				let contentDisposition = response.headers['content-disposition'];
				if (contentDisposition) {
					let file = fs.createWriteStream(savePath);
					request({uri: url, headers: headers, gzip: true}).pipe(file);
					file.on("finish", () => {
						clearTimeout(timeout);
						response2['data'] = { 'success': true, 'message': 'ok', 'path': savePath };
						event.sender.send("downloadFileResponseSuccess" + idRender, response2);
					}).on("error", (err) => {
						clearTimeout(timeout);
						fs.unlinkSync(savePath);
						event.sender.send("downloadFileResponseError" + idRender, getError(err));
					});
				} else {
					clearTimeout(timeout);
					let body = JSON.parse(response.body);
					event.sender.send("downloadFileResponseError" + idRender, body);
				}
			}
		})
	} catch (err) {
		clearTimeout(timeout);
		event.sender.send("downloadFileResponseError" + idRender, getError(err));
	}
});

ipcMain.on("uploadFile", (event, arg) => {
	let headers = arg.headers;
	let idRender = arg.keyRender;
	let url = arg.url;
	let file = arg.file;
	let formData = {};
	Object.keys(file).forEach(function (key) {
		if (key === 'filepath') {
			formData['data'] = fs.createReadStream(file['filepath']);
		} else {
			formData[key] = file[key];
		}
	});
	let timeout = setTimeout(() => {
		event.sender.send("uploadFileResponseError" + idRender, 'RequestTimeout');
		request.abort(); // hủy bỏ request
	}, 30000);
	try {
		request.post({
			url: url,
			method: 'POST',
			headers: headers,
			formData: formData
		}, function (error, response, body) {
			clearTimeout(timeout);
			if (error) {
				console.log(error);
				event.sender.send("uploadFileResponseError" + idRender, error);
			} else {
				var response2 = JSON.parse(JSON.stringify(response));
				response2['data'] = body;
				console.log(response2);
				event.sender.send("uploadFileResponseSuccess" + idRender, response2);
			}
		});
	} catch (e) {
		clearTimeout(timeout);
		event.sender.send("uploadFileResponseError" + idRender, e);
	}
});


ipcMain.on("getFiles", (event, arg) => {
	console.log("C:\\");

	const files = fs.readdirSync("C:\\");
	win.webContents.send("getFilesResponse", files);
});

ipcMain.on('onLogout', (event, arg) => {

});


/*
noti
* */

let mapDataNoti = new Map();
let mapIntanceWindowsNoti = new Map();

ipcMain.on('showNoti', (event, dataNoti) => {
	let id = dataNoti.idCampaign;
	if (mapIntanceWindowsNoti.get(id)) {
		mapIntanceWindowsNoti.get(id).show();
		return;
	}
	mapDataNoti.set(id, dataNoti);
	let instanceWindowsNoti = showNotification(dataNoti);
	mapIntanceWindowsNoti.set(id, instanceWindowsNoti);
})
ipcMain.on('closeNoti', (event, dataNoti) => {
	let idCampaign = dataNoti.idCampaign;
	let windowsNoti: BrowserWindow = mapIntanceWindowsNoti.get(idCampaign);
	if (windowsNoti) {
		windowsNoti.close();
		windowsNoti = null;
		mapDataNoti.delete(idCampaign);
		mapIntanceWindowsNoti.delete(idCampaign);
	}
});

ipcMain.on('clickNoti', (event, dataNoti) => {
	win.webContents.send("clickedNoti", dataNoti);
});

function showNotification(data) {
	let sizeScreen = getSizeScreen();
	const widthScreen = sizeScreen[0];
	const heightScreen = sizeScreen[1];
	let width = 400;
	let height = 220;
	let windowsNoti = new BrowserWindow({
		width: width,
		maxHeight: 500,
		height: 187,
		maximizable: false,
		hasShadow: true,
		alwaysOnTop: true,
		resizable: false,
		frame: false,
		transparent: true,
		x: widthScreen - width,
		y: heightScreen - height + 10,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		}
	});
	let urlLoad = "http://crm.alosoft.vn/notiView/index.html";
	windowsNoti.webContents['dataNoti'] = data;
	windowsNoti.loadURL(urlLoad);
	//windowsNoti.webContents.openDevTools();
	return windowsNoti;
}

function getSizeScreen() {
	const {width, height} = screen.getPrimaryDisplay().workAreaSize
	return [width, height];
}

process.on('uncaughtException', (err) => {
	console.log("uncaughtException: " + err);
})

function getError(e) {
	let err = '';
	if (e) {
		err = e.message;
	}
	return err;
}

function buildQueryString(params: any): String {
	let esc = encodeURIComponent;
	let query = Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');
	return query;
}
