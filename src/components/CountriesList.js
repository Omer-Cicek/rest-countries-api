import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const CountriesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [input, setInput] = useState('');
  const [option, setOption] = useState('');

  let newArr = [];

  const baseURL = 'https://restcountries.com/v2/all';

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(baseURL)
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleOptions = (e) => {
    setOption(e.target.value);
  };

  const resetHandler = () => {
    setFilteredPosts(null);
    setInput('');
    setOption('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(option, input);

    if (option === 'searchWithCapital') {
      newArr = posts.filter((post) =>
        post?.capital?.toLowerCase().includes(input.toLowerCase())
      );
      console.log(newArr);
      setFilteredPosts(newArr);
    } else {
      newArr = posts.filter((post) => {
        let { name, capital, region } = post;
        return (
          name?.toLowerCase().includes(input.toLowerCase()) ||
          capital?.toLowerCase().includes(input.toLowerCase()) ||
          region?.toLowerCase().includes(input.toLowerCase())
        );
      });
      console.log(newArr);
      setFilteredPosts(newArr);
    }
  };

  return (
    <>
      {/* Search bar  */}
      <form
        className="d-flex flex-row justify-content-evenly "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="d-flex justify-content-center w-75 gap-2">
          <input
            type="search"
            className="form-control w-50"
            id="search"
            placeholder="Search"
            onChange={(e) => handleInput(e)}
          />
          <select
            className="form-select w-25"
            onChange={(e) => handleOptions(e)}
          >
            <option value="commonSearch">Common Search</option>
            <option value="searchWithCapital">Search With Capital</option>
          </select>

          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </div>
        <button type="button" className="btn btn-danger" onClick={resetHandler}>
          Reset
        </button>
      </form>

      {/* Table  */}
      <Table className="table table-striped table-hover">
        {/* table titles  */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Country Name</th>
            <th>Capital City</th>
            <th>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        {/* table body-displaying countries and infos conditionally */}
        <tbody>
          {posts &&
            (filteredPosts ? (
              filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => {
                  return (
                    <tr key={post.numericCode}>
                      <td>{index + 1}</td>
                      <td>{post?.name}</td>
                      <td>{post?.capital}</td>
                      <td>{post?.region}</td>
                      <td>
                        <img
                          src={post?.flags.svg}
                          alt="countryFlags"
                          style={{ width: '50px' }}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>Veri Bulunamadı</p>
              )
            ) : (
              posts.map((post, index) => {
                return (
                  <tr key={post.numericCode}>
                    <td>{index + 1}</td>
                    <td>{post?.name}</td>
                    <td>{post?.capital}</td>
                    <td>{post?.region}</td>
                    <td>
                      <img
                        src={post?.flags.svg}
                        alt="countryFlags"
                        style={{ width: '50px' }}
                      />
                    </td>
                  </tr>
                );
              })
            ))}
        </tbody>
      </Table>
      {/* spinner when data loading */}
      {isLoading && (
        <div className="spinner-grow text-dark text-center mt-5" role="status">
          <span className="visually-hidden text-center">Loading...</span>
        </div>
      )}
    </>
  );
};

export default CountriesList;
