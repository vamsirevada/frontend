import api from '../utils/api';
import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  TRANSACTION_ERROR,
} from './types';

export const addTransaction = (transaction, id) => async (dispatch) => {
  try {
    const res = await api.post(`/expense/${id}`, transaction);
    dispatch({
      type: ADD_TRANSACTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const getTransactions = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/expense/${id}`);
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteTransaction = (id, expense_id) => async (dispatch) => {
  try {
    await api.delete(`/expense/${id}/${expense_id}`);
    dispatch({
      type: DELETE_TRANSACTION,
      payload: expense_id,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
