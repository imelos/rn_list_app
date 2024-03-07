import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {ListItemProps} from '@src/features/list/listApiSlice';

import ListScreen from '@src/screens/ListScreen';
import DetailsScreen from '@src/screens/DetailsScreen';

export type RootStackParamList = {
  list: undefined;
  details: {
    data: ListItemProps;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
export type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="list" component={ListScreen} />
        <RootStack.Screen name="details" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
