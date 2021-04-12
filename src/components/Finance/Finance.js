import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import FinanceRight from './FinanceRight';
import ResponsiveFinanceRight from './ResponsiveFinanceRight';
import { useParams } from 'react-router-dom';
import { getProject, getProjectBudget } from '../../actions/project';
import { getTransactions } from '../../actions/expense';
import { projectFirestore } from '../../firebase/config';

const Finance = ({
  profile: { profile },
  getProject,
  getTransactions,
  project: {
    singleproject,
    budget: { budget },
  },
  expense: { transactions },
}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [show, setshow] = useState(true);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState('');
  const [spender, setSpender] = useState(true);
  const [respo, setRespo] = useState(false);

  useEffect(() => {
    getProject(params.id);
    getTransactions(params.id);
    dispatch(getProjectBudget(params.id));
  }, [getProject, getTransactions, params.id]);

  const respoClose = () => {
    setRespo(false);
  };

  const addBudget = (e) => {
    e.preventDefault();
    projectFirestore.collection('projects').add({
      project: singleproject?._id,
      budget: value,
    });
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
                  {budget < 0 && (
                    <a
                      href='#!'
                      onClick={() => {
                        setModal(true);
                      }}
                      className='blue'
                    >
                      Add Budget
                    </a>
                  )}
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
                    <p>₹{budget}</p>
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

        {modal && (
          <div>
            <form onSubmit={addBudget}>
              <div>
                <label htmlFor='remark'>Total Budget :</label>
                <br />
                <input
                  type='text'
                  name='remark'
                  className='remark'
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className='prof-flex-btn'>
                <button className='btn-blue note' type='submit'>
                  Add Budget
                </button>
              </div>
            </form>
          </div>
        )}
      </aside>
      {respo && (
        <FinanceRight
          transactions={transactions}
          singleproject={singleproject}
          profile={profile}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  expense: state.expense,
  project: state.project,
});

export default connect(mapStateToProps, { getProject, getTransactions })(
  Finance
);
