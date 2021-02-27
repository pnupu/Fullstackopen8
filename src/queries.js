import { gql } from '@apollo/client'

export const All_AUTHORS = gql `
    query {
        allAuthors {
            name
            bookCount
            born
        }
    }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
        title 
        author {
            name
        }
        published 
        genres
        id
    }
  }
`

export const GET_BOOKS_BY_GENRE = gql `
    query allBooks($genre: String!){
        allBooks(
            genre: $genre
        ) {
            title
            author {
                name
            }
            published
        }
    }
`

export const CREATE_BOOK = gql `
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            author {
                name
            }
            published
            genres
            id
        }

    }
`

export const SET_BORN = gql `
    mutation editBorn($name: String!, $born: Int!){
        editAuthor (name: $name, setBornTo: $born){
            name
            born
            id
        }
    }
`

export const LOGIN = gql `
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const ME = gql `
    query me{
        me{
            username
            favoriteGenre
        }
    }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
        title
        published 
        author {
            name 
        }
        genres
    }
  }
`