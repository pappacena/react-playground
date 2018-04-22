import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import BookItem from './BookItem';


class BookList extends React.Component {
  onRemoveItem(item) {
    console.log(this, item);
    return null;
  }

  onReadStateChange(item) {
    console.log(this, item);
    return null;
  }

  renderItem(data) {
    console.log(this.props.loading);
    return (
      <BookItem
        key={data.isbn}
        data={data}
        onReadChange={this.onReadStateChange.bind(this)}
        onRemove={this.onRemoveItem.bind(this)}
      />
    );
  }

  render() {
    return (
      <Grid>
        {this.props.books.map(data => this.renderItem(data))}
      </Grid>
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
