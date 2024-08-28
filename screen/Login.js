import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axios from "axios";

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, [visible]);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("/", { name: "Admin" });
    }
  };

  function handleLogin() {
    setLoading(true);
    axios
      .post(`${BASE_URL}admin/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        AsyncStorage.setItem("token", res.data.token);
        setLoading(false);
        navigation.navigate("/", { name: "Admin" });
      })
      .catch((err) => {
        console.error(err);
        setVisible(true);
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1498612753354-772a30629934?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGFic3RyYWN0JTIwYmFja2dyb3VuZCUyMGdyZWVufGVufDB8fDB8fHww",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcom Admin</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            inputMode="email"
            leading={(props) => <Icon name="account" {...props} />}
            style={styles.input}
            color="black"
            inputContainerStyle={{
              backgroundColor: "#DAE6DE",
              borderRadius: 30,
            }}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            inputMode="password"
            leading={(props) => <Icon name="key" {...props} />}
            style={styles.input}
            color="black"
            inputContainerStyle={{
              backgroundColor: "#DAE6DE",
              borderRadius: 30,
            }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.rememberContainer}>
          <TouchableOpacity style={styles.rememberButton}>
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have account?</Text>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
    opacity: 0.3,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    zIndex: 99,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderRadius: 40,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    width: "80%",
  },
  rememberButton: {
    padding: 8,
  },
  rememberText: {
    fontSize: 14,
    color: "#666",
  },
  forgotButton: {
    padding: 8,
  },
  forgotText: {
    fontSize: 14,
    color: "#666",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
  },
  signupButton: {
    marginLeft: 4,
  },
  signupButtonText: {
    fontSize: 14,
    color: "#4CAF50",
  },
  backarrow: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#DAE6DE",
    zIndex: 99,
    padding: 10,
    borderRadius: 50,
  },
  backarrowIcon: {
    fontSize: 24,
  },
});

export default Forgot;
