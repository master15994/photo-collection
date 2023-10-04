import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';

const categ = [
  {
    "name": "Все"
  },
  {
    "name": "Море"
  },
  {
    "name": "Горы"
  },
  {
    "name": "Архитектура"
  },
  {
    "name": "Города"
  }
]

const App = () => {
  const [collections, setCollections] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const [categoryId, setCategoryId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const category = categoryId ? `category=${categoryId}` : ''

  const API_URL = 'https://651bc32b194f77f2a5aed3a1.mockapi.io/collection?'

  const pageNumbers = [1, 2, 3, 4, 5]


  useEffect(() => {
    setIsLoading(true)
    fetch(`${API_URL}page=${page}&limit=3& ${category}`)
      .then(res => res.json())
      .then((json) => {
        setCollections(json)
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка');
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [categoryId, page])

  return (

    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            categ.map((obj, i) =>
              <li
                key={obj.name}
                className={categoryId === i ? 'active' : ''}
                onClick={() => setCategoryId(i)}
              >
                {obj.name}
              </li>)
          }
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? <h2>Идет Загрузка....</h2> : (
            collections
              .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />))}
      </div>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={page === pageNumber ? 'active' : ''}
            onClick={() => setPage(pageNumber)}
          >{pageNumber}
          </li>))
        }
      </ul>
    </div>
  );
}

export default App;