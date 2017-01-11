module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-irregular-whitespace": "error", // 不能有不规则的空格
        "no-undef": "warn", // 不能有未定义的变量
        "no-unused-vars": "warn" // 不能有声明后未被使用的变量或参数（为了测试rollup按需构建）
    }
};