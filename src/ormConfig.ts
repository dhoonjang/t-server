import {ConnectionOptions} from 'typeorm';

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    database: "thunder",
    synchronize: true,
    logging: true,
    entities: ["entities/**/*.*"],
    port: 5432,
    host: process.env.DB_POINT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
}

export default connectionOptions;