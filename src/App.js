import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { All_AUTHORS, ALL_BOOKS , ME, BOOK_ADDED} from './queries'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import LoginForm from './components/loginForm'
import Favorite from './components/favorite'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const result = useQuery(All_AUTHORS, {
    pollInterval: 2000  
  })
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(ME, {
    pollInterval: 2000
  })

  const client = useApolloClient()
  console.log(books)


  const updateCacheWith = async (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id) 
    const dataInStore = await client.readQuery({ query: ALL_BOOKS })
    if(dataInStore){
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks : dataInStore.allBooks.concat(addedBook) }
        })
    }}
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if(token) {
      setToken(token)
    }
  }, [])

  if(!token) {
    return(
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken}/>
      </div>
    )
  }
  if (result.loading || books.loading || me.loading)  {
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('favorite')}>favorite</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={result}
      />

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />
      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Favorite
        show={page === 'favorite'}
        books={books.data.allBooks}
        me={me.data.me}
      />
    </div>
  )
}

export default App