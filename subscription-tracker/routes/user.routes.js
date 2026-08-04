import {Router} from 'express';
import { getUsers, getUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter =  Router();

// GET /users -> get all users
// GET /users/:id -> get user by id // 123 , 4213 , 1234

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser); 

userRouter.post('/', (req,res) => res.send({title: 'CREATE all users'}));

userRouter.put('/:id', (req,res) => res.send({title: 'UPDATE users'}));

userRouter.delete('/:id', (req,res) => res.send({title: 'DELETE users'}));

export default userRouter;