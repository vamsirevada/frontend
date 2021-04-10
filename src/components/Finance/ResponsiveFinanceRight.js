import React, { useState } from 'react';
import { addTransaction } from '../../actions/expense';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import logo from '../../images/dummyimage.jpg';
import Close from '../../images/Group 6054.svg';

const ResponsiveFinanceRight = ({
  singleproject,
  addTransaction,
  transactions,
  respoClose,
}) => {
  const params = useParams();
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const onSubmit = () => {
    const newTransaction = {
      text,
      amount: +amount,
    };
    addTransaction(newTransaction, params.id);
    setText('');
    setAmount(0);
  };

  return (
    <section className='fullchat-right responsive'>
      <div className='fullchat-right-responsive-container'>
        <div className='fullchat-maintop expenses-tracker'>
          <div className='fullchat-maintop-left'>
            <div className='chatboxtop-right'>
              <a
                type='button'
                className='cancel'
                onClick={() => {
                  respoClose();
                }}
              >
                <img src={Close} alt='' />
              </a>
            </div>
            <div
              style={{
                background: `url(${
                  singleproject?.avatar ? singleproject?.avatar : logo
                }) no-repeat center center/cover`,
              }}
              className='display-pic'
            ></div>
            <div className='flex-column'>
              <div className='chat-name'>
                <a href='#!'>{singleproject?.projectname}</a>
              </div>
              <div className='chat-body'>
                <p>Expenses Tracker</p>
              </div>
            </div>
          </div>
        </div>

        <div className='expenses-mainbody'>
          <div className='expenses-mainbody-container'>
            <div>
              <table className='expenses-table'>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Particular</th>
                    <th>Amount (in ₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction._id}>
                      <td>{index + 1}</td>
                      <td>{transaction.text}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='expenses-type'>
          <div className=' expenses-tracker'>
            <div>
              <h3>Add Expense</h3>
            </div>
            <div className='expenses-tracker-flex'>
              <div>
                <label>Particular</label>
                <br />
                <input
                  type='text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div>
                <label>Amount</label>
                <br />
                <input
                  type='number'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className='form-flex-right'>
              <a onClick={onSubmit} href='#!'>
                Add
              </a>
              <a href='#!'>Submit</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(null, { addTransaction })(ResponsiveFinanceRight);
