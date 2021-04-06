import React from 'react';
import Header from './Header';
import Balance from './Balance';
import IncomeExpenses from './IncomeExpenses';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  return (
    <>
      <Header />
      <div className='expense-container'>
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </>
  );
};

export default ExpenseTracker;
