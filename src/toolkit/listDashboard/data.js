import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";

const listDashboardDataAdapter = createEntityAdapter();

export const listDataSlice = createSlice({
    name: 'listDashboard',
    initialState: listDashboardDataAdapter.getInitialState({
        list: [], //список дашбордов
        card: {}, //дашборд, при нажатии на который переходим в карточки
        loader: false
    }),
    reducers: {
        setList: (state, { payload }) => {
            state.list = [ ...state.list, payload];
        },
        setCard: (state, {payload}) => {
            state.card = payload;
        }
    }
})

const { reducer, actions } = listDataSlice;

const stateSelector = state => state.listDashboard;

export const listSelector = createSelector(stateSelector, state => state.list);
export const cardSelector = createSelector(stateSelector, state => state.card);


export const { setList, setCard } = actions

export default reducer;