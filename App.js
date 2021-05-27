import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, Platform, PixelRatio, TouchableOpacity, Image, } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { Audio } from 'expo-av';
import SoundComponent from './sound';
import wrongSound from './assets/wrong.mp3';
import correctSound from './assets/button.mp3';

import {
  useFonts,
  FredokaOne_400Regular 
} from '@expo-google-fonts/fredoka-one'
import { 
  Nunito_400Regular,
} from '@expo-google-fonts/nunito'

function HomeScreen({ navigation }) {

  const [sound, setSound] = React.useState();
  const [sound2, setSound2] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/whoosh.mp3')
    );
    setSound(sound);
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

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
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(35),paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#ffaa5d",}}
        onPress={() => {
          playSound()
          navigation.navigate('Levels')
          }}>
        Start
        </Text>
        </TouchableOpacity>
        <View>
        <Text>{"\n"}</Text>
      </View>
        <TouchableOpacity>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(25),paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#ffaa5d",}}
        onPress={() => {
          playSound()
          navigation.navigate('Tutorial')
          }}>
        How to Play
        </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

function Tutorial({ navigation }) {

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
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(35),paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#ffaa5d",}}
        onPress={() => {
          playSound()
          navigation.navigate('Levels')
          }}>
        Play
        </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

function LevelPage({ navigation }) {
  function calcSize(size) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320)) - 2
    }
  }
  
  const [sound, setSound] = React.useState();
  const [sound2, setSound2] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/select.mp3')
    );
    setSound(sound);
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  return (

    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: "#FF729F", flex: 1,}}>      
      <View style={{paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#9368B7",}}>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(35),}}>
          Choose a Level:
        </Text>
      </View>
      <View>
        <Text style={{paddingVertical: 20}}>{"\n"}</Text>
      </View>
      <View style={{paddingHorizontal: 30, paddingVertical: 20, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#9368B7", width: '60%',}}>
        <TouchableOpacity
        onPress={() => {
          playSound()
          navigation.navigate('Questions', {timer: -1,})
        }}>
          <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(30),}}>
            Easy
          </Text>
          <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20),}}>No timer</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{"\n"}</Text>
      </View>
      <View style={{paddingHorizontal: 30, paddingVertical: 20, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#9368B7", width: '60%',}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Questions', {timer: 20,})
        }>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(30),}}>
        Medium</Text>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20),}}>20 second timer</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{"\n"}</Text>
      </View>
      <View style={{paddingHorizontal: 30, paddingVertical: 20, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#9368B7", width: '60%',}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Questions', {timer: 10,})
        }>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(30),}}>
        Hard</Text>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20),}}>10 second timer</Text>
      </TouchableOpacity>
    </View>
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

  const [sound, setSound] = useState(false);
  const [sound2, setSound2] = useState(false);

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
    if (questionCount < 10)
    {countdown()}
   }, [displayTimer, questionCount]);

  useEffect(() => {
    if (questionCount >= 10){
      navigation.navigate('Scores', {correct: correctCount,})
    } 
  })

  function checkAnswer() {
    //setTimeout(function(){setFeedback('')}, 1000);
    
    newNumbers();
    if (questionCount < 10) {
    setQuestionCount(questionCount + 1);
    }

    if (timer > 0) {
      setDisplayTimer(timer);
      clearTimeout(t);
    }
    if (userAnswer == solution && userAnswer != null){
      setFeedback('correct 🎉');
      setCorrectCount(correctCount + 1)
      clearTimeout(t);
      setDisplayTimer(timer);
      setSound2(true);
      setUserAnswer("");
    }
    else {
      setFeedback('incorrect ❌')
      clearTimeout(t);
      setDisplayTimer(timer);
      setSound(true);
      setUserAnswer("");
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

  function calcSize(size) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320)) - 2
    }
  }

  return (
  <View style={{flex: 1, backgroundColor: '#F4F1BB', alignItems: 'center', justifyContent: 'center',}}>

  {isVisible ? <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20),}}>timer: { displayTimer }</Text> : null}
  
  <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20),}}>You have got { correctCount }/{ questionCount + 1 } correct</Text>

  <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(60),}}>{question.randomValue} {symbolTypes[question.randomSymbol]} {question.randomValue2}</Text>

    <View style={styles.inputContainer}>
      <TextInput
      value={userAnswer}
      placeholder="Enter your answer here!"
      onChangeText={userAnswer => setUserAnswer(userAnswer)}
      defaultValue={text}
      autoFocus={true}
      keyboardType={'numeric'}
      style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20), borderWidth: 2, borderRadius: 5, borderStyle: 'dashed', textAlign: 'center',}}>
      </TextInput>

      <TouchableOpacity
        onPress={checkAnswer}
        type="submit">
        <Text  
        style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(27), backgroundColor: "#9100da", borderRadius: 20, elevation: 4, textAlign: 'center', padding: 5, color: '#fff',}}>
        Enter</Text>
      </TouchableOpacity> 
    </View>
  <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(25),}}>{ feedback }</Text>

  {sound ? (<SoundComponent sound={wrongSound} soundState={setSound}></SoundComponent>):(null)}
  {sound2 ? (<SoundComponent sound={correctSound} soundState={setSound2}></SoundComponent>):(null)}  
  </View>
  );
}

function ScorePage({ route, navigation }) {

  function calcSize(size) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320)) - 2
    }
  }

  useEffect(() => {
    feedbackImage()
  }, []);

  const { correct } = route.params;

  function feedbackImage(props) {
    if (JSON.stringify(Number(correct)) > 7) {
      return(<Image style={{ width: 200, height: 200 }} source={require('./assets/thumbs_up.png')}/>)
    } else {
      return(<Image style={{ width: 200, height: 200 }} source={require('./assets/thumbs_down.png')}/>);
    }
  }
  
  return (
    <View style={{flex: 1, backgroundColor: '#698F3F', alignItems: 'center', justifyContent: 'center',}}>
      <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(25),}}>You scored:</Text>
      <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(40),}}> { JSON.stringify(Number(correct)) }/10</Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Levels')
        }>
        <Text  
        style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(27), backgroundColor: "#ffaa5d", borderRadius: 20, elevation: 4, textAlign: 'center', padding: 5, color: '#000',}}>
        Play Again</Text>
      </TouchableOpacity>
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
        />
        <Stack.Screen
        name="Tutorial"
        component={Tutorial}
        />
        <Stack.Screen
        name="Levels"
        component={LevelPage}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="Questions"
        component={QuestionPage}
        />
        <Stack.Screen
        name="Scores"
        component={ScorePage}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'dashed',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});