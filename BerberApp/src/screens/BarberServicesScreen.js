import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const { session, setLoading } = useContext(AuthContext);

  const handleEditService = (serviceId) => {
    // Navigate to the edit service screen with the serviceId
    navigation.navigate("BarberEditService", { serviceId });
  };

  useEffect(() => {
    if (session) getServices();
  }, [session]);

  async function getServices() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("services")
        .select(`id ,name, price`)
        .eq("barber_id", session.user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setServices(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  const handleAddService = () => {
    navigation.navigate("BarberAddService");
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Bervu</Text>
      </View>
      <Text style={styles.title}>Servisler</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
        <Text style={styles.addButtonText}>Add Service</Text>
      </TouchableOpacity>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceItem} onPress={() => handleEditService(item.id)}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>TL {item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
    color: "#333333",
  },
  addButton: {
    marginTop: 12,
    paddingVertical: 12,
    marginVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffaa00",
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  servicePrice: {
    fontSize: 16,
    color: "#666666",
  },
});

export default ServicesScreen;
