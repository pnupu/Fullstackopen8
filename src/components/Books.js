
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_BOOKS_BY_GENRE } from '../queries'


const Books = (props) => {
  const [getBooks, result] = useLazyQuery(GET_BOOKS_BY_GENRE, {
    pollInterval: 2000
  })
  const [filter, setFilter] = useState(null)
  const [filteredBooks, setFiltered] = useState(props.books)

  useEffect(() => {
    if(filter){
      getBooks({ variables: { genre: filter }})
    } else {
      setFiltered(props.books)
    }
  }, [filter, props.books]) //eslint-disable-line

  useEffect(() => {
    if(result.data){
        setFiltered(result.data.allBooks)
    }
}, [result, getBooks])
  
  if (!props.show) {
    return null
  }


  const genres = [...new Set(props.books.map(b => b.genres).flat())]
  
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map( g => 
        <button key={g} value={g} onClick={() => setFilter(g)}>{g}</button>  
      )}
      <button  onClick={() => setFilter(null)}>Clear filter</button>
    </div>
  )
}

export default Books