import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItemProps} from '@src/features/list/listApiSlice';

import {Avatar, Button, Card, Text} from 'react-native-paper';

const ListItem: React.FC<{data: ListItemProps}> = props => {
  return (
    <Card style={styles.container}>
      <Card.Cover source={{uri: props.data.firstPreviewImage.watermarked}} />
      <Card.Content>
        <Text variant="titleLarge">{props.data.title}</Text>
        <Text variant="bodyMedium">{props.data.author.details.publicName}</Text>
        <View>
          <Text variant="labelLarge">{props.data.price} €</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default ListItem;
