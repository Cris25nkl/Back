require('dotenv').config();


module.exports = {
    app: {
        port: process.env.PORT
    },

    jwt: {
        secret: process.env.JET_SECRET || 'secret'
    },
    postgresql: {
        user: process.env.POSTGRESQL_USER || 'postgres',
        host: process.env.POSTGRESQL_HOST || 'localhost',
        database: process.env.POSTGRESQL_DATABASE || 'postgres',
        password: process.env.POSTGRESQL_PASSWORD || '',
        port: process.env.POSTGRESQL_PORT || 5432
    }
}