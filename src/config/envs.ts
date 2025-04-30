import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    NATS_SERVERS: string[];
    // PRODUCTS_MS_HOST: string;
    // PRODUCTS_MS_PORT: number;
    // ORDERS_MS_HOST: string;
    // ORDERS_MS_PORT: number;
}
const envsSchema = joi.object({
    PORT: joi
        .number()
        .required()
        .description('Port for the server to listen on'),
    NATS_SERVERS: joi
        .array()
        .items(joi.string().uri())
        .required()
    // PRODUCTS_MS_HOST: joi
    //     .string()
    //     .required()
    //     .description('Host for the products microservice'),
    // PRODUCTS_MS_PORT: joi
    //     .number()
    //     .required()
    //     .description('Port for the products microservice'),
    // ORDERS_MS_HOST: joi
    //     .string()
    //     .required()
    //     .description('Host for the orders microservice'),
    // ORDERS_MS_PORT: joi
    //     .required()
    //     .description('Port for the orders microservice'),
}).unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS ? process.env.NATS_SERVERS.split(',') : [],
});
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars : EnvVars = value;
export const envs = {
    port: envVars.PORT,
    natsServers: envVars.NATS_SERVERS,
    // productsMsHost: envVars.PRODUCTS_MS_HOST,
    // productsMsPort: envVars.PRODUCTS_MS_PORT,
    // ordersMsHost: envVars.ORDERS_MS_HOST,
    // ordersMsPort: envVars.ORDERS_MS_PORT,

}