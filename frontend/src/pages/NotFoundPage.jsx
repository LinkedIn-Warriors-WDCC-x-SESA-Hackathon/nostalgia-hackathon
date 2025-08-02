import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout  from '../components/PageLayout';

const NotFoundPage = () => {
  return (<>
    <PageLayout title="Page not found">
      <p>404 not found</p>
    </PageLayout>
  </>);
}

export default NotFoundPage;
