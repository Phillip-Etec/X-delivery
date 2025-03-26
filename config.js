import dotenv from 'dotenv'


let NODE_ENV, VITE_API_PORT, VITE_APP_PORT = null

try {
    dotenv.config();

    NODE_ENV = process.env.NODE_ENV
    VITE_API_PORT = process.env.VITE_API_PORT
    VITE_APP_PORT = process.env.VITE_APP_PORT

} catch (error) {

    NODE_ENV = import.meta.env.MODE
    VITE_API_PORT = import.meta.env.VITE_API_PORT
    VITE_APP_PORT = import.meta.env.VITE_APP_PORT

}

// prettier-ignore
export default {
    env: NODE_ENV,
    api_port: VITE_API_PORT,
    app_port: VITE_APP_PORT,
}
