import express from "express";
import authRouter from "./routes/auth.route";
import recordRouter from "./routes/record.route";
import userRouter from "./routes/user.route";
import dashboardRouter from "./routes/dashboard.route";

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/records', recordRouter);
app.use('/api/users', userRouter);
app.use('/api/dashboard', dashboardRouter);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
});

