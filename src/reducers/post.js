import {
  GET_POSTS,
  GET_OWN_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_POST,
  GET_BUDDY_POSTS,
} from '../actions/types';

const initialState = {
  posts: [],
  oposts: [],
  bposts: [],
  post: null,
  loading: true,
  error: {},
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_OWN_POSTS:
      return {
        ...state,
        oposts: payload,
        loading: false,
      };
    case GET_BUDDY_POSTS:
      return {
        ...state,
        bposts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        oposts: [payload, ...state.oposts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        post: { ...state.post, likes: payload.likes },
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        oposts: state.oposts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        bposts: state.bposts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload.comments },
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.comments,
              }
            : post
        ),
        oposts: state.oposts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.comments,
              }
            : post
        ),
        bposts: state.bposts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.comments,
              }
            : post
        ),
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        posts: null,
        oposts: null,
        post: null,
        loading: false,
      };
    default:
      return state;
  }
}
