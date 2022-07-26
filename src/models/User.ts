import { verify } from '@node-rs/argon2'
import type { ObjectId } from 'mongodb'
import { db } from '.'

const coll = db.collection('users')

export default class User {
    private password: string
    account: string
    age?: number

    constructor(user: User) {
        this.account = user.account
        this.password = user.password
    }

    async verity() {
        try {
            const user = await coll.findOne<User>({ account: this.account })
            if (user !== null && await verify(user.password, this.password)) {
                return true
            }
            return false
        }
        catch (err) {
            throw err
        }
    }

    async findIdByAccount() {
        return (await coll.findOne({ account: this.account }))!._id
    }

    static async findById(userId: ObjectId) {
        return coll.findOne<User>({ _id: userId })
    }
}
