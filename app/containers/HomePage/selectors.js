/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

const makeSelectTitle = () =>
  createSelector(selectHome, homeState => homeState.get('title'));

const makeSelectPage = () =>
  createSelector(selectHome, homeState => homeState.get('page'));

export { selectHome, makeSelectUsername, makeSelectTitle, makeSelectPage };
