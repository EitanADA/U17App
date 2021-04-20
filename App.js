import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, Keyboard } from 'react-native';

export default function App() {
  const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 12) + 1);
  const [randomValue2, setRandomValue2] = useState(Math.floor(Math.random() * 12) + 1);
  const [randomSymbol, setRandomSymbol] = useState(Math.floor(Math.random() * 3));
  const symbolTypes = ["+","-","*","/"]

  function newNumbers() {
    setRandomValue(Math.floor(Math.random() * 12) + 1);
    setRandomValue2(Math.floor(Math.random() * 12) + 1);
    setRandomSymbol(Math.floor(Math.random() * 4));

  }

  if (randomSymbol == 1 || randomSymbol == 3) {
    if (randomValue2 > randomValue) {
      newNumbers()
    }
    else if (randomSymbol == 3 && randomValue2 % randomValue != 0) {
      newNumbers()
    }
  }

  return (
    <View style={styles.container}>
      <Text>{randomValue} {symbolTypes[randomSymbol]} {randomValue2}</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputBox}></TextInput>
        <Button
        title="Enter" 
        onPress={newNumbers}
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
