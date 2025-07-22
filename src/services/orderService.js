import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    orderConfirm: builder.mutation({
      query: (orderData) => ({
        url: "order.json",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrderConfirm: builder.query({
      query: () => ({
        url: "order.json",
        method: "GET",
      }),
    }),
  }),
});

export const { useOrderConfirmMutation, useGetOrderConfirmQuery } = orderApi;
