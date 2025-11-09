import Flex from 'components/UI/Flex';
import Room from 'components/Rooms';
import UserSetup from 'components/Layout/Sider/UserSetup';
import ThemeToggle from './ThemeToggle';
import styles from './index.module.scss';
import { memo } from 'react';

const Sider = memo(() => {
  return (
    <aside className={styles.siderWrapper}>
      <Flex className={styles.sider} direction="column">
        <Flex className={styles.roomWrapper}>
          <Room />
        </Flex>
        <Flex flex={1} align="center" justify="space-between" className={styles.siderFooter}>
          <UserSetup />
          <ThemeToggle />
        </Flex>
      </Flex>
    </aside>
  );
});

export default Sider;
