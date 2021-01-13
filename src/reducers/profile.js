import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  BUDDY_REQUEST_SENT,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  groupprofiles: [],
  loading: true,
  error: {},
  prompt: null,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    // case GET_GROUP_PROFILE:
    //   return {
    //     ...state,
    //     groupprofile: payload,
    //     loading: false,
    //   };
    case BUDDY_REQUEST_SENT:
      return {
        ...state,
        prompt: action.payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
