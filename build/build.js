const rollup = require('rollup')
const config = require('./config')

const fs = require('fs')
const path = require('path')
const uglify = require('uglify-js')
const zlib = require('zlib')

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist')
}

build(process.env.NODE_ENV || 'development')

function build(env) {
    console.time('rollup')
    console.log('ENV: ' + info(env))
    rollup
        .rollup(config)
        .then(function (bundle) {
            console.timeEnd('rollup')
            const code = bundle.generate(config).code
            if (env !== 'production') {
                var minified = uglify.minify(code, {
                    fromString: true,
                    output: {
                        screw_ie8: true,
                        ascii_only: true
                    },
                    compress: {
                        pure_funcs: ['makeMap']
                    }
                }).code
                return write(config.dest, minified, true).catch(logError)
            } else {
                bundle.write({
                    format: config.format,
                    dest: config.dest,
                    sourceMap: config.sourceMap
                })
            }
        })
}


function write (dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report (extra) {
            console.log(info(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
            resolve()
        }

        fs.writeFile(dest, code, err => {
            if (err) return reject(err)
            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err)
                    report(' (gzipped: ' + getSize(zipped) + ')')
                })
            } else {
                report()
            }
        })
    })
}

function getSize (code) {
    return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
    console.log(error(e))
}

function info (str) {
    return error(str)
    // return '\x1b[1m\x1b[36m' + str + '\x1b[39m\x1b[22m'
}

function warn (str) {
    return '\x1b[1m\x1b[33m' + str + '\x1b[39m\x1b[22m'
}

function error (str) {
    return '\x1b[1m\x1b[31m' + str + '\x1b[39m\x1b[22m'
}

