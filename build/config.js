const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const postcss = require('postcss')
const simpleVars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const cssPorter = require('rollup-plugin-css-porter')
const buble = require('rollup-plugin-buble')

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

function config(env) {
    const config = Object.assign(base, configExtendMap[env]())
    return config
}

const path = require('path')
const fs = require('fs')
function postcsstocss(options) {
    fs.readFile(path.relative(process.cwd(), options.entry), (err, css) => {
        postcss(options.plugins)
            .process(css, { from: options.entry, to: options.dest })
            .then(result => {
                fs.writeFile(options.dest, result.css);
                if ( result.map ) fs.writeFile(options.dest + '.map', result.map);
            });
    });
}

function css(options) {
    postcsstocss({
        entry: 'src/index.css',
        dest: 'dist/style.css',
        plugins: [
            simpleVars(),
            nested(),
            cssnext({ warnForDuplicates: false, }),
            cssnano()
        ],
        extensions: [ '.css' ]
    })
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return new Promise((resolve, reject) => {
        resolve({
            transform: function (code, id) {
                return {
                    code: code,
                    map: options.sourceMap
                };

            }
        })
    })
}

function production () {
    css()
    return {
        dest: 'dist/index.min.js',
        plugins: [
            /*eslint({
             throwError: false // 为true warning error 都阻止构建
             }),*/
            buble(),
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
            css(base),
            postcss({
                plugins: [
                    simpleVars(),
                    nested(),
                    // 配置了{ warnForDuplicates: false }是因为它和cssnano()都使用了Autoprefixer，会导致一个警告。不用计较配置, 我们只需要知道它被执行了两次(在这个例子中没什么坏处)并且取消了警告
                    // cssnext({ warnForDuplicates: false, }),
                    cssnext(),
                    /*cssnano(),*/

                ],
                extensions: [ '.css' ]
            }),
            /*cssPorter({
                minified: true,
                dest: 'dist/style.css'
            }),*/
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

module.exports = config(process.env.NODE_ENV || 'development')