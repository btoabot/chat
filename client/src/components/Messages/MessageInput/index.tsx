import { memo } from 'react';
import MessageTextField from './MessageTextField';
import SendButton from './SendButton';
import styles from './index.module.scss';
import Flex from 'components/UI/Flex';
import { useIntl } from 'react-intl';
import { useMessageInput } from './hooks/useMessageInput';

interface Props {
  roomId: string | null;
}

const MessageInput: React.FC<Props> = memo(({ roomId }) => {
  const intl = useIntl();
  const { text, handleSend, handleChange, error } = useMessageInput({ roomId });

  return (
    <Flex className={styles.inputArea} gap={8} align="flex-start">
      <Flex direction="column" style={{ flex: 1 }}>
        <MessageTextField
          value={text}
          onChange={handleChange}
          onEnter={handleSend}
          placeholder={intl.formatMessage({ id: 'message.input.paceholder' })}
          size="middle"
        />
        {error && <div className={styles.error}>{error}</div>}
      </Flex>

      <SendButton onClick={handleSend} disabled={!text.trim() || !!error} />
    </Flex>
  );
});

export default MessageInput;
