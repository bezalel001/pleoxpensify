import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import CommentForm from '../index';
import configureStore from '../../../state/store';

describe('CommentForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={configureStore()}>
        <CommentForm />
      </Provider>
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should render without errors', () => {
    expect(wrapper.find('.comment')).toHaveLength(1);
  });
  it('should have a `textarea` element', () => {
    expect(wrapper.containsMatchingElement(<textarea />));
  });

  it('should have a submit `button` element', () => {
    expect(wrapper.find('button.comment__form--btn-submit').length).toBe(1);
  });
  it('should jave a reset/cancel `button` element', () => {
    expect(wrapper.find('button.comment__form--btn-cancel').length).toBe(1);
  });
  it('should updates `textarea` input value when user types in', () => {
    wrapper.find('textarea').simulate('change', {
      target: { value: 'Train tickets' }
    });
    expect(wrapper.find('textarea').prop('value')).toEqual('Train tickets');
  });

  it('should clear `textarea` when the cancel button is clicked', () => {
    wrapper.find('button.comment__form--btn-cancel').simulate('click');
    expect(wrapper.find('textarea').prop('value')).toBe('');
  });

  describe('on form submit', () => {
    const onSubmitSpy = jest.fn();
    beforeEach(() => {
      wrapper = mount(
        <Provider store={configureStore()}>
          <CommentForm handleSubmit={onSubmitSpy} />
        </Provider>
      );
    });
    it('should call handleSubmit prop for valid form submission', () => {
      wrapper.find('form').simulate('submit');
      expect(onSubmitSpy).toHaveBeenCalled();
    });
  });
});
