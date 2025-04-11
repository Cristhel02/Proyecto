import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const catalogosApi = createApi({
  reducerPath: "catalogosApi",
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
    // --- CATEGORÍAS ---
    obtenerCategorias: build.query({
      query: () => ({
        url: `categorias`,
        method: "GET",
      }),
    }),
    crearCategoria: build.mutation({
      query: (data) => ({
        url: `categorias`,
        method: "POST",
        body: data,
      }),
    }),
    actualizarCategoria: build.mutation({
      query: ({ id, ...data }) => ({
        url: `categorias/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    eliminarCategoria: build.mutation({
      query: (id) => ({
        url: `categorias/${id}`,
        method: "DELETE",
      }),
    }),

    // --- PROVEEDORES ---
    obtenerProveedores: build.query({
      query: () => ({
        url: `proveedores`,
        method: "GET",
      }),
    }),
    crearProveedor: build.mutation({
      query: (data) => ({
        url: `proveedores`,
        method: "POST",
        body: data,
      }),
    }),
    actualizarProveedor: build.mutation({
      query: ({ id, ...data }) => ({
        url: `proveedores/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    eliminarProveedor: build.mutation({
      query: (id) => ({
        url: `proveedores/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // Categorías
  useObtenerCategoriasQuery,
  useCrearCategoriaMutation,
  useActualizarCategoriaMutation,
  useEliminarCategoriaMutation,
  // Proveedores
  useObtenerProveedoresQuery,
  useCrearProveedorMutation,
  useActualizarProveedorMutation,
  useEliminarProveedorMutation,
} = catalogosApi;
