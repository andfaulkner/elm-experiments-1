module.exports = {
    app: {
        defaultWindowDimensions: {
            width: 1024,
            height: 768,
        },
        entryFile: 'index.html',
    },
    build: {
        rebuildDelayOnChange: 1000,
        watchPaths: ['./app/**/*.elm', './app/**/*.html', './config/config.js'],
    },
};