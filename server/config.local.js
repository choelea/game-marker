module.exports = {
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'okchem',
        pass: 'okchem',
        db: 'cAuth',
        char: 'utf8mb4'
    },
    serverHost: 'p0r9m75z.qcloud.la',
    tunnelServerUrl: 'https://p0r9m75z.ws.qcloud.la',
    tunnelSignatureKey: 'AUaqzVJpN6XiBj2djeLJ6XhynSf0PN8XqgMpCfeX',
    qcloudAppId: 1253215753,
    qcloudSecretId: 'AKIDQhmdHiPuiIenlWPPWQ7aqsgHeoiM6riM',
    qcloudSecretKey: 'VkjSw98rKXKsABwRfdKlwqUu86oGo8E6',
    wxMessageToken: 'p0r9m75z',
    networkTimeout: 30000

}
