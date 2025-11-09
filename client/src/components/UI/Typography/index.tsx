import React from 'react';
import styles from 'components/UI/Typography/index.module.scss';

type TypographyProps = React.PropsWithChildren<{
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'disabled';
  fontSize?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}>;

const variantColors: Record<string, string> = {
  default: 'var(--text)',
  secondary: 'var(--text-color-secondary)',
  success: 'green',
  warning: 'orange',
  danger: 'red',
  disabled: 'var(--disabled-text-color)',
};

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'default',
  fontSize,
  color,
  className,
  style,
  onClick,
}) => {
  const computedColor = color || variantColors[variant] || variantColors.default;

  return (
    <p
      className={`${styles.typography} ${className || ''}`}
      style={{ fontSize, color: computedColor, ...style }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default Typography;
