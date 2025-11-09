import {
  useRive,
  useStateMachineInput,
  Layout as RiveLayout,
  Fit,
  Alignment,
} from '@rive-app/react-canvas';
import animationUrl from 'assets/ship-field.riv';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

const STATE_MACHINE_NAME = 'Start';
const INPUT_NAME = 'on/off';

const RiveBackground = memo(() => {
  const theme = useSelector((s: RootState) => s.theme);

  const { rive, RiveComponent } = useRive(
    {
      src: animationUrl,
      stateMachines: STATE_MACHINE_NAME,
      autoplay: true,
      layout: new RiveLayout({
        fit: Fit.Cover,
        alignment: Alignment.TopLeft,
      }),
    },
    {
      shouldResizeCanvasToContainer: true,
    },
  );

  const onClickInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  useEffect(() => {
    if (onClickInput) {
      onClickInput.value = theme === 'dark';
    }
  }, [theme, onClickInput]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <RiveComponent
        style={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          display: 'block',
        }}
        onClick={() => onClickInput?.fire()}
      />
    </div>
  );
});

export default RiveBackground;
