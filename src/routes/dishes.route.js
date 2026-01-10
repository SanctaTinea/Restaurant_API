import { Router } from "express";
import * as controller from "../controllers/dishes.controller.js";

const router = Router();

router.get("/", controller.getDishes);
router.post("/", controller.postDish);
router.delete("/:dishId", controller.deleteDish);

export default router;
