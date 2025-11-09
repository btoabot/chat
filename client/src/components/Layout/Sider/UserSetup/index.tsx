import styles from './index.module.scss';
import Typography from 'components/UI/Typography';
import Flex from 'components/UI/Flex';
import { useUserSetup } from './hooks/useUserSetup';
import { useIntl } from 'react-intl';

const UserSetup = () => {
  const intl = useIntl();

  const {
    editing,
    temp,
    handleChange,
    handleSave,
    error,
    name,
    handleStartEditing,
    handleKeyDown,
  } = useUserSetup();

  return (
    <div className={styles.userSetup}>
      {editing ? (
        <Flex direction="column" className={styles.inputField}>
          <input
            autoFocus
            className={styles.input}
            value={temp}
            onChange={handleChange}
            onBlur={handleSave}
            placeholder={intl.formatMessage({ id: 'name.input.placeholder' })}
            onKeyDown={handleKeyDown}
          />
          {error && <div className={styles.error}>{error}</div>}
        </Flex>
      ) : (
        <Typography className={styles.name} onClick={handleStartEditing}>
          {name}
        </Typography>
      )}
    </div>
  );
};

export default UserSetup;
