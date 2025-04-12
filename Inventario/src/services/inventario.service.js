import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const maquinasApi = createApi({
  reducerPath: "maquinasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.userInfo?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    obtenerMaquinas: build.query({
      query: () => ({ url: `maquinas`, method: "GET" }),
    }),
    crearMaquina: build.mutation({
      query: (data) => ({ url: `maquinas`, method: "POST", body: data }),
    }),
    actualizarMaquina: build.mutation({
      query: ({ id, ...data }) => ({
        url: `maquinas/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    eliminarMaquina: build.mutation({
      query: (id) => ({ url: `maquinas/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useObtenerMaquinasQuery,
  useCrearMaquinaMutation,
  useActualizarMaquinaMutation,
  useEliminarMaquinaMutation,
} = maquinasApi;
