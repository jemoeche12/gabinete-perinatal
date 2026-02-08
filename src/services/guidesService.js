import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const guidesApi = createApi({
  reducerPath: "guidesApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getGuidesCategories: builder.query({
      query: () => `guideCategories.json`,
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
    getGuidesByCategory: builder.query({
      query: (categoryId) => `/guides.json`,
      transformResponse: (response, meta, categoryId) => {
        if(!response) return [];

        const guideArray = Object.values(response)

        return guideArray.filter(guide => guide.categoryId === categoryId);
      },
    }),
    getGuidesById: builder.query({
      query: (id) => `guides/${id}.json`,
      transformResponse: (response) => {
        if (!response) return null;
        return response;
      },
    }),
  }),
});

export const { useGetGuidesCategoriesQuery, useGetGuidesByCategoryQuery, useGetGuidesByIdQuery } = guidesApi;
