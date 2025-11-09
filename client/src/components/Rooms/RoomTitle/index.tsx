import React, { memo, ReactNode } from 'react';
import Typography from 'components/UI/Typography';
import styles from 'components/Rooms/RoomTitle/index.module.scss';

interface RoomTitleProps {
  text?: string;
  children?: ReactNode;
  fontSize?: string;
}

const RoomTitle: React.FC<RoomTitleProps> = ({ text, children, fontSize = '18px' }) => {
  if (!text && !children) return null;

  return (
    <Typography className={styles.title} variant="default" fontSize={fontSize}>
      {text ?? children}
    </Typography>
  );
};

export default memo(RoomTitle);
