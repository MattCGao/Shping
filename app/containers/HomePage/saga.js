/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_MOVIES } from 'containers/App/constants';
import {
  reposLoaded,
  repoLoadingError,
  moviesLoaded,
  moviesLoadingError,
} from 'containers/App/actions';

import request from 'utils/request';
import {
  makeSelectUsername,
  makeSelectTitle,
  makeSelectPage,
} from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Movies request/response handler
 */
export function* getMovies() {
  // Select title, page from store
  const title = yield select(makeSelectTitle());
  const page = (yield select(makeSelectPage())) || 1;

  if (!title) {
    return;
  }

  const requestURL = `http://www.omdbapi.com/?s=${title}&page=${page}&apikey=PlzBanMe`;

  try {
    // Call our request helper (see 'utils/request')
    const movies = yield call(request, requestURL);
    yield put(moviesLoaded(movies, title));
  } catch (err) {
    yield put(moviesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
  yield takeEvery(LOAD_MOVIES, getMovies);
}
