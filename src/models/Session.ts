import type { ObjectId } from 'mongodb'
import { db } from '.'
import type User from './User'

interface Session {
    token: string
    userId: ObjectId
}

const coll = db.collection('sessions')

export async function newSession(token: string, user: User) {
    const session: Session = {
        token,
        userId: await user.findIdByAccount(),
    }
    await coll.insertOne(session)
}

export async function findUserIdByToken(token: string) {
    return (await coll.findOne<Session>({ token }))?.userId
}
