const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const postcss = require('rollup-plugin-postcss')

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
    const base = {
        entry: 'src/index.js',
        format: 'cjs', //cjs = commonjs，其他格式 amd | es6 | iife | umd
        dest: 'dist/bundle.js',
        sourceMap: true
    }
    const configExtendMap = {
        production: production,
        test: test,
        development: development
    }
    const config = Object.assign(base, configExtendMap[env]())
    rollup
        .rollup(config)
        .then(function (bundle) {
            console.timeEnd('rollup')
            const code = bundle.generate(config).code
            if (env === 'production') {
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

function production () {
    return {
        dest: 'dist/index.min.js',
        plugins: [
            postcss({
                extensions: [ '.css' ]
            }),
            /*eslint({
                throwError: false // 为true warning error 都阻止构建
            }),*/
            babel(),
            replace({
                exclude: 'node_modules/**', // 忽略第三方代码
                ENV: '',
            }),
            /*uglify()*/
        ]
    }
}

function test () {
    return {
        browsers: ['Chrome'],
        reporters: ['progress']
    }
}

function development () {
    return {
        plugins: [
            postcss({
                extensions: [ '.css' ]
            }),
            eslint({
                throwError: false // 为true warning error 都阻止构建
            }),
            babel(),
            replace({
                exclude: 'node_modules/**', // 忽略第三方代码
                ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
            serve(),      // index.html should be in root of project
            livereload({
                watch: 'dist',
                verbose: false, // Disable console output
            })
        ]
    }
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

