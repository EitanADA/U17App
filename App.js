import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, Keyboard, } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Maths Game</Text>
    </View>
  );
}

function LevelPage({ navigation }) {
  return (
    <Button
      title="Level 0"
      onPress={() =>
        navigation.navigate('QuestionPage')
      }
    />
  );
}

function QuestionPage({ navigation }) {
 
  const [text, setText] = useState('');
  const [question, setQuestion] = useState({
    "randomValue" : null,
    "randomValue2" : null,
    "randomSymbol" : null,
  });
  const symbolTypes = ["+","-","×","÷"];
  const [solution, setSolution] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  function checkAnswer() {
    if (userAnswer == solution){
      setFeedback('correct 🎉');
      setTimeout(function(){setUserAnswer("")}, 1000);
      setTimeout(function(){setFeedback('')}, 1000);
      setTimeout(function(){newNumbers()}, 1100);
    }
    else {
      setFeedback('incorrect ❌')
      setTimeout(function(){setUserAnswer("")}, 1000);
      setTimeout(function(){setFeedback('')}, 1000);
    }
  }
  
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
      value={userAnswer}
      placeholder="Enter your answer here!"
      onChangeText={userAnswer => setUserAnswer(userAnswer)}
      defaultValue={text}
      autoFocus={true}
      keyboardType={'numeric'}>
      </TextInput>
      <Button
      title="Enter" 
      onPress={checkAnswer}
      />
    </View>
  <Text>{ feedback }</Text>
  <StatusBar style="auto" />
  </View>
  );
}

function ScorePage({ navigation }) {

}

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={LevelPage}
        options={{ title: 'Welcome' }}
        />
        
      </Stack.Navigator>
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