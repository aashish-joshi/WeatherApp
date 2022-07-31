const {src, dest, parallel, series } = require('gulp');
var ts = require('gulp-typescript');
const terser = require('gulp-terser');
var tsProject = ts.createProject('tsconfig.json');


tsPath = './src/main.ts';
srvWorkerPath = './src/service_worker.js';
publicPath = './includes';
staticFiles = './static/**';

// copy the static files
function copyStaticFiles(){
    return src(staticFiles)
    .pipe(dest(publicPath));
}

function copySrvWorker(){
    return src(srvWorkerPath)
    .pipe(terser())
    .pipe(dest(publicPath));
}

// Build the main script
function buildTs(){
    return src(tsPath)
    .pipe(tsProject())
    .pipe(terser())
    .pipe(dest(publicPath));
}

// Export the functions
exports.default = parallel(copySrvWorker, buildTs, copyStaticFiles);
