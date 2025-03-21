import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const recursosApi = createApi({
    reducerPath: "recursosApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ["profileImageGet"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories.json",
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                if (responseTransformed.length > 0) {
                    return responseTransformed[0]
                }  return null;
            }
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ["profileImageGet"],
        }),
        postProfileImage: builder.mutation({
            query: ({localId, image}) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image:image
                }
            }),
            invalidatesTags: ["profileImageGet"],
        })
    })
})


export const { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery, useGetProfileImageQuery, usePostProfileImageMutation } = recursosApi;