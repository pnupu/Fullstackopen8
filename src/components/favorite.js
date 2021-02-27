import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_BOOKS_BY_GENRE } from '../queries'


const Favorite = (props) => {
    const [filtered, setFiltered] = useState(props.books)
    const [getBooks, result] = useLazyQuery(GET_BOOKS_BY_GENRE)

    useEffect(() =>{
        
        if(props.me && props.show){
            getBooks({ variables: { genre: props.me.favoriteGenre }})
            
        }
    }, [props]) // eslint-disable-line

    useEffect(() => {
        if(result.data){
            setFiltered(result.data.allBooks)
        }
    }, [result])

    if (!props.show) {
        return null
    }
    
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
            {filtered.map(a =>
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
            )}
            </tbody>
        </table>
        
        </div>
    )
}

export default Favorite