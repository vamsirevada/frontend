import {
  GET_CHATS,
} from "../actions/types";

const initialState = {
  conversations: [],
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    default:
      return state;
  }
}
