'use strict'
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://192.168.31.119:8091',// http://coc.purete.cn // process.env.VUE_APP_URL,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'api'
                }
            },
        },
        // // after: require('./mock/mock-server.js')
    },
    css: {
        loaderOptions: {
            sass: {
                // @/ 是 src/ 的别名
                // data: `@import "@/styles/sys.scss";`
            }
        },
    },
    configureWebpack: (config) => {
        const baseConfig = {
            name: name,
            resolve: {
                alias: {
                    '@': resolve('src'),
                    '@admin': resolve('src/admin'),
                },

            }
        }
        if (process.env.NODE_ENV === 'production') { // 生产环境
            return {
                plugins: [
                    // 压缩代码
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/, // 匹配文件名
                        threshold: 20480, // 对超过20k的数据压缩
                        deleteOriginalAssets: false, // true 删除源文件 false 不删除源文件     建议不删除源文件
                    }),
                ],
                ...baseConfig,
            };
        } else {
            /* 开发环境 */
            return {
                ...baseConfig
            };
        }
    },
    chainWebpack(config) {
        /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
        }

        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test  不预先加载模块

        // set svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/icons')).end()
        config.module.rule('icons').test(/\.svg$/).include.add(resolve('src/icons')).end()
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({
                symbolId: 'icon-[name]'
            }).end()

        // set preserveWhitespace
        // config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
        //     // options.compilerOptions.preserveWhitespace = true;
        //     return options
        // }).end()
    }
}
