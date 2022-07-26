import { findUserIdByToken, newSession } from '@/models/Session'
import User from '@/models/User'
import type { Express } from 'express'
import { v4 as genUUID } from 'uuid'

export function initRoutes(app: Express) {
    app.post('/api/login', async (req, res) => {
        const user = new User(req.body)
        if (await user.verity()) {
            const uuid = genUUID()
            await newSession(uuid, user)
            res.cookie('token', uuid, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
            }).json({
                code: 200,
                msg: 'Success',
            })
        } else {
            res.status(401).json({
                code: 401,
                msg: 'Account or password does not match.',
            })
        }
    })
    app.get('/api/user', async (req, res) => {
        const userId = await findUserIdByToken(req.cookies['token'])
        if (userId !== undefined) {
            const user = await User.findById(userId)
            res.json({
                account: user?.account,
                age: user?.age,
            })
        } else {
            res.status(401).clearCookie('token').json({
                code: 401,
                msg: 'Invalid token',
            })
        }
    })
}
