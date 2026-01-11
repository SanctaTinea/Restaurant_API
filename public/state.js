export const state = {
  dishTypes: [],
  dishes: [],
  menus: [],
  selectedMenuId: null,
  loading: false,
  message: null,
};

export const setState = (partial) => {
  Object.assign(state, partial);
};

export const setMessage = (type, text) => {
  state.message = text ? { type, text } : null;
};
