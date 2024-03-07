import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Props} from '@src/navigation/Navigation';

import List from '@src/features/list/List';

const SliderScreen: React.FC<Props<'list'>> = ({route, navigation}) => {
  return <List />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default SliderScreen;
