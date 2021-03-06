import {
  Fragment,
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react';

const Test = ({ show, close }) => {
  const [boxIsOpen, setBoxIsOpen] = useState(false);

  return (
    <div
      style={{
        opacity: show ? '1' : '0',
      }}
    >
      <h1>Hiiii</h1>
      <button onClick={close}>X</button>
    </div>
  );
};

export default Test;
