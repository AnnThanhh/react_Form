import * as ActionType from "./constants";

const actDeleteUser = (id) => {
  return {
    type: ActionType.DELETE_USER,
    payload: id,
  };
};

const actEditUser = (user) => {
  return {
    type: ActionType.EDIT_USER,
    payload: user,
  };
};

const actSearch = (keyword) => {
  return {
    type: ActionType.KEYWORD_USER,
    payload: keyword,
  };
};

const actSubmitUser = (user) => {
  return {
    type: ActionType.SUBMIT_USER,
    payload: user,
  };
};

export { actDeleteUser, actEditUser, actSearch, actSubmitUser };
