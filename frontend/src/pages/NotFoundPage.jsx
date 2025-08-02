import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (<>
    <head>
      <title>Not found</title>
    </head>
    <body>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" style={{ color: '#646cff', textDecoration: 'none' }}>
          Go back to Home
        </Link>
      </div>
    </body>
  </>);
}

export default NotFoundPage;
