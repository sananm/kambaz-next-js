import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './Courses/reducer';
import modulesReducer from './Courses/[cid]/Modules/reducer';
import accountReducer from './Account/reducer';
import assignmentsReducer from './Courses/[cid]/Assignments/reducer';

// Try to load persisted auth (currentUser) from localStorage so user stays signed in after reload
const loadPersistedState = () => {
  try {
    if (typeof window === 'undefined') return undefined;
    const raw = localStorage.getItem('kambaz_currentUser');
    if (!raw) return undefined;
    const currentUser = JSON.parse(raw);
    return { accountReducer: { currentUser } };
  } catch (err) {
    console.error('Failed to load persisted state', err);
    return undefined;
  }
};

const preloadedState = loadPersistedState();

const store = configureStore({
  reducer: { coursesReducer, modulesReducer, accountReducer, assignmentsReducer },
  preloadedState,
});

// Persist currentUser to localStorage on changes
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const state = store.getState();
      const currentUser = state.accountReducer?.currentUser ?? null;
      if (currentUser) {
        localStorage.setItem('kambaz_currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('kambaz_currentUser');
      }
    } catch (err) {
      console.error('Failed to persist currentUser', err);
    }
  });
}

export default store;
