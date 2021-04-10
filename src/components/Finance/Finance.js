import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import FinanceRight from './FinanceRight';
import ResponsiveFinanceRight from './ResponsiveFinanceRight';
import { useParams } from 'react-router-dom';
import { getProject } from '../../actions/project';
import { getTransactions } from '../../actions/expense';

const Finance = ({
  getProject,
  getTransactions,
  project: { singleproject },
  expense: { transactions },
}) => {
  const params = useParams();
  const [show, setshow] = useState(true);
  const [spender, setSpender] = useState(true);

  const [respo, setRespo] = useState(false);

  useEffect(() => {
    getProject(params.id);
    getTransactions(params.id);
  }, [getProject, getTransactions, params.id]);

  const respoClose = () => {
    setRespo(false);
  };

  return (
    <div id='full-chat'>
      <aside id='fullchat-left'>
        <div className='fullchat-lefttop finance'>
          <div>
            <input type='search' name='search' placeholder='Search finance' />
          </div>
        </div>
        <div className='fullchat-leftcontainer'>
          <div className='fullchat-leftbody'>
            <div className='budget'>
              <div className='budget-heading'>
                <h3>Total Budget</h3>
                <div>
                  <a href='#!' className='blue'>
                    Add Budget
                  </a>
                  <span className='divider-line'>{' | '}</span>
                  <a href='#!' className='blue' onClick={(e) => setshow(true)}>
                    See
                  </a>
                  <span className='divider-line'>{' | '}</span>
                  <a href='#!' className='blue' onClick={(e) => setshow(false)}>
                    Hide
                  </a>
                </div>
              </div>
              <div className='budget-amount'>
                {show && (
                  <div>
                    <p>₹10,00,00,000</p>
                  </div>
                )}
              </div>
            </div>
            <div className='expenses'>
              <div className='expenses-heading'>
                <h3>Expenses </h3>
                <div>
                  <a href='#!' className='blue'>
                    Add New Expenses{' '}
                  </a>
                  <span className='divider-line'>{' | '}</span>
                  <a
                    href='#!'
                    className='blue'
                    onClick={(e) => setSpender(true)}
                  >
                    See
                  </a>
                  <span className='divider-line'>{' | '}</span>
                  <a
                    href='#!'
                    className='blue'
                    onClick={(e) => setSpender(false)}
                  >
                    Hide
                  </a>
                </div>
              </div>
              <div>
                {spender &&
                  singleproject?.moderator.map((x) => (
                    <Fragment key={x._id}>
                      <div
                        className='expense-card'
                        onClick={() => {
                          setRespo(!respo);
                        }}
                      >
                        <p>
                          <span className='blue'>Date :</span> 07/04/2021
                        </p>
                        <p>
                          <span className='blue'>By:</span> {x?.fullName}
                        </p>
                      </div>
                      <hr className='Hori' />
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {respo && (
          <ResponsiveFinanceRight
            transactions={transactions}
            singleproject={singleproject}
            respoClose={respoClose}
          />
        )}
      </aside>
      {respo && (
        <FinanceRight
          transactions={transactions}
          singleproject={singleproject}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  expense: state.expense,
  project: state.project,
});

export default connect(mapStateToProps, { getProject, getTransactions })(
  Finance
);
