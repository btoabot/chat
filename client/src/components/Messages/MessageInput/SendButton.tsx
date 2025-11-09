import React from 'react';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const SendButton: React.FC<Props> = ({ onClick, disabled }) => (
  <button className={styles.button} onClick={onClick} disabled={disabled}>
    <FormattedMessage id="send" />
  </button>
);

export default SendButton;
