import React from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';

const TransactionList = ({ expense: { transactions } }) => {
  return (
    <>
      <h3>History</h3>
      <ul className='expense-list'>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  expense: state.expense,
});

export default connect(mapStateToProps)(TransactionList);
