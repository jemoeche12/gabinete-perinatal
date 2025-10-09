import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery:  fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: ((builder) => ({
        orderConfirm: builder.mutation({
            query: ((...order) => ({
                url: "order.json",
                method: "POST",
                body: order
            }))
        })
    }))
})

export const { useOrderConfirmMutation } = orderApi;