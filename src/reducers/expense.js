import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  TRANSACTION_ERROR,
} from '../actions/types';

const initialState = {
  transactions: [],
  error: {},
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== payload
        ),
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
