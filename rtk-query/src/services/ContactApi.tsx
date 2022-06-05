import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Contact} from '../models/contact.model'

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://jsonplaceholder.typicode.com/"}),
    endpoints: (builder) => ({
        contact:builder.query<Contact[], void>({
            query:() => '/users'
        }),
        singlecontact:builder.query<Contact, string>({
            query:(id) => `/users/${id}`
        }),
        //RTk Query Mutations
        addContact:builder.mutation<void, Contact>({
            query: user => ({
                url: '/users',
                method: 'POST',
                body: user
            })
        }),
        updateContact:builder.mutation<void, Contact>({
            query: ({id, ...rest}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: rest
            })
        }),
        deleteContact:builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            })
        })
    })
})


export const {
    useContactQuery,
    useSinglecontactQuery,
    useAddContactMutation, 
    useUpdateContactMutation,
    useDeleteContactMutation
} = contactApi