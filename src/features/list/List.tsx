import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {ListApiParams} from './listApiSlice';
import {useDebouncedCallback} from 'use-debounce';
import {TextInput, ActivityIndicator} from 'react-native-paper';

import ListItem from './list-item/ListItem';

import {useLazyGetListItemsQuery, ListItemProps} from './listApiSlice';

const List: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [list, setList] = useState<ListItemProps[]>([]);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [params, setParams] = useState<ListApiParams>({
    limit: 20,
    p: 1,
    q: '',
    world: 'de',
  });
  const listRef = useRef<FlatList>(null);

  const [getListItems, {isLoading}] = useLazyGetListItemsQuery();

  useEffect(() => {
    debouncedGetListItems();
  }, [params]);

  const makeGetListItemsRequest = () => {
    getListItems(params)
      .unwrap()
      .then(res => {
        console.log(res);
        setIsPageLoading(false);
        setList(
          params.p === 1
            ? res.data.items.materials
            : [...list, ...res.data.items.materials],
        );
        if (params.p === 1) {
          listRef.current?.scrollToOffset({animated: false, offset: 0});
        }
      });
  };

  const debouncedGetListItems = useDebouncedCallback(() => {
    makeGetListItemsRequest();
  }, 300);

  const changeSearchFilter = (val: string) => {
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

  const renderActivityIndicator = () => {
    return <ActivityIndicator style={{marginVertical: 20}} />;
  };

  const renderFooter = () => {
    if (!isPageLoading) return null;
    return renderActivityIndicator();
  };

  const onEndReached = ({distanceFromEnd}: {distanceFromEnd: number}) => {
    if (distanceFromEnd === 0) return;
    setIsPageLoading(true);
    setParams({
      limit: 20,
      p: params.p + 1,
      q: params.q,
      world: 'de',
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={changeSearchFilter}
        value={text}
        label="Search"
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {isLoading ? (
          renderActivityIndicator()
        ) : (
          <FlatList
            data={list}
            ref={listRef}
            renderItem={data => renderItem(data.item)}
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
