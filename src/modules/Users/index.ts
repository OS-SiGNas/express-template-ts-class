import { Router } from 'express'
import { UsersController } from './controller'
// import { checkSession } from './checkSession'

const r: Router = Router()
const userController = new UsersController()

r.get('/', userController.getAllUsers)
r.get('/:_id', userController.getOneUser)
r.put('/:_id', userController.updateUser)
r.delete('/:_id', userController.deleteUser)
// r.post('/profile', checkSession, authController.profile)

export const users = Router()
users.use('/users', r)
