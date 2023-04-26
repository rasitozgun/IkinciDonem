import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState(30);
  const [city, setCity] = useState("New York");
  const [neighborhood, setNeighborhood] =
    useState("Manhattan");
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  );

  const handleEditProfile = () => {
    // Navigate to the Edit Profile page
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profilePic }}
        style={styles.profilePic}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>
        {age} years old
      </Text>
      <Text style={styles.details}>
        Lives in {city}, {neighborhood}
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEditProfile}
      >
        <Text style={styles.editButtonText}>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfilePage;
