import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { config } from 'dotenv'

config()

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.VITE_APP_PORT,
    },
    resolve: {
        alias: {
            src: '/src',
        }
    },
    envDir: '/src',
})
