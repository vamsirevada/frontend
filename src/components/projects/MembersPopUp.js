import React, {
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const MembersPopUp = forwardRef(({}, ref) => {
  const [boxIsOpen, setBoxIsOpen] = useState(true);

  const handleOpen = () => {
    setBoxIsOpen(true);
  };

  const handleClose = () => {
    setBoxIsOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => handleOpen(),
      close: () => handleClose(),
    };
  });

  return (
    <>
      {boxIsOpen && (
        <Fragment>
          <div className='memberpopupscreen'>
            <div className='memberpopup'>
              <div className='mem-heading'>
                <h3>Project Members</h3>
                <a href='#!' className='member-cross' onClick={handleClose}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>
              <ul>
                <li>Arun</li>
                <li>Arun</li>
                <li>Arun</li>
                <li>Arun</li>
                <li>Arun</li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
});

export default MembersPopUp;
