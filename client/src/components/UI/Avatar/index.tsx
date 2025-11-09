import React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

function stringToPastelColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 190;
  const s = 90;
  const l = 70;

  return `hsl(${h}, ${s}%, ${l}%)`;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 30, className }) => {
  const initials = name
    .trim()
    .split(' ')
    .map((w) => w[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');

  const bgColor = stringToPastelColor(name);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f9f9f9ff',
        fontWeight: '400',
        userSelect: 'none',
      }}
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
