import { Router } from "express";
import { getSummary,getRecentActivity,getTrends,getSummaryByCategory } from "../controllers/dashboard.controller";
import { allowRoles, verifyJwt } from "../middleware/auth";

const dashboardRouter = Router();


dashboardRouter.get('/',verifyJwt, allowRoles('ADMIN','ANALYST','VIEWER'),getSummary);
dashboardRouter.get('/category',verifyJwt, allowRoles('ADMIN','ANALYST'),getSummaryByCategory);
dashboardRouter.get('/recent',verifyJwt, allowRoles('ADMIN','ANALYST'),getRecentActivity);
dashboardRouter.get('/trends',verifyJwt, allowRoles('ADMIN','ANALYST'),getTrends);

export default dashboardRouter;