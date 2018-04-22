import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookItem from './BookItem';


class BookList extends React.Component {
  render() {
    console.log(this.props.loading);
    return (
      <div>
        {this.props.books.map(data => <BookItem key={data.isbn} data={data} />)}
      </div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  books: state.books.books,
  loading: state.books.loading,
});

export default connect(mapStateToProps, null)(BookList);
