import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const recursosApi = createApi({
  reducerPath: "recursosApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["profileImageGet"],
  endpoints: (builder) => ({
    getLibraryByCategory: builder.query({
      query: () => `categoriesLibrary.json`,
      transformResponse: (response) => {
        if (!response) return [];
        const categoriesArray = Object.entries(response).map(
          ([key, value]) => ({
            id: Number(value.id ?? key),
            name: value.name,
            description: value.description,
            requiredLevel:
              value.requiredLevel || value.suscriptionPlan || "basico",
          }),
        );
        return categoriesArray;
      },
    }),

    getCategories: builder.query({
      query: (categoryId) => "categories.json",
      transformResponse: (response, meta, categoryId) => {
        if (!response) return [];

        const categoriesArray = Object.entries(response).map(
          ([key, value]) => ({
            ...value,
            id: Number(key),
          }),
        );


        return categoriesArray.filter(category => category.categoryId === categoryId);
      },
    }),

    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const responseTransformed = Object.values(response);
        return responseTransformed;
      },
    }),
    getProductById: builder.query({
      query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
      transformResponse: (response) => {
        const responseTransformed = Object.values(response);
        if (responseTransformed.length > 0) {
          return responseTransformed[0];
        }
        return null;
      },
    }),
    getProfileImage: builder.query({
      query: (localId) => {
        return `profileImages/${localId}.json`;
      },
      providesTags: ["profileImageGet"],
    }),

    postProfileImage: builder.mutation({
      query: ({ localId, image }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
  }),
});

export const {
  useGetLibraryByCategoryQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} = recursosApi;
