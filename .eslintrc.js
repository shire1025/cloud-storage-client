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
        __static: true
    },
    plugins: [
        'html'
    ],
    'rules': {
        //函数定义时括号前面要不要有空格
        "space-before-function-paren": [0, "always"],
        "indent": 'off',
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}