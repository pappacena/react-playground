import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import BookItem from './BookItem';

const testItem = {
  isbn: '123',
  author: 'Saint Exupery',
  title: 'Little Prince',
  img: 'https://images-na.ssl-images-amazon.com/images/I/41lWvjvxhSL._SX314_BO1,204,203,200_.jpg',
  read: true,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const bookItem = <BookItem data={testItem} onRemove={console.log} onReadChange={console.log} />;
  ReactDOM.render(bookItem, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders form and its elements', () => {
  const wrapper = shallow(
    <BookItem data={testItem} onRemove={console.log} onReadChange={console.log} />,
  );
  expect(wrapper.find('h1')).to.have.length(1);
  expect(wrapper.find('input[type="checkbox"]')).to.have.length(1);
  expect(wrapper.find('Button[className="removeBook"]')).to.have.length(1);
});
