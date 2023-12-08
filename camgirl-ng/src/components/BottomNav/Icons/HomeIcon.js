import React from 'react';
import { FaHome } from 'react-icons/fa';

const HomeIcon = ({active}) => {
  return <FaHome size={'20px'} color={active ? '#F94F64' : '#8F8F94'} />;
};

export default HomeIcon;
