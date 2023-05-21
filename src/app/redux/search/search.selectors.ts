import { createSelector } from '@ngrx/store';
import { searchFeature } from './search.reducer';
import { selectPassengersForSearch } from '../passengers/passengers.selectors';

// To remove
const selectSearchBasic = createSelector(
  searchFeature.selectSearchState,
  selectPassengersForSearch,
  (search, passengers) => ({ ...search, passengersCount: passengers })
);

const CustomSearchSelectors = {
  selectSearchBasic,
};

export default CustomSearchSelectors;
