import {
  getDishTypes,
  getDishes,
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  addDishToMenu,
  moveDishToMenu,
  removeDishFromMenu,
  createDish,
  deleteDish,
} from "./api.js";
import { state, setState, setMessage } from "./state.js";
import { initUI, render } from "./ui.js";

const handleError = (error) => {
  const status = error?.status;
  if (status === 409) {
    setMessage("warn", error.message);
    return;
  }
  if (status === 400 || status === 404) {
    setMessage("error", error.message);
    return;
  }
  setMessage("error", error?.message || "Unexpected error");
};

const refreshAll = async () => {
  setState({ loading: true });
  render(state);
  try {
    const [dishTypes, dishes, menus] = await Promise.all([
      getDishTypes(),
      getDishes(),
      getMenus(),
    ]);
    let selectedMenuId = state.selectedMenuId;
    if (!selectedMenuId || !menus.some((menu) => menu.id === selectedMenuId)) {
      selectedMenuId = menus[0]?.id ?? null;
    }
    setState({ dishTypes, dishes, menus, selectedMenuId, loading: false });
    setMessage(null, null);
  } catch (error) {
    setState({ loading: false });
    handleError(error);
  }
  render(state);
};

const selectMenu = (menuId) => {
  setState({ selectedMenuId: menuId });
  render(state);
};

const actions = {
  refreshAll,
  selectMenu,
  createMenu: async (payload) => {
    try {
      const menu = await createMenu(payload);
      setMessage("success", "Меню создано");
      await refreshAll();
      if (menu?.id) {
        setState({ selectedMenuId: menu.id });
      }
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
  updateMenu: async (payload) => {
    if (!state.selectedMenuId) return;
    try {
      await updateMenu(state.selectedMenuId, payload);
      setMessage("success", "Меню обновлено");
      await refreshAll();
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
  deleteMenu: async () => {
    if (!state.selectedMenuId) return;
    try {
      await deleteMenu(state.selectedMenuId);
      setMessage("success", "Меню удалено");
      await refreshAll();
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
  addDishToMenu: async (dishId) => {
    if (!state.selectedMenuId) return;
    try {
      await addDishToMenu(state.selectedMenuId, dishId);
      setMessage("success", "Блюдо добавлено");
      await refreshAll();
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
  moveDish: async (dishId, newMenuId) => {
    if (!state.selectedMenuId) return;
    try {
      await moveDishToMenu(state.selectedMenuId, dishId, newMenuId);
      setMessage("success", "Блюдо перемещено");
      await refreshAll();
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
  removeDish: async (dishId) => {
    if (!state.selectedMenuId) return;
    try {
      await removeDishFromMenu(state.selectedMenuId, dishId);
      setMessage("success", "Блюдо удалено из меню");
      await refreshAll();
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
  createDish: async (payload) => {
    try {
      await createDish(payload);
      setMessage("success", "Блюдо создано");
      await refreshAll();
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
  deleteDish: async (dishId) => {
    try {
      await deleteDish(dishId);
      setMessage("success", "Блюдо удалено");
      await refreshAll();
    } catch (error) {
      handleError(error);
      render(state);
    }
  },
};

initUI(actions);
refreshAll();
