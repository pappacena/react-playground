import React from 'react';
import PropTypes from 'prop-types';


class BookItem extends React.Component {
  render() {
    const {
      id, authors, title, img, read,
    } = this.props.data;

    return (
      <div>
        {id}
        {authors}
        {title}
        {img}
        {read}
      </div>
    );
  }
}

BookItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    authors: PropTypes.array,
    title: PropTypes.string,
    img: PropTypes.string,
    read: PropTypes.bool,
  }).isRequired,
};

export default BookItem;
