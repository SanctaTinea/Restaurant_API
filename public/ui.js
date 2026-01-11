const byId = (id) => document.getElementById(id);

const elements = {
  message: byId("message"),
  refreshData: byId("refresh-data"),
  createMenuForm: byId("create-menu-form"),
  menuList: byId("menu-list"),
  menuEditor: byId("menu-editor"),
  editMenuForm: byId("edit-menu-form"),
  deleteMenu: byId("delete-menu"),
  menuDishes: byId("menu-dishes"),
  addDishForm: byId("add-dish-form"),
  addDishSelect: byId("add-dish-select"),
  refreshCatalog: byId("refresh-catalog"),
  dishList: byId("dish-list"),
  createDishForm: byId("create-dish-form"),
  dishTypeSelect: byId("dish-type-select"),
};

export const initUI = (actions) => {
  elements.refreshData.addEventListener("click", actions.refreshAll);
  elements.refreshCatalog.addEventListener("click", actions.refreshAll);

  elements.createMenuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    actions.createMenu({
      dayOfWeek: Number(formData.get("dayOfWeek")),
      variantNum: Number(formData.get("variantNum")),
    });
    event.currentTarget.reset();
  });

  elements.menuList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-menu-id]");
    if (!button) return;
    actions.selectMenu(Number(button.dataset.menuId));
  });

  elements.editMenuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    actions.updateMenu({
      dayOfWeek: Number(formData.get("dayOfWeek")),
      variantNum: Number(formData.get("variantNum")),
    });
  });

  elements.deleteMenu.addEventListener("click", () => {
    if (!confirm("Удалить меню?")) return;
    actions.deleteMenu();
  });

  elements.menuDishes.addEventListener("click", (event) => {
    const removeButton = event.target.closest("button[data-remove-dish]");
    if (removeButton) {
      actions.removeDish(Number(removeButton.dataset.removeDish));
      return;
    }

    const moveButton = event.target.closest("button[data-move-dish]");
    if (moveButton) {
      const dishId = Number(moveButton.dataset.moveDish);
      const select = elements.menuDishes.querySelector(
        `select[data-move-select='${dishId}']`
      );
      if (!select) return;
      actions.moveDish(dishId, Number(select.value));
    }
  });

  elements.addDishForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    actions.addDishToMenu(Number(formData.get("dishId")));
  });

  elements.createDishForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    actions.createDish({
      name: String(formData.get("name")).trim(),
      typeId: Number(formData.get("typeId")),
    });
    event.currentTarget.reset();
  });

  elements.dishList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-delete-dish]");
    if (!button) return;
    actions.deleteDish(Number(button.dataset.deleteDish));
  });
};

const renderMessage = (message) => {
  elements.message.className = "message";
  if (!message) {
    elements.message.textContent = "";
    return;
  }
  elements.message.classList.add(message.type);
  elements.message.textContent = message.text;
};

const renderMenuList = (menus, selectedMenuId) => {
  elements.menuList.innerHTML = "";
  menus.forEach((menu) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.menuId = menu.id;
    button.textContent = `${getDayNameRu(menu.dayOfWeek)}-${menu.variantNum}`;
    if (menu.id === selectedMenuId) {
      button.disabled = true;
    }
    item.append(button);
    elements.menuList.append(item);
  });
};

const renderMenuEditor = (selectedMenu) => {
  elements.menuEditor.style.display = selectedMenu ? "block" : "none";
  if (!selectedMenu) return;
  elements.editMenuForm.dayOfWeek.value = selectedMenu.dayOfWeek;
  elements.editMenuForm.variantNum.value = selectedMenu.variantNum;
};

const renderMenuDishes = (selectedMenu, menus) => {
  elements.menuDishes.innerHTML = "";
  if (!selectedMenu) return;
  const dishes = [...(selectedMenu.dishes || [])].sort(
    (a, b) => a.type.orderIndex - b.type.orderIndex
  );

  dishes.forEach((dish) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${dish.name}</td>
      <td>${dish.type.name}</td>
      <td class="actions">
        <div class="dish-action">
          <button type="button" data-move-dish="${dish.id}">переместить в</button>
          <label><select data-move-select="${dish.id}"></select></label>
        </div>
        <button type="button" data-remove-dish="${dish.id}">удалить из меню</button>
      </td>
    `;

    const select = row.querySelector("select");
    menus
      .filter((menu) => menu.id !== selectedMenu.id)
      .forEach((menu) => {
        const option = document.createElement("option");
        option.value = menu.id;
        option.textContent = `${getDayNameRu(menu.dayOfWeek)}-${menu.variantNum}`;
        select.append(option);
      });

    elements.menuDishes.append(row);
  });
};

const renderAddDishOptions = (dishes) => {
  elements.addDishSelect.innerHTML = "";
  dishes.forEach((dish) => {
    const option = document.createElement("option");
    option.value = dish.id;
    option.textContent = `${dish.name} (${dish.type.name})`;
    elements.addDishSelect.append(option);
  });
};

const renderDishTypes = (dishTypes) => {
  elements.dishTypeSelect.innerHTML = "";
  dishTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = `${type.name}`;
    elements.dishTypeSelect.append(option);
  });
};

const renderDishCatalog = (dishes) => {
  elements.dishList.innerHTML = "";
  dishes.forEach((dish) => {
    const item = document.createElement("li");
    item.innerHTML = `${dish.name} (${dish.type.name}) `;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.deleteDish = dish.id;
    button.textContent = "удалить";
    item.append(button);
    elements.dishList.append(item);
  });
};

export const render = (state) => {
  renderMessage(state.message);
  renderMenuList(state.menus, state.selectedMenuId);
  const selectedMenu = state.menus.find((menu) => menu.id === state.selectedMenuId);
  renderMenuEditor(selectedMenu);
  renderMenuDishes(selectedMenu, state.menus);
  renderAddDishOptions(state.dishes);
  renderDishTypes(state.dishTypes);
  renderDishCatalog(state.dishes);
};

function getDayNameRu(dayNumber) {
  const days = [
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
    "воскресенье"
  ];

  if (dayNumber < 1 || dayNumber > 7) {
    throw new Error("Номер дня недели должен быть от 1 до 7");
  }

  return days[dayNumber - 1];
}
