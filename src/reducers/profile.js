import {
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  BUDDY_REQUEST_SENT,
  BUDDY_REQUEST_DECLINE,
  GET_BUDDIES,
  GET_BUDDIES_ERROR,
  GET_BUDDY_REQUESTS,
  GET_NOTED_POST,
  GET_NOTED_POST_ERROR,
  GET_NOTED_PEOPLE,
  GET_NOTED_PEOPLE_ERROR,
  PROJECT_INVITE_DECLINED,
  PROJECT_INVITE_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profile1: null,
  profiles: [],
  buddies: [],
  requests: [],
  postnote: [],
  peoplenote: [],
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
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profile1: payload,
        loading: false,
      };
    case BUDDY_REQUEST_SENT:
      return {
        ...state,
        prompt: action.payload,
      };
    case BUDDY_REQUEST_DECLINE:
      return {
        ...state,
        prompt: action.payload,
      };
    case GET_BUDDY_REQUESTS:
      return {
        ...state,
        requests: payload,
        loading: false,
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
    case GET_BUDDIES:
      return {
        ...state,
        buddies: payload,
        loading: false,
      };
    case GET_NOTED_POST:
      return {
        ...state,
        postnote: payload,
        loading: false,
      };
    case GET_NOTED_PEOPLE:
      return {
        ...state,
        peoplenote: payload,
        loading: false,
      };
    case GET_BUDDIES_ERROR:
      return {
        ...state,
        error: payload,
        profile: null,
        loading: false,
      };
    case GET_NOTED_POST_ERROR:
    case GET_NOTED_PEOPLE_ERROR:
      return {
        ...state,
        error: payload,
        // profile: null,
        loading: false,
      };
    case PROJECT_INVITE_DECLINED:
      return {
        ...state,
        prompt: action.payload,
      };
    case PROJECT_INVITE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
