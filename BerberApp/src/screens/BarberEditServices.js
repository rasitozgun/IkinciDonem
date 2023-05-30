import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const EditServiceScreen = ({ navigation, route }) => {
  const { serviceId } = route.params; // Get the serviceId passed from the previous screen
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const { session, setLoading } = useContext(AuthContext);

  useEffect(() => {
    if (session) {
      getService();
    }
  }, [session]);

  async function getService() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("services")
        .select("name, price")
        .eq("id", serviceId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setServiceName(data.name);
        setServicePrice(data.price.toString());
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  const handleUpdateService = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        name: serviceName,
        price: parseFloat(servicePrice),
      };

      let { error } = await supabase.from("services").update(updates).eq("id", serviceId);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Service</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Service Name</Text>
        <TextInput
          style={styles.input}
          value={serviceName}
          onChangeText={(text) => setServiceName(text)}
          placeholder="Enter service name"
        />

        <Text style={styles.label}>Service Price</Text>
        <TextInput
          style={styles.input}
          value={servicePrice}
          onChangeText={(text) => setServicePrice(text)}
          placeholder="Enter service price"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateService}>
          <Text style={styles.updateButtonText}>Update Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333333",
    textAlign: "center",
  },
  form: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#333333",
  },
  updateButton: {
    backgroundColor: "#ffaa00",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default EditServiceScreen;
