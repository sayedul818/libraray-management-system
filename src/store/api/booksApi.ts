import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface UpdateBookRequest {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface BorrowRequest {
  bookId: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  bookTitle: string;
  isbn: string;
  totalQuantityBorrowed: number;
}

// Base API URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Book', 'BorrowSummary'],
  endpoints: (builder) => ({
    // Get all books
    getAllBooks: builder.query<Book[], void>({
      query: () => '/books',
      transformResponse: (response: { data: Book[] }) => response.data, // extract array
      providesTags: ['Book'],
    }),
    // Get book by ID
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { data: Book }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    // Create new book
    createBook: builder.mutation<Book, CreateBookRequest>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      transformResponse: (response: { data: Book }) => response.data,
      invalidatesTags: ['Book'],
    }),
    // Update book
    updateBook: builder.mutation<Book, UpdateBookRequest>({
      query: ({ id, ...book }) => ({
        url: `/books/${id}`,
        method: 'PATCH', // PATCH is safer than PUT for partial updates
        body: book,
      }),
      transformResponse: (response: { data: Book }) => response.data,
      invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }, 'Book'],
    }),
    // Delete book
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    // Borrow a book
    borrowBook: builder.mutation<void, BorrowRequest>({
      query: (borrowData) => ({
        url: '/borrows',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Book', 'BorrowSummary'],
    }),
    // Borrow summary
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/borrows/summary',
      transformResponse: (response: { data: BorrowSummary[] }) => response.data,
      providesTags: ['BorrowSummary'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;
