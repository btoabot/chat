import React from 'react';

interface AvatarProps {
  avatar: string;
  size?: number;
  className?: string;
  name?: string;
}

const UserAvatar: React.FC<AvatarProps> = ({ avatar, size = 40, className, name }) => {
  if (!avatar) return null;

  return (
    <img
      src={avatar}
      alt={name ?? 'avatar'}
      title={name}
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        userSelect: 'none',
      }}
    />
  );
};

export default UserAvatar;
