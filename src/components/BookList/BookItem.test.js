import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
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
  const wrapper = shallow(<BookItem data={testItem} onRemove={console.log} onReadChange={console.log} />);
  /* const form = <form />;
  expect(wrapper.find('form')).to.have.length(1);
  expect(wrapper.find('input[placeholder="ISBN"]')).to.have.length(1);
  expect(wrapper.find('button')).to.have.length(1); */
});


/* it('form click handler works', () => {
  const onAddBook = sinon.spy();
  const wrapper = mount(<BookEditor onAddBook={onAddBook} />);

  wrapper.find('button').simulate('click');
  expect(onAddBook.calledOnce).to.equal(true);
}); */
