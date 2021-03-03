import {
  GET_NOTICES,
  GET_NOTICE,
  CREATE_NOTICE,
  DELETE_NOTICE,
  NOTICE_ERROR,
} from '../actions/types';

const initialState = {
  notices: [],
  notice: null,
  error: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTICES:
      return {
        ...state,
        notices: payload,
        loading: false,
      };
    case GET_NOTICE:
      return {
        ...state,
        notice: payload,
        loading: false,
      };
    case CREATE_NOTICE:
      return {
        ...state,
        notices: [payload, ...state.notices],
      };
    case DELETE_NOTICE:
      return {
        ...state,
        notices: state.notices.filter((notice) => notice._id !== payload),
      };
    case NOTICE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
