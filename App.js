import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, Keyboard } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [question, setQuestion] = useState({
    "randomValue" : null,
    "randomValue2" : null,
    "randomSymbol" : null,
  });
  const symbolTypes = ["+","-","×","÷"];
  const [solution, setSolution] = useState('');
  
  function newNumbers() {
    let num1 = Math.floor(Math.random() * 12) + 1;
    let num2 = Math.floor(Math.random() * 12) + 1;
    let sym =  Math.floor(Math.random() * 4);
    setQuestion({"randomValue" : num1,
    "randomValue2" : num2,
    "randomSymbol" : sym,
    })
  }

  useEffect(() => {
    newNumbers()  
  }, [])

  useEffect(() => {
    if (question.randomSymbol == 0) {
      setSolution(question.randomValue + question.randomValue2);
    } else if (question.randomSymbol == 1 && question.randomValue2 <= question.randomValue) {
      setSolution(question.randomValue - question.randomValue2);
    } else if (question.randomSymbol == 2) {
      setSolution(question.randomValue * question.randomValue2);
    } else if (question.randomSymbol == 3 && Math.trunc((question.randomValue / question.randomValue2)) == (question.randomValue / question.randomValue2)) {
      setSolution(question.randomValue / question.randomValue2);
    } else {
      newNumbers()
    }
  }, [question])

  return (
    <View style={styles.container}>
      
      <Text>{question.randomValue} {symbolTypes[question.randomSymbol]} {question.randomValue2}</Text>
      <Text>{ solution }</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputBox}
        placeholder="Enter your answer here!"
        onSubmitEditing={text => setText(text)}
        defaultValue={text}></TextInput>
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
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});