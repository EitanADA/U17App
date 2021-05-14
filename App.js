import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, Keyboard, Dimensions, Platform, PixelRatio, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { diff } from 'react-native-reanimated';;
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  FredokaOne_400Regular 
} from '@expo-google-fonts/fredoka-one'
import { 
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic 
} from '@expo-google-fonts/nunito'

function HomeScreen({ navigation }) {
  
  function calcSize(size) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320)) - 2
    }
  }

  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Nunito_400Regular,});
  
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
      <View style={{flex: 1, backgroundColor: "#75DDDD", alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: "FredokaOne_400Regular", color: "white", fontSize: calcSize(40)}}>Maths Master</Text>
        <TouchableOpacity>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(35)}}
        onPress={() =>
          navigation.navigate('Levels')
        }>Play</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

function LevelPage({ navigation }) {
  return (
    <View>
    <Button
      title="Easy"
      onPress={() =>
        navigation.navigate('Questions', {timer: -1,})
      }
    />
    <Button
      title="Medium"
      onPress={() =>
        navigation.navigate('Questions', {timer: 20,})
      }
    />
    <Button
      title="Hard"
      onPress={() =>
        navigation.navigate('Questions', {timer: 10,})
      }
    />
    </View>
  );
}

function QuestionPage({ route, navigation }) {
  const { timer } = route.params;
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
  const [displayTimer, setDisplayTimer] = useState(JSON.stringify(Number(timer)));
  const [isVisible, setIsVisible] = useState(true);
  var t = null
  //keep count of the questions
  const [questionCount, setQuestionCount] = useState(0);
  //count the questions correctly answered
  const [correctCount, setCorrectCount] = useState(0);

  function newNumbers() {
    let num1 = Math.floor(Math.random() * 12) + 1;
    let num2 = Math.floor(Math.random() * 12) + 1;
    let sym =  Math.floor(Math.random() * 4);
    setQuestion({"randomValue" : num1,
    "randomValue2" : num2,
    "randomSymbol" : sym,
    })
    if (timer < 0) {
      setIsVisible(false);
    };
  }

  function countdown() {
    if (timer > 0 && displayTimer > 0) {
      t = setTimeout(() => {
        setDisplayTimer((displayTimer) => displayTimer - 1)
      }, 1000)
    } else if (timer > 0 && displayTimer <= 0) {
      clearTimeout(t);
      checkAnswer()
    } else {
        setIsVisible(false);
      };
    }

  useEffect(() => {
    countdown()
  }, [displayTimer]);

  useEffect(() => {
    if (questionCount >= 10){
      navigation.navigate('Scores', {correct: correctCount,})
    }      
  })

  function checkAnswer() {
    setTimeout(function(){setUserAnswer("")}, 1000);
    setTimeout(function(){setFeedback('')}, 1000);
    setTimeout(function(){newNumbers()}, 1100);
    setQuestionCount(questionCount + 1);
    // if (timer > 0) {
    //   setDisplayTimer(timer);
    //   clearTimeout(t);
    // }
    if (userAnswer == solution){
      setDisplayTimer(timer);
      clearTimeout(t);
      setFeedback('correct 🎉');
      setCorrectCount(correctCount + 1)
    }
    else {
      setFeedback('incorrect ❌')
      setDisplayTimer(timer);
      clearTimeout(t);
    }
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
  {isVisible ? <Text style={styles.text}>timer: { displayTimer }</Text> : null}
  <Text>question number: { questionCount + 1 }</Text>
  <Text>questions correct: { correctCount + 1 }</Text>
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
      type="submit"
      />
    </View>
  <Text>{ feedback }</Text>
  {/* <StatusBar style="auto" /> */}
  </View>
  );
}

function ScorePage({ route, navigation }) {
  const { correct } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>You scored: { JSON.stringify(Number(correct)) }/10</Text>
      <Button
      title="Play Again"
      onPress={() =>
        navigation.navigate('Levels')
      }
      />
    </View>
  );
}

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{ title: 'Welcome' }}
        />
        <Stack.Screen
        name="Levels"
        component={LevelPage}
        // options={{ title: 'Welcome' }}
        />
        <Stack.Screen
        name="Questions"
        component={QuestionPage}
        // options={{ title: 'Welcome' }}
        />
        <Stack.Screen
        name="Scores"
        component={ScorePage}
        // options={{ title: 'Welcome' }}
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