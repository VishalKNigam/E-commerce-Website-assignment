import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as authReducer } from "../Redux/Authentication/reducer";
import { reducer as productReducer} from "../Redux/Products/reducer";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({authReducer, productReducer});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
