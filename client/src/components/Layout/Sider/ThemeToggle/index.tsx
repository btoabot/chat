import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { toggleTheme } from 'store/slices/themeSlice';
import styles from './index.module.scss';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((s: RootState) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChangeTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <button
      className={`${styles.toggle} ${theme === 'dark' ? styles.dark : ''}`}
      onClick={handleChangeTheme}
      aria-label="Toggle theme"
    >
      <div className={styles.iconWrapper}>
        <span className={styles.sun}>☀️</span>
        <span className={styles.moon}>🌙</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
