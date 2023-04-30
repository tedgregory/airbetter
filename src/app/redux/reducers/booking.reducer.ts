import { createReducer, on } from '@ngrx/store';
// import { IVideosState } from '../state.models';

// const defaultState: IVideosState = {
//   videos: [],
//   customVideos: [],
//   isLoading: false,
//   errors: [],
//   search: '',
// };

// export const videosReducer = createReducer<IVideosState>(
//   defaultState,
//   on(BookingActions.getVideos, (state): IVideosState => {
//     return { ...state, isLoading: true };
//   }),
//   on(VideosApiActions.getOneVideo, (state): IVideosState => {
//     return { ...state, isLoading: true };
//   }),
//   on(VideosActions.getVideosSuccess, (state, { items }): IVideosState => {
//     return {
//       ...state,
//       videos: items,
//       isLoading: false,
//     };
//   }),
//   on(VideosActions.setSearch, (state, { q }): IVideosState => {
//     return { ...state, search: q };
//   }),
//   on(VideosActions.getOneVideoSuccess, (state, { item }): IVideosState => {
//     if (!state.videos.length)
//       return {
//         ...state,
//         videos: [item],
//         isLoading: false,
//       };
//     if (state.videos.find((vid) => vid.id === item.id))
//       return { ...state, isLoading: false };
//     return {
//       ...state,
//       videos: [...state.videos, item],
//       isLoading: false,
//     };
//   }),
//   on(VideosActions.setVideosError, (state, { error }): IVideosState => {
//     return {
//       ...state,
//       errors: [...state.errors, error],
//     };
//   }),

//   on(CustomVideosActions.addVideo, (state, { item }): IVideosState => {
//     return {
//       ...state,
//       customVideos: [...state.customVideos, item],
//     };
//   }),
//   on(ErrorsActions.addError, (state, { e }): IVideosState => {
//     return {
//       ...state,
//       errors: [...state.errors, e],
//       isLoading: false,
//     };
//   }),
//   on(ErrorsActions.clearAll, (state): IVideosState => {
//     return {
//       ...state,
//       errors: defaultState.errors,
//     };
//   })
// );
