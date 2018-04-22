import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { RawBookEditor } from './BookEditor';
import { store } from '../../App';


it('renders form and its elements', () => {
  const wrapper = mount(
    <Provider store={store}>
      <RawBookEditor onAddBook={console.log} />
    </Provider>,
  );

  const form = <form />;
  expect(wrapper.find('form')).to.have.length(1);
  expect(wrapper.find('input[placeholder="Type here the book\'s ISBN"]')).to.have.length(1);
  expect(wrapper.find('button')).to.have.length(1);
});


it('form click handler works', () => {
  const onAddBook = sinon.spy();
  const wrapper = mount(
    <Provider store={store}>
      <RawBookEditor onAddBook={onAddBook} />
    </Provider>,
  );
  wrapper.find('BookEditor').props.onAddBook = onAddBook;

  wrapper.find('button').simulate('click');
  expect(onAddBook.calledOnce).to.equal(true);
});
