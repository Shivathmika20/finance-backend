import { Router } from "express";
import { getSummary,getRecentActivity,getMonthlyTrends,getWeeklyTrends,getSummaryByCategory } from "../controllers/dashboard.controller";
import { allowRoles, verifyJwt } from "../middleware/auth";

const dashboardRouter = Router();


dashboardRouter.get('/',verifyJwt, allowRoles('ADMIN','ANALYST','VIEWER'),getSummary);
dashboardRouter.get('/category',verifyJwt, allowRoles('ADMIN','ANALYST'),getSummaryByCategory);
dashboardRouter.get('/recent',verifyJwt, allowRoles('ADMIN','ANALYST'),getRecentActivity);
dashboardRouter.get('/monthlytrends',verifyJwt, allowRoles('ADMIN','ANALYST'),getMonthlyTrends);
dashboardRouter.get('/weeklytrends',verifyJwt, allowRoles('ADMIN','ANALYST'),getWeeklyTrends);

export default dashboardRouter;