import Flex from 'components/UI/Flex';
import Sider from 'components/Layout/Sider';
import Body from 'components/Layout/Body';
import styles from 'components/Layout/indem.module.scss';

const Layout = () => {
  return (
    <Flex className={styles.layout}>
      <Sider />
      <Body />
    </Flex>
  );
};

export default Layout;
