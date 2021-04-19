import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, Keyboard } from 'react-native';

export default function App() {
  const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 12) + 1);
  return (
    <View style={styles.container}>
      <Text>{randomValue}</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputBox}></TextInput>
        <Button
        title="Enter" 
        onPress={() => setRandomValue(Math.floor(Math.random() * 12) + 1)}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
