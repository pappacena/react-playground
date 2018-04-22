import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBook } from '../../actions';
import './styles.scss';


// exporting non-default for test purpose
export class BookEditor extends React.Component {
  constructor() {
    super();
    this.inputField = null;
  }

  onButtonClick(e) {
    this.props.onAddBook(this.inputField.value.replace(/\D/g, ''));
    e.preventDefault();
  }

  renderError() {
    if (!this.props.errorMessage) {
      return null;
    }
    return (<Alert bsStyle="danger">{this.props.errorMessage}</Alert>);
  }

  render() {
    return (
      <div className="bookEditor">
        {this.renderError()}
        <form>
          <input ref={e => this.inputField = e} placeholder="ISBN" />
          <button disabled={this.props.loading} onClick={this.onButtonClick.bind(this)}>Add</button>
        </form>
      </div>
    );
  }
}

BookEditor.defaultProps = {
  errorMessage: null,
  loading: false,
};

BookEditor.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  books: state.books.books,
  loading: state.books.loading,
  errorMessage: state.books.errorMessage,
});

export default connect(mapStateToProps, {
  onAddBook: addBook,
})(BookEditor);
