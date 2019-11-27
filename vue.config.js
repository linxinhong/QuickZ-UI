module.exports = {
    devServer: {
        port: 5211,
        proxy: {
            '/+': {
                target: 'http://127.0.0.1:5210'
            }
        }
    },
    configureWebpack: config => {
        config.entry.app = ["babel-polyfill", "./src/main.js"]
    }
}