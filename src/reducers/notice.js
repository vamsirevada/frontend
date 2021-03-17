import {
  GET_NOTICES,
  GET_NOTICE,
  CREATE_NOTICE,
  UPDATE_NOTICE,
  DELETE_NOTICE,
  NOTICE_ERROR,
  GET_APPLIED_MEMBERS,
  GET_SHORTLISTED_MEMBERS,
} from '../actions/types';

const initialState = {
  notices: [],
  notice: null,
  applied: [],
  shortlisted: [],
  error: {},
  loading: true,
};

//eslint-disable-next-line
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
    case UPDATE_NOTICE:
      return {
        ...state,
        notice: payload,
        loading: false,
      };
    case GET_APPLIED_MEMBERS:
      return {
        ...state,
        applied: payload,
        loading: false,
      };
    case GET_SHORTLISTED_MEMBERS:
      return {
        ...state,
        shortlisted: payload,
        loading: false,
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
