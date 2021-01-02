import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function signup() {
    axios
    .post(`http://saltyseb.pythonanywhere.com/users`, {
      "username": username, 
      "password": password
    })
    .then(response => {
      console.log(response.data)
      navigation.navigate('Blog', {username: username})
    })
    .catch(error => {
      console.log(error)
      switch (error.response.status) {
        case 400: 
          console.log("Wrong Data Format")
          break;
        case 409: 
          setErrorMessage("User already exists")
          break;
        default:
          break;
      }
    })
  }
  function signin() {
    axios
    .get(`http://saltyseb.pythonanywhere.com/users?username=${username}`)
    .then(response => {
      console.log(response.data)
      if (password == response.data["password"]) {
        navigation.navigate('Blog', {username: username})
      } else if (password != response.data["password"]) {
        setErrorMessage("You have entered the wrong password")
      }
    })
    .catch(error => {
      console.log(error)
      if (error.response.status == 404) {
        setErrorMessage("User does not exist")
      }
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Blog App</Text>
        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          value={username}
          placeholder={'Enter username here'}
          onChangeText={(input) => setUsername(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          placeholder={'Enter password here'}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <TouchableOpacity onPress={signup} style={styles.loginButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    height: 40,
  },
});