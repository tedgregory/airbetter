import { createActionGroup, props } from '@ngrx/store';
import { SearchState } from './search.state';

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    'Set Fly From': props<{
      flyFrom: SearchState['flyFrom'];
    }>(),
    'Set Fly To': props<{
      flyTo: SearchState['flyTo'];
    }>(),
    'Set Date Leave': props<{
      dateLeave: SearchState['dateLeave'];
    }>(),
    'Set Date Return': props<{
      dateReturn: SearchState['dateReturn'];
    }>(),
    'Set Currency': props<{
      currency: SearchState['currency'];
    }>(),
    'Set Date Format': props<{
      dateFormat: SearchState['dateFormat'];
    }>(),
  },
});
