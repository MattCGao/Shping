import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Img from 'components/Img';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

/* eslint react/prop-types:0 */

function ReposList({ loading, error, movies, pages }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (movies !== false) {
    return (
      <ReactTable
        columns={[
          {
            Header: 'Title',
            accessor: 'Title',
          },
          {
            Header: 'Year',
            accessor: 'Year',
          },
          {
            Header: 'Poster',
            accessor: 'Poster',
            Cell: props => (
              <Img src={props.value} alt={props.value} style={{ height: 50 }} />
            ),
          },
        ]}
        // manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        showPageSizeOptions={false}
        showPageJump={false}
        data={movies}
        pages={pages} // Display the total number of pages
        // onFetchData={this.fetchData} // Request new data when things change
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  movies: PropTypes.any,
  pages: PropTypes.number,
};

export default ReposList;
