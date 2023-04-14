import { HIDE_LOADER, SHOW_LOADER } from '../actions/types';

const initialState = {
  loading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SHOW_LOADER:
      return { ...state, loading: true };

    case HIDE_LOADER:
      return { ...state, loading: false };

    default:
      return state;
  }
}
