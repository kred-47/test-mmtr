import { createTransform, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';

import listReducer from '../toolkit/listDashboard/data';
import cardReducer from '../toolkit/cardDashboard/data';


const dateTransform = createTransform(
  inboundState => {
    return JSON.stringify(inboundState, (key, value) => {
      return value instanceof Date ? value.toISOString() : value;
    });
  },
  outboundState => {
    return JSON.parse(outboundState, (key, value) => {
      return typeof value === 'string' &&
        value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
        ? new Date(value)
        : value;
    });
  },
  { whitelist: ['listDashboard', 'cardDashboard', 'treeFilters', 'chartSettings', 'inputSettings'] }
);

const reducers = combineReducers({
  listDashboard: listReducer,
  cardDashboard: cardReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['listDashboard', 'cardDashboard'],
  transforms: [dateTransform],
};

export const persistedReducer = persistReducer(persistConfig, reducers);
