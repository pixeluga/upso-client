import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { Toast } from '../../components'

import { register } from '../../actions/auth';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

class Register extends Component {
  static propTypes = {
    auth:  PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
  }

  state = {
    name:  '',
    email:  '',
    password: '',
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = (ev) => this.setState({ [ev.target.name]: ev.target.value })

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.register(this.state, this.props.history);
  }

  render () {
    return (
      <>
        <Toast />
        <div className = 'card mt-4 mx-auto width-20'>
          <article className = 'card-body'>
            <h4 className = 'card-title text-center mb-4 mt-1'>Registration</h4>
            <form onSubmit = { this.onSubmit }>
              <div className = 'form-group'>
                <input
                  required
                  autoComplete = 'username'
                  className = 'form-control'
                  name = 'name'
                  pattern = '.{3,20}'
                  placeholder = 'Name'
                  type = 'text'
                  value = { this.state.name }
                  onChange = { this.onChange }
                />
              </div>

              <div className = 'form-group'>
                <input
                  required
                  autoComplete = 'email'
                  className = 'form-control'
                  name = 'email'
                  pattern = '.{5,30}'
                  placeholder = 'Email'
                  type = 'email'
                  value = { this.state.email }
                  onChange = { this.onChange }
                />
              </div>

              <div className = 'form-group'>
                <input
                  autoComplete = 'current-password'
                  className = 'form-control'
                  name = 'password'
                  pattern = '.{6,30}'
                  placeholder = 'Password'
                  type = 'password'
                  value = { this.state.password }
                  onChange = { this.onChange }
                />
              </div>

              <div className = 'form-group'>
                <button className = 'btn btn-info btn-block' type = 'submit'>Sign Up</button>
              </div>
            </form>
          </article>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, { register })(Register);
