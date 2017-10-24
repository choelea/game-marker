module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'game-marker',
            script: 'app.js',
            // env: {  If we don't comment here, it will override below deploy config
            //   PORT: 3011
            // },
            env_production: {
                NODE_ENV: 'production',
                PORT: 4001
            }
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'joe', // ssh 用户名
            host: '182.254.242.31', // 目标服务器地址
            ref: 'origin/master',
            repo: 'https://github.com/choelea/game-marker.git',
            path: '/data/release/game-marker', // 目标服务器部署地址
            'post-deploy': 'cd server && npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
}
