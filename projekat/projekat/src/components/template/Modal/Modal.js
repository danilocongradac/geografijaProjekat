import React, { useState, useEffect } from 'react';
import styles from './ModalStyles';
import CloseIcon from '../../../assets/images/close.png';

const Modal = ({ children, visible, title }) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (visible === undefined) {
      setVisibility(false);
    } else {
      setVisibility(visible);
    }
  }, [visible]);

  return (
    <div>
      {visibility && (
        <div style={styles.modalContainer}>
          <div style={styles.modalHeading}>
            <h2>{title}</h2>
            <img
              src={CloseIcon}
              style={styles.closeIcon}
              onClick={() => setVisibility(false)}
              alt="Close"
            />
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
