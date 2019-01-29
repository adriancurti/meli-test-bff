module.exports = {
    apps: [{
        name: 'meli-test-bff',
        script: './app.js',
        instances: 3,
        exec_mode: 'cluster',
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};
