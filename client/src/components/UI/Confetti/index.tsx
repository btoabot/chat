import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Confetti: React.FC = () => {
  const counter = useSelector((s: RootState) => s.ui.confettiCounter);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!counter) return;

    let cancelled = false;
    let confettiInstance: any = null;

    const run = async () => {
      try {
        const confettiModule = await import('canvas-confetti');
        if (cancelled) return;
        confettiInstance = confettiModule.default;

        const myConfetti = (opts: any) =>
          confettiInstance({
            ...opts,
          });

        myConfetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
        setTimeout(
          () => myConfetti({ particleCount: 30, spread: 80, origin: { x: 0.5, y: 0.2 } }),
          200,
        );
        setTimeout(
          () => myConfetti({ particleCount: 20, spread: 100, origin: { x: 0.3, y: 0.1 } }),
          400,
        );
      } catch (e) {
        console.warn('canvas-confetti not found, skipping confetti', e);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [counter]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', pointerEvents: 'none', inset: 0, zIndex: 9999 }}
    />
  );
};

export default Confetti;
