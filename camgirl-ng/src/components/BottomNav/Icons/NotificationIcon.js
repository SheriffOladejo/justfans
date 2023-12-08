import React from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationIcon = ({active}) => {
  return <FaBell size={'20px'} color={active ? '#F94F64' : '#8F8F94'} />;
};

export default NotificationIcon;
