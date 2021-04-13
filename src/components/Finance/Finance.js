import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import FinanceRight from './FinanceRight';
import ResponsiveFinanceRight from './ResponsiveFinanceRight';
import { useParams } from 'react-router-dom';
import { getProject, getProjectBudget } from '../../actions/project';
import { getTransactions } from '../../actions/expense';
import Moment from 'react-moment';
import BudgetRight from './BudgetRight';
import ResponsiveBudgetRight from './ResponsiveBudgetRight';

const Finance = ({
  getProject,
  getProjectBudget,
  getTransactions,
  project: { singleproject, budget },
  expense: { transactions },
}) => {
  const params = useParams();
  const [show, setshow] = useState(true);
  const [spender, setSpender] = useState(true);
  const [respo, setRespo] = useState(false);
  const [budgetRespo, setBudgetRespo] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getProject(params.id);
    getProjectBudget(params.id);
    getTransactions(params.id);
  }, [getProject, getTransactions, getProjectBudget, params.id]);

  const budgets = budget.map((x) => x.budget);

  const total = budgets.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const respoClose = () => {
    setRespo(false);
  };

  const respoClose1 = () => {
    setBudgetRespo(false);
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
                  <a
                    href='#!'
                    onClick={() => {
                      setBudgetRespo(!budgetRespo);
                    }}
                    className='blue'
                  >
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
                    <p>₹{total ? total : '0.00'}</p>
                  </div>
                )}
              </div>
            </div>
            <div className='expenses'>
              <div className='expenses-heading'>
                <h3>Expenses </h3>
                <div>
                  <a
                    onClick={() => {
                      setRespo(!respo);
                    }}
                    href='#!'
                    className='blue'
                  >
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
                <div>
                  <h4>
                    Admins{' '}
                    <span className='blue'>
                      ({singleproject?.admin.length})
                    </span>{' '}
                  </h4>
                </div>
                {spender &&
                  singleproject?.admin.map((x) => (
                    <Fragment key={x._id}>
                      <div
                        className='expense-card'
                        onClick={() => {
                          setRespo(!respo);
                          setUserId(x?.user);
                        }}
                      >
                        <p>
                          <span className='blue'>Date :</span>{' '}
                          <Moment format='DD MMM YY'>
                            {transactions[transactions.length - 1]?.date}
                          </Moment>
                        </p>
                        <p>
                          <span className='blue'>By:</span> {x?.fullName}
                        </p>
                      </div>
                      <hr className='Hori' />
                    </Fragment>
                  ))}
              </div>
              <div>
                <div>
                  <h4>
                    Moderators{' '}
                    <span className='blue'>
                      ({singleproject?.moderator.length})
                    </span>{' '}
                  </h4>
                </div>
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
                          <span className='blue'>Date :</span>{' '}
                          <Moment format='DD MMM YY'>
                            {transactions[transactions.length - 1]?.date}
                          </Moment>
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
            userId={userId}
          />
        )}

        {budgetRespo && (
          <ResponsiveBudgetRight
            singleproject={singleproject}
            respoClose={respoClose1}
          />
        )}
      </aside>
      {respo && (
        <FinanceRight
          transactions={transactions}
          singleproject={singleproject}
          userId={userId}
        />
      )}
      {budgetRespo && <BudgetRight singleproject={singleproject} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  expense: state.expense,
  project: state.project,
});

export default connect(mapStateToProps, {
  getProject,
  getProjectBudget,
  getTransactions,
})(Finance);
