import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Message as MessageType } from 'store/slices/roomsSlice';
import styles from 'components/Messages/Message/index.module.scss';
import Flex from 'components/UI/Flex';
import Typography from 'components/UI/Typography';
import MessageDate from '../MessageDate';
import UserAvatar from 'components/UI/UserAvatar';
import { memo } from 'react';

interface MessageProps {
  message: MessageType;
}

const Message = memo(({ message }: MessageProps) => {
  const userId = useSelector((s: RootState) => s.rooms.userId);
  const isOwn = message.userId === userId;

  return (
    <div className={`${styles.message} ${isOwn ? styles.own : ''}`}>
      <Flex gap={8} className={styles.messageWrapper}>
        {!isOwn && <UserAvatar avatar={message.avatar} size={32} />}
        <Flex direction="column" align={isOwn ? 'flex-end' : 'flex-start'} flex={1} gap={4}>
          <Flex gap={6}>
            {!isOwn ? <Typography fontSize="13px">{message.name}</Typography> : null}
            <Typography fontSize="12px" variant="secondary">
              <MessageDate ts={message.ts} />
            </Typography>
          </Flex>
          <Flex className={styles.text}>
            <Typography>{message.text}</Typography>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
});

export default Message;
