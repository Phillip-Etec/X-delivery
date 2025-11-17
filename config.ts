import dotenv from 'dotenv'

dotenv.config()
// from https://dev.to/asjadanis/parsing-env-with-typescript-3jjm

interface ENV {
   node_env: string | undefined
   app_port: number | undefined
   api_port: number | undefined
}

interface Config {
   node_env: string
   app_port: number
   api_port: number
}

const getConfig = (): ENV => {
   return {
      node_env: process.env.NODE_ENV ? process.env.NODE_ENV : undefined,
      app_port: process.env.VITE_API_PORT ? Number(process.env.APP_PORT) : undefined,
      api_port: process.env.VITE_APP_PORT ? Number(process.env.API_PORT) : undefined,
   }
}

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
   for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
         throw new Error(`Missing key ${key} in config.env`)
      }
   }
   return config as Config
}

const config = getConfig()

const sanitizedConfig = getSanitzedConfig(config)

export default sanitizedConfig

