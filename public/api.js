const BASE_URL = "/api";

const parseJson = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await parseJson(response);

  if (!response.ok) {
    const message = data?.message || `HTTP ${response.status} ${response.statusText}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
};

export const getDishTypes = () => request("/dishTypes");
export const getDishes = () => request("/dishes");
export const getMenus = () => request("/menus");
export const getMenuDishes = (menuId) => request(`/menus/${menuId}/dishes`);

export const createMenu = (payload) =>
  request("/menus", { method: "POST", body: JSON.stringify(payload) });
export const updateMenu = (menuId, payload) =>
  request(`/menus/${menuId}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deleteMenu = (menuId) =>
  request(`/menus/${menuId}`, { method: "DELETE" });

export const addDishToMenu = (menuId, dishId) =>
  request(`/menus/${menuId}/dishes`, {
    method: "POST",
    body: JSON.stringify({ dishId }),
  });
export const moveDishToMenu = (menuId, dishId, newMenuId) =>
  request(`/menus/${menuId}/dishes/${dishId}`, {
    method: "PATCH",
    body: JSON.stringify({ newMenuId }),
  });
export const removeDishFromMenu = (menuId, dishId) =>
  request(`/menus/${menuId}/dishes/${dishId}`, { method: "DELETE" });

export const createDish = (payload) =>
  request("/dishes", { method: "POST", body: JSON.stringify(payload) });
export const deleteDish = (dishId) =>
  request(`/dishes/${dishId}`, { method: "DELETE" });
