import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function BlogsDetailsScreen({ route }) {

  const [post, setPost] = useState({})

  useEffect(() => {
    setPost(route.params.post)
  }, [])

  return (
    <View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.text}</Text>
      <Text style={styles.author}>Written By: {post.author}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30, 
    textAlign: 'center',
    marginTop: 20, 
  },
  content: {
    fontWeight: '400',
    fontSize: 24, 
    marginTop: 30,
    marginLeft: 20, 
    marginRight: 20,
  },
  author: {
    fontWeight: '200',
    fontSize: 15, 
    marginTop: 30,
    marginLeft: 20, 
    marginRight: 20,
  }
});