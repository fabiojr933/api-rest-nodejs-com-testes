module.exports = {
    test: {
        client: 'pg',
        version: '14.2',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            database: 'apisistema',
        },
        migrations: {
            directory: 'src/database/migrations',
        },
    },
};