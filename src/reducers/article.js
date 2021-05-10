import {
  ADD_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLE,
  FILTER_ARTICLES,
  CLEAR_FILTER,
  ARTICLE_ERROR,
  CLEAR_ARTICLES,
} from '../actions/types';

const initialState = {
  articles: [],
  article: {},
  filtered: null,
  error: null,
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        // loading: false,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        // loading: false,
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload],
        // loading: false,
      };
    case FILTER_ARTICLES:
      return {
        ...state,
        filtered: state.articles.filter((article) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return article.title.match(regex) || article.body.match(regex);
        }),
      };
    case CLEAR_ARTICLES:
      return {
        ...state,
        article: {},
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
