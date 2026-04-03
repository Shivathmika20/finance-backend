import { Router } from "express";
import { allowRoles, verifyJwt } from "../middleware/auth";
import { getAllUsers,toggleStatus,getUser,assignRole } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/',verifyJwt, allowRoles('ADMIN'), getAllUsers)
userRouter.get('/:id',verifyJwt, allowRoles('ADMIN') ,getUser)
userRouter.patch('/:id/role',verifyJwt,allowRoles('ADMIN'),assignRole)
userRouter.patch('/:id/status',verifyJwt,allowRoles('ADMIN'), toggleStatus)

export default userRouter;