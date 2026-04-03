import { Router } from "express";
import { allowRoles, verifyJwt } from "../middleware/auth";
import { getAllRecords,getRecord,updateRecord,createRecord,deleteRecord } from "../controllers/record.controller";

const recordRouter = Router();

recordRouter.get('/',verifyJwt, allowRoles('ADMIN','ANALYST'),getAllRecords)
recordRouter.get('/:id',verifyJwt, allowRoles('ADMIN','ANALYST'),getRecord)
recordRouter.post('/',verifyJwt, allowRoles('ADMIN'),createRecord)
recordRouter.patch('/:id',verifyJwt, allowRoles('ADMIN'),updateRecord)
recordRouter.delete('/:id',verifyJwt, allowRoles('ADMIN'),deleteRecord)



export default recordRouter;