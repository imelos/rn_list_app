import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
import {TextInput, ActivityIndicator} from 'react-native-paper';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {ListApiParams} from '@src/features/list/listApiSlice';

import ListItem from '@src/features/list/list-item/ListItem';
import {
  useLazyGetListItemsQuery,
  ListItemProps,
} from '@src/features/list/listApiSlice';

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
  const momentumRef = useRef<boolean>(true);
  const fullListLoadedRef = useRef<boolean>(false);

  const [getListItems, {isLoading}] = useLazyGetListItemsQuery();
  const orientation = useDeviceOrientation();

  useEffect(() => {
    debouncedGetListItems();
  }, [params]);

  const makeGetListItemsRequest = () => {
    getListItems(params)
      .unwrap()
      .then(res => {
        setIsPageLoading(false);
        const newList =
          params.p === 1
            ? res.data.items.materials
            : [...list, ...res.data.items.materials];
        setList(newList);
        if (params.p === 1) {
          listRef.current?.scrollToOffset({animated: false, offset: 0});
        }
        fullListLoadedRef.current = newList.length >= res.data.total;
      });
  };

  const debouncedGetListItems = useDebouncedCallback(() => {
    makeGetListItemsRequest();
  }, 250);

  const changeSearchFilter = (val: string) => {
    setText(val);
    setParams({
      limit: 20,
      p: 1,
      q: val,
      world: params.world,
    });
  };

  const onEndReached = ({distanceFromEnd}: {distanceFromEnd: number}) => {
    if (!momentumRef.current && !fullListLoadedRef.current) {
      console.log('first');
      setIsPageLoading(true);
      setParams({
        limit: 20,
        p: params.p + 1,
        q: params.q,
        world: params.world,
      });
      momentumRef.current = true;
    }
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={changeSearchFilter}
        value={text}
        label="Search"
      />
      <View style={styles.listContainer}>
        {isLoading ? (
          renderActivityIndicator()
        ) : (
          <FlatList
            key={orientation}
            data={list}
            ref={listRef}
            style={styles.list}
            renderItem={data => renderItem(data.item)}
            contentContainerStyle={{padding: 10}}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={renderFooter}
            onMomentumScrollBegin={() => {
              momentumRef.current = false;
            }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
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
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  list: {
    width: '100%',
  },
  input: {
    margin: 10,
    marginBottom: 1,
  },
});

export default List;
