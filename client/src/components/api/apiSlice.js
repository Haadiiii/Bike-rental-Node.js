import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'Bikes',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    config : {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    }
  }),
  tagTypes: ['Bike, Reservation,User'],
  endpoints: (builder) => ({
    getBikes: builder.query({
      Promise: () => fetch('/api/bike', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()
          ),
      query: () => '/api/bike',
      providesTags: ['Bike'],
    }),
    getUsers: builder.query({
      Promise: () => fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()
          ),
      query: () => '/api/users',
      providesTags: ['User'],

    }),
    // getReservations: builder.query({
    //   query: () => '/reservations',
    //   providesTags: ['Reservation'],
    // }),
    addBike: builder.mutation({
      Promise: (bike) => fetch('/api/bike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bike),
      }).then((res) => res.json()
          ),
      query: (bike) => ({
        url: '/api/bike',
        method: 'POST',
        body: bike,
      }),
      invalidatesTags: ['Bike'],
    }),
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/api/bike/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['Bike'],
    }),
    addUser: builder.mutation({
      Promise: (body) => fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.setItem('token')}`,
        },
        body: JSON.stringify(body),
      }).then((res) => res.json(),
          ),
      query: (body) => ({
        url: '/api/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    // addNewReservation: builder.mutation({
    //   query: (body) => ({
    //     url: '/reservations',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Reservation'],
    // }),
    // deleteReservation: builder.mutation({
    //   query: (id) => ({
    //     url: `reservations${id}`,
    //     medthod: 'DELETE',
    //   }),
    //   invalidatesTags: ['Reservation'],
    // }),
  }),
});

export const {
  useGetBikesQuery,
  // useGetReservationsQuery,
  useAddBikeMutation,
  useDeleteBikeMutation,
  useGetUsersQuery,
  useAddUserMutation,
  // useAddNewReservationMutation,
  // useDeleteReservationMutation,
} = apiSlice;
