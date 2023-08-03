import express, { Router } from "express";
import router from "./route-router";
import taskRouter from "./route-router";

/**
 * Express application.
 */
const app = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use("/api/v2", router);

export default app;
