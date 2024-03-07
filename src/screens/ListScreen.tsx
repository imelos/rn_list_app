import React from 'react';
import {Props} from '@src/navigation/Navigation';
import List from '@src/features/list/List';

const SliderScreen: React.FC<Props<'list'>> = () => {
  return <List />;
};

export default SliderScreen;
