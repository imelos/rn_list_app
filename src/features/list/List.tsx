import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  //   TextInput,
  FlatList,
  //   ActivityIndicator,
} from 'react-native';
import {ListApiParams} from './listApiSlice';
import {useDebouncedCallback} from 'use-debounce';
import {TextInput, ActivityIndicator} from 'react-native-paper';

import ListItem from './list-item/ListItem';

import {
  useGetListItemsQuery,
  useLazyGetListItemsQuery,
  ListItemProps,
} from './listApiSlice';

const List: React.FC = () => {
  const [text, setText] = useState('');
  const [getListItems, {isLoading, isError, data, error}] =
    useLazyGetListItemsQuery();
  const [params, setParams] = useState<ListApiParams>({
    limit: 20,
    p: 1,
    q: '',
    world: 'de',
  });
  const [list, setList] = useState<ListItemProps[]>([]);

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
        console.log('res');
        // console.log(res);
        console.log(res.data.items.materials[0].id);

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

  const renderItem = (item: ListItemProps) => {
    return <ListItem data={item} />;
  };

  const renderFooter = () => {
    // if (!loading) return null;
    return <ActivityIndicator style={{marginVertical: 20}} />;
  };

  const onEndReached = () => {
    // Load more data when reaching the end of the list
    setParams({
      limit: 20,
      p: params.p + 1,
      q: params.q,
      world: 'de',
    });
  };
  console.log(list);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={changeFilter}
        value={text}
        label="Search"
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {isLoading ? (
          <ActivityIndicator style={{marginVertical: 20}} />
        ) : (
          <FlatList
            style={{width: '100%'}}
            data={list}
            renderItem={data => {
              return renderItem(data.item);
            }}
            contentContainerStyle={{padding: 10}}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5} // Load more data when reaching 50% of the end
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  input: {
    // height: 40,
    margin: 10,
    // borderWidth: 1,
    // padding: 10,
    marginBottom: 1,
  },
});

export default List;
