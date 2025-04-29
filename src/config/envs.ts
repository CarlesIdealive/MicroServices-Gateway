import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
}
const envsSchema = joi.object({
    PORT: joi
        .number()
        .required()
        .description('Port for the server to listen on'),
});
const { error, value: envVars } = envsSchema.validate(process.env, {
    allowUnknown: true,
    abortEarly: false,
});
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
export const envs = {
    port: envVars.PORT,
}