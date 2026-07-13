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
    query: ({ localId, idToken, ...profileData }) => ({
        url: `users/${localId}.json?auth=${idToken}`,  
        method: "PATCH",
        body: profileData,
    })
})
    })

})

export const { useGetProfileQuery, useLazyGetProfileQuery, useUpdateUserProfileMutation } = userApi;