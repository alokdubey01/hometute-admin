import axios from "axios";
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from "react-native";
import { Avatar, Button, Dialog, Portal, Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import {BASE_URL} from '../config';

export default function ID() {
  const insets = useSafeAreaInsets();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [visibleSnac, setVisibleSnac] = React.useState(false);
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const onToggleSnackBar = () => setVisibleSnac(!visibleSnac);
  const onDismissSnackBar = () => setVisibleSnac(false);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const fetchData = async () => {
    setLoading(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ).start();
    
    try {
      const res = await axios.get(`${BASE_URL}admin/unverifiedTeachers`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      rotateAnim.stopAnimation();
    }
  };


  React.useEffect(() => {
    fetchData();
  }, [visibleSnac]);

  React.useEffect(() => {
    setTimeout(() => {
      setVisibleSnac(false);
    }, 2000);
  }, [visibleSnac]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
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
      <TouchableOpacity style={styles.fabIcon} onPress={fetchData}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Ionicons name="reload" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
      <Snackbar
        visible={visibleSnac}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            // Do something
          },
        }}
        style={{zIndex: 999}}>
        Teacher verified successfully!
      </Snackbar>
      <Text style={styles.title}>Pending Verifications</Text>
      <ScrollView style={styles.cardContainer}>
        {data.map((dentist, index) => (
          <DentistCard key={index} {...dentist} onToggleSnackBar={onToggleSnackBar} />
        ))}
      </ScrollView>
    </View>
  );
}

const DentistCard = ({
  index,
  uid,
  firstName,
  lastName,
  governmentIdNumber,
  houseNumber,
  area,
  imageUrl,
  governmentIdImage,
  governmentIdType,
  onToggleSnackBar
}) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/admin/verifyTeacher`, {
        id: uid,
      });
      hideDialog();
      onToggleSnackBar();
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{firstName} {lastName}</Dialog.Title>
          <Dialog.Content>
            <Image
              source={{ uri: governmentIdImage }}
              style={styles.dialogImage}
              resizeMode="cover"
            />
            <Text style={styles.dialogText}>Government ID Type: {governmentIdType}</Text>
            <Text style={styles.dialogText}>Government ID Number: {governmentIdNumber}</Text>
            <Text style={styles.dialogText}>House Number: {houseNumber}</Text>
            <Text style={styles.dialogText}>Area: {area}</Text>
            <Button mode="contained" onPress={handleVerify} style={styles.button}>
              Verify
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <TouchableOpacity onPress={showDialog}>
        <View style={styles.imageContainer}>
          <Avatar.Image
            source={{ uri: imageUrl ?? "https://www.w3schools.com/howto/img_avatar.png" }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.details}>Government ID Number: {governmentIdNumber}</Text>
          <Text style={styles.details}>House Number: {houseNumber}</Text>
          <Text style={styles.details}>Area: {area}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  profession: {
    fontSize: 14,
    marginBottom: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
  },
  locationIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  location: {
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  starIcon: {
    width: 15,
    height: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    margin: 10,
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 15,
    color: '#555',
  },
  dialogImage: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
  },
  dialogText: {
    marginVertical: 4,
  },
  button: {
    marginTop: 10,
  },
  fabIcon: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    zIndex: 100,
  },
});
