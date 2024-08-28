import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Login from './screen/Login';
import Home from './screen/Home';
import BottomNav from './BottomNav';
import Notifications from './screen/Notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeData from './screen/HomeData';
import Forgot from './screen/Forgot';
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <PaperProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={Login}
            options={
              {
                headerShown: false,
              }
            }
          />
          <Stack.Screen
            name="Forgot"
            component={Forgot}
            options={
              {
                headerShown: false,
              }
            }
          />
          <Stack.Screen name="/" component={BottomNav} options={
            {
              headerShown: false,
            }
          } />
          <Stack.Screen name="HomeDetails" component={HomeData} options={
            {
              headerTitle: "Details",
              headerBackTitle: "Back",
            }
          } />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Notifications/> */}
    </PaperProvider>
    </SafeAreaProvider>
  );
}
