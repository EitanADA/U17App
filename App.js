import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, Platform, PixelRatio, TouchableOpacity, Image, } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { Audio } from 'expo-av';
//import the component that loads sounds from an external file
import SoundComponent from './sound';
//the sound files that aren't played async need to be loaded as components from the local files
import wrongSound from './assets/wrong.mp3';
import correctSound from './assets/button.mp3';

//this uses fonts from google fonts, ensure they work cross platform and they are web friendly
import {
  useFonts,
  FredokaOne_400Regular 
} from '@expo-google-fonts/fredoka-one'
import { 
  Nunito_400Regular,
} from '@expo-google-fonts/nunito'

//this is the first screen of the 
function HomeScreen({ navigation }) {

  const [sound, setSound] = React.useState();
  // const [sound2, setSound2] = React.useState();

  //this will load the sound and play it when it has loaded
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/whoosh.mp3')
    );
    setSound(sound);
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
        //unload the sound when it is finished playing
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  //this function will make the font a size that is reponsive to the size of the screen
  function calcSize(size) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(size * Dimensions.get('window').width / 320)) - 2
    }
  }

  //this will load the fonts from google fonts, using the package expo-fonts
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Nunito_400Regular,});
  
    //if the fonts haven't loaded yet, the aoo should show a loading screen
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      //when the fonts have loaded in, the rest of the document will be rendered
      return (
      <View style={{flex: 1, backgroundColor: "#75DDDD", alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: "FredokaOne_400Regular", color: "white", fontSize: calcSize(40)}}>Maths Master</Text>
        {/* buttons cannot be styled so you have to make your own by using the TouchableOpacity component */}
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
          {/* there is no conventional way to do a line break so this is used instead */}
        <Text>{"\n"}</Text>
      </View>
        <TouchableOpacity>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(25),paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#ffaa5d",}}
        onPress={() => {
          //this will call the playSound function declared previously
          playSound()
          //this willmove to the tutorial screen
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
  //this is repeated from the previous screen
  const [sound, setSound] = React.useState();
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

  //repeated from previous screen
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
      <View style={{flex: 1, backgroundColor: "#0099cc", alignItems: 'center', justifyContent: 'center',}}>
        <Text style={{fontFamily: "Nunito_400Regular", color: "white", fontSize: calcSize(30), marginRight: 30, marginLeft: 30,}}>How to Play:</Text>
        <Text>{"\n"}</Text>
        <Text style={{fontFamily: "Nunito_400Regular", color: "white", fontSize: calcSize(15), marginRight: 30, marginLeft: 30,}}>You will be asked 10 arithmetic questions.</Text>
        <Text>{"\n"}</Text>
        <Text style={{fontFamily: "Nunito_400Regular", color: "white", fontSize: calcSize(15), marginRight: 30, marginLeft: 30,}}>Write the answer in the box below the question, and press the "Enter" button next to the box.</Text>
        <Text>{"\n"}</Text>
        <Text style={{fontFamily: "Nunito_400Regular", color: "white", fontSize: calcSize(12), marginRight: 30, marginLeft: 30,}}>If you choose "Medium" or "Hard" levels, then there will be a timer above the question. Try to answer before it runs out</Text>
        <Text>{"\n"}</Text>
        <Text style={{fontFamily: "Nunito_400Regular", color: "white", fontSize: calcSize(17), marginRight: 30, marginLeft: 30,}}>Good luck and have fun!</Text>
        <Text>{"\n"}</Text>
        <TouchableOpacity>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(35),paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 4, textAlign: 'center', backgroundColor: "#cc3300",}}
        onPress={() => {
          playSound()
          navigation.navigate('Levels')
          }}>
            {/* this will navigate to the next level selection screen */}
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
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(35), color: 'white'}}>
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
          // easy mode will use -1 to logically declare that eh timer shouldn't be used
          navigation.navigate('Questions', {timer: -1,})
        }}>
          <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(30), color: 'white'}}>
            Easy
          </Text>
          <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20), color: 'white'}}>No timer</Text>
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
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(30), color: 'white'}}>
        Medium</Text>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20), color: 'white'}}>20 second timer</Text>
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
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(30), color: 'white'}}>
        Hard</Text>
        <Text style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(20), color: 'white'}}>10 second timer</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

function QuestionPage({ route, navigation }) {
  // routes are used to accept the selected difficulty from the previous screen, by using the amount of time on the time
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
    
    newNumbers();
    if (questionCount < 10) {
    setQuestionCount(questionCount + 1);
    }

    if (timer > 0) {
      clearTimeout(t);
      setDisplayTimer(timer);
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
      style={{fontFamily: "Nunito_400Regular", fontSize: calcSize(14), borderWidth: 2, borderRadius: 5, borderStyle: 'dashed', textAlign: 'center', marginRight: 30, marginLeft: 20,}}>
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
