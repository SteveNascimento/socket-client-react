import { createStore } from "easy-peasy";
import { socketModel } from "./models/socketModel";

export const store = createStore({
  socket: socketModel,
});
