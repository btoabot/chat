import { useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'store';
import { setUserName } from 'store/slices/userSlice';

export const useUserSetup = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const name = useSelector((s: RootState) => s.user.name, shallowEqual);
  const [editing, setEditing] = useState(!name);
  const [temp, setTemp] = useState(() => name);
  const [error, setError] = useState('');

  const validateName = useCallback(
    (value: string): string => {
      if (!value.trim()) return intl.formatMessage({ id: 'name.required' });
      if (value.length > 15) return intl.formatMessage({ id: 'name.max.chars' });
      return '';
    },
    [intl],
  );

  const handleStartEditing = useCallback(() => {
    setTemp(name);
    setError('');
    setEditing(true);
  }, [name]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTemp(e.target.value);
      if (error) setError('');
    },
    [error],
  );

  const handleSave = useCallback(() => {
    const validationError = validateName(temp);
    setError(validationError);
    if (validationError) return;

    if (temp.trim() !== name) {
      dispatch(setUserName(temp.trim()));
    }
    setEditing(false);
  }, [temp, name, dispatch, validateName]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSave();
      }
    },
    [handleSave],
  );

  return {
    editing,
    temp,
    name,
    handleChange,
    handleSave,
    error,
    handleStartEditing,
    handleKeyDown,
  };
};
