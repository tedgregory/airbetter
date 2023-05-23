import { createFeature, createReducer, on } from '@ngrx/store';
import { SearchState } from './search.state';
import { SearchActions } from './search.actions';
import { ECurrencies, EDateFormats } from '../common/common.models';

const defaultState: SearchState = {
  flyFrom: { iata: 'DUS', title: 'Dusseldorf' },
  flyTo: { iata: 'PRG', title: 'Warsaw Modlin' },
  dateLeave: '2023-05-28T23:37:00.000Z',
  dateReturn: '2023-06-21T23:37:00.000Z',
  isReturn: false,
  currency: ECurrencies.RUB,
  dateFormat: EDateFormats.DMY,
  error: null,
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
    on(
      SearchActions.setDatesRange,
      (state, { dateLeave, dateReturn }): SearchState => {
        return { ...state, dateReturn, dateLeave };
      }
    ),
    on(SearchActions.setDateFormat, (state, { dateFormat }): SearchState => {
      return { ...state, dateFormat };
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
    on(SearchActions.setError, (state, { error }): SearchState => {
      return { ...state, error };
    }),
    on(SearchActions.setFlightType, (state, { isReturn }): SearchState => {
      return { ...state, isReturn };
    }),
    on(
      SearchActions.setFlightSearchData,
      (
        state,
        { data: { dateLeave, dateReturn, isReturn, flyFrom, flyTo } }
      ): SearchState => {
        return {
          ...state,
          isReturn,
          dateLeave,
          dateReturn,
          flyFrom,
          flyTo,
        };
      }
    )
  ),
});
