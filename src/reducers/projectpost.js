import {
  ADD_PROJECT_POST,
  PROJECT_POST_ERROR,
  GET_PROJECT_POSTS,
  GET_MEMBER_POSTS,
  GET_PROJECT_POST,
  DELETE_PROJECT_POST,
  CLEAR_PROJECT_POST,
  UPDATE_PROJECT_LIKES,
  ADD_PROJECT_COMMENT,
  REMOVE_PROJECT_COMMENT,
} from '../actions/types';

const initialState = {
  projectposts: [],
  oprojectposts: [],
  projectpost: null,
  loading: true,
  error: {},
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT_POSTS:
      return {
        ...state,
        projectposts: payload,
        loading: false,
      };
    case GET_MEMBER_POSTS:
      return {
        ...state,
        oprojectposts: payload,
        loading: false,
      };
    case GET_PROJECT_POST:
      return {
        ...state,
        projectpost: payload,
        loading: false,
      };
    case ADD_PROJECT_POST:
      return {
        ...state,
        projectposts: [payload, ...state.projectposts],
        oprojectposts: [payload, ...state.oprojectposts],
        loading: false,
      };
    case DELETE_PROJECT_POST:
      return {
        ...state,
        projectposts: state.projectposts.filter((post) => post._id !== payload),
        loading: false,
      };
    case PROJECT_POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_PROJECT_LIKES:
      return {
        ...state,
        projectposts: state.projectposts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_PROJECT_COMMENT:
      return {
        ...state,
        projectpost: { comments: payload, ...state.projectpost },
        // posts: state.posts.map((post) =>
        //   post._id === payload.id
        //     ? { ...post, comments: payload.comments }
        //     : post
        // ),
        loading: false,
      };
    case REMOVE_PROJECT_COMMENT:
      return {
        ...state,
        projectpost: {
          ...state.projectpost,
          comments: state.projectpost.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case CLEAR_PROJECT_POST:
      return {
        ...state,
        projectposts: null,
        oprojectposts: null,
        projectpost: null,
        loading: false,
      };
    default:
      return state;
  }
}
