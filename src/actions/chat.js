import axios from "axios";
import { GET_CHATS, AFTER_POST_MESSAGE, CHAT_ERROR } from "./types";

export const getChats = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/chat/getChats");
    dispatch({
      type: GET_CHATS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const afterPostMessage = (data) => async (dispatch) => {
  dispatch({
    type: AFTER_POST_MESSAGE,
    payload: data,
  });
};
