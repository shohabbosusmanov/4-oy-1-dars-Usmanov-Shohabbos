import "dotenv/config";
import express from "express";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import Routes from "./routes/routes.js";
import prisma from "./config/database.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/api", Routes());

app.use(ErrorMiddleware);

const initApp = async () => {
    try {
        await prisma.$connect();

        console.log("database connected");

        app.listen(PORT, () => {
            console.log("server is running port:", PORT);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

initApp();
