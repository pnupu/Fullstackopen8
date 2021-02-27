import React,{ useState } from 'react'
import { All_AUTHORS, SET_BORN } from '../queries'
import { useQuery, useMutation } from '@apollo/client'



const Authors = (props) => {
  const result = useQuery(All_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editBorn ] = useMutation(SET_BORN, {
    refetchQueries: [ { query: All_AUTHORS } ]
  })

  

  if (!props.show) {
    return null
  }
  
  

  if (result.loading)  {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors


  const submit = async (event) => {
    event.preventDefault()
    console.log('setting born year...')
    editBorn({ variables: { name, born }})
    setBorn('')
    setName('')
  }
  const handleChange = (event) => {
    setName(event.target.value)
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
            Name: 
            <select
              onChange={handleChange}
            >
              <option value=''></option>
              {authors.map(a => 
                <option value={a.name} key={a.name}>{a.name}</option>  
              )}
            </select>
            
        </div>
        <div>
          Born: 
          <input 
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        <div>
          <button type="submit">Update Author</button>
        </div>
        </div>        
      </form>
    </div>
  )
}

export default Authors