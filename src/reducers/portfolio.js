import { GET_DATA } from '../actions/types';

const initialState = {
  portfolio: [],
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DATA:
      return {
        ...state,
        portfolio: payload,
      };
    default:
      return state;
  }
}
