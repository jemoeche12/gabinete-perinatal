import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { baseUrl } from "../databases/realTimeDataBase";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (localId) => ({
                url: `user/${localId}.json`,
                method: "GET"
            }),

        }),
        updateUserProfile: builder.mutation({
            query: ({localId, ...profileDate}) => ({
                url: `user/${localId}.json`,
                method: "PUT",
                body: profileDate,
            })
        })
    })

})

export const { useGetProfileQuery, useLazyGetProfileQuery, useUpdateUserProfileMutation } = userApi;