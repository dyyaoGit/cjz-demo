const path = require('path')
const fs = require('fs')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
fs.writeFileSync(
    path.join(__dirname, './config/env.js'),
    `export default '${env}'`
)

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = env === 'development' ? '/' : '/' // 生产环境下本地调试时使用'/'，线上部署应使用线上路径

const config = {

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        port: 5001
    },
    baseUrl: BASE_URL,
    assetsDir: './', // 静态资源目录
    configureWebpack: config => {
        if (env === 'production') {
            config.optimization.splitChunks.cacheGroups = {
                'vender-base': {
                    name: 'vender-base',
                    test: 'vender-base',
                    chunks: 'all'
                },
                'vender-exten': {
                    name: 'vender-exten',
                    test: 'vender-exten',
                    chunks: 'all'
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('_conf', resolve('config'))
        config.plugin('html').tap(args => {
            args[0].favicon = resolve('public/favicon.ico')
            return args
        })
        if (env === 'production') { // 生产环境下代码拆分打包
            config.entry('vender-base').add(resolve('src/vendors/vendors.base.js')).end()
            config.entry('vender-exten').add(resolve('src/vendors/vendors.exten.js')).end()
        }
    },
    css: {
        sourceMap: env === 'development'
    },
    // 打包时不生成.map文件
    productionSourceMap: false,
    // 关闭ESLINT
    lintOnSave: false
}

module.exports = config
