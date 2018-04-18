import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import BookEditor from './BookEditor';

it('renders form and its elements', () => {
  const wrapper = shallow(<BookEditor />);
  const form = <form />;
  expect(wrapper.find('form')).to.have.length(1);
  expect(wrapper.find('input[placeholder="ISBN"]')).to.have.length(1);
  expect(wrapper.find('button')).to.have.length(1);
});
