import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const cardDashboardDataAdapter = createEntityAdapter();

export const cardDataSlice = createSlice({
    name: 'cardDashboard',
    initialState: cardDashboardDataAdapter.getInitialState({
        columns: [], //массив карточек
        loader: false
    }),
    reducers: {
        addColumns: (state, { payload }) => {
            state.columns = [ ...state.columns, payload];
        },
        updateColumns: (state, { payload }) => {
            state.columns = payload;
        },
        clearColumns: state => {
            state.columns = [];
        }
    }
});

const { reducer, actions } = cardDataSlice;

const stateSelector = state => state.cardDashboard;

export const columnsSelector = createSelector(stateSelector, state => state.columns);

export const { addColumns, updateColumns, clearColumns } = actions;

export default reducer;