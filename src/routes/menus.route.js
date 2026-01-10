import { Router } from "express";
import * as controller from "../controllers/menus.controller.js";

const router = Router();

router.get("/", controller.getMenus);
router.get("/:menuId/dishes", controller.getMenuDishes);
router.post("/", controller.postMenu);
router.patch("/:menuId", controller.patchMenu);
router.delete("/:menuId", controller.deleteMenu);
router.post("/:menuId/dishes", controller.postMenuDish);
router.patch("/:menuId/dishes/:dishId", controller.patchMenuDish);
router.delete("/:menuId/dishes/:dishId", controller.deleteMenuDish);

export default router;
