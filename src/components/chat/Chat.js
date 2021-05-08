import React from 'react';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import { useHistory } from 'react-router';

const Chat = ({ auth: { user }, chat: { messages } }) => {
  const history = useHistory();

  const xyz = messages.filter((msg) => msg.user_uid_2 === user?._id);

  let messagesIcon;

  if (xyz && xyz.length > 0) {
    xyz.filter((abc) => abc.isView === false).length > 0
      ? (messagesIcon = (
          <Badge
            badgeContent={xyz.filter((not) => not.isView === false).length}
          >
            <EmailIcon
              style={{
                fontSize: 22,
                color: grey[600],
                verticalAlign: 'top',
              }}
              color='action'
            />
          </Badge>
        ))
      : (messagesIcon = (
          <EmailIcon
            style={{
              fontSize: 22,
              color: grey[600],
              verticalAlign: 'top',
            }}
            color='action'
          />
        ));
  } else {
    messagesIcon = (
      <EmailIcon
        style={{
          fontSize: 22,
          color: grey[600],
          verticalAlign: 'top',
        }}
      />
    );
  }

  return (
    <>
      <IconButton onClick={() => history.push('/chats')}>
        {messagesIcon}
      </IconButton>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps)(Chat);
