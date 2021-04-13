import {
  GET_PROJECTS,
  GET_PROJECT,
  PROJECT_INVITE_SENT,
  PROJECT_INVITE_CANCEL,
  CREATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
  UPDATE_PROJECT,
  GET_PROJECT_BUDGET,
  DELETE_PROJECT_BUDGET,
} from '../actions/types';

const initialState = {
  projects: [],
  isCreated: null,
  singleproject: null,
  budget: [],
  error: {},
  loading: true,
  prompt: null,
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        isCreated: false,
        loading: false,
      };
    case GET_PROJECT:
    case UPDATE_PROJECT:
      return {
        ...state,
        isCreated: false,
        singleproject: payload,
        loading: false,
      };
    case GET_PROJECT_BUDGET:
      return {
        ...state,
        budget: payload,
        loading: false,
      };
    case DELETE_PROJECT_BUDGET:
      return {
        ...state,
        prompt: action.payload,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
        isCreated: true,
      };
    case PROJECT_INVITE_SENT:
      return {
        ...state,
        prompt: action.payload,
      };
    case PROJECT_INVITE_CANCEL:
      return {
        ...state,
        prompt: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== payload),
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
