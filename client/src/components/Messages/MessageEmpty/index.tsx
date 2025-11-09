import Flex from 'components/UI/Flex';
import styles from 'components/Messages/MessageEmpty/index.module.scss';
import Typography from 'components/UI/Typography';
import { FormattedMessage } from 'react-intl';

const MessageEmpty = () => {
  return (
    <Flex className={styles.emptyWrapper} align="center" justify="center">
      <section className={styles.empty}>
        <Flex direction="column" gap={12} className={styles.textBlock}>
          <Typography fontSize="24px">
            <FormattedMessage id="empty.title" />
          </Typography>
          <Typography fontSize="16px">
            <FormattedMessage id="empty.description1" />
          </Typography>
        </Flex>
      </section>
    </Flex>
  );
};

export default MessageEmpty;
