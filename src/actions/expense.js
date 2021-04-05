import { ADD_TRANSACTION, DELETE_TRANSACTION } from './types';

export const addTransaction = (transaction) => async (dispatch) => {
  dispatch({
    type: ADD_TRANSACTION,
    payload: transaction,
  });
};

export const deleteTransaction = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_TRANSACTION,
    payload: id,
  });
};
