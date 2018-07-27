/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectMovies,
  makeSelectPages,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import H3 from 'components/H3';
import Button from 'components/Button';
import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadMovies } from '../App/actions';
import { changeUsername, changeTitle } from './actions';
import { makeSelectTitle } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { onSubmitForm, title } = this.props;

    if (!title || title.length < 2) {
      alert('Please input at least >2 characters before Search! ');

      return;
    }
    if (onSubmitForm) {
      onSubmitForm();
    }
  }

  render() {
    const { loading, error, movies, pages, onLoadMovies } = this.props;
    const reposListProps = {
      loading,
      error,
      movies,
      pages,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H3>
              <FormattedMessage {...messages.trymeHeader} />
            </H3>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="title">
                <FormattedMessage {...messages.trymeMessage} />
                <Input
                  id="title"
                  type="text"
                  placeholder="input something to search..."
                  value={this.props.title}
                  onChange={this.props.onChangeTitle}
                />
              </label>
              <Button onClick={this.handleSubmit}>Search Now!</Button>
            </Form>
            <ReposList {...reposListProps} loadMovies={onLoadMovies} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  movies: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  pages: PropTypes.number,
  onSubmitForm: PropTypes.func,
  title: PropTypes.string,
  onChangeTitle: PropTypes.func,
  onLoadMovies: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadMovies(0));
    },
    onChangeTitle: evt => dispatch(changeTitle(evt.target.value)),
    onLoadMovies: data => dispatch(loadMovies(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  title: makeSelectTitle(),
  movies: makeSelectMovies(),
  pages: makeSelectPages(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
