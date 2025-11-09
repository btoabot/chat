import Flex from 'components/UI/Flex';
import RoomTitle from 'components/Rooms/RoomTitle';
import RoomsList from 'components/Rooms/RoomList';
import styles from 'components/Rooms/index.module.scss';
import { FormattedMessage } from 'react-intl';

const Room = () => {
  return (
    <Flex direction="column" className={styles.room} justify="flex-start">
      <RoomTitle>
        <FormattedMessage id="room.title" />
      </RoomTitle>
      <RoomsList />
    </Flex>
  );
};

export default Room;
