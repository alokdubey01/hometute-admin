import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@react-native-material/core";
import { Modal, Portal, Button, PaperProvider } from "react-native-paper";

export default function HomeData({ navigation, route }) {
  const { data } = route.params;
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <ScrollView style={styles.container}>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
            <Text>Alok Dubey</Text>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      {data.map((item, index) => (
        <ListItem
          key={index}
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri:
                  item.imageUrl || "https://mui.com/static/images/avatar/1.jpg",
              }}
            />
          }
          title={item.firstName + " " + item.lastName || "Default Title"}
          secondaryText={item.phoneNumber || "Default secondary text"}
          onPress={showModal}
          //   onPress={() => navigation.navigate("HomeDetails", { item })}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
