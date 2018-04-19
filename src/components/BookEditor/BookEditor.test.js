import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import BookEditor from './BookEditor';


it('renders form and its elements', () => {
  const wrapper = shallow(<BookEditor onAddBook={console.log} />);
  const form = <form />;
  expect(wrapper.find('form')).to.have.length(1);
  expect(wrapper.find('input[placeholder="ISBN"]')).to.have.length(1);
  expect(wrapper.find('button')).to.have.length(1);
});


it('form click handler works', () => {
  const onAddBook = sinon.spy();
  const wrapper = shallow(<BookEditor onAddBook={onAddBook} />);

  wrapper.find('button').simulate('click');
  expect(onAddBook.calledOnce).to.equal(true);
});
