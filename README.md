# TODO List
- rollup 更好的打包
- eslint 结合 rollup
- eslint 常用规则整理
- CircleCI + github
- git 提交规范流程说明
- nightwatch 端到端自动化测试
---

# Hello World

前端开发环境搭建实例项目

前端编码规范 + git提交规范 + 单元测试 + 覆盖率 + 持续集成

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

### 编码规范

> npm install eslint -g

> eslint --init

按照指示一步步完成（git下的箭头选择有问题，可使用cmd），然后会自动安装依赖npm包 生成.eslintrc.js文件

> #### 自定义规则：
> 0：关闭规则
>
> 1：打开规则，并且作为一个警告（不影响exit code）
>
> 2：打开规则，并且作为一个错误（exit code将会是1）

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
    browsers: ['PhantomJS'],
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
