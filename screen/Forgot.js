import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axios from "axios";
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState("");
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

  const openMailApp = async () => {
    try {
      if (Platform.OS === 'android') {
        const activityAction = 'android.intent.action.MAIN';
        const intentParams = {
          category: 'android.intent.category.APP_EMAIL',
          flags: 268435456, // FLAG_ACTIVITY_NEW_TASK
        };
  
        await IntentLauncher.startActivityAsync(activityAction, intentParams);
        console.log('Mail app opened');
      } else {
        console.log('This method is mainly for Android. For iOS, use Linking.');
      }
    } catch (error) {
      console.error('An error occurred while launching the intent:', error);
    }
  };

  function handleForgot() {
    setLoading(true);
    if (email === '') {
      Alert.alert('Error', 'Email is required');
      setLoading(false);
      return;
    }
    axios
      .post(`${BASE_URL}admin/forgotPassword`, {
        email: email,
      })
      .then((res) => {
        setLoading(false);
        Alert.alert('Success', res.data.message);
        openMailApp();
      })
      .catch((err) => {
        console.error(err);
        setVisible(true);
        setLoading(false);
        Alert.alert('Error', err.response.data.message);
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backarrow}
        onPress={() => 
          navigation.goBack()
        }
      >
        <Entypo name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <Image
        // source={require('./green-leaves.jpg')} // Replace with your image path
        source={{
          uri: "https://images.unsplash.com/photo-1712540457257-88a5892e2234?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eWVsbG93JTIwbmF0dXJlfGVufDB8fDB8fHww",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Generate a token?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            inputMode="email"
            leading={(props) => <Icon name="account" {...props} />}
            style={styles.input}
            color="black"
            inputContainerStyle={{
              backgroundColor: "#fee8aa",
              borderRadius: 30,
            }}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleForgot}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Remember your password?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fee8aa",
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
    backgroundColor: "#E2A602",
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
    color: "teal",
  },
  backarrow: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#fee8aa",
    zIndex: 99,
    padding: 10,
    borderRadius: 50,
  },
  backarrowIcon: {
    fontSize: 24,
  },
});

export default Forgot;
