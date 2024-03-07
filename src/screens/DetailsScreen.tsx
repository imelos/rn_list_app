import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Props} from '@src/navigation/Navigation';
import Details from '@src/features/details/Details';

const DetailsScreen: React.FC<Props<'details'>> = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <Details data={data}></Details>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DetailsScreen;
