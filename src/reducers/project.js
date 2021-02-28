import {
  GET_PROJECTS,
  GET_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from '../actions/types';

const initialState = {
  projects: [],
  project: null,
  error: {},
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
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
