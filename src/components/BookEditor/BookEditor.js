import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingMask from '../LoadingMask';
import './styles.scss';


class BookEditor extends React.Component {
  constructor() {
    super();
    this.inputField = null;
  }

  onButtonClick(e) {
    this.props.onAddBook(this.inputField.value);
    e.preventDefault();
  }

  render() {
    return (
      <div className="bookEditor">
        {this.props.loading && <LoadingMask />}
        <form>
          <input ref={e => this.inputField = e} placeholder="ISBN" />
          <button onClick={this.onButtonClick.bind(this)}>Add</button>
        </form>
      </div>
    );
  }
}

BookEditor.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  books: state.books.books,
  loading: state.books.loading,
});

export default connect(mapStateToProps, null)(BookEditor);
