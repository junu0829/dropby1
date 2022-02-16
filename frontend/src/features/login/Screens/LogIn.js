import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { theme } from "../../../infrastructure/theme";
import LoadIcon from "../../../../assets/images/LoadIcon";
import { SvgXml } from "react-native-svg";

import LetsDrop from "../../../../assets/Buttons/LetsDrop";
import { FadeInView } from "../../../components/animations/fade.animation";

export const LogIn = ({ navigation }) => {

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("");

  const handleNickname = (e) => {
    setNickname(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const signup = async (userData) => {
    console.log('signup clicked');
    const response = await axios('http://192.168.0.18:3000/auth/signup', {
      method:"POST",
      headers:{
        'Accept':'application/json',
        "Content-Type":"application/json"},
      data:{
        nickname,
        email,
        password
      }
    }).then((res) => {
      console.log(res.data);
      console.log(res.data.data.tokens);
      const accessToken = res.data.data.tokens.access;
      const refreshToken = res.data.data.tokens.refresh;
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
            <TextInput onChangeText={nickname => handleNickname(nickname)} style={styles.input} placeholder="username" />
          </View>
          <View style={styles.container4}>
            <TextInput onChangeText={email => handleEmail(email)} style={styles.input} placeholder="email" />
          </View>
          <View style={styles.container4}>
            <TextInput onChangeText={password => handlePassword(password)} style={styles.input} placeholder="password" />
          </View>

          <View style={styles.container3}>
            <TouchableOpacity onPress={() =>{
              signup();
              navigation.navigate("MapScreen")
              }}>
              <SvgXml xml={LetsDrop} width={231} height={47} />
            </TouchableOpacity>
          </View>
        </FadeInView>
      </LinearGradient>
    </>
  );
};
 //handleEvent 참고. + 인자 없이 
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
