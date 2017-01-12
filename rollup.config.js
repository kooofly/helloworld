import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'

const config = {
    entry: 'src/index.js',
    format: 'cjs', //cjs = commonjs，其他格式 amd | es6 | iife | umd
    dest: 'dist/bundle.js',
    sourceMap: true
}

switch (process.env.NODE_ENV) {
    case 'production':
        production(config)
        break;
    case 'test':
        test(config)
        break;
    case 'development':
        development(config)
        break;
    default:
        development(config);
}
function production(config) {
    Object.assign(config, {
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
                ENV: '',
            }),
            uglify()
        ]
    })
}
function test(config) {
    Object.assign(config, {
        browsers: ['Chrome'],
        reporters: ['progress']
    })
}
function development(config) {
    Object.assign(config, {
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
    })
}

export default config
/*
export default {
    entry: 'src/index.js',
    format: 'cjs', //cjs = commonjs，其他格式 amd | es6 | iife | umd
    plugins: [
        postcss({
            extensions: [ '.css' ]
        }),
        /!*eslint({
            throwError: false // 为true warning error 都阻止构建
        }),
        babel(),
        replace({
            exclude: 'node_modules/!**', // 忽略第三方代码
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),*!/
        serve(),      // index.html should be in root of project
        livereload({
            watch: 'dist',
            verbose: false, // Disable console output
        })
    ],
    dest: 'dist/bundle.js',
    sourceMap: true
};*/
