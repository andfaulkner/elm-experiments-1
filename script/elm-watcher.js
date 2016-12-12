//
// --keep-running: keep electron browser running after script terminates. Otherwise close it
//                 when elm-watcher closes.
//

//************************************** THIRD-PARTY MODULES **************************************/
require('colors');

const _ = require('lodash');
const chokidar = require('chokidar');

const { execFileSync, execSync, spawnSync, spawn } = require('child_process');

//**************************************** PROJECT MODULES ****************************************/
const { emptyLineBefore, padToMsgLength } = require('./helpers/script-log-helpers');

//**************************************** WATCHER CONFIG *****************************************/
const config = {
    watchPath: './app/**/*.elm',
    watchIntroMsg: (config) => `Watching ${config.watchPath}, will recompile on change.`,
    appRunEntryPoint: "app/main.js",
    outputFile: 'build/elm.js',
    elmBuildEntryPoint: 'app/main.elm',
    cliArgs: {
        doKeepRunning: (_.includes(process.argv, '--keep-running'))
    }
};

console.log('config.cliArgs.doKeepRunning: ', config.cliArgs.doKeepRunning);

//****************************************** INTRO LOGS *******************************************/
const watchIntroMsg = config.watchIntroMsg(config);
console.log(emptyLineBefore(padToMsgLength(watchIntroMsg)));
console.log(watchIntroMsg.bgBlue.white.bold);

//***************************************** WATCH SCRIPT ******************************************/
const watcher = chokidar.watch(config.watchPath, {
    ignored: /(^|[\/\\])(IGNORE(_|-)?)./,
    persistent: true,
})

//************************************ EVENT-TRIGGERED ACTIONS ************************************/
const rebuild = rebuildFactory();

watcher
    .on('change', rebuild)
    .on('addDir', rebuild)

//******************************************** HELPERS ********************************************/
function rebuildFactory() {
    let currentElectronProcess = launchApp();

    return function rebuild(path, event) {
        console.log(emptyLineBefore(`[Changed]`.bgMagenta.white.bold + ` ./${path}`));
        console.log('Recompiling...');

        spawnSync('elm',
            ["make", config.elmBuildEntryPoint, '--output', config.outputFile],
            { stdio: 'inherit' }
        );

        // accounts for manually closed electron processes
        if (currentElectronProcess) {
            console.log('Terminating previous Electron process...');
            process.kill(currentElectronProcess.pid + 1, 'SIGTERM');
        }

        currentElectronProcess = launchApp()
        return;
    }
}

function launchApp() {
    return spawn('electron',
        [config.appRunEntryPoint],
        { stdio: 'inherit', detached: config.cliArgs.doKeepRunning }
    )
}

// Replaces:
// chokidar 'app/**/*.elm' 'app/**/*.js' \
// -c 'elm make app/main.elm --output build/elm.js' --debounce 1000 --throttle 1000