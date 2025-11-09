import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store';
import MessageInput from '../MessageInput';
import MessageList from '../MessageList';
import styles from 'components/Messages/MessagesBody/index.module.scss';
import RiveBackground from 'components/RiveBackground';
import MessageEmpty from '../MessageEmpty';
import Confetti from 'components/UI/Confetti';

const MessagesBody = () => {
  const roomId = useSelector((s: RootState) => s.rooms.currentRoomId, shallowEqual);
  const room = useSelector(
    (s: RootState) => s.rooms.rooms.find((r) => r.id === roomId),
    shallowEqual,
  );

  if (!room) return null;

  return (
    <section className={styles.roomView}>
      <div className={styles.riveWrapper}>
        <RiveBackground />
      </div>

      <div className={styles.content}>
        {room.messages?.length ? <MessageList messages={room.messages} /> : <MessageEmpty />}
        <MessageInput roomId={roomId} />
      </div>
      <Confetti />
    </section>
  );
};

export default MessagesBody;
