const SystemBuilder = require('systemjs-builder');
const argv = require('yargs').argv;
const builder = new SystemBuilder();

builder.loadConfig('./public/js/systemjs.config.js')
    .then(function(){
        const outputFile = argv.prod ? './public/js/bundle.min.js' : './public/js/bundle.js';
        return builder.buildStatic('app', outputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            rollup: argv.prod
        });
    })
    .then(function() {
        console.log('bundle built successfully!');
    });
