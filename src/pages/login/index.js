import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import { Toast } from '../../components'

import { login } from '../../actions/auth';

const mapStateToProps = (state) => ({ auth: state.auth });

class Login extends Component {
  static propTypes = {
    auth:  PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  }

  state = {
    email:  '',
    password: '',
    redirect: false,
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  }

  render () {
    return (
      <>
        <Toast />
        <div className = 'card mt-4 mx-auto width-20'>
          <article className = 'card-body'>
            <h4 className = 'card-title text-center mb-4 mt-1'>Log In</h4>
            <form onSubmit = { this.onSubmit }>
              <div className = 'form-group'>
                <input
                  required
                  autoComplete = 'current-name'
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
                  required
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
                <button className = 'btn btn-info btn-block' type = 'submit'>Login</button>
              </div>
            </form>
          </article>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, { login })(Login);
