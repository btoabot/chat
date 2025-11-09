import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Flex from 'components/UI/Flex';
import Room from '../Room';
import styles from 'components/Rooms/RoomList/index.module.scss';

const RoomsList = () => {
  const rooms = useSelector((s: RootState) => s.rooms.rooms);

  return (
    <Flex direction="column" className={styles.roomList}>
      <ul>
        {rooms.map((r) => (
          <Room key={r.id} id={r.id} name={r.name} messages={r.messages} />
        ))}
      </ul>
    </Flex>
  );
};

export default RoomsList;
