const CONF = {
    port: '5757',
    rootPathname: '',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    // initdb will use this mysql config
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        pass: 'Game-Marker!123',
        db: 'cAuth',
        char: 'utf8mb4'
    },
    cos: {
        /**
         * 区域
         * 华北：cn-north
         * 华东：cn-east
         * 华南：cn-south
         * 西南：cn-southwest
         * 新加坡：sg
         * @see https://www.qcloud.com/document/product/436/6224
         */
        region: 'cn-south',
        // Bucket 名称
        fileBucket: 'wximg',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,

    networkTimeout: 30000
}
module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF
