import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Surface} from 'react-native-paper';

import {Props} from '@src/navigation/Navigation';
import Details from '@src/features/details/Details';

const DetailsScreen: React.FC<Props<'details'>> = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <Surface style={styles.container}>
      <Details data={data}></Details>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    height: '100%',
  },
});

export default DetailsScreen;
