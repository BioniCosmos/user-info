import { config } from '@/config'
import { Db, MongoClient } from 'mongodb'

const uri = config.databaseURI
export let db: Db

export function initDb() {
    let client = new MongoClient(uri)
    db = client.db('user_info')
    return client
}
