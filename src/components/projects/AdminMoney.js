import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getTransactions } from '../../actions/expense';
import { Link } from 'react-router-dom';

const AdminMoney = ({
  budget,
  getTransactions,
  expense: { transactions },
  singleproject: { _id },
}) => {
  const params = useParams();

  useEffect(() => {
    getTransactions(params.id);
  }, [getTransactions, params.id]);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className='adminmoney'>
      <div className='admin-money-container'>
        <Link to={`/projectfinance/${_id}`} className='budget'>
          <h3>Budget</h3>
          <p>{budget ? `₹${budget}` : '₹0.00'}</p>
        </Link>
        <Link to={`/projectfinance/${_id}`} className='expenses'>
          <h3>Total Expenses</h3>
          <p>₹{total}</p>
        </Link>
        <Link to={`/projectfinance/${_id}`} className='expenses-1'>
          <h3>Latest Expense</h3>
          <p>
            {amounts[amounts.length - 1]
              ? `₹${amounts[amounts.length - 1]}`
              : '₹0.00'}
          </p>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project,
  expense: state.expense,
});

export default connect(mapStateToProps, { getTransactions })(AdminMoney);
