import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import {store} from '@src/app/configureStore';

import Navigation from '@src/navigation/Navigation';
// import {COLORS} from '@src/colors';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
