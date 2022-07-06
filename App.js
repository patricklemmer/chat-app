// Gesture handler import (purposly at the top)
import 'react-native-gesture-handler';

// React imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Chat App</Text>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
