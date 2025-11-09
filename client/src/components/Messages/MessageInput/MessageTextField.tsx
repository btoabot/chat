import React from 'react';
import styles from './index.module.scss';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
}

const MessageTextField: React.FC<Props> = ({
  value,
  onChange,
  onEnter,
  placeholder = 'Type...',
  size = 'middle',
}) => {
  return (
    <input
      autoFocus
      className={`${styles.input} ${styles[size]}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
    />
  );
};

export default MessageTextField;
