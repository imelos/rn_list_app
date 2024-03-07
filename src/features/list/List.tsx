import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {ListApiParams} from './listApiSlice';
import {useDebouncedCallback} from 'use-debounce';

import {
  useGetListItemsQuery,
  useLazyGetListItemsQuery,
  ListItem,
} from './listApiSlice';

const List: React.FC = () => {
  const [text, setText] = useState('');
  const [getListItems] = useLazyGetListItemsQuery();
  const [params, setParams] = useState<ListApiParams>({
    limit: 20,
    p: 1,
    q: '',
    world: 'de',
  });
  const [list, setList] = useState<ListItem[]>([]);

  //   const {
  //     data: res,
  //     isLoading,
  //     isSuccess,
  //     isError,
  //     error,
  //   } = useGetListItemsQuery(params);
  useEffect(() => {
    debouncedGetListItems();
  }, [params]);

  const makeGetListItemsRequest = () => {
    getListItems(params)
      .unwrap()
      .then(res => {
        console.log(res);
        setList(
          params.p === 1
            ? res.data.items.materials
            : [...list, ...res.data.items.materials],
        );
      });
  };

  const debouncedGetListItems = useDebouncedCallback(() => {
    makeGetListItemsRequest();
  }, 300);

  const changeFilter = (val: string) => {
    console.log(val);
    setText(val);
    setParams({
      limit: 20,
      p: 1,
      q: val,
      world: 'de',
    });
  };

  //   if (isLoading) {
  //   } else {
  //     if (isSuccess) {
  //       console.log(res);
  //       console.log(res.code);
  //       //   console.log(res.data);
  //       console.log(res.data.items.materials.length);
  //       //   console.log(res.data.items.materials[0].author.details.publicName);
  //       //   console.log(res.data.items.materials[0].firstPreviewImage.watermarked);
  //     } else {
  //       console.log('request erorr1');
  //       console.log(error);
  //     }
  //   }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={changeFilter}
        value={text}
      />
      <Text>list</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default List;
