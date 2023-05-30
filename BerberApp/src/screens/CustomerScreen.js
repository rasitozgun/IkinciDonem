import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

const CustomerScreen = ({ navigation }) => {
  const [shopProfile, setShopProfile] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const { signOut, session } = useContext(AuthContext);

  const handleEditProfile = () => {
    // Navigate to the edit profile screen
    navigation.navigate("BarberEditProfile");
  };

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("users")
        .select(`id, name, phone_number, email`)
        .eq("id", session.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setShopProfile({
          name: data.name,
          address: data.address,
          email: data.email,
          phoneNumber: data.phone_number,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  const handleSignOut = () => {
    // Perform sign-out functionality
    signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Bervu</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Kullanıcı Profili</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>İsim:</Text>
        <Text style={styles.value}>{shopProfile.name}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>E-posta:</Text>
        <Text style={styles.value}>{session?.user?.email}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Telefon Numarası:</Text>
        <Text style={styles.value}>{shopProfile.phoneNumber}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Profili Düzenle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#ffffff",
  },
  navbar: {
    backgroundColor: "#ffaa00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  signOutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffaa00",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    marginHorizontal: 16,
    color: "#333333",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: "#666666",
  },
  editButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffaa00",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CustomerScreen;
