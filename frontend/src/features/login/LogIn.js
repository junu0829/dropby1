import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import { theme } from "../../infrastructure/theme";
import LoadIcon from "../../../assets/LoadIcon";
import { SvgXml } from "react-native-svg";
import LetsDrop from "../../../assets/LetsDrop";
import { FadeInView } from "../../components/animations/fade.animation";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
export const LogIn = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("");

  const signup = async (userData) => {
    const response = await axios({
      method:"post",
      url:"http://172.30.3.88:3000/auth/signup",
      data:userData,
      withCredentials:true,
    })
    .then((res) => {
      console.log(res);
      const accessToken = res.data.access;
      const refreshToken = res.data.refresh;
      AsyncStorage.setItem('accessToken', accessToken);
      AsyncStorage.setItem('refreshToken', refreshToken);
      console.log('token saved in asyncstorage');
    }).catch((error) => {
      console.log(error.message);
    });
    
    return response;

    }
  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={[
          theme.colors.bg.a,
          theme.colors.bg.b,
          theme.colors.bg.c,
          theme.colors.bg.d,
        ]}
        start={{ x: 0.99, y: 0.01 }}
        end={{ x: 0.01, y: 0.99 }}
        locations={[0.0, 0.5, 0.8, 1.0]}
      >
        <FadeInView>
          <View style={styles.container2}>
            <SvgXml xml={LoadIcon} width={72} height={123} />
          </View>
          <View style={styles.container4}>
            <TextInput onChangeText={username => setUsername(username)} style={styles.input} placeholder="username" />
          </View>
          <View style={styles.container4}>
            <TextInput onChangeText={email => setEmail(email)} style={styles.input} placeholder="email" />
          </View>
          <View style={styles.container4}>
            <TextInput onChangeText={password => setPassword(password)} style={styles.input} placeholder="password" />
          </View>

          <View style={styles.container3}>
            <TouchableOpacity onPress={() => signup({username, email, password})}>
              <SvgXml xml={LetsDrop} width={231} height={47} />
            </TouchableOpacity>
          </View>
        </FadeInView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  container2: {
    flex: 7,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container3: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container4: {
    flex: 5,
  },
  input: {
    backgroundColor:'white',
    flex:9,
  }
});
