import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  InputGroup,
  FormControl,
  SplitButton,
  Dropdown,
  Table,
} from 'react-bootstrap';

const CountriesList = () => {
  const [posts, setPosts] = useState([]);
  //   const [filteredPosts, setFilteredPosts] = useState([]);
  const [input, setInput] = useState('');
  const [option, setOption] = useState('');

  const baseURL = 'https://restcountries.com/v2/all';

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleOptions = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(option, input);
  };

  return (
    <>
      {/* Search bar  */}
      <form className="d-flex flex-row " onSubmit={(e) => handleSubmit(e)}>
        <input
          type="search"
          className="form-control w-50"
          id="search"
          placeholder="Search"
          onChange={(e) => handleInput(e)}
        />
        <select className="form-select w-25" onChange={(e) => handleOptions(e)}>
          <option value="commonSearch">Common Search</option>
          <option value="searchWithCapital">Search With Capital</option>
        </select>
        <button type="submit" className="btn btn-secondary">
          Search
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
          {posts
            ? posts.map((post, index) => {
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
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default CountriesList;
