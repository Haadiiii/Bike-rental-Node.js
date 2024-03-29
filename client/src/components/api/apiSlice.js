import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'Bikes',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bike-rent.onrender.com',
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
      query: () => '/api/users',
      async queryFn(arg, { getState }) {
        const { auth: { token } } = getState();
        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.json();
      },
      providesTags: ['User'],

    }),
    login: builder.mutation({
      mutation: (credentials) => ({
        url: '/api/auth',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }),
    }),
    getReservations: builder.query({
      query: () => '/api/reservation',
      providesTags: ['Reservation'],
    }),
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
    addNewReservation: builder.mutation({
      query: (body) => ({
        url:  '/api/reservation',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reservation'],
    }),
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/api/reservation/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reservation'],
    }),
  }),
});

export const {
  useGetBikesQuery,
  useGetReservationsQuery,
  useAddBikeMutation,
  useDeleteBikeMutation,
  useGetUsersQuery,
  useLoginMutation,
  useAddUserMutation,
  useAddNewReservationMutation,
  useDeleteReservationMutation,
} = apiSlice;
