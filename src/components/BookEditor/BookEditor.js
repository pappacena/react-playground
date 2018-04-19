import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';


export default class BookEditor extends React.Component {
  constructor() {
    super();
    this.inputField = null;
    this.addButton = null;
  }

  render() {
    return (
      <div className="">
        <form>
          <input placeholder="ISBN" />
          <button onClick={this.props.onAddBook}>Add</button>
        </form>
      </div>
    );
  }
}

BookEditor.propTypes = {
  onAddBook: PropTypes.func.isRequired,
};
