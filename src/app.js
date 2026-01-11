import express from "express";
import menusRoutes from "./routes/menus.route.js";
import dishTypesRoute from "./routes/dishTypes.route.js";
import dishesRoute from "./routes/dishes.route.js";

const app = express();
app.use(express.json());

app.use("/api/menus", menusRoutes);
app.use("/api/dishTypes", dishTypesRoute);
app.use("/api/dishes", dishesRoute);
app.use(express.static("public"));

export default app;