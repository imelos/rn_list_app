import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Navigation from '@src/navigation/Navigation';
// import {COLORS} from '@src/colors';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
