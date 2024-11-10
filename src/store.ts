import { configureStore } from "@reduxjs/toolkit";
import navbar from "./components/reducer";
const store = configureStore({
reducer: { navbar },
});
export default store;