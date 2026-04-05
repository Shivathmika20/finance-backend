import express from "express";
import path from "node:path";
import authRouter from "./routes/auth.route";
import recordRouter from "./routes/record.route";
import userRouter from "./routes/user.route";
import dashboardRouter from "./routes/dashboard.route";

const app = express();

app.use(express.json());

const openApiPath = path.join(process.cwd(), "openapi", "openapi.yaml");
app.get("/openapi.yaml", (_req, res) => {
	res.type("application/yaml");
	res.sendFile(openApiPath);
});

app.use('/api/auth', authRouter);
app.use('/api/records', recordRouter);
app.use('/api/users', userRouter);
app.use('/api/dashboard', dashboardRouter);


app.get('/',(req,res)=>{
	return res.json({
		message:"Hi Welcome"
	})
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
});

