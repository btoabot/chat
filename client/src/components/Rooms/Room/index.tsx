import { memo, useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from 'store';
import { joinRoom, Message } from 'store/slices/roomsSlice';
import Flex from 'components/UI/Flex';
import styles from 'components/Rooms/Room/index.module.scss';
import Typography from 'components/UI/Typography';
import Avatar from 'components/UI/Avatar';
import { useLatestDate } from 'components/Rooms/Room/hooks/useLatestDate';
import { useIntl } from 'react-intl';

interface RoomProps {
  id: string;
  name: string;
  messages: Message[];
}

const Room = memo(({ id, name, messages }: RoomProps) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const currentRoomId = useSelector((state: RootState) => state.rooms.currentRoomId, shallowEqual);
  const date = useLatestDate(messages.map((m) => m.ts));

  const handleJoin = useCallback(() => {
    if (id !== currentRoomId) {
      dispatch(joinRoom({ roomId: id }));
    }
  }, [dispatch, id, currentRoomId]);

  const isSelected = id === currentRoomId;

  const latestMessage = useMemo(
    () => messages[messages.length - 1]?.text ?? intl.formatMessage({ id: 'no.messages' }),
    [messages],
  );

  return (
    <li className={isSelected ? styles.selected : ''} onClick={handleJoin}>
      <Flex gap={8} align="center" className={styles.room} style={{ width: '100%' }}>
        <Flex style={{ width: '100%' }} gap={8} justify="space-between">
          <Avatar name={name} size={42} />
          <Flex direction="column" flex={1} justify="space-evenly" gap={6}>
            <Flex justify="space-between">
              <Typography fontSize="13px">{name}</Typography>
              <Typography fontSize="11px" variant="disabled">
                {date}
              </Typography>
            </Flex>
            <Typography fontSize="12px" className={styles.ellipsis} variant="disabled">
              {latestMessage}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </li>
  );
});

export default Room;
