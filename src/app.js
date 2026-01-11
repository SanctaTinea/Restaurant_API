import express from "express";
import menusRoutes from "./routes/menus.route.js";
import dishTypesRoute from "./routes/dishTypes.route.js";
import dishesRoute from "./routes/dishes.route.js";
import path from "path";
import {fileURLToPath} from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// статические файлы
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/menus", menusRoutes);
app.use("/api/dishTypes", dishTypesRoute);
app.use("/api/dishes", dishesRoute);

export default app;