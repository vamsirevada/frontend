import React, { useState } from 'react';
import { Fragment } from 'react';
import FinanceRight from './FinanceRight';

const Finance = () => {
  const [show, setshow] = useState(true);
  const [expense, setexpense] = useState(true);
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
                    <p>10,00,00,000</p>
                  </div>
                )}
              </div>

              {/* {buddies &&
                buddies.map((profile, index) => (
                  <Fragment key={index}>
                    <div
                      onClick={() => {
                        setChatProfile(profile);
                        setChatStarted(true);
                        setUserUid(profile?.user?._id);
                        setChatUserImage(profile?.avatar);
                        dispatch(
                          getRealtimeConversations({
                            uid_1: auth?.user?._id,
                            uid_2: profile?.user?._id,
                          })
                        );
                      }}
                      className='fullchat-chatgrid'
                    >
                      <div
                        style={{
                          background: `url(${
                            profile?.avatar ? profile?.avatar : logo
                          }) no-repeat center center/cover`,
                        }}
                        className='dp'
                      ></div>
                      <div className='flex-column-1'>
                        <div className='chat-name'>
                          <a>
                            {profile?.user?.fullName && profile?.user?.fullName}
                          </a>
                          <a>
                            {profile?.user?.groupName &&
                              profile?.user?.groupName}
                          </a>
                        </div>
                        <div className='chat-body'>
                          <p>{profile.location}</p>
                        </div>
                      </div>
                    </div>
                    <hr className='hori-2' />
                  </Fragment>
                ))} */}
            </div>
            <div className='expenses'>
              <div className='expenses-heading'>
                <h3>Expenses </h3>
                <div>
                  <a
                    href='#!'
                    className='blue'
                    onClick={(e) => setexpense(true)}
                  >
                    See
                  </a>
                  <span className='divider-line'>{' | '}</span>
                  <a
                    href='#!'
                    className='blue'
                    onClick={(e) => setexpense(false)}
                  >
                    Hide
                  </a>
                </div>
              </div>
              <div>
                {expense && (
                  <Fragment>
                    <div className='expense-card'>
                      <p>
                        <span className='blue'>Date :</span> 07/04/2021
                      </p>
                      <p>
                        <span className='blue'>By:</span> K Arun Kumar
                      </p>
                    </div>
                    <hr className='Hori' />
                  </Fragment>
                )}
              </div>
              {/* {projects &&
                projects.map((project) => (
                  <Fragment key={project?._id}>
                    <div className='fullchat-chatgrid'>
                      <div
                        style={{
                          background: `url(${
                            project?.avatar ? project?.avatar : logo
                          }) no-repeat center center/cover`,
                        }}
                        className='dp'
                      ></div>
                      <div className='flex-column-1'>
                        <div className='chat-name'>
                          <a>{project?.projectname}</a>
                        </div>
                        <div className='chat-body'>
                          <p>{project?.location}</p>
                        </div>
                      </div>
                    </div>
                    <hr className='hori-2' />
                  </Fragment>
                ))} */}
            </div>
          </div>
        </div>
      </aside>
      <FinanceRight />
      {/* {chatStarted ? (
        <ChatRight
          conversations={conversations}
          auth={auth}
          chatProfile={chatProfile}
          chatUserImage={chatUserImage}
          userUid={userUid}
        />
      ) : (
        <section
          id='fullchat-right'
          style={{ background: `url(${background})` }}
        >
          <p
            style={{
              textAlign: 'center',
              marginTop: '30%',
            }}
          >
            You Can Start Conversation with your Friends Here
          </p>
        </section>
      )} */}
    </div>
  );
};

export default Finance;
