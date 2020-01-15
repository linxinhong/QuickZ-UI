module.exports = {
    devServer: {
        port: 5211,
        proxy: {
            '/+': {
                target: 'http://192.168.56.101:5210'
            }
        }
    },
    configureWebpack: config => {
        config.entry.app = ["babel-polyfill", "./src/main.js"]
    }
}