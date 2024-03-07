import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const List: React.FC = () => {
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
  }
});

export default List;
