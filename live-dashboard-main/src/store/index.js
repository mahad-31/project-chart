import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)) // Apply middleware and DevTools
);
const persister = "Free";

export { store, persister };
