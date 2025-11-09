import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from 'store/slices/roomsSlice';
import { useMessageFormValidation } from 'components/Messages/MessageInput/hooks/useMessageFormValidation';
import { useIntl } from 'react-intl';

interface Props {
  roomId: string | null;
}

export const useMessageInput = ({ roomId }: Props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { validate } = useMessageFormValidation();

  const handleChange = (val: string) => {
    setText(val);
    setError(validate(val));
  };

  const handleSend = () => {
    const validationError = validate(text);
    if (validationError || !roomId) {
      setError(validationError);
      return;
    }
    dispatch(sendMessage({ roomId, text }));
    setText('');
    setError('');
  };

  return {
    text,
    handleSend,
    handleChange,
    error,
  };
};
