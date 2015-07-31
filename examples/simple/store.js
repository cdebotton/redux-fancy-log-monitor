import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";

import thunk from "redux-thunk";
import {devTools} from "redux-devtools";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);
const createWithDevTools = compose(devTools(), createStore);
const createWithMiddleware = applyMiddleware(thunk)(createWithDevTools);
const store = createWithMiddleware(reducer);

export default store;
