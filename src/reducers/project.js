import {
  GET_PROJECTS,
  GET_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from '../actions/types';

const initialState = {
  projects: [],
  isCreated: null,
  singleproject: null,
  error: {},
  loading: true,
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
      return {
        ...state,
        isCreated: false,
        singleproject: payload,
        loading: false,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
        isCreated: true,
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
