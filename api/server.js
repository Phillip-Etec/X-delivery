import jsonServer from 'json-server'
import chalk from 'chalk'
import config from './config.js'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const metadata = jsonServer.router('metadata.json', { readOnly: true })

const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

// Custom middleware to log requests
server.use((req, _, next) => {
    console.log('')
    console.log(chalk.cyan('Request Body') + ':', req.body)
    next()
})

// Filter by req.method
server.all('api/metadata/*', (req, res, next) => {
    if (req.method === 'GET') {
        next()
    } else {
        res.sendStatus(403) // Forbidden
    }
})

// server.use('/api', router)
// server.use('/metadata', metadata)
server.use(router)

const port = config.api_port ?? 8082

server.listen(port, () => {
    console.log(chalk.blue('JSON Server') + ' is running on port ' + chalk.green(`${port}`))
})
