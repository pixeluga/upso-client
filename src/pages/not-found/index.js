import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className = 'error-template'>
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <div className = 'error-details'>
            Sorry, an error has occured, Requested page not found!
        </div>
        <div className = 'error-actions'>
            <Link className = 'btn btn-info btn-lg' to = '/'><i className = 'fas fa-igloo' /> Take Me Home </Link>
            <Link className = 'btn btn-outline-info btn-lg' to = '/support'><i className = 'far fa-envelope' /> Contact Support </Link>
        </div>
    </div>
);
