import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_MS_HOST: string;
    PRODUCTS_MS_PORT: number;
    ORDERS_MS_HOST: string;
    ORDERS_MS_PORT: number;
}
const envsSchema = joi.object({
    PORT: joi
        .number()
        .required()
        .description('Port for the server to listen on'),
    PRODUCTS_MS_HOST: joi
        .string()
        .required()
        .description('Host for the products microservice'),
    PRODUCTS_MS_PORT: joi
        .number()
        .required()
        .description('Port for the products microservice'),
    ORDERS_MS_HOST: joi
        .string()
        .required()
        .description('Host for the orders microservice'),
    ORDERS_MS_PORT: joi
        .required()
        .description('Port for the orders microservice'),
});
const { error, value } = envsSchema.validate(process.env, {
    allowUnknown: true,
    abortEarly: false,
});
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars : EnvVars = value;
export const envs = {
    port: envVars.PORT,

    productsMsHost: envVars.PRODUCTS_MS_HOST,
    productsMsPort: envVars.PRODUCTS_MS_PORT,

    ordersMsHost: envVars.ORDERS_MS_HOST,
    ordersMsPort: envVars.ORDERS_MS_PORT,

}