import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Props} from '@src/navigation/Navigation';

const DetailsScreen: React.FC<Props<'details'>> = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  btn: {
    position: 'absolute',
    left: 20,
    top: 5,
  },
});

export default DetailsScreen;
