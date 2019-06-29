module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    globals: {
        _: true,
        moment: true,
        __static: true
    },
    plugins: [
        'html'
    ],
    'rules': {
        // "quotes": [1, "double"],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        'eqeqeq': 0,
        "spaced-comment": 0,
        "indent": 'off',
        // "indent": ["error", 4, { "SwitchCase": 1 }],
        // allow async-await
        'generator-star-spacing': 'off',
        "no-dupe-args": 2, //函数参数不能重复
        "no-duplicate-case": 2, //switch中的case标签不能重复
        "no-else-return": 2, //如果if语句里面有return,后面不能跟else语句
        "no-inline-comments": 0, //禁止行内备注
        "no-mixed-spaces-and-tabs": 2, //禁止混用tab和空格
        "no-unused-vars": [1, { "vars": "all", "args": "after-used" }], //不能有声明后未被使用的变量或参数
        "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
        "no-use-before-define": 2, //未定义前不能使用
        "no-var": 0, //禁用var，用let和const代替
        "no-tabs": 0, //不允许使用制表符字符，包括在注释中
        // "semi": [1, "always"],//语句强制分号结尾
        "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}