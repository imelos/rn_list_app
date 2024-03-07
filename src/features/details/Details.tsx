import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {ListItemProps} from '@src/features/list/listApiSlice';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {Text} from 'react-native-paper';

const Details: React.FC<{data: ListItemProps}> = props => {
  const orientation = useDeviceOrientation();
  return (
    <View
      style={
        orientation === 'portrait'
          ? styles.containerPortrait
          : styles.containerLandscape
      }>
      <View style={styles.section}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: props.data.firstPreviewImage.watermarked}}></Image>
      </View>
      <View style={styles.section}>
        <Text variant="titleLarge" style={{textAlign: 'center'}}>
          {props.data.title}
        </Text>
        <Text variant="bodyMedium">{props.data.author.details.publicName}</Text>
        <View>
          <Text variant="labelLarge">{props.data.price} €</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPortrait: {
    flex: 1,
    flexDirection: 'column',
  },
  containerLandscape: {
    flex: 1,
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Details;
