export const loginReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN":
      return action.loggedIn;
    case "SAVE_NAME":
      return action.currentUser;
    default:
      return state;
  }
};
