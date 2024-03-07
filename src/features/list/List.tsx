import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListApiParams} from './listApiSlice';

import {useGetListItemsQuery} from './listApiSlice';

const List: React.FC = () => {
  const [params, setParams] = useState<ListApiParams>({
    limit: 20,
    p: 1,
    q: '',
    world: 'de',
  });

  const {
    data: res,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetListItemsQuery(params);

  if (isLoading) {
  } else {
    if (isSuccess) {
      console.log(res);
      console.log(res.code);
      console.log(res.status);
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
