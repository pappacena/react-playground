import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';


class BookItem extends React.Component {
  onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.data);
    }
  }

  onReadChange(status) {
    if (this.props.onReadChange) {
      this.props.onReadChange(this.props.data, status);
    }
  }

  render() {
    const {
      isbn, authors, title, img, read,
    } = this.props.data;

    return (
      <div>
        <Row>
          <Col sm={1}>
            <p>Read?</p>
            <input type="checkbox" checked={read} onChange={this.onReadChange.bind(this)} />
          </Col>
          <Col sm={2}>
            <img alt="Cover for {title}" src={img} />
          </Col>
          <Col sm={6}>
            <Row>
              <Col><h1>{title}</h1></Col>
            </Row>
            <Row>
              <Col>ISBN: {isbn}</Col>
              <Col>Authors: {authors}</Col>
            </Row>
            <Row>
              <Button onClick={this.onRemove.bind(this)}>Remove</Button>
            </Row>
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}

BookItem.propTypes = {
  data: PropTypes.shape({
    isbn: PropTypes.string,
    authors: PropTypes.array,
    title: PropTypes.string,
    img: PropTypes.string,
    read: PropTypes.bool,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onReadChange: PropTypes.func.isRequired,
};

export default BookItem;
