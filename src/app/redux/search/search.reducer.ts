import { createFeature, createReducer, on } from '@ngrx/store';
import { SearchState } from './search.state';
import { SearchActions } from './search.actions';
import { DateFormats } from '../common/common.models';

const defaultState: SearchState = {
  flyFrom: { iata: 'DUS', title: 'Dusseldorf' },
  flyTo: { iata: 'PRG', title: 'Warsaw Modlin' },
  dateLeave: '25/05/2023', // null
  dateReturn: '26/06/2023', // null
  isReturn: false,
  currency: 'EUR',
  dateFormat: DateFormats.DMY,
  step: {
    first: false,
    second: false,
    third: false,
  },
};

export const searchFeature = createFeature({
  name: 'search',
  reducer: createReducer<SearchState>(
    defaultState,
    on(SearchActions.setDateLeave, (state, { dateLeave }): SearchState => {
      return { ...state, dateLeave };
    }),
    on(SearchActions.setDateReturn, (state, { dateReturn }): SearchState => {
      return { ...state, dateReturn };
    }),
    on(SearchActions.setFlyFrom, (state, { flyFrom }): SearchState => {
      return { ...state, flyFrom };
    }),
    on(SearchActions.setFlyTo, (state, { flyTo }): SearchState => {
      return { ...state, flyTo };
    }),
    on(SearchActions.setCurrency, (state, { currency }): SearchState => {
      return { ...state, currency };
    }),
    on(SearchActions.setFlyTo, (state, { flyTo }): SearchState => {
      return { ...state, flyTo };
    }),
    on(SearchActions.setFlightType, (state, { isReturn }): SearchState => {
      return { ...state, isReturn };
    })
  ),
});
