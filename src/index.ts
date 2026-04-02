import express from "express";
import authRouter from "./routes/auth.route";
import recordRouter from "./routes/record.route";
import userRouter from "./routes/user.route";
import dashboardRouter from "./routes/dashboard.route";

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/records', recordRouter);
app.use('/users', userRouter);
app.use('/dashboard', dashboardRouter);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
});

