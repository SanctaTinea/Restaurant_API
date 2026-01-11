import * as menusService from "../services/menus.service.js";
import {
    addDishToMenuDto,
    createMenuDto,
    dishIdDto,
    menuDishesDto,
    menuDto,
    menuIdDto,
    menuWithDishesDto,
    menusWithDishesDto,
    moveDishDto,
    updateMenuDto
} from "../dto/menus.dto.js";
import { dishDto } from "../dto/dishes.dto.js";

export async function getMenus(req, res) {
    try {
        const rows = await menusService.getMenusWithDishes();
        const response = menusWithDishesDto(rows);
        res.status(200).json(response);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function getMenuDishes(req, res) {
    try {
        const menuId = menuIdDto(Number(req.params.menuId));
        const rows = await menusService.getMenuDishes(menuId.menuId);
        const response = menuDishesDto(rows);
        res.status(200).json(response);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function postMenu(req, res) {
    try {
        const reqDTO = createMenuDto(req.body);
        const result = await menusService.createMenu(
            reqDTO.dayOfWeek,
            reqDTO.variantNum
        );
        const response = menuDto(result);
        res.status(201).json(response);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function patchMenu(req, res) {
    try {
        const menuId = menuIdDto(Number(req.params.menuId));
        const reqDTO = updateMenuDto(req.body);
        const rows = await menusService.updateMenu(
            menuId.menuId,
            reqDTO.dayOfWeek,
            reqDTO.variantNum
        );
        const response = menuWithDishesDto(rows);
        res.status(200).json(response);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function deleteMenu(req, res) {
    try {
        const menuId = menuIdDto(Number(req.params.menuId));
        await menusService.deleteMenu(menuId.menuId);
        res.status(204).send();
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function postMenuDish(req, res) {
    try {
        const menuId = menuIdDto(Number(req.params.menuId));
        const reqDTO = addDishToMenuDto(req.body);
        const result = await menusService.addDishToMenu(
            menuId.menuId,
            reqDTO.dishId
        );
        const response = dishDto(result);
        res.status(201).json(response);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function patchMenuDish(req, res) {
    try {
        const menuId = menuIdDto(Number(req.params.menuId));
        const dishId = dishIdDto(Number(req.params.dishId));
        const reqDTO = moveDishDto(req.body);
        const rows = await menusService.moveDishToMenu(
            menuId.menuId,
            dishId.dishId,
            reqDTO.newMenuId
        );
        const response = menuWithDishesDto(rows);
        res.status(200).json(response);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function deleteMenuDish(req, res) {
    try {
        const menuId = menuIdDto(Number(req.params.menuId));
        const dishId = dishIdDto(Number(req.params.dishId));
        await menusService.deleteDishFromMenu(menuId.menuId, dishId.dishId);
        res.status(204).send();
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}
