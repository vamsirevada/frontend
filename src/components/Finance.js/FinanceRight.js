import React from 'react';
import sendbutton from '../../images/sendbutton.svg';

const FinanceRight = () => {
  return (
    <section id='fullchat-right'>
      <div className='fullchat-maintop expenses-tracker'>
        <div className='fullchat-maintop-left'>
          <div
            // style={{
            //   background: `url(${
            //     auth?.user?.avatar ? auth?.user?.avatar : logo
            //   }) no-repeat center center/cover`,
            // }}
            className='display-pic'
          ></div>
          <div className='flex-column'>
            <div className='chat-name'>
              {/* <a href='#!'>{chatProfile?.user?.fullName}</a> */}
              <a href='#!'>Project Name: </a>
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
              <tr>
                <th>S.No</th>
                <th>Particular</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Smith</td>
                <td>50</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jackson</td>
                <td>94</td>
              </tr>
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
              <label>S.No</label>
              <input type='number' />
            </div>
            <div>
              <label>Particular</label>
              <br />
              <input type='text' />
            </div>
            <div>
              <label>Amount</label>
              <br />
              <input type='number' />
            </div>
          </div>
          <div className='form-flex-right'>
            <a href='#!'>Save</a>
            <a href='#!'>Submit</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinanceRight;
