import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ListItemProps} from '@src/features/list/listApiSlice';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@src/navigation/Navigation';

import {Card, Text} from 'react-native-paper';

const ListItem: React.FC<{data: ListItemProps}> = props => {
  const navigaion = useNavigation<ScreenNavigationProp<'details'>>();

  const navigate = () => {
    navigaion.navigate('details', {data: props.data});
  };

  return (
    <TouchableOpacity onPress={navigate}>
      <Card style={styles.container}>
        <Card.Cover source={{uri: props.data.firstPreviewImage.watermarked}} />
        <Card.Content>
          <Text variant="titleLarge">{props.data.title}</Text>
          <Text variant="bodyMedium">
            {props.data.author.details.publicName}
          </Text>
          <View>
            <Text variant="labelLarge">{props.data.price} €</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default ListItem;
