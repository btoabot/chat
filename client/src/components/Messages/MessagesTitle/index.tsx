import Flex from 'components/UI/Flex';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store';
import RoomTitle from 'components/Rooms/RoomTitle';
import { memo } from 'react';
import styles from './index.module.scss';

const MessagesTitle = memo(() => {
  const currentRoomId = useSelector((state: RootState) => state.rooms.currentRoomId, shallowEqual);
  const rooms = useSelector((s: RootState) => s.rooms.rooms);
  const selectedRoom = rooms.find((r) => r.id === currentRoomId);

  return (
    <Flex className={styles.title} gap={8} justify="space-between">
      <RoomTitle text={selectedRoom?.name} />
    </Flex>
  );
});

export default MessagesTitle;
