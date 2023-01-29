import { Router } from 'express'
import { AuthController } from './controller'
// import { checkSession } from './checkSession'

const r: Router = Router()
const authController = new AuthController()

r.post('/register', authController.register)
r.get('/login', authController.login)
// r.post('/profile', authController.profile)

export const auth = Router()
auth.use('/auth', r)
