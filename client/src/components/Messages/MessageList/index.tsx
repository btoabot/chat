import { useEffect, useRef } from 'react';
import MessageItem from '../Message';
import { Message } from 'store/slices/roomsSlice';
import styles from 'components/Messages/MessageList/index.module.scss';

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);

  return (
    <div className={styles.messages}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
