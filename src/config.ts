import { readFile } from 'node:fs/promises'

interface Config {
    listen: {
        address: string
        port: number
    }
    databaseURI: string
}

export let config: Config

export async function readConfig(path: string) {
    config = JSON.parse((await readFile(path)).toString())
    config.listen = config.listen ?? {
        address: '127.0.0.1',
        port: 8080,
    }
    config.listen.address = config.listen.address ?? '127.0.0.1'
    config.listen.port = config.listen.port ?? 8080
    if ((config.databaseURI ?? '') === '') {
        throw new Error('No database URI specified')
    }
}
