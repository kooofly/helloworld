import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    format: 'cjs',
    plugins: [ babel({
            exclude: 'node_modules/**', // 忽略编译
        }) ],
    dest: 'dist/bundle.js',
    sourceMap: true
};