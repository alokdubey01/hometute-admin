import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Box, Snackbar, Stack } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Notifications() {
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
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, }}>Notifications</Text>
      <ScrollView style={{ flex: 1 }}>
      {[1, 2, 3, 4, 5,6,7,8,9,10,11,12].map((item) => (
        <View key={item} style={styles.box}>
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="bell" size={16} color="gray" />
              <Text style={{ fontSize: 16 }}>{item}</Text>
            </Stack>
            <Stack
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <Box
                style={{
                  backgroundColor: "teal",
                  borderRadius: 5,
                  height: 5,
                  width: 5,
                }}
              />
              <Text style={{ fontSize: 16, textTransform: "lowercase" }}>
                Completed
              </Text>
            </Stack>
          </Box>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            Notification {item}
          </Text>
          <Stack
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16 }}>For Alok Dubey</Text>
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#777" }}>
              3min ago
            </Text>
          </Stack>
        </View>
      ))}
      </ScrollView>
      <Button mode="contained" style={styles.button}>
        Add Notification
      </Button>
    </View>
  );
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  box: {
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderColor: getRandomColor(),
    marginVertical: 5,
    borderLeftWidth: 5,
    borderRadius: 5,
  },
  button: {
    position: "absolute",
    bottom: 10,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
