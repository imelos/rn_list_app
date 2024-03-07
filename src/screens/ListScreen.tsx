import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Props} from '@src/navigation/Navigation';

const SliderScreen: React.FC<Props<'list'>> = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>list</Text>
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

export default SliderScreen;
