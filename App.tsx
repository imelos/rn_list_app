import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {store} from '@src/app/configureStore';
import Navigation from '@src/navigation/Navigation';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider style={styles.container}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
          />
          <Navigation />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
