import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from "react-native";
import { supabase } from "../lib/supabase";

const CustomerBarberList = ({ navigation }) => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    getBarbers();
  }, []);

  async function getBarbers() {
    try {
      let { data, error } = await supabase.from("barbers").select("*");

      if (error) {
        throw error;
      }

      if (data) {
        setBarbers(data);
      }
    } catch (error) {
      console.log("Error fetching barbers:", error.message);
    }
  }

  const handleSelectBarber = (barberId) => {
    navigation.navigate("BarberPage", { barberId });
  };

  const renderBarberItem = ({ item }) => (
    <TouchableOpacity style={styles.barberItem} onPress={() => handleSelectBarber(item.id)}>
      <ImageBackground
        source={require("../assets/barber.jpg")}
        style={styles.barberImage}
        imageStyle={styles.image}
      >
        <View style={styles.barberOverlay}>
          <Text style={styles.barberName}>{item.name}</Text>
          <Text style={styles.barberAddress}>{item.address}</Text>
          <Text style={styles.barberAddress}>{item.phone_number}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Berberler</Text>
      <FlatList
        data={barbers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBarberItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
    color: "#333333",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  barberItem: {
    marginBottom: 16,
  },
  barberImage: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  image: {
    resizeMode: "cover",
  },
  barberOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 16,
  },
  barberName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  barberAddress: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 8,
  },
});

export default CustomerBarberList;
