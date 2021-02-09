import axios from "axios";
import { GET_CHATS, GET_CHATS_BY_ID, SEND_MESSAGE, CHAT_ERROR } from "./types";

export const getConversations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/messages/conversations");
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

export const getConversationMessages = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/messages/conversations/query?userId=${id}`
    );
    dispatch({
      type: GET_CHATS_BY_ID,
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

export const sendConversationMessage = (id, message) => async (dispatch) => {
  try {
    const res = await axios.post("/api/messages/", {
      to: id,
      message: message,
    });
    dispatch({
      type: SEND_MESSAGE,
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
