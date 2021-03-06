import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Col, Row, Alert } from 'react-bootstrap';
import BookItem from './BookItem';
import LoadingMask from '../LoadingMask';
import { refreshBooks, changeReadState, removeBook } from '../../actions';


class BookList extends React.Component {
  componentDidMount() {
    this.props.refreshBooks();
  }
  onRemoveItem(item) {
    this.props.removeBook(item.isbn);
    return null;
  }

  onReadStateChange(item, status) {
    this.props.changeReadState(item.isbn, status);
    return null;
  }

  renderItem(data) {
    return (
      <BookItem
        key={data.isbn}
        data={data}
        onReadChange={this.onReadStateChange.bind(this)}
        onRemove={this.onRemoveItem.bind(this)}
      />
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderEmptyMessage() {
    return (
      <Alert bsStyle="danger">
        <p>No book added yet.</p>
        <p>
          Add it using the form above
          <span role="img" aria-label="pointing up">👆</span>
        </p>
        <p>
          Some ISBN for you to test:
          9780822005421<br />
          0375709177<br />
          9780425168226<br />
          0671000306<br />
        </p>
      </Alert>
    );
  }

  render() {
    if (!this.props.books.length) {
      return this.renderEmptyMessage();
    }

    return (
      <div className="bookList">
        <Grid>
          {this.props.loading && <LoadingMask />}
          <Row>
            <Col sm={1}><h4>Read?</h4></Col>
            <Col sm={2} />
            <Col sm={9}><h4>Book details</h4></Col>
          </Row>
          <hr />

          {this.props.books.map(data => this.renderItem(data))}
        </Grid>
      </div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  refreshBooks: PropTypes.func.isRequired,
  changeReadState: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  books: state.books.books,
  loading: state.books.loading,
});

export default connect(mapStateToProps, {
  refreshBooks,
  changeReadState,
  removeBook,
})(BookList);
