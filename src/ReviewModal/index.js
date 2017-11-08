import React from 'react';
import { Form, Text, Radio, RadioGroup } from 'react-form';

const errorValidator = (values) => {
  return {
    title: !values.title ||
           !values.title.match(/title/) ? "Input must contain 'Hello World'" : null,
  };
};

const warningValidator = (values) => {
  return {
    hello: !values.hello ||
           !values.hello.match(/^Hello World$/) ? "Input should equal 'Hello World'" : null,
  };
};

const successValidator = (values) => {
  return {
    hello: values.hello &&
           values.hello.match(/Hello World/) ? "Thanks for entering 'Hello World'!" : null,
  };
};

const submitHandler = (values) => {

};

const ReviewModal = (props) => {
  return [
    <span key="currentHome">{JSON.stringify(props.currentHome)}</span>,
    <Form
      key="reviewForm"
      validateWarning={warningValidator}
      validateSuccess={successValidator}
      validateError={errorValidator}
      /* onSubmit={() => submitHandler(values)} */
    >
      { formApi => (
        <form onSubmit={formApi.submitForm} id="review-form" className="">
          <label htmlFor="Title">Title</label>
          <Text placeholder="title" field="title" id="title" />
          <RadioGroup field="rating">
            { group => (
              <div>
                <label htmlFor="1" className="">1</label>
                <Radio group={group} value="1" id="1" className="" />
                <label htmlFor="2" className="">2</label>
                <Radio group={group} value="2" id="2" className="" />
                <label htmlFor="3" className="">3</label>
                <Radio group={group} value="3" id="3" className="" />
                <label htmlFor="4" className="">4</label>
                <Radio group={group} value="4" id="4" className="" />
                <label htmlFor="5" className="">5</label>
                <Radio group={group} value="5" id="5" className="" />
              </div>
            )}
          </RadioGroup>
          <label htmlFor="description">Description</label>
          <Text field="description" id="description" />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
    </Form>,
  ];
};

export default ReviewModal;
