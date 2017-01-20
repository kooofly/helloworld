const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const postcss = require('rollup-plugin-postcss')
const simpleVars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
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

function production () {
    return {
        dest: 'dist/index.min.js',
        plugins: [
            postcss({
                to: 'dist/style.css',
                plugins: [
                    simpleVars(),
                    nested(),
                    cssnext({ warnForDuplicates: false, }),
                    cssnano()
                ],
                extensions: [ '.css' ]
            }),
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
            postcss({
                plugins: [
                    simpleVars(),
                    nested(),
                    cssnext()
                ],
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

module.exports = config(process.env.NODE_ENV || 'development')