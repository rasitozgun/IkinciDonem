import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";

const CustomerBarberPage = ({ navigation, route }) => {
  const [services, setServices] = useState([]);
  const { barberId } = route.params;

  useEffect(() => {
    getServices();
  }, []);

  async function getServices() {
    try {
      let { data, error, status } = await supabase
        .from("services")
        .select("*")
        .eq("barber_id", barberId);

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

  const handleSelectDateTime = (serviceId) => {
    navigation.navigate("BarberDateTime", { barberId, serviceId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Berber Hizmetleri</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => handleSelectDateTime(item.id)}
          >
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>Price: ${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
    color: "#333333",
  },
  serviceItem: {
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  servicePrice: {
    fontSize: 14,
    color: "#666666",
  },
});

export default CustomerBarberPage;
