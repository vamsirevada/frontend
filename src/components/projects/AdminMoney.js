import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getTransactions } from '../../actions/expense';

const AdminMoney = ({ getTransactions, expense: { transactions } }) => {
  const params = useParams();

  useEffect(() => {
    getTransactions(params.id);
  }, [getTransactions, params.id]);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className='adminmoney'>
      <div className='admin-money-container'>
        <div className='budget'>
          <h3>Budget</h3>
          <p>₹10,00,00,000</p>
        </div>
        <div className='expenses'>
          <h3>Total Expenses</h3>
          <p>₹{total}</p>
        </div>
        <div className='expenses-1'>
          <h3>Latest Expense</h3>
          <p>
            {amounts[amounts.length - 1]
              ? `₹${amounts[amounts.length - 1]}`
              : '₹0.00'}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expense: state.expense,
});

export default connect(mapStateToProps, { getTransactions })(AdminMoney);
