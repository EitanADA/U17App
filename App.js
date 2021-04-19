import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Question would go here</Text>
      <TextInput style={styles.inputBox}></TextInput>
      <Button 
      title="Enter"
      onPress={() => Alert.alert('Button pressed')}
      />
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
  }
});
