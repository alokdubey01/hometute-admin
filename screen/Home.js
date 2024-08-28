import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Divider, List } from "react-native-paper";
import { Box, Stack } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../config";

export default function Home({ navigation }) {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${BASE_URL}admin`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="teal" />
      </View>
    );
  }

  if (!data) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 18 }}>Failed to load data</Text>
      </View>
    );
  }

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
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Hello, Admin</Text>
        <Avatar.Text size={40} label="AD" backgroundColor="teal" />
      </Stack>
      <Stack
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={styles.box}
          onPress={() =>
            navigation.navigate("HomeDetails", { data: data.allStudents })
          }
          android_ripple={{ color: "rgba(0,0,0,0.1)" }}
        >
          <Stack
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 50,
                color: "teal",
              }}
              name="account"
              size={24}
              color="black"
            />
            <Text style={{ fontWeight: "600", fontSize: 22 }}>
              {data.studentCount}
            </Text>
          </Stack>
          <Text style={{ fontWeight: "600", fontSize: 16, marginTop: 10 }}>
            Total Students
          </Text>
        </Pressable>
        <Pressable
          style={styles.box}
          onPress={() =>
            navigation.navigate("HomeDetails", { data: data.allTeachers })
          }
        >
          <Stack
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 50,
                color: "teal",
              }}
              name="account-filter"
              size={24}
              color="black"
            />
            <Text style={{ fontWeight: "600", fontSize: 22 }}>
              {data.teacherCount}
            </Text>
          </Stack>
          <Text style={{ fontWeight: "600", fontSize: 16, marginTop: 10 }}>
            Total Teachers
          </Text>
        </Pressable>
        <Pressable style={styles.box}>
          <Stack
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 50,
                color: "teal",
              }}
              name="account-alert"
              size={24}
              color="black"
            />
            <Text style={{ fontWeight: "600", fontSize: 22 }}>
              {data.unverifiedTeachers.length}
            </Text>
          </Stack>
          <Text style={{ fontWeight: "600", fontSize: 16, marginTop: 10 }}>
            Unverified IDs
          </Text>
        </Pressable>
        <Pressable style={styles.box}>
          <Stack
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 50,
                color: "teal",
              }}
              name="cash"
              size={24}
              color="black"
            />
            <Text style={{ fontWeight: "600", fontSize: 22 }}>
              {data.totalAmount}
            </Text>
          </Stack>
          <Text style={{ fontWeight: "600", fontSize: 16, marginTop: 10 }}>
            Transactions
          </Text>
        </Pressable>
      </Stack>
      <Divider style={{ marginVertical: 20 }} />
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          All Transactions
        </Text>
        {data.allTransactions.map((activity, index) => (
          <List.Item
            key={index}
            title={activity.name}
            description={"₹" + activity.amount + " - " + activity.status}
            left={(props) => <List.Icon {...props} icon="cash-multiple" />}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 10,
    width: "47%",
  },
});
