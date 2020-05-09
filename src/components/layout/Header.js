import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'

const mapStateToProps = (state) => ({ auth: state.auth });

class Header extends Component {
    onLogout = (e) => {
        e.preventDefault()
        this.props.logout()
    }

    render () {
        const { isAuthenticated, user } = this.props.auth;

        let links = '';
        
        if (isAuthenticated) {
            links = (
                <>  
                    <Link className = 'nav-item nav-link' to = '/add-post'>
                        <i className = 'fas fa-plus'></i> Add Post
                    </Link>
                    <span className = 'nav-item nav-link mr-3'>
                        <i className = 'far fa-user'></i> {user.name}
                    </span>
                    <button 
                        className = 'btn btn-success'
                        onClick = { this.onLogout } >
                        Logout <i className = 'fas fa-sign-out-alt'></i>
                    </button>
                </>
        )} else {
            links = (
                <>
                    <Link className = 'nav-item nav-link' to = '/login'>
                        <i className = 'fas fa-sign-in-alt'></i> Login
                    </Link>
                    <Link className = 'nav-item nav-link' to = '/signup'>
                        <i className = 'fas fa-clipboard-check'></i> Registration
                    </Link>
                </>
            )
        }

        return (
            <nav className = 'navbar navbar-expand-md navbar-dark bg-dark'>
                <Link className = 'navbar-brand' to = '/'>
                    <img alt = 'logo' src = { this.props.logo } width = '24px' /> upso
                </Link>        
                
                <div className = 'navbar-nav ml-md-auto'>  

                    { links }

                    <form className = 'ml-3 form-inline'>
                        <input aria-label = 'Search' className = 'form-control mr-sm-2' placeholder = 'Search' type = 'search' />
                        <button className = 'btn btn-outline-success my-2 my-sm-0' type = 'submit'>Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default connect(mapStateToProps, { logout })(Header)
