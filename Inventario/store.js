import { configureStore } from "@reduxjs/toolkit";
import { catalogosApi } from "./src/services/catalogos.service";
import { maquinasApi } from "./src/services/inventario.service";

export const store = configureStore({
  reducer: {
    [catalogosApi.reducerPath]: catalogosApi.reducer,
    [maquinasApi.reducerPath]: maquinasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogosApi.middleware,
      maquinasApi.middleware
    ),
});
