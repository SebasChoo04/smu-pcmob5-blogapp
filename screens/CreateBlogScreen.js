import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";

export default function CreateBlogScreen({ navigation, route }) {

  const [user, setUser] = useState('')
  const [title , setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setUser(route.params.username)
  }, [])

  function savePost(){
    axios
    .post('http://saltyseb.pythonanywhere.com/blogs', {
      "author": user,
      "text": content,
      "title": title
    })
    .then(response => {
      console.log(response.data)
      navigation.navigate("Blog", { blogs: response.data["Data"] })
    })
    .catch(error => {
      if (error.response.status == 400) {
        console.log("Wrong data format")
      }
    })
  }

  return (
    <View>
        <Text style={styles.label}>Enter Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Text style={styles.label}>Enter Content:</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={text => setContent(text)}
        />
        <Button
          title="Save Blog Post"
          onPress={savePost}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5
  }
});