/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { addBudget } from '../../actions/project';
import logo from '../../images/dummyimage.jpg';
import Close from '../../images/Group 6054.svg';

const ResponsiveBudgetRight = ({ singleproject, addBudget, respoClose }) => {
  const params = useParams();
  const [text, setText] = useState('');
  const [budget, setBudget] = useState(0);

  const budgets = singleproject.projectbudget.map((x) => x.budget);

  const total = budgets.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const onSubmit = () => {
    const newBudget = {
      text,
      budget: +budget,
    };
    addBudget(params.id, newBudget);
    setText('');
    setBudget(0);
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
                <p>Project Budget</p>
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
                  {singleproject.projectbudget.map((budget, index) => (
                    <tr key={budget._id}>
                      <td>{index + 1}</td>
                      <td>{budget.text}</td>
                      <td>{budget.budget}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>Total</td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='expenses-type'>
          <div className=' expenses-tracker'>
            <div>
              <h3>Add Budget</h3>
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
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
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

export default connect(null, { addBudget })(ResponsiveBudgetRight);
