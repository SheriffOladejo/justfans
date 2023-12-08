import React from 'react';
import { FaCompass } from 'react-icons/fa';

const ExploreIcon = ({active}) => {
  return <FaCompass size={'20px'} color={active ? '#F94F64' : '#8F8F94'} />;
};

export default ExploreIcon;
