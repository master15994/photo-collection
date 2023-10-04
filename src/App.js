import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';

const categories = [
  "Все",
  "Море",
  "Горы",
  "Архитектура",
  "Города"
];

const API_URL = 'https://651bc32b194f77f2a5aed3a1.mockapi.io/collection';

function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const category = categoryId ? `category=${categoryId}` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.error(err);
        alert('Ошибка');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, page]);

  const handleCategoryClick = (index) => {
    setCategoryId(index);
  };

  const renderCollections = () => {
    if (isLoading) {
      return <h2>Идет загрузка....</h2>;
    }

    const filteredCollections = collections.filter((obj) =>
      obj.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return filteredCollections.map((obj) => (
      <Collection key={obj.name} name={obj.name} images={obj.photos} />
    ));
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((categoryName, index) => (
            <li
              key={categoryName}
              className={categoryId === index ? 'active' : ''}
              onClick={() => handleCategoryClick(index)}
            >
              {categoryName}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">{renderCollections()}</div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            className={page === i + 1 ? 'active' : ''}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
