import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const CountriesList = () => {
  const [isLoading, setIsLoading] = useState(false); //for spinner
  const [posts, setPosts] = useState(null); //stack all data
  const [filteredPosts, setFilteredPosts] = useState(null); //holds data that user filtered
  const [input, setInput] = useState('');
  const [option, setOption] = useState('');

  let newArr = [];

  const baseURL = 'https://restcountries.com/v2/all';

  //fetching data with axios and stacking in "posts"
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

  //resets all conditional searches
  const resetHandler = () => {
    setFilteredPosts(null);
    setInput('');
    setOption('');
  };

  //search button clicked, searches for capital city or common infos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (option === 'searchWithCapital') {
      newArr = posts.filter((post) =>
        post?.capital?.toLowerCase().includes(input.toLowerCase())
      );
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
      setFilteredPosts(newArr);
    }

    setInput('');
    setOption('');
  };

  return (
    <>
      {/* Search bar  */}
      <form
        className="d-flex flex-row justify-content-evenly "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="d-flex justify-content-center w-75 gap-2">
          <input //input bar that user search
            type="search"
            className="form-control w-50"
            id="search"
            placeholder="Search"
            onChange={(e) => {
              handleInput(e);
            }}
            value={input}
          />

          <select // dropdown menu (Capital City or Common Search)
            className="form-select w-25"
            onChange={(e) => {
              handleOptions(e);
            }}
            value={option}
          >
            <option value="commonSearch">Common Search</option>
            <option value="searchWithCapital">Search With Capital City</option>
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
                <tr>
                  <td colSpan={5}>Veri Bulunamadı</td>
                </tr>
              )
            ) : (
              posts.map((post, index) => (
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
              ))
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
