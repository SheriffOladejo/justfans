import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const MessageIcon = ({active}) => {
  return <FaEnvelope size={'20px'} color={active ? '#F94F64' : '#8F8F94'} />;
};

export default MessageIcon;
