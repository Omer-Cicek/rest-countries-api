import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  InputGroup,
  FormControl,
  SplitButton,
  Dropdown,
} from 'react-bootstrap';

const CountriesList = () => {
  const [posts, setPosts] = useState();

  const baseURL = 'https://restcountries.com/v2/all';

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <>
      {/* Search bar  */}
      <InputGroup className="mb-3">
        <FormControl aria-label="Text input with dropdown button" />
        <SplitButton
          variant="outline-secondary"
          title="Ara"
          id="segmented-button-dropdown-2"
          alignRight
        >
          <Dropdown.Item href="#">Search</Dropdown.Item>
          <Dropdown.Item href="#">Search By Name</Dropdown.Item>
        </SplitButton>
      </InputGroup>
      {/* Table  */}
      <Table className="table table-striped table-hover">
        {/* table titles  */}
        <thead>
          <tr>
            <th>#</th>
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
