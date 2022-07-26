import { config, readConfig } from '@/config'
import cookieParser from 'cookie-parser'
import express from 'express'
import process from 'node:process'

(async function () {
    const configPath = process.argv[2]
    if (configPath === undefined) {
        throw new Error('No config file specified')
    } else {
        console.log(configPath)
        await readConfig(configPath)
    }

    const app = express()
    app.use(express.json())
    app.use(cookieParser())

    const client = (await import('@/models')).initDb();
    (await import('@/routes')).initRoutes(app)
    app.listen(config.listen.port, config.listen.address, () => {
        console.log(`Server is running at http://${config.listen.address}:${config.listen.port}`)
    })
    process.on('SIGINT', () => {
        client.close()
    })
    process.on('exit', () => {
        client.close()
    })
})()
