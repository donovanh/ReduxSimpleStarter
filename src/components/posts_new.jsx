import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { label, placeholder, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
          placeholder={placeholder}
        />
        <p className="text-help">{touched ? error : ''}</p>
      </div>
    ); 
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });

  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          placeholder="Title of blog post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          placeholder="Tags for the post"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          placeholder="Post content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter a category";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);

