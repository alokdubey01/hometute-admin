import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Avatar, Stack } from "@react-native-material/core";
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom,
        },
      ]}
    >
     <Stack style={styles.header}>
     <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} style={styles.image} />
     <Text style={styles.title}>Admin</Text>
        </Stack>
      <ListItem
      title="Personal Information"
      leading={<Icon name="inbox" size={24} />}
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <ListItem
      title="Change Password"
      leading={<Icon name="key" size={24} />}
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <ListItem
      title="Privacy"
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <ListItem
      title="Help & Support"
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <ListItem
      title="Logout"
      onPress={() => {
        AsyncStorage.removeItem("token");
        navigation.navigate("Login");
      }}
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <Text style={styles.version}>v 0.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    marginTop: 20,
  },
    header: {
        alignItems: "center",
    },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  version: {
    fontSize: 14,
    color: "gray",
    marginTop: 20,
    textAlign: "center",
  },
});
