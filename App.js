import React from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import Navigation from './Navigation/Navigation'
import {Provider} from 'react-redux'
import Store from './Store/configureStore'
//import Search from './components/Search'
export default function App() {
  return (
    /*<View style={styles.container}>
      <Text>hell yeah !</Text>
    </View>*/
    <Provider store={Store}>
    <Navigation/>
    </Provider>
//    <Search/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
