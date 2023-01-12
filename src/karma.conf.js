// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-electron-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      'assets/jquery-1.11.1.min.js',
      'assets/bootstrap.min.css',
      'assets/preload.js',
      'assets/bootstrap.min.js'
    ],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    customLaunchers: {
      CustomElectron: {
        base: 'Electron',
        electronOpts: {
          electronMainJS: path.join(__dirname, '../electron/dist/main.js'),
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
          }
        }
        // electronOpts: {
        //   // DEV: More preferentially, should link your own `webPreferences` from your Electron app instead
        //   webPreferences: {
        //     preload: 'C:\\Users\\Linh\\OneDrive\\Máy tính\\simpleuidclient\\preload.js',
        //     // Alternative non-preload mechanism to expose `require`
        //      nodeIntegration: true,
        //      contextIsolation: false
    
        //     // nativeWindowOpen is set to `true` by default by `karma-electron` as well, see #50
        //   }
        // }
      }
    },
    browserNoActivityTimeout: 120000,
    browserDisconnectTimeout: 120000,
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['CustomElectron'],
    singleRun: false,
    client: {
      captureConsole: true,
      useIframe: false
    }
  });
};