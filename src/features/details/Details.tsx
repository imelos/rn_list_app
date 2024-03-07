import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Props} from '@src/navigation/Navigation';
import {ListItemProps} from '../list/listApiSlice';

const Details: React.FC<{data: ListItemProps}> = props => {
  return (
    <View style={styles.container}>
      <Text>{props.data.author.details.publicName}</Text>
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

export default Details;
