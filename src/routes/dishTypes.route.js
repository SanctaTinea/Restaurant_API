import { Router } from "express";
import * as controller from "../controllers/dishTypes.controller.js";

const router = Router();

router.get("/", controller.getDishTypes);

export default router;
