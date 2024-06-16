import { combineReducers } from "@reduxjs/toolkit";
import { employeeReducer } from "./employee";

const rootReducer = combineReducers({
  employee: employeeReducer.reducer,
});

export default rootReducer;



