import { createStore, combineReducers } from "redux";
import UserReducer from "./user/reducer";
const reducer = combineReducers({
  user: UserReducer,
});

const store = createStore(
  reducer,
  // import.meta.env.REACT_APP_MODE === "development" &&
  // window.__REDUX_DEVTOOLS_EXTENSION__ &&
  // window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
