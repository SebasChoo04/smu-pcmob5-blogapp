import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Feather } from "@expo/vector-icons";

export default function BlogScreen({ route, navigation }) {

  const [blogs, setBlogs] = useState({})

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Create", {username: route.params.username})}>
        <Feather name="plus" size={30} style={{marginRight: 10}} />
      </TouchableOpacity>
      )  
    });
  })

  useEffect(() => {
    axios
    .get('http://saltyseb.pythonanywhere.com/blogs')
    .then(response => {
      console.log(response.data)
      setBlogs(response.data)
    })
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    setBlogs(route.params.blogs)
  }, [route.params?.blogs])

  function deleteBlogPost(id) {
    axios
    .delete(`http://saltyseb.pythonanywhere.com/blogs?id=${id}`)
    .then(response => {
      console.log(response.data)
      setBlogs(response.data["Data"])
    })
    .catch(error => {
      switch (error.response.status) {
        case 400: 
          console.log("No id given")
          break;
        case 404: 
          console.log("Blog not found")
          break;
        default:
          break;
      }
    })
  }

  function onPress() {
    
    // var blog;
    // for (blog in blogs) {
    //   console.log(blog)
    // }
  }

  return (
    <View>
      <FlatList
        data={blogs}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              id={item.id}
              onPress={() => { 
                var currentBlog;
                blogs.map(x => {
                  if (x.id == item.id) {
                    currentBlog = x
                    console.log(x)               
                  }
                })
                navigation.navigate("Post", { post: currentBlog })
              }}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title}
                </Text>
                <TouchableOpacity
                  onPress={() => deleteBlogPost(item.id)}
                >
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray"
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
});