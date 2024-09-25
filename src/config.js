import dotenv from 'dotenv'

dotenv.config();

const {
    NODE_ENV,
    PORT,
    SECRET_KEY,
    SECRET_IV,
    ENCRYPTION_METHOD
} = process.env;

export default {
    env               : NODE_ENV,
    port              : PORT,
    secret_iv         : SECRET_IV,
    secret_key        : SECRET_KEY,
    encryption_method : ENCRYPTION_METHOD,
}
