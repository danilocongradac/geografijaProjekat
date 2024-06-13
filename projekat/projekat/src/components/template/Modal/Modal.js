import React, { useState, useEffect } from 'react';
import styles from './ModalStyles';
import CloseIcon from '../../../assets/images/close.png';

const Modal = ({ children, visible, title, onClose }) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (visible === undefined) {
      setVisibility(false);
    } else {
      setVisibility(visible);
    }
  }, [visible]);

  const onCloseClickFunction = () =>{
    if(onClose == undefined){
      setVisibility(false);
      return;
    }
    onClose();
  }

  return (
    <div>
      {visibility && (
        <div style={styles.modalContainer}>
          <div style={styles.modalHeading}>
            <h2>{title}</h2>
            <img
              src={CloseIcon}
              style={styles.closeIcon}
              onClick={onCloseClickFunction}
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
