import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import jwtDecode from 'jwt-decode';

import './App.css';
import logo from './logo.svg';

import store from './reduxCore';

import { setCurrentUser, logout } from './actions/auth';

// Components
import {
  Header,
  Footer,
} from './components';

// Pages
import {
  NotFound,
  MainPage,
  Login,
  Register,
  Support,
  PostPage,
  EditPost,
} from './pages';

import setAuthToken from './utils/setAuthToken';

if (localStorage.accessToken) {
  const { accessToken } = localStorage;

  setAuthToken(accessToken);
  const decoded = jwtDecode(accessToken);

  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.localStorage.href = '/';
  }
}

function App () {
  return (
    <Provider store = { store }>
      <BrowserRouter>
        <>
          <main className = 'flex-shrink-0'>
            <Header logo = { logo } />
            
            <div className = 'container'>
              <Route exact path = '/' component = { MainPage } />
              <Route path = '/login' component = { Login } />
              <Route path = '/signup' component = { Register } />
              <Route path = '/add-post' component = { EditPost } />
              <Route exact path = '/posts/:id' component = { PostPage } />
              <Route path = '/edit/:id/' component = { EditPost } />

              <Route path = '/support' component = { Support } />
              <Route path = '/404' component = { NotFound } />
            </div>
          </main>
          <Footer />
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
