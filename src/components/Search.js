import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Search = ({ isInvalid, search }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    search(query);
  };

  return (
    <Form data-testid="search-form" onSubmit={handleSubmit} inline>
      <FormControl
        type="text"
        placeholder="Search"
        className=" mr-sm-2"
        isInvalid={isInvalid}
        onChange={handleChange}
        data-testid="search-field"
      />
      <Button data-testid="search" type="submit">
        Search
      </Button>
    </Form>
  );
};

Search.propTypes = {
  isInvalid: PropTypes.bool,
  search: PropTypes.func.isRequired
};

export default Search;
