import React from 'react';
import { Alert, Button, Panel, FormControl, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBook } from '../../actions';
import './styles.scss';


// exporting non-default for test purpose
export class RawBookEditor extends React.Component {
  constructor() {
    super();
    this.inputField = null;
  }

  onButtonClick(e) {
    const isbn = this.inputField.value ? this.inputField.value.replace(/\D/g, '') : '';
    this.props.onAddBook(isbn);
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
      <Panel className="bookEditor">
        <Panel.Heading>
          <Panel.Title componentClass="h2">Add book</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {this.renderError()}
          <form>
            <FormGroup>
              <FormControl
                inputRef={e => this.inputField = e}
                placeholder="Type here the book's ISBN"
              />
              <Button
                disabled={this.props.loading}
                onClick={this.onButtonClick.bind(this)}
                bsStyle="primary"
              >
                Add book
              </Button>
            </FormGroup>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

RawBookEditor.defaultProps = {
  errorMessage: null,
  loading: false,
};

RawBookEditor.propTypes = {
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
})(RawBookEditor);
