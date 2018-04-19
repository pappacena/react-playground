import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';


export default class BookEditor extends React.Component {
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
      <div className="">
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
};
