# TODO List

- 文件MD5

- css跨浏览器兼容性
- CssSprite

- CircleCI + github
- git 提交规范流程说明
- nightwatch 端到端自动化测试
- 更好的配置方式

有机结合
1. rollup 结合 karma 单元测试
1. rollup 结合 karma 代码覆盖率测试
1. rollup 结合 nightwatch 端到端自动化测试

---

# Hello World

前端开发环境搭建实例项目，模板项目

**version 1.0.0**

    git 项目初始化
    npm 项目初始化
    rollup 构建配置
        多环境支持
        不同环境的字符串replace
        postcss 支持
        
        serve + livereload + rollup-watch 提升开发体验
        生产环境 uglify + gzip 进一步缩减文件体积
        eslint 编码规范，助力团队开发
    karma 单元测试&代码覆盖率测试

## git init

运行

> git init

按照指示一步步完成，然后

> touch README.md
>
> touch .gitignore
> git add .
>
> git commit -am 'init'
>
> git remote add origin https://github.com/Kooofly/helloworld.git
>
> git push origin master -u

## npm init

- npm init

按照指示一步步完成

### rollup 更好的构建工具

> npm i -g rollup

在项目根目录新建一个 rollup.config.js

```javascript
export default {
  entry: 'src/index.js',
  format: 'cjs', //cjs = commonjs，其他格式 amd | es6 | iife | umd
  dest: 'dist/bundle.js',
  sourceMap: true
}
```
默认构建命令

> rollup -c

默认配置文件 rollup.config.js，可以通过

> rollup -c rollup.config.dev.js

来指定配置文件

#### 使用插件

> npm i rollup-plugin-babel babel-preset-es2015-rollup --save-dev

babel 的配置不像 webpack 可以直接写在配置文件里，而是得新建 .babelrc（注：我们可以写在 src 下，而不是非得放在项目根目录下）

新建 .babelrc
```json
{
  "presets": ["es2015-rollup"]
}
```



rollup插件列表：https://github.com/rollup/rollup/wiki/Plugins

rollup官方网址：http://rollupjs.org

### 编码规范 rollup结合eslint 

> npm i eslint -g
>
> npm install --save-dev rollup-plugin-eslint
>
> eslint --init

按照指示一步步完成（git下的箭头选择有问题，可使用cmd），然后会自动安装依赖npm包 生成.eslintrc.js文件

rollup中添加eslint插件配置
```javascript
eslint()
```

### 编码规范

> npm i eslint -g
>
> eslint --init

按照指示一步步完成（git下的箭头选择有问题，可使用cmd），然后会自动安装依赖npm包 生成.eslintrc.js文件

> #### 自定义规则：
> "off" || 0：关闭规则
>
> "warn" || 1：打开规则，并且作为一个警告，不影响构建
>
> "error" || 2：打开规则，并且作为一个错误，构建将会失败

可选配置，让eslint忽略检测的文件 .eslintignore 配置规则与 .gitignore 一样
#### Webstorm eslint 配置

选择File | Settings | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint 勾选 Enable

在Webstorm内， eslint已经可以工作了。 Webstorm可以自动提示 eslint指出的代码问题


如需要手动检查所有代码的问题，可以打开Webstorm的terminal，输入

> eslint .

如需要自动修复一些不规范的代码问题，可以输入

> eslint . --fix

http://eslint.org/docs/rules/ 带小扳手的规则都可以自动修复

eslint官方地址：http://eslint.org/

eslint规则列表：http://eslint.org/docs/rules/

eslint配置实例：https://github.com/feross/eslint-config-standard/blob/master/eslintrc.json

### 多环境支持

> npm i --save-dev rollup-plugin-replace

在rollup.config.js中，添加插件配置 
```javascript
replace({
      exclude: 'node_modules/**', // 忽略第三方代码
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    })
```
跨平台环境配置插件

> npm i --save-dev cross-env

可以通过这种方式设置环境变量 cross-env NODE_ENV=production

### 代码压缩

> npm i --save-dev rollup-plugin-uglify

添加配置

```javascript
(process.env.NODE_ENV === 'production' && uglify())
```

### 提升开发体验

> npm i --save-dev rollup-plugin-serve rollup-plugin-livereload rollup-watch

配置插件
```javascript
// index.html should be in root of project
// 默认端口10001
serve(),      
livereload({
    watch: 'dist',
    verbose: false, // Disable console output
})
```

运行命令

> rollup -c --watch

之后就可以免刷新所见即所得了

### 友好的命令行输出（git 命令行下无效）

> npm i --save-dev colors-cli

官方网址：https://github.com/jaywcjlove/colors-cli

### 配置css构建

> npm i --save-dev rollup-plugin-postcss

配置插件
```javascript
postcss({
    extensions: [ '.css' ]
})
```

愉快的编写css，产出更好的css

> npm i --save-dev postcss-simple-vars postcss-nested postcss-cssnext cssnano

配置插件
```javascript
plugins: [ 
    postcss({ 
        plugins: [ 
            simplevars(), 
            nested(), 
            cssnext({ warnForDuplicates: false, }), 
            cssnano()
            ], 
            extensions: [ '.css' ] 
    })
]
```

输出单独的css文件

> npm i --save-dev rollup-plugin-css-porter 


### 更好的配置方式

> npm i --save-dev rollup uglify-js

## TODO 实现 以下配置已删除

---

### karma rollup集合karma单元测试

> npm install --save-dev rollup-plugin-istanbul karma-rollup-plugin 
>
> npm install karma-rollup-preprocessor --save-dev

karma.conf.js 配置
```javascript
config.set({
    preprocessors: {
     'test/**/*.js': ['rollup']
    },
    rollupPreprocessor: {
      // rollup settings. See Rollup documentation 
      plugins: [
        buble() // ES2015 compiler by the same author as Rollup 
      ],
      // will help to prevent conflicts between different tests entries 
      format: 'iife',
      sourceMap: 'inline'
    }
  });
```

---


### karma 单元测试

> npm i karma-cli -g
>
> npm i karma --save-dev

安装PhantomJS

PhantomJS官方地址：http://phantomjs.org/

PhantomJS下载地址：http://phantomjs.org/download.html

PhantomJS官方API：http://phantomjs.org/api/

PhantomJS官方示例：http://phantomjs.org/examples/

PhantomJS GitHub：https://github.com/ariya/phantomjs/

添加环境变量如：D:\env\phantomjs\bin

使用cmd运行（git命令行工具运行会报错）

> karma init

然后按照指示一步步完成

### Coverage 代码覆盖率测试

- npm i karma-coverage --save-dev

修改配置文件karma.conf.js

```javascript
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],
    exclude: [],
    // modified
    preprocessors: {
        'src/**/*.js': ['coverage']
    },
    //modified
    reporters: ['progress', 'coverage'],
    // add
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],  //browsers 测试浏览器，有IE，Chrome，ChromeCanary，FireFox，Opera，Safari，PhantomJS
    singleRun: false,
    concurrency: Infinity
  })
}
```

### 结合Webpack+Babel

> npm i karma-webpack --save-dev
>
> npm i babel-loader babel-core babel-preset-es2015 --save-dev

接下来修改配置文件karma.conf.js

```javascript
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    // modified
    // files只留下test文件。因为webpack会自动把需要的其它文件都打包进来，所以只需要留下入口文件。
    files: [
      'test/**/*.js'
    ],
    exclude: [],
    // modified
    // preprocessors也修改为test文件，并加入webpack域处理器
    preprocessors: {
      'test/**/*.js': ['webpack', 'coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    // add
    // 加入webpack配置选项。可以自己定制配置项，但是不需要entry和output。这里加上babel-loader来编译ES6代码
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }]
      }
    }

  })
}
```

### 覆盖率测试插件增强 覆盖率选择性忽略插件

> npm i babel-plugin-istanbul --save-dev

修改 karma.config.js webpack中babel-loader的配置

```javascript
{
  test: /\.js$/,
  loader: 'babel',
  exclude: /node_modules/,
  query: {
    presets: ['es2015'],
    plugins: ['istanbul']
  }
}
```

然后把preprocessors里的coverage去掉

### 配置CircleCI

CircleCI官方地址：https://circleci.com
CircleCI官方文档：https://circleci.com/docs/configuration/
