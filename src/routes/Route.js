import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultLayout from '~/pages/_layouts/default';
import FormLayout from '~/pages/_layouts/form';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPublic,
  isForm,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && !isPublic) {
    return <Redirect to="/" />;
  }

  if (signed && isPublic) {
    return <Redirect to="/student-list" />;
  }

  const Layout = isForm ? FormLayout : DefaultLayout;

  return (
    <Route
      {...rest}
      render={props =>
        signed ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

RouteWrapper.propTypes = {
  isPublic: PropTypes.bool,
  isForm: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPublic: false,
  isForm: false,
};
