// module.paths = module.paths.concat(['node_modules']);
let oldRequire = window.require;
window.require = function(path) {
    let pathNodeModules = __dirname.substring(0, __dirname.indexOf('node_modules') + 'node_modules'.length);
    module.paths.push(pathNodeModules);
    return oldRequire(path);
}
window.jQuery = window.$ = require('jquery');