import Flex from 'components/UI/Flex';
import MessagesTitle from './MessagesTitle';
import MessagesBody from './MessagesBody';
import { memo } from 'react';

const style = { height: '100%', width: '100%' };

const Messages = memo(() => {
  return (
    <Flex direction="column" justify="space-between" style={style}>
      <MessagesTitle />
      <MessagesBody />
    </Flex>
  );
});

export default Messages;
