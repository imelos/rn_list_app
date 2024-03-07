import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {useGetListItemsQuery} from './listApiSlice';

const List: React.FC = () => {
  const {data: res, isLoading, isSuccess, isError, error} = useGetListItemsQuery({});

  if (isLoading) {
  } else {
    if (isSuccess) {
      console.log(res);
      console.log(res.code)
      console.log(res.status)
    //   console.log(res.data.items);
    } else {
      console.log('request erorr1');
      console.log(error);
    }
  }

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
});

export default List;
